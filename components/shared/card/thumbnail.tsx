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

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
      quality={85}
      onError={() => setImgSrc(defaultSrc)}
    />
  );
}
