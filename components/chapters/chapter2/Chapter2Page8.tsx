"use client";
import { BackLink, NextButton } from "@/components/chapters/ChapterNav";
import React, { useEffect } from "react";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";

export default function Chapter2Page8() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
    setProgress(70);
  }, [setProgress]);

  return (
    <>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <BackLink href="/chapters/chapter2/7" />
        <div className="col-span-2"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="col-span-8 flex justify-start items-center text-center flex-col mt-10"
        >
          <p className="text-white font-medium pb-10">
            Para que possas verificar este conceito, montámos o seguinte
            <span className="italic text-secondary"> showcase</span>, onde vais poder ver como o design pode alterar o
            significado de algo, neste caso, a frase “<span className="italic text-secondary">Hello There</span>”.
          </p>
          <p className="text-white font-medium pb-10">
            Altera o design e diz-nos que tipo de mensagem te transmite.
          </p>
          <div className=" bg-opacity-50 bg-black rounded-xl mb-10">
            <p className="text-white px-10 py-10 text-6xl font-effra">
              Hello There.
            </p>
          </div>
          <NextButton href="/chapters/chapter2/9" className="text-white bg-secondary hover:bg-hover-secondary" />
        </motion.div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
