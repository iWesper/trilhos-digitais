"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { Tilt } from "@/components/ui/tilt";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";
import { FaArrowRight } from "react-icons/fa6";

export default function Chapter3Page11() {
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
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571
    );
  }, [setProgress]);


  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1">
        <Link
          href="/chapters/chapter3/10"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
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
              As <span className="text-foreground italic">modalidades de semiótica</span>, referindo-se aos elementos utilizados
              para passar a mensagem, podendo estes ser ícones, que são
              semelhantes a elementos reais, índices, semelhantes a um
              significado, ou símbolos, que são nada mais nada menos que
              convenções.
            </p>
            <motion.div
              whileHover={hover}
              className="group"
            >
              <Button
                asChild
                className="text-white bg-[#142839] hover:bg-hover"
              >
                <Link href="/chapters/chapter3/12">
                  Continuar
                  <FaArrowRight className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-150 ease-out" />
                </Link>
              </Button>
            </motion.div>
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
              src="/img/chapter3/chapter3semiotica.svg"
              alt="Imagem de modalidades de semiótica"
              width={300}
              height={300}
              className="rounded"
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
