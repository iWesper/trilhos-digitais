"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

export default function Chapter1Page1() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE RESET
  setProgress(0);

  return (
    <>
      <div className="bg-chapter1StartBG  h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center">
        <h1 className="font-bold text-black text-9xl mb-11 font-effra">Arte</h1>
        <p className="mb-11 font-medium">
          A nossa primeira paragem é no primeiro dos Quatro Pilares, a <span className=" text-tertiary">Arte</span>.
        </p>
        <motion.div
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          className="group"
        >
          <Button asChild className="text-white bg-tertiary hover:bg-hover-tertiary">
            <Link href="/chapters/chapter1/2">
              Começar
              <FaArrowRight className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-all duration-150" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
}
