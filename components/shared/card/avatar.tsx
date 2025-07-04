"use client";

import { fallBackUrl } from "@/constants/header.constants";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?:string
};

const Avatar = ({ src, alt,className }: Readonly<Props>) => {

  return (
    <Image
      src={src || fallBackUrl}
      alt={alt}
      width={28}
      height={28}
      className={`h-7 w-7 rounded-full ${className}`}
      onError={(e) =>
        (e.currentTarget.src = fallBackUrl)
      }
    />
  );
};

export default Avatar;
