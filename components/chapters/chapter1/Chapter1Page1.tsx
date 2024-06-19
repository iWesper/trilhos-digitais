"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";

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
          A nossa primeira paragem é no primeiro dos Quatro Pilares, a Arte.
        </p>
        <Link href="/chapters/chapter1/2">
          <Button>Continuar</Button>
        </Link>
        {/* <SpeakerWaveIcon className="text-black h-10 w-10 justify-end items-end absolute bottom-5 right-5" /> */}
      </div>
    </>
  );
}
