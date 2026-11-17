"use client";
import { BackLink, NextButton } from "@/components/chapters/ChapterNav";
import React, { useEffect } from "react";
import Image from "next/image";
import { Tilt } from "@/components/ui/tilt";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";

export default function Chapter2Page4() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
    setProgress(30);
  }, [setProgress]);


  return (
    <>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1">
        <BackLink href="/chapters/chapter2/3" />
        <div className="col-span-1"></div>
        <div className="col-span-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={enter}
            className="h-full flex flex-col justify-center  p-10 "
          >
            <p className="font-medium mb-10 text-white">
              Parece que descobriste, é um espremedor!
            </p>
            <p className="mb-10 font-medium text-white">
              Fascinante como algo tão distinto pode ter uma finalidade tão
              simples, mostrando perfeitamente como a forma do mesmo segue a sua
              função (<span className="italic text-secondary">Form Follows Function</span>).
            </p>
            <p className="mb-10 font-medium text-white text-center">
              Vamos a outro exemplo?
            </p>
            <div className="mx-auto">
              <NextButton href="/chapters/chapter2/5" className="text-white bg-secondary hover:bg-hover-secondary" />
            </div>
          </motion.div>
        </div>
        <div className="col-span-1"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="h-full col-span-4 flex justify-center items-center relative"
        >
          <Tilt options={{ scale: 1 }}>
            <Image
              src="/img/chapter2/chapter2espremedor_comcopo.svg"
              alt="Foto de Um Espremedor de Citrinos"
              width={500}
              height={500}
              className="rounded"
            />
          </Tilt>
        </motion.div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
}
