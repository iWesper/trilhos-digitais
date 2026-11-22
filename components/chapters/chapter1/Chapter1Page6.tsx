"use client";
import { BackLink, NextButton } from "@/components/chapters/ChapterNav";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { Tilt } from "@/components/ui/tilt";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";

export default function Chapter1Page6() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
    setProgress(16.66 + 16.66 + 16.66 + 16.66 + 16.66);
  }, [setProgress]);

  return (
    <>
      <div className="bg-chapter1BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12">
        <BackLink href="/chapters/chapter1/5" tone="dark" />
        <div className="col-span-1"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="col-span-5 flex flex-col justify-center items-center p-10 mt-20 "
        >
          <p className="font-medium mb-10">
            O cinema é considerado a 7ª Arte, e a evolução do conceito de{" "}
            <span className="italic text-tertiary">Wagner</span>, pois utiliza a síntese de
            várias artes que o precedem como da arquitetura, da escultura, da
            música ou da dança, para criar uma experiência única e emotiva que
            permite o espectador reviver momentos, reais ou fictícios.
          </p>
          <NextButton href="/chapters/chapter1/7" className="text-white bg-tertiary hover:bg-hover-tertiary" />
        </motion.div>
        <div className="col-span-1"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="col-span-4 flex justify-center items-center"
        >
          <Tilt options={{ scale: 1 }}>
            <Image
              src="/img/chapter1/chapter1Cinema.svg"
              alt="Foto de um Cinema"
              width={600}
              height={600}
              className="rounded"
            />
          </Tilt>
        </motion.div>
      </div>
    </>
  );
}
