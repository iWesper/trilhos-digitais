// 'use client' é apenas necessário quando estamos a usar componentes do lado do cliente, por exemplo, os modelos 3D do react-three-fiber
"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import Homepage from "@/components/homepage/Homepage";

export default function Home() {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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
          className="bg-foreground h-20 w-20"
        />
      </div>
    );
  }

  return (
    <main className="max-w-full overflow-hidden">
      <Homepage />
    </main>
  );
}
