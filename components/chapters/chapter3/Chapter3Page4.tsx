"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
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
        <Link
          href="/chapters/chapter3/3"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
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
          <motion.div
            whileHover={hover}
            className="group"
          >
            <Button asChild className="text-white bg-[#142839] hover:bg-hover">
              <Link href="/chapters/chapter3/5">
                Continuar
                <FaArrowRight className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-150 ease-out" />
              </Link>
            </Button>
          </motion.div>
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
