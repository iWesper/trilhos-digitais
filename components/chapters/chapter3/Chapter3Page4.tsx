"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";

export default function Chapter3Page4() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(
    7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571
  );

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
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
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
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="h-full flex justify-center items-center mt-20">
            <p className="font-medium mb-10 text-white text-center">
              O filme "<span className="italic text-foreground">The Godfather"</span>" utiliza o
              ecrã como meio técnico de exposição, com imagens, sons e falas
              como meios básicos, e os meios classificados seriam longa-metragem
              e ficção policial. Se fosse um livro, esses aspectos formadores
              seriam diferentes, transmitindo assim uma mensagem distinta.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="h-full col-span-2"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Tilt options={defaultOptions}>
            <Image
              src="/img/chapter3/chapter3GodfatherCover.svg"
              alt="Imagem de capa de  The Godfather"
              width={200}
              height={200}
              className="rounded mt-28"
              draggable={false}
            />
          </Tilt>
        </motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <Tilt options={defaultOptions}>
            <Image
              src="/img/chapter3/chapter3GodfatherCoverXBOX.svg"
              alt="Imagem de capa de The Godfather"
              width={200}
              height={200}
              className="rounded mt-28 tiltableImage"
              draggable={false}
            />
          </Tilt>
        </motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <Tilt options={defaultOptions}>
            <Image
              src="/img/chapter3/chapter3GodfatherCoverBook.svg"
              alt="Imagem de capa de The Godfather"
              width={200}
              height={200}
              className="rounded mt-28"
              draggable={false}
            />
          </Tilt>
        </motion.div>
        <motion.div
          className="h-full col-span-4"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            className="group"
          >
            <Button asChild className="text-white bg-[#142839] hover:bg-hover">
              <Link href="/chapters/chapter3/5">
                Continuar
                <FaArrowRight className="ps-2 h-6 w-6 group-hover:moveRight" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="h-full col-span-4"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>
      </div>
    </>
  );
}
