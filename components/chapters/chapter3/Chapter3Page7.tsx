"use client";
import React from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";

import { Button } from "@/components/ui/button";

export default function Chapter3Page7() {

  //PROGRESS
  const { setProgress } = useProgress();

    //PROGRESS VALUE
    setProgress(60);

  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <Link
          href="/chapters/chapter3/6"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col pt-20">
          <p className="text-white font-medium p-6 pb-8">
          Uau, parece que percebeste bem como são distinguidos os meios técnicos. No entanto, existem também quatro modalidades que permitem distinguir os <span className="italic">media</span>.
          </p>
          <p className="text-white font-medium pb-8">
          Vamos descobri-las!
          </p>
          <Link href={"/chapters/chapter3/8"}>
            <Button className="text-white">Continuar</Button>
          </Link>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
