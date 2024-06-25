"use client";
import React from "react";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";

import { Button } from "@/components/ui/button";

export default function Chapter2Page7() {

  //PROGRESS
  const { setProgress } = useProgress();

    //PROGRESS VALUE
    setProgress(60);

  return (
    <>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1  justify-center items-center p-4">
        <Link
          href="/chapters/chapter2/6"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col">
          <p className="text-white font-medium p-6 pb-8">
          Foi outro dos grandes designs da Bauhaus que mostra como, para além de visuais intrigantes, uma peça deve ser feita de modo que siga a sua função (<span className="italic">Form Follows Function</span>), e que dê uma experiência única.
          </p>
          <p className="text-white font-medium pb-8">
          No entanto, o design não deve apenas seguir a função, mas também o significado.
          </p>
          <Link href={"/chapters/chapter2/8"}>
            <Button className="text-white">Continuar</Button>
          </Link>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
