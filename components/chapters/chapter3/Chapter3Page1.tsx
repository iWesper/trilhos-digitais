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
      <div className="bg-chapter3StartBG  h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center">
        <h1 className="font-bold text-white text-9xl mb-11 font-effra">Comunicação</h1>
        <p className="mb-11 font-medium text-center mx-11 text-white">
        Enquanto um individuo pode querer passar uma mensagem específica, este deve escolher o meio que utiliza para o fazer com algum cuidado pois, como dizia <span className="italic">Marshall McLuhan</span>, O Meio É A Mensagem!
        </p>
        <Link href="/chapters/chapter3/2">
          <Button className="text-white">Continuar</Button>
        </Link>
      </div>
    </>
  );
}
