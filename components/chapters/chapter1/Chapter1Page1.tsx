"use client";
import { NextButton } from "@/components/chapters/ChapterNav";
import React, { useEffect } from "react";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { hover } from "@/lib/motion";

export default function Chapter1Page1() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE RESET
  useEffect(() => {
    setProgress(0);
  }, [setProgress]);

  return (
    <>
      <div className="bg-chapter1StartBG  h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center">
        <h1 className="font-bold text-black text-9xl mb-11 font-effra">Arte</h1>
        <p className="mb-11 font-medium">
          A nossa primeira paragem é no primeiro dos Quatro Pilares, a <span className=" text-tertiary">Arte</span>.
        </p>
        <NextButton href="/chapters/chapter1/2" label="Começar" className="text-white bg-tertiary hover:bg-hover-tertiary" />
      </div>
    </>
  );
}
