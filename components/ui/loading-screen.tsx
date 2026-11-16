"use client";

import Lottie from "@/components/ui/lottie";
import animationData from "@/public/animations/loading_animation.json";

// Ecrã de carregamento único: fundo azul marinho desde o primeiro frame
// (a animação Lottie só carrega no browser, mas o fundo já lá está, sem flash verde)
export default function LoadingScreen() {
  return (
    <div
      role="status"
      aria-label="A carregar"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#142839]"
    >
      <Lottie animationData={animationData} className="h-20 w-20" />
    </div>
  );
}
