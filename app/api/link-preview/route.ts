import { NextRequest, NextResponse } from "next/server";
import { getLinkPreview } from "link-preview-js";
import dns from "dns/promises";
export const runtime = "nodejs";

// Basic SSRF protections for link preview endpoint
// - Allow only http/https
// - Block localhost and private IP ranges
// - HEAD preflight with timeout and size/content checks
// - Timeout overall preview fetch

const MAX_BYTES = 1_500_000; // ~1.5MB
const HEAD_TIMEOUT_MS = 4000;
const PREVIEW_TIMEOUT_MS = 5000;

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map((p) => Number(p));
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return false;
  if (parts[0] === 10) return true; // 10.0.0.0/8
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true; // 172.16.0.0/12
  if (parts[0] === 192 && parts[1] === 168) return true; // 192.168.0.0/16
  if (parts[0] === 127) return true; // 127.0.0.0/8 loopback
  if (parts[0] === 169 && parts[1] === 254) return true; // 169.254.0.0/16 link-local
  return false;
}

function isPrivateIPv6(ip: string): boolean {
  const v = ip.toLowerCase();
  // Loopback ::1/128
  if (v === "::1") return true;
  // Unique local fc00::/7
  if (v.startsWith("fc") || v.startsWith("fd")) return true;
  // Link-local fe80::/10
  if (
    v.startsWith("fe8") ||
    v.startsWith("fe9") ||
    v.startsWith("fea") ||
    v.startsWith("feb")
  )
    return true;
  return false;
}

function isPrivateIp(ip: string): boolean {
  return ip.includes(":") ? isPrivateIPv6(ip) : isPrivateIPv4(ip);
}

function hasCredentials(u: URL): boolean {
  return Boolean(u.username || u.password);
}

async function resolveAndValidateHost(hostname: string) {
  // Block obvious localhost-style names early
  const lower = hostname.toLowerCase();
  if (
    lower === "localhost" ||
    lower.endsWith(".localhost") ||
    lower.endsWith(".local")
  ) {
    throw new Error("Blocked host");
  }

  // Resolve DNS to check underlying IPs
  const addresses = await dns.lookup(hostname, { all: true, verbatim: true });
  for (const addr of addresses) {
    if (isPrivateIp(addr.address)) {
      throw new Error("Blocked private/internal IP address");
    }
  }
}

function withTimeout<T>(
  p: Promise<T>,
  ms: number,
  message = "Operation timed out"
): Promise<T> {
  let t: NodeJS.Timeout;
  return Promise.race([
    p.finally(() => clearTimeout(t)),
    new Promise<T>((_, reject) => {
      t = setTimeout(() => reject(new Error(message)), ms);
    }),
  ]) as Promise<T>;
}

export async function GET(req: NextRequest) {
  try {
    const raw = (req.nextUrl.searchParams.get("url") || "").trim();
    if (!raw) {
      return NextResponse.json(
        { error: "A valid URL is required" },
        { status: 400 }
      );
    }

    let parsed: URL;
    try {
      parsed = new URL(raw);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return NextResponse.json(
        { error: "Only http/https URLs are allowed" },
        { status: 400 }
      );
    }

    if (hasCredentials(parsed)) {
      return NextResponse.json(
        { error: "User info in URL is not allowed" },
        { status: 400 }
      );
    }

    await resolveAndValidateHost(parsed.hostname);

    // Preflight HEAD request to enforce size/content checks with timeout
    const controller = new AbortController();
    const headTimer = setTimeout(
      () => controller.abort("timeout"),
      HEAD_TIMEOUT_MS
    );
    let headResp: Response;
    try {
      headResp = await fetch(parsed.toString(), {
        method: "HEAD",
        redirect: "follow",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(headTimer);
    }

    const contentType = headResp.headers.get("content-type") || "";
    const contentLengthHeader = headResp.headers.get("content-length") || "0";
    const contentLength = Number(contentLengthHeader);

    // Only allow HTML-ish content for previews
    const allowedContent =
      contentType.includes("text/html") ||
      contentType.includes("application/xhtml+xml") ||
      contentType === ""; // some servers omit it on HEAD
    if (!allowedContent) {
      return NextResponse.json(
        { error: "Unsupported content type for preview" },
        { status: 415 }
      );
    }

    if (
      Number.isFinite(contentLength) &&
      contentLength > 0 &&
      contentLength > MAX_BYTES
    ) {
      return NextResponse.json({ error: "Content too large" }, { status: 413 });
    }

    // Fetch preview with overall timeout guard
    const preview = await withTimeout(
      getLinkPreview(parsed.toString()),
      PREVIEW_TIMEOUT_MS,
      "Preview timed out"
    );
    return NextResponse.json(preview, { status: 200 });
  } catch (error: unknown) {
    let message = "Unknown error";
    if (error instanceof Error) message = error.message;
    let status = 500;
    if (
      message.includes("Blocked") ||
      message.includes("Invalid") ||
      message.includes("Only http/https")
    ) {
      status = 400;
    } else if (message.includes("timed out")) {
      status = 504;
    }

    return NextResponse.json(
      { error: `Failed to fetch metadata: ${message}` },
      { status }
    );
  }
}
