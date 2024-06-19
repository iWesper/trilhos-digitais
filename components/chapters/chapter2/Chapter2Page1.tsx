"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";

export default function Chapter2Page1() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE RESET
  setProgress(0);

  return (
    <>
      <div className="bg-chapter2StartBG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center">
        <h1 className="font-bold text-white text-9xl mb-11 font-effra">
          Design
        </h1>
        <p className="mb-7 text-white font-medium">
          Vamos ao segundo pilar, o Design.
        </p>
        <p className=" text-white mx-8 mb-5 font-medium">
          Podemos considerar o Design como estando entre a arte e a engenharia,
          focando também no visual das obras, mas, principalmente, na
          funcionalidade. E qual o melhor sítio para estudar Design, senão a sua
          principal escola?
        </p>

        <p className=" text-white mb-6 mx-8 font-medium">
          Exatamente, vamos até à <span className="italic">Bauhaus</span>!
        </p>
        <Link href="/chapters/chapter2/2">
          <Button className="text-white">Continuar</Button>
        </Link>
      </div>
    </>
  )
}
