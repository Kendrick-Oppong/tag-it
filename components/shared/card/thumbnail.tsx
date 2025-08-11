"use client";

import Image from "next/image";
import { HTMLProps, useState } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: HTMLProps<HTMLElement>["className"];
};

export default function Thumbnail({
  src,
  alt,
  width,
  height,
  className,
}: Readonly<Props>) {
  const defaultSrc = "https://placehold.net/10-600x800.png";
  const [imgSrc, setImgSrc] = useState(src);

  // Normalize and proxy all external origins for stricter control
  let normalizedSrc = imgSrc;
  try {
    const url = new URL(imgSrc);

    // Normalize external Next optimizer URLs
    if (url.pathname.startsWith("/_next/image")) {
      const inner = url.searchParams.get("url");
      if (inner) {
        normalizedSrc = inner.startsWith("/") ? `${url.origin}${inner}` : inner;
      }
    }

    // If origin is not same-origin, proxy through our API
    const isSameOrigin =
      typeof window !== "undefined" && url.origin === window.location.origin;
    if (!isSameOrigin) {
      normalizedSrc = `/api/image-proxy?url=${encodeURIComponent(
        url.toString()
      )}`;
    }
  } catch {
    // ignore parsing errors; fall back to original src
  }

  return (
    <Image
      src={normalizedSrc || defaultSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      quality={85}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      loading="lazy"
      decoding="async"
      unoptimized
      onError={() => setImgSrc(defaultSrc)}
    />
  );
}
