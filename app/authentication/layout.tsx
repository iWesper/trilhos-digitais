"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";
import LoadingScreen from "@/components/ui/loading-screen";

export default function AuthenticationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { currentUser } = useAuth();
  const router = useRouter();

  // Quem já tem sessão vai direto para a página inicial
  useEffect(() => {
    if (currentUser) router.replace("/");
  }, [currentUser, router]);

  if (currentUser) return <LoadingScreen />;

  return <main className="overflow-hidden">{children}</main>;
}
