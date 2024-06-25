"use client";

import NavbarChapters from "@/components/chapters/NavbarChapters";
import { useState } from "react";
import { ProgressProvider } from "@/components/context/ProgressContext";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, Suspense } from "react";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";

export default function ChaptersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Verifica se o utilizador está autenticado
  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  return (
    <>
      <Suspense
        fallback={
          <div className="h-screen w-screen flex justify-center items-center">
            <Lottie
              animationData={animationData}
              className="bg-foreground h-20 w-20"
            />
          </div>
        }
      >
        <main className="overflow-hidden">{children}</main>
      </Suspense>
    </>
  );
}
