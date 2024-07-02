"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

export default function Chapter4Page1() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE RESET
  setProgress(0);

  return (
    <>
      <div className="bg-chapter3StartBG  h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1 items-center justify-center">
        <div className="col-span-2"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="col-span-8 flex flex-col justify-center items-center"
        >
          <h1 className="font-bold text-white text-9xl mb-11 font-effra">
            Comunicação
          </h1>
          <p className="mb-11 font-medium text-center mx-11 text-white">
            Enquanto um indivíduo pode querer passar uma mensagem específica,
            este deve escolher o meio que utiliza para o fazer com algum cuidado
            pois, como dizia <span className="italic text-foreground">Marshall McLuhan</span>, "O
            Meio É A Mensagem"!
          </p>
          <motion.div
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            className="group"
          >
            <Button asChild className="text-white bg-[#142839] hover:bg-hover">
              <Link href="/chapters/chapter3/2">
                Começar
                <FaArrowRight className="ps-2 h-6 w-6 group-hover:moveRight" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <div className="col-span-2"></div>
    </>
  );
}
