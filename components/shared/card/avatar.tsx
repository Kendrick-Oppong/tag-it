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
      width={28}
      height={28}
      className={"h-7 w-7 rounded-full"}
      onError={(e) =>
        (e.currentTarget.src = "https://avatar.vercel.sh/rauchg?size=24")
      }
    />
  );
};

export default Avatar;
