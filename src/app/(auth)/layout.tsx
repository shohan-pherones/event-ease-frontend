"use client";

import AuthCallback from "@/components/AuthCallback";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      setIsPageLoading(false);
    }
  }, [user, router]);

  return isPageLoading ? <AuthCallback /> : <>{children}</>;
};

export default AuthLayout;
