"use client";

import { FC } from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

export const MenuItem: FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      onClick={onClick}
    >
      {label}
    </div>
  );
};
