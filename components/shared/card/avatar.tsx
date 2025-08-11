"use client";

import { fallBackUrl } from "@/constants/header.constants";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const Avatar = ({ src, alt, className }: Readonly<Props>) => {
  // Proxy external avatars through our image proxy to avoid mixed content/hotlink issues
  let avatarSrc = src || fallBackUrl;
  try {
    const url = new URL(avatarSrc);
    const isSameOrigin =
      typeof window !== "undefined" && url.origin === window.location.origin;
    if (!isSameOrigin) {
      avatarSrc = `/api/image-proxy?url=${encodeURIComponent(url.toString())}`;
    }
  } catch {
    // ignore errors and use original
  }

  return (
    <Image
      src={avatarSrc}
      alt={alt}
      width={28}
      height={28}
      className={`h-7 w-7 rounded-full ${className}`}
      loading="lazy"
      decoding="async"
      unoptimized
      onError={(e) => {
        try {
          e.currentTarget.src = fallBackUrl;
        } catch {}
      }}
    />
  );
};

export default Avatar;
