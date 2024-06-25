"use client";
import React from "react";
import {  useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";

export default function Chapter1Page7() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(16.66 + 16.66 + 16.66 + 16.66 + 16.66 + 16.66);

  const [content, setContent] = useState<string | null>(
    "No entanto, uma obra completa envolve interação com elementos e não apenas a visualização de acontecimentos, e é nesse aspeto que a multimédia entra."
  );

  //CLICK PARA DAR ROUTER PUSH
  const [clickCount, setClickCount] = useState(0);

  const router = useRouter();

  //MUDAR CONTEUDO
  const handleContentSwap = () => {
    //SE FOR O PRIMEIRO CLIQUE
    if (clickCount === 0) {
      //MUDA CONTEÚDO
      setContent("Vamos ao segundo pilar. Próxima paragem, Design!");

      //AUMENTA O CLICK COUNT
      setClickCount((prevCount) => prevCount + 1);
    } else {
      //ROUTER PARA 8
      router.push("/chapters/chapter2/1");
    }
  };

  return (
    <>
      <div className="bg-chapter1BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12">
        <Link
          href="/chapters/chapter1/6"
          className="text-black absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-3"></div>
        <div className="col-span-6 flex flex-col justify-center items-center p-10 mt-20 ">
          <p className="font-medium mb-10">{content}</p>
          <Button onClick={handleContentSwap}>Continuar</Button>
        </div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
}
