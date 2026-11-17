"use client";
import { BackLink, NextButton } from "@/components/chapters/ChapterNav";
import React, {useEffect} from "react";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";


export default function Chapter3Page5() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
    setProgress(
      7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571
    );
  }, [setProgress]);

  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 justify-center items-center p-4">
        <BackLink href="/chapters/chapter3/4" />
        <div className="col-span-2"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="col-span-8 flex justify-start items-center text-center flex-col"
        >
          <p className="text-white font-medium pb-10">
            Agora que sabes tudo sobre como os meios definem a mensagem passada,
            vamos colocar o teu conhecimento ao teste.
          </p>
          <p className="text-white font-medium pb-10">
            Clica no continuar para começares um minijogo.
          </p>
          <NextButton href="/chapters/chapter3/6" className="text-white bg-[#142839] hover:bg-hover" />
        </motion.div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
