"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { enter, enterAfter, hover } from "@/lib/motion";
import { FaArrowRight } from "react-icons/fa6";

export default function Chapter2Page1() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE RESET
  setProgress(0);

  return (
    <>
      <div className="bg-chapter2StartBG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover flex-col items-center justify-center grid grid-cols-12">
        <div className="col-span-3"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="col-span-6 flex flex-col justify-center items-center mt-10"
        >
          <h1 className="font-bold text-white text-9xl mb-11 font-effra">
            Design
          </h1>
          <p className="mb-7 text-white font-medium">
            Vamos ao segundo pilar, o <span className="text-secondary">Design</span>.
          </p>
          <p className=" text-white mx-8 mb-5 font-medium text-center">
            Podemos considerar o Design como estando entre a arte e a
            engenharia, focando também no visual das obras, mas, principalmente,
            na funcionalidade. E qual o melhor sítio para estudar Design, senão
            a sua principal escola?
          </p>

          <p className=" text-white mb-6 mx-8 font-medium">
            Exatamente, vamos até à <span className="italic text-secondary">Bauhaus</span>!
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: enterAfter(1) }}
            whileHover={hover}
            className="group"
          >
            <Button
              asChild
              className="text-white bg-secondary hover:bg-hover-secondary"
            >
              <Link href="/chapters/chapter2/2">
                Começar
                <FaArrowRight className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-150 ease-out" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
}
