"use client";
import { BackLink, NextButton } from "@/components/chapters/ChapterNav";
import React, { useEffect } from "react";
import Image from "next/image";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { enter, enterAfter, hover } from "@/lib/motion";
import { Tilt } from "@/components/ui/tilt";

export default function Chapter3Page4() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
    setProgress(
      7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571
    );
  }, [setProgress]);


  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-3">
        <BackLink href="/chapters/chapter3/3" />
        <motion.div
          className="col-span-2 h-full"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={enter}
        ></motion.div>
        <motion.div
          className="col-span-8 h-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={enter}
        >
          <div className="h-full flex justify-center items-center mt-20">
            <p className="font-medium mb-10 text-white text-center">
              O filme &quot;<span className="italic text-foreground">The Godfather</span>&quot; utiliza o
              ecrã como meio técnico de exposição, com imagens, sons e falas
              como meios básicos, e os meios classificados seriam longa-metragem
              e ficção policial. Se fosse um livro, esses aspectos formadores
              seriam diferentes, transmitindo assim uma mensagem distinta.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="h-full col-span-2"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={enter}
        ></motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enterAfter(0.5)}
        >
          <Tilt>
            <Image
              src="/img/chapter3/chapter3GodfatherCover.webp"
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
          transition={enterAfter(0.75)}
        >
          <Tilt>
            <Image
              src="/img/chapter3/chapter3GodfatherCoverXBOX.webp"
              alt="Imagem de capa de The Godfather"
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
          transition={enterAfter(1)}
        >
          <Tilt>
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
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={enter}
        ></motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
        >
          <NextButton href="/chapters/chapter3/5" className="text-white bg-[#142839] hover:bg-hover" />
        </motion.div>
        <motion.div
          className="h-full col-span-4"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={enter}
        ></motion.div>
      </div>
    </>
  );
}
