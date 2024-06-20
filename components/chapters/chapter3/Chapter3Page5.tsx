"use client";
import React from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";

import { Button } from "@/components/ui/button";

export default function Chapter3Page5() {

  //PROGRESS
  const { setProgress } = useProgress();

    //PROGRESS VALUE
    setProgress(7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571);

  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <Link
          href="/chapters/chapter3/4"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col pt-20">
          <p className="text-white font-medium p-6 pb-8">
          Agora que sabes tudo sobre como os meios definem a mensagem passada, vamos colocar o teu conhecimento ao teste.
          </p>
          <p className="text-white font-medium pb-8">
          Clica no continuar para começares um minijogo.
          </p>
          <Link href={"/chapters/chapter3/6"}>
            <Button className="text-white bg-foreground hover:bg-hover">Continuar</Button>
          </Link>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
