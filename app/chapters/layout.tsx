"use client";

import NavbarChapters from "@/components/chapters/NavbarChapters";
import { useState, Suspense } from "react";
import { ProgressProvider } from "@/components/context/ProgressContext";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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

  function isMobile() {
    const regex =
      /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  // Verifica se o utilizador está autenticado
  useEffect(() => {
    if (!isLoading) {
      if (currentUser === null) {
        setIsCheckingAuth(false);
        router.push("/authentication");
      } else {
        setIsCheckingAuth(false);
      }
    }
  }, [currentUser, isLoading, router]);

  // Se o utilizador estiver a ser autenticado, mostra um loading
  if (isLoading || isCheckingAuth) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Lottie
          animationData={animationData}
          className="bg-[#142839] h-20 w-20"
        />
      </div>
    );
  }

  // Verificar se o utilizador está a aceder via mobile
  if (isMobile()) {
    return (
      <div className="h-screen w-screen flex justify-center items-center text-center px-4">
        <p>
          Esta plataforma é melhor utilizada num computador desktop. Por favor,
          acede através de um desktop para continuar.
        </p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex justify-center items-center">
          <Lottie
            animationData={animationData}
            className="bg-[#142839] h-20 w-20"
          />
        </div>
      }
    >
      <ProgressProvider>
        <main className="overflow-hidden text-sm md:text-md lg:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl">
          <NavbarChapters />
          {children}
        </main>
      </ProgressProvider>
    </Suspense>
  );
}
