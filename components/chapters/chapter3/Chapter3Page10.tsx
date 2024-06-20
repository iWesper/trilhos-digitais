"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";

export default function Chapter3Page10() {

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571);

  //CONTROLO DA ANIMAÇÃO
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 15, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 5000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1">
        <Link
          href="/chapters/chapter3/9"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <motion.div
          className="col-span-1 h-full"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="col-span-6 h-full"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="h-full flex flex-col justify-center items-center p-10 ">
            <p className="font-medium mb-10 text-white">
            As modalidades espaciotemporais, sendo a forma como percebemos a mensagem no espaço e tempo, por exemplo, enquanto numa foto temos um único <span className="italic">frame</span> para ler a mensagem, mas num filme de 15s já temos mais contexto.
            </p>
            <Link href="/chapters/chapter3/11">
              <Button className="text-white bg-foreground hover:bg-hover">Continuar</Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <Tilt options={defaultOptions}>
            <Image
               src="/img/chapter3/chapter3instax.svg"
              alt="Imagem de uma câmara instantânea"
              width={300}
              height={300}
              className="rounded tiltableImage"
              draggable={false}
            />
          </Tilt>
        </motion.div>
        <motion.div
          className="h-full col-span-1"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>
      </div>
    </>
  )
}
