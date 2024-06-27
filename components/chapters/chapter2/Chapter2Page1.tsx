"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
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
          transition={{ duration: 1 }}
          className="col-span-6 flex flex-col justify-center items-center mt-10"
        >
          <h1 className="font-bold text-white text-9xl mb-11 font-effra">
            Design
          </h1>
          <p className="mb-7 text-white font-medium">
            Vamos ao segundo pilar, o Design.
          </p>
          <p className=" text-white mx-8 mb-5 font-medium text-center">
            Podemos considerar o Design como estando entre a arte e a
            engenharia, focando também no visual das obras, mas, principalmente,
            na funcionalidade. E qual o melhor sítio para estudar Design, senão
            a sua principal escola?
          </p>

          <p className=" text-white mb-6 mx-8 font-medium">
            Exatamente, vamos até à <span className="italic">Bauhaus</span>!
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { duration: 1, delay: 2 } }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            className="group"
          >
            <Button
              asChild
              className="text-white bg-primary hover:bg-hover-primary"
            >
              <Link href="/chapters/chapter2/2">
                Continuar
                <FaArrowRight className="ps-2 h-6 w-6 group-hover:moveRight" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
}
