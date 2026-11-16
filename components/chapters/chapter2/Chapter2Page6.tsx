"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import Image from "next/image";
import { Tilt } from "@/components/ui/tilt";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";
import { FaArrowRight } from "react-icons/fa6";

export default function Chapter2Page6() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
    setProgress(50);
  }, [setProgress]);


  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  p-4">
        <Link
          href="/chapters/chapter2/5"
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
          className="col-span-8 flex justify-end items-center text-center flex-col mt-14"
        >
          <p className="text-white font-medium p-6">
            Como te dissémos, estes bancos foram pensados de modo a ocupar o
            menor espaço possível, e conseguem isto inserindo-se dentro uns dos
            outros.
          </p>
        </motion.div>
        <div className="col-span-2"></div>
        <div className="col-span-2"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="col-span-8 flex flex-col items-center justify-start"
        >
          <Tilt options={{ scale: 1 }}>
            <Image
              src="/img/chapter2/chapter2cadeiras_cadeirasempilhadas.svg"
              alt="Cadeiras empilhadas"
              width={400}
              height={400}
            />
          </Tilt>
          <motion.div
            whileHover={hover}
            className="group"
          >
            <Button
              asChild
              className="text-white bg-secondary hover:bg-hover-secondary"
            >
              <Link href="/chapters/chapter2/7">
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
