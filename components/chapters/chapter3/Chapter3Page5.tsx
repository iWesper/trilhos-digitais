"use client";
import React, {useEffect} from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";

import { Button } from "@/components/ui/button";

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
        <Link
          href="/chapters/chapter3/4"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
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
          <motion.div
            whileHover={hover}
            className="group"
          >
            <Button asChild className="text-white bg-[#142839] hover:bg-hover">
              <Link href="/chapters/chapter3/6">
                Continuar
                <FaArrowRight className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-150 ease-out" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
