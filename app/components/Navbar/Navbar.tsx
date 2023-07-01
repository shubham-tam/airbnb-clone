"use client";

import { FC } from "react";

import { SafeUser } from "@/app/types";
import { Container, Logo, Search, UserMenu, Categories } from "../paths";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { currentUser } = props;

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};
