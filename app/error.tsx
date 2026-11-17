"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

// Ecrã de erro da app (em vez do ecrã em branco do Next.js)
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-[#142839] px-4 text-center text-white">
      <h1 className="font-effra text-3xl font-bold">Ups, o comboio descarrilou.</h1>
      <p className="max-w-md text-white/80">Algo correu mal ao carregar esta página. Tenta outra vez.</p>
      <Button onClick={reset} className="bg-primary text-[#142839] hover:bg-primary/90">
        Tentar de novo
      </Button>
    </div>
  );
}
