"use client";

import { FC } from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { src } = props;
  return (
    <Image
      className="rounded-full"
      width={30}
      height={30}
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
    />
  );
};
