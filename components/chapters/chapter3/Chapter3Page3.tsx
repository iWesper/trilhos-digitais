"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { Tilt } from "@/components/ui/tilt";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";

export default function Chapter3Page3() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
    setProgress(
      7.1428571428571428571428571428571 + 7.1428571428571428571428571428571
    );
  }, [setProgress]);


  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1">
        <Link
          href="/chapters/chapter3/2"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className="h-8 w-8" />
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
              E perguntas tu, como é que isto acontece? Bem, acontece devido aos
              diferentes meios técnicos de exposição, meios básicos e meios
              qualificados utilizados em cada um deles.
            </p>
            <motion.div
              whileHover={hover}
              className="group"
            >
              <Button
                asChild
                className="text-white bg-[#142839] hover:bg-hover"
              >
                <Link href="/chapters/chapter3/4">
                  Continuar
                  <FaArrowRight className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-150 ease-out" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center md:mt-20 lg:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1}}
          transition={enter}
        >
          <Tilt>
            <Image
              src="/img/chapter3/chapter3GodfatherCover.svg"
              alt="Imagem de capa deo The Godfather"
              width={350}
              height={350}
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
