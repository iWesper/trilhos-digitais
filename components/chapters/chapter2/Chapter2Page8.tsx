"use client";
import React from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { Button } from "@/components/ui/button";

export default function Chapter2Page8() {

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(70);

  return (
    <>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <Link
          href="/chapters/chapter2/7"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col">
          <p className="text-white font-medium pb-10">
            Para que possas verificar este conceito, montámos o seguinte
            showcase, onde vais poder ver como o design pode alterar o
            significado de algo, neste caso, a frase “Hello there”.
          </p>
          <p className="text-white font-medium pb-10">
            Altera o design e diz-nos que tipo de mensagem te transmite.
          </p>
          <div className=" bg-opacity-50 bg-black rounded-xl mb-10">
            <p className="text-white px-10 py-10 text-6xl font-effra">
              Hello There.
            </p>
          </div>
          <Link href={"/chapters/chapter2/9"}>
            <Button className="text-white">Experimentar</Button>
          </Link>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
