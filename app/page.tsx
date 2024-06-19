// 'use client' é apenas necessário quando estamos a usar componentes do lado do cliente, por exemplo, os modelos 3D do react-three-fiber
"use client";

import React, { useEffect, useState } from "react";

import CheckHasSeenTutorialScript from "../backend/CheckHasSeenTutorialScript";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";

export default function Home() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  // Verifica se o utilizador está autenticado
  useEffect(() => {
    if (!currentUser) {
      router.push("/authentication");
    } else {
      setIsLoading(false);
    }
  }, [currentUser, router]);

  // Se estiver a carregar, mostra a animação de loading
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Lottie
          animationData={animationData}
          className="bg-foreground h-20 w-20 "
        />
      </div>
    );
  }


  return (
    <main className="max-w-full overflow-hidden">
      <CheckHasSeenTutorialScript />
    </main>
  );
}
