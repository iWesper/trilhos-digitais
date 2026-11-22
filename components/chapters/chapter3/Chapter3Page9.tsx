"use client";
import { BackLink, NextButton } from "@/components/chapters/ChapterNav";
import React, { useEffect } from "react";
import Image from "next/image";
import { Tilt } from "@/components/ui/tilt";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";

export default function Chapter3Page9() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
    setProgress(
      7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571
    );
  }, [setProgress]);


  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1">
        <BackLink href="/chapters/chapter3/8" />
        <motion.div
          className="col-span-1 h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
        ></motion.div>
        <motion.div
          className="col-span-6 h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
        >
          <div className="h-full flex flex-col justify-center items-center p-10 ">
            <p className="font-medium mb-10 text-white">
              As <span className="italic text-foreground">modalidades sensoriais</span>, sendo a forma como os{" "}
              <span className="italic text-foreground">media</span> comunicam com os nossos
              órgãos sensoriais. Por exemplo: ouvimos o desfolhar de um livro e
              sentimos a página virar, mas concentramo-nos no texto.
            </p>
            <NextButton href="/chapters/chapter3/10" className="text-white bg-[#142839] hover:bg-hover" />
          </div>
        </motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
        >
          <Tilt>
            <Image
              src="/img/chapter3/chapter3folhear.svg"
              alt="Imagem de um livro"
              width={300}
              height={300}
              className="rounded "
              draggable={false}
            />
          </Tilt>
        </motion.div>
        <motion.div
          className="h-full col-span-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
        ></motion.div>
      </div>
    </>
  );
}
