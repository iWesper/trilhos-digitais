"use client";
import React from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";

import { Button } from "@/components/ui/button";

export default function Chapter2Page11() {

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(100);

  return (
    <>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 justify-center items-center p-4">
        <Link
          href="/chapters/chapter2/10"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col">
          <p className="text-white font-medium pb-10">
            Parece que chegámos ao fim do segundo pilar.
          </p>
          <p className="text-white font-medium pb-10">
            Agora, vamos analisar mais de perto como uma mensagem pode ser
            passada.
          </p>
          <p className="text-white font-medium pb-10">
            Próxima paragem, e o terceiro pilar: Comunicação!
          </p>

          <Link href={"/chapters/chapter3/1"}>
            <Button className="text-white">Continuar</Button>
          </Link>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
