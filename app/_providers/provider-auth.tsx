"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

import { parseJwt } from "@/app/_helpers";
import { useSignOut } from "../_store/use-log-out";
import useAuthStore from "../_store/user-config";

export default function ProviderAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const useToken = useAuthStore();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const { signOut } = useSignOut();

  const isTokenExpired = useCallback(() => {
    if (session && session?.token?.header) {
      const expiry = parseJwt(session?.token?.header)?.exp;
      if (expiry) {
        return Math.floor(new Date().getTime() / 1000) >= expiry;
      }
    }

    return false;
  }, [session]);
  
  useEffect(() => {
    if (isTokenExpired()) {
      signOut();
    }
  }, [pathname, session, isTokenExpired]);

  useEffect(() => {
    if (status === "authenticated") {
      useToken.setToken(session?.token?.header ?? "");
    }
  }, [session?.token?.header, status]);

  return <>{children}</>;
}
