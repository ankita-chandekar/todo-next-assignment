"use client";

import useRequireAuth from "@/utils/useRequireAuth";
import { signOut, useSession } from "next-auth/react";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const LogoutWrapper = () => {
  const pathname = usePathname();

  const { isAuthenticated } = useRequireAuth();
  const loginPage = ["/login"].includes(pathname);

  return (
    <>
      {isAuthenticated && !loginPage && (
        <div className="absolute right-10 top-10">
          <button
            className="bg-black w-auto rounded-2xl py-4 px-8  text-white font-sans font-bold cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default LogoutWrapper;
