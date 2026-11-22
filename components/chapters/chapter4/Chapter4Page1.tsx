"use client";
import { NextButton } from "@/components/chapters/ChapterNav";
import React, { useEffect } from "react";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { hover } from "@/lib/motion";

export default function Chapter4Page1() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE RESET
  useEffect(() => {
    setProgress(0);
  }, [setProgress]);

  return (
    <>
      <div className="bg-chapter4StartBG  h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1 items-center justify-center">
        <div className="col-span-2"></div>
        <div className="col-span-8 flex flex-col justify-center items-center">
          <h1 className="font-bold text-white text-9xl mb-11 font-effra">
            Tecnologia
          </h1>
          <p className="mb-11 font-medium text-center mx-11 text-white">
            Bem-vindo ao último dos quatro grandes pilares, a <span className="text-primary">Tecnologia</span>!
          </p>
          <p className="mb-11 font-medium text-center mx-11 text-white">
            Neste, vais navegar de uma forma um pouco diferente. Procura o
            <span className="italic"> slider</span> no fundo do ecrã. Vais utilizá-lo para navegar
            cronologicamente pelo capítulo, explorando a história e evolução dos
            meios de comunicação.
          </p>
          <NextButton href="/chapters/chapter4/2" label="Começar" className="text-white bg-primary hover:bg-hover-primary" />
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
