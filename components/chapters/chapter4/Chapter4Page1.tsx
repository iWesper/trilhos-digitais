"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";

export default function Chapter4Page1() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE RESET
  setProgress(0);

  return (
    <>
      <div className="bg-chapter4StartBG  h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center">
        <h1 className="font-bold text-white text-9xl mb-11 font-effra">
          Tecnologia
        </h1>
        <p className="mb-11 font-medium text-center mx-11 text-white">
          Bem-vindo ao último dos quatro grandes pilares, a Tecnologia!
        </p>
        <p className="mb-11 font-medium text-center mx-11 text-white">
          Neste, vais navegar de uma forma um pouco diferente. Vês o slider no
          fundo do ecrã? Vais utilizá-lo para navegar cronologicamente pelo
          capítulo, explorando a história e evolução dos meios de comunicação.
        </p>
        <Link href="/chapters/chapter4/2">
          <Button className="text-white">Continuar</Button>
        </Link>
      </div>
    </>
  );
}
