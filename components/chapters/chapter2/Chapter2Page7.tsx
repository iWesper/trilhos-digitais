"use client";
import { BackLink, NextButton } from "@/components/chapters/ChapterNav";
import React, { useEffect } from "react";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";


export default function Chapter2Page7() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
    setProgress(60);
  }, [setProgress]);

  return (
    <>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1  justify-center items-center p-4">
        <BackLink href="/chapters/chapter2/6" />
        <div className="col-span-2"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="col-span-8 flex justify-start items-center text-center flex-col"
        >
          <p className="text-white font-medium p-6 pb-8">
            Foi outro dos grandes designs da <span className="italic text-secondary">Bauhaus</span> que mostra como, para além
            de visuais intrigantes, uma peça deve ser feita de modo que siga a
            sua função (<span className="italic text-secondary">Form Follows Function</span>),
            e que dê uma experiência única.
          </p>
          <p className="text-white font-medium pb-8">
            No entanto, o design não deve apenas seguir a função, mas também o
            significado.
          </p>
          <NextButton href="/chapters/chapter2/8" className="text-white bg-secondary hover:bg-hover-secondary" />
        </motion.div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
