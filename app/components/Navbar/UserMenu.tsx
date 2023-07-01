"use client";

import { FC, useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

import { Avatar } from "../Avatar";
import { MenuItem } from "./index";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useLoginModal } from "@/app/hooks/useLoginModal";

interface UserMenuProps {
  currentUser?: User | null;
}

export const UserMenu: FC<UserMenuProps> = (props) => {
  const { currentUser } = props;

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggelOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-2 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggelOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border:netural-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[4-vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favourites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={() => {}} label="Airbnb my home" />
                <hr />

                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen(), toggelOpen();
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen(), toggelOpen();
                  }}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
