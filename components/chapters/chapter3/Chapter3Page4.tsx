"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";

export default function Chapter3Page4() {

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(16.66);

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
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-3">
        <Link
          href="/chapters/chapter3/3"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <motion.div
          className="col-span-2 h-full"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="col-span-8 h-full"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="h-full flex justify-center items-center mt-20">
            <p className="font-medium mb-10 text-white text-center">
            Dando o exemplo do "<span className="italic">The Godfather</span>”, enquanto filme. O seu meio técnico de exposição é o ecrã, os meios básicos são imagens, sons e falas, e os seus meios qualificados seriam longa-metragem e ficção policial. Se fosse o livro, estes aspetos formadores seriam outros, passando assim uma mensagem diferente.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="h-full col-span-2"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
        </motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
            <Image
              src="/img/chapter3/chapter3GodfatherCover.svg"
              alt="Imagem de capa de  The Godfather"
              width={250}
              height={250}
              className="rounded tiltableImage mt-44"
              draggable={false}
            />
        </motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
            <Image
              src="/img/chapter3/chapter3GodfatherCoverXBOX.svg"
              alt="Imagem de capa de The Godfather"
              width={250}
              height={250}
              className="rounded tiltableImage mt-44"
              draggable={false}
            />
        </motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >

            <Image
              src="/img/chapter3/chapter3GodfatherCoverBook.svg"
              alt="Imagem de capa de The Godfather"
              width={250}
              height={250}
              className="rounded tiltableImage mt-44"
              draggable={false}
            />
        </motion.div>
        <motion.div
          className="h-full col-span-4"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
        </motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
            <Link href="/chapters/chapter3/5">
              <Button className="text-white mt-36">Continuar</Button>
            </Link>
        </motion.div>
        <motion.div
          className="h-full col-span-4"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
        </motion.div>
      </div>
    </>
  )
}
