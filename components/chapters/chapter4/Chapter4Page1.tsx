"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

export default function Chapter4Page1() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE RESET
  setProgress(0);

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
          <motion.div
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              className="group"
            >
              <Button
                asChild
                className="text-white bg-[#142839] hover:bg-hover"
              >
                <Link href="/chapters/chapter4/2">
                  Começar
                  <FaArrowRight className="ps-2 h-6 w-6 group-hover:moveRight" />
                </Link>
              </Button>
            </motion.div>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
