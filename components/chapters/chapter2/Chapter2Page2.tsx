"use client";
import React from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { useProgress } from "@/components/context/ProgressContext";
import { useAuth } from "@/components/context/AuthContext";


export default function Chapter2Page2() {

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(10);

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
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1">
        <Link
          href="/chapters/chapter2/1"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-1 h-full"></div>
        <div className="col-span-6 h-full">
          <div className="h-full flex flex-col justify-center items-center p-10 text-white ">
            <p className="font-medium mb-4">
              A <span className="italic">Bauhaus</span> foi das maiores
              influências da história no Design, transformando a perceção da
              sociedade quanto à arte através da sua integração das artes
              plásticas com o artesanato.
            </p>
            <p className="font-medium mb-10">
              Que dizes de explorarmos o seu método de criação? Anda daí!
            </p>
          </div>
        </div>
        <div className="h-full col-span-4 flex justify-center items-center">
          <Tilt options={defaultOptions}>
            <Image
              src="/img/chapter2/chapter2Bauhaus.svg"
              alt="Foto da Escola de Design Bauhaus"
              width={350}
              height={350}
              className="rounded"
            />
          </Tilt>
          <Link href="/chapters/chapter2/3">Temp go to next</Link>
        </div>
        <div className="h-full col-span-1"></div>
      </div>
    </>
  )
}
