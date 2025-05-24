"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

const Avatar = ({ src, alt }: Readonly<Props>) => {
  return (
    <Image
      src={src || "https://avatar.vercel.sh/rauchg?size=24"}
      alt={alt}
      width={24}
      height={24}
      className={"h-6 w-6 rounded-full"}
      onError={(e) =>
        (e.currentTarget.src = "https://avatar.vercel.sh/rauchg?size=24")
      }
    />
  );
};

export default Avatar;
