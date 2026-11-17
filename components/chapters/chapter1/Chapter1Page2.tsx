"use client";
import { BackLink, NextButton } from "@/components/chapters/ChapterNav";
import React, { useEffect } from "react";
import Image from "next/image";
import { Tilt } from "@/components/ui/tilt";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";

export default function Chapter1Page2() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
    setProgress(16.66);
  }, [setProgress]);


  return (
    <>
      <div className="bg-chapter1BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1">
        <BackLink href="/chapters/chapter1/1" tone="dark" />
        <motion.div
          className="col-span-1 h-full"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={enter}
        ></motion.div>
        <motion.div
          className="col-span-6 h-full"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={enter}
        >
          <div className="h-full flex flex-col justify-center items-center p-10 ">
            <p className="font-medium mb-10">
              A arte sempre foi pensada como uma peça singular. Um quadro, uma
              escultura, uma composição. No entanto, esta visão mudou com{" "}
              <span className="italic text-tertiary">Richard Wagner</span> e a sua criação, a{" "}
              <span className="italic text-tertiary">Gesamtkunstwerk</span>.
            </p>
            <NextButton href="/chapters/chapter1/3" className="text-white bg-tertiary hover:bg-hover-tertiary" />
          </div>
        </motion.div>
        <motion.div
          className="h-full col-span-4 flex justify-center items-center"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={enter}
        >
          <Tilt>
            <Image
              src="/img/chapter1/chapter1Wagner.svg"
              alt="Foto de Richard Wagner"
              width={350}
              height={350}
              className="rounded tiltableImage"
              draggable={false}
            />
          </Tilt>
        </motion.div>
        <motion.div
          className="h-full col-span-1"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={enter}
        ></motion.div>
      </div>
    </>
  );
}
