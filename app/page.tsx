// 'use client' é apenas necessário quando estamos a usar componentes do lado do cliente, por exemplo, os modelos 3D do react-three-fiber
"use client";

import React, { useEffect, Suspense } from "react";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import Homepage from "@/components/homepage/Homepage";

export default function Home() {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }

  useEffect(() => {
    // Redireciona imediatamente para a página de autenticação se o utilizador não estiver autenticado
    if (!isLoading && currentUser === null) {
      router.push("/authentication");
    }
  }, [currentUser, isLoading, router]);

  // Se o utilizador estiver a ser autenticado, mostra um loading
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Lottie
          animationData={animationData}
          className="bg-[#142839] h-20 w-20"
        />
      </div>
    );
  }

  // Se não estiver a carregar mas o currentUser for nulo, não renderizar nada
  // Isto lida com o raro caso em que o isLoading é falso, mas o currentUser ainda não foi atualizado
  if (currentUser === null) {
    return null;
  }

  // Verificar se o utilizador está a aceder via mobile
  if (isMobile()) {
    return (
      <div className="h-screen w-screen flex justify-center items-center text-center px-4">
        <p>Para uma melhor experiência, por favor, utiliza um dispositivo desktop para acederes a esta plataforma</p>
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
      <main className="max-w-full overflow-hidden">
        <Homepage />
      </main>
    </Suspense>
  );
}