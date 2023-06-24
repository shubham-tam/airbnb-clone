"use client";

import { FC } from "react";
import Image from "next/image";

interface AvatarProps {}

export const Avatar: FC<AvatarProps> = ({}) => {
  return (
    <Image
      className="rounded-full"
      width={30}
      height={30}
      alt="Avatar"
      src="/images/placeholder.jpg"
    />
  );
};
