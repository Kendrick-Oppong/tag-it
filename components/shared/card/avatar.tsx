"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

const Avatar = ({ src, alt }: Readonly<Props>) => {
const fallBackUrl = "https://avatar.vercel.sh/rauchg?size=24";

  return (
    <Image
      src={src || fallBackUrl}
      alt={alt}
      width={28}
      height={28}
      className={"h-7 w-7 rounded-full"}
      onError={(e) =>
        (e.currentTarget.src = fallBackUrl)
      }
    />
  );
};

export default Avatar;
