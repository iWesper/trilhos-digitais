"use client";
import React from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";

import { Button } from "@/components/ui/button";

export default function Chapter3Page15() {

  //PROGRESS
  const { setProgress } = useProgress();

    //PROGRESS VALUE
    setProgress(7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571);

  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <Link
          href="/chapters/chapter3/14"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col pt-20">
          <p className="text-white font-medium p-6 pb-8">
          Parece que percebeste como é que estes meios técnicos e modalidades são utilizadas para definir a especificidade dos <span className="italic">media</span>, e deste modo como nos é passada a mensagem, muito bem!
          </p>
          <p className="text-white font-medium pb-8">
          Agora, para acabar a nossa aventura pelos pilares, vamos ver como evoluíram as ferramentas de comunicação.
          </p>
          <p className="text-white font-medium pb-8">Próxima paragem: Tecnologia!</p>
          <Link href={"/chapters/chapter4/1"}>
            <Button className="text-white">Continuar</Button>
          </Link>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
