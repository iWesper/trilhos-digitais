"use client";
import React from "react";
import {  useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { Button } from "@/components/ui/button";

export default function Chapter2Page6() {

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(50);

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

  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  p-4">
        <Link
          href="/chapters/chapter2/5"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-end items-center text-center flex-col">
          <p className="text-white font-medium p-6">
            Como te dissémos, estas cadeiras foram pensadas de modo a ocupar o
            menor espaço possível, e conseguem isto inserindo-se dentro umas das
            outras.
          </p>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex flex-col items-center justify-start">
          <Tilt options={defaultOptions}>
            <Image
              src="/img/chapter2/chapter2cadeiras_cadeirasempilhadas.svg"
              alt="Cadeiras empilhadas"
              width={400}
              height={400}
            />
          </Tilt>
          <Link href={"/chapters/chapter2/7"} className="mt-10">
            <Button className="text-white">Continuar</Button>
          </Link>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
