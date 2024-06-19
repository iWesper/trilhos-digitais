"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { useProgress } from "@/components/context/ProgressContext";

export default function Chapter1Page4() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(16.66 + 16.66 + 16.66);

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

  return (
    <>
      <div className="bg-chapter1BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-2">
        <Link
          href="/chapters/chapter1/3"
          className="text-black absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="flex flex-col justify-center items-center p-10 mt-20 ">
          <p className="font-medium mb-10">
            <span className="italic">Wagner</span> implementou uma “fossa de
            orquestra” em palcos de teatro, reintroduzindo harmonia às peças
            neles tocadas através da música ao vivo, unindo todos estes
            elementos numa única obra, dando ao espectador uma experiência e
            sensação única.
          </p>
          <Link href="/chapters/chapter1/5">
            <Button>Continuar</Button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Tilt options={defaultOptions}>
            <Image
              src="/img/chapter1/chapter1Teatro.svg"
              alt="Foto de um Teatro"
              width={600}
              height={600}
              className="rounded"
            />
          </Tilt>
        </div>
      </div>
    </>
  );
}
