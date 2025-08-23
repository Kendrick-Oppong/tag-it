import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

export const runtime = "nodejs";

const MAX_BYTES = 2_000_000; // ~2MB
const FETCH_TIMEOUT_MS = 6000;

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map((p) => Number(p));
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return false;
  if (parts[0] === 10) return true; // 10.0.0.0/8
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true; // 172.16.0.0/12
  if (parts[0] === 192 && parts[1] === 168) return true; // 192.168.0.0/16
  if (parts[0] === 127) return true; // loopback
  if (parts[0] === 169 && parts[1] === 254) return true; // link-local
  return false;
}

function isPrivateIPv6(ip: string): boolean {
  const v = ip.toLowerCase();
  if (v === "::1") return true; // loopback
  if (v.startsWith("fc") || v.startsWith("fd")) return true; // unique local
  if (
    v.startsWith("fe8") ||
    v.startsWith("fe9") ||
    v.startsWith("fea") ||
    v.startsWith("feb")
  )
    return true; // link-local
  return false;
}

function isPrivateIp(ip: string): boolean {
  return ip.includes(":") ? isPrivateIPv6(ip) : isPrivateIPv4(ip);
}

async function resolveAndValidateHost(hostname: string) {
  const lower = hostname.toLowerCase();
  if (
    lower === "localhost" ||
    lower.endsWith(".localhost") ||
    lower.endsWith(".local")
  ) {
    throw new Error("Blocked host");
  }
  const addresses = await dns.lookup(hostname, { all: true, verbatim: true });
  for (const addr of addresses) {
    if (isPrivateIp(addr.address))
      throw new Error("Blocked private/internal IP address");
  }
}

// Cache for host validations to avoid repeated DNS lookups
const HOST_CACHE_TTL_MS = Number(
  process.env.IMAGE_PROXY_HOST_CACHE_TTL_MS ?? 10 * 60 * 1000
);
const __hostCache: Map<string, number> =
  (globalThis as unknown as { __imgHostCache?: Map<string, number> })
    .__imgHostCache || new Map();
(
  globalThis as unknown as { __imgHostCache: Map<string, number> }
).__imgHostCache = __hostCache;
async function resolveAndValidateHostCached(host: string) {
  const now = Date.now();
  const ts = __hostCache.get(host);
  if (ts && now - ts < HOST_CACHE_TTL_MS) return;
  await resolveAndValidateHost(host);
  __hostCache.set(host, now);
}

// Simple in-memory rate limiter (per-IP)
const RATE_LIMIT_WINDOW_MS = Number(
  process.env.IMAGE_PROXY_RATE_WINDOW_MS ?? 5 * 60 * 1000
); // default 5 minutes
const RATE_LIMIT_MAX = Number(process.env.IMAGE_PROXY_RATE_LIMIT_MAX ?? 300); // default 300 requests per window
type RateBucket = Map<string, number[]>;
// Persist simple memory store across hot reloads in dev without 'any'
const __rl: RateBucket =
  (globalThis as unknown as { __imgProxyRl?: RateBucket }).__imgProxyRl ||
  new Map<string, number[]>();
(globalThis as unknown as { __imgProxyRl: RateBucket }).__imgProxyRl = __rl;

function getClientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    (req as NextRequest & { ip?: string }).ip ||
    "unknown"
  );
}

function rateLimit(req: NextRequest, keyPrefix: string) {
  const ip = getClientIp(req);
  const key = `${keyPrefix}:${ip}`;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const arr = __rl.get(key) || [];
  const recent = arr.filter((t: number) => t > windowStart);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  __rl.set(key, recent);
  return true;
}

async function fetchFollowingRedirects(
  url: URL,
  method: "HEAD" | "GET",
  signal?: AbortSignal
): Promise<{ response: Response; finalUrl: URL }> {
  const MAX_REDIRECTS = 5;
  let current = url;
  for (let i = 0; i < MAX_REDIRECTS; i++) {
    const resp = await fetch(current.toString(), {
      method,
      redirect: "manual",
      signal,
    });
    const loc = resp.headers.get("location");
    if (resp.status >= 300 && resp.status < 400 && loc) {
      const nextUrl = new URL(loc, current);
      if (!["http:", "https:"].includes(nextUrl.protocol)) {
        throw new Error("Blocked redirect protocol");
      }
      await resolveAndValidateHost(nextUrl.hostname);
      current = nextUrl;
      continue;
    }
    return { response: resp, finalUrl: current };
  }
  throw new Error("Too many redirects");
}

export async function GET(req: NextRequest) {
  try {
    if (!rateLimit(req, "img-proxy")) {
      return new NextResponse("Rate limit exceeded", { status: 429 });
    }

    const raw = (req.nextUrl.searchParams.get("url") || "").trim();
    if (!raw) return new NextResponse("Bad Request", { status: 400 });

    let target: URL;
    try {
      target = new URL(raw);
    } catch {
      return new NextResponse("Invalid URL", { status: 400 });
    }

    if (!["http:", "https:"].includes(target.protocol)) {
      return new NextResponse("Only http/https allowed", { status: 400 });
    }

    await resolveAndValidateHostCached(target.hostname);

    // Single GET with redirect validation and timeout
    const controller = new AbortController();
    const timer = setTimeout(
      () => controller.abort("timeout"),
      FETCH_TIMEOUT_MS
    );
    let imgResp: Response;
    try {
      const res = await fetchFollowingRedirects(
        target,
        "GET",
        controller.signal
      );
      imgResp = res.response;
    } finally {
      clearTimeout(timer);
    }

    const ct = imgResp.headers.get("content-type") || "";
    const clHeader = imgResp.headers.get("content-length") || "0";
    const cl = Number(clHeader);

    if (!ct.startsWith("image/")) {
      return new NextResponse("Unsupported content type", { status: 415 });
    }
    if (Number.isFinite(cl) && cl > 0 && cl > MAX_BYTES) {
      return new NextResponse("Content too large", { status: 413 });
    }

    if (!imgResp.ok) {
      return new NextResponse("Upstream error", { status: imgResp.status });
    }

    const headers = new Headers();
    const upstreamCT =
      imgResp.headers.get("content-type") || "application/octet-stream";
    headers.set("content-type", upstreamCT);

    const upstreamCC = imgResp.headers.get("cache-control") || "";
    const etag = imgResp.headers.get("etag");
    const lastModified = imgResp.headers.get("last-modified");

    // Respect upstream 'no-store'/'no-cache'; otherwise use/augment caching
    if (/no-store|no-cache/i.test(upstreamCC)) {
      headers.set("cache-control", upstreamCC);
    } else if (upstreamCC) {
      headers.set(
        "cache-control",
        `${upstreamCC}, stale-while-revalidate=604800`
      );
    } else {
      headers.set(
        "cache-control",
        "public, max-age=86400, immutable, s-maxage=86400, stale-while-revalidate=604800"
      );
    }

    if (etag) headers.set("etag", etag);
    if (lastModified) headers.set("last-modified", lastModified);

    return new NextResponse(imgResp.body, { status: 200, headers });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    let status = 500;
    if (
      message.includes("Blocked") ||
      message.includes("Invalid") ||
      message.includes("Too many redirects")
    ) {
      status = 400;
    } else if (message.includes("timeout")) {
      status = 504;
    }
    return new NextResponse(`Proxy error: ${message}`, { status });
  }
}
