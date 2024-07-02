"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

export default function Chapter2Page4() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(30);

  //CONTROLO DA ANIMAÇÃO
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 10, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 2500, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  return (
    <>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1">
        <Link
          href="/chapters/chapter2/3"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-1"></div>
        <div className="col-span-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
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
              <motion.div
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                className="group"
              >
                <Button
                  asChild
                  className="text-white bg-secondary hover:bg-hover-secondary"
                >
                  <Link href="/chapters/chapter2/5">
                    Continuar
                    <FaArrowRight className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-all duration-150" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        <div className="col-span-1"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="h-full col-span-4 flex justify-center items-center relative"
        >
          <Tilt options={defaultOptions}>
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
