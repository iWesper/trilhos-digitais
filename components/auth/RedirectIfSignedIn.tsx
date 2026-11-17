"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";
import LoadingScreen from "@/components/ui/loading-screen";

// Quem já tem sessão vai direto para a página inicial
export default function RedirectIfSignedIn({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) router.replace("/");
  }, [currentUser, router]);

  if (currentUser) return <LoadingScreen />;
  return <>{children}</>;
}
