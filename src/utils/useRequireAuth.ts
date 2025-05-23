"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const useRequireAuth = (redirectTo = "/login") => {
  const {
    status,
  }: { status: "unauthenticated" | "loading" | "authenticated" } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push(redirectTo);
    }
  }, [status, router, redirectTo]);
  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
};

export default useRequireAuth;
