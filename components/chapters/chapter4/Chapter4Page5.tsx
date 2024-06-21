"use client";
import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { useAuth } from "@/components/context/AuthContext";

import { Button } from "@/components/ui/button";

export default function Chapter4Page5() {
  const { goGetUsername, username, currentUser, error } = useAuth();

  useEffect(() => {
    //PROGRESS VALUE
    setProgress(25 + 25 + 25 + 25);

   if(currentUser !== null){
     //USERNAME
     goGetUsername(currentUser.uid);
   }
  }, []);

  //PROGRESS
  const { setProgress } = useProgress();

  return (
    <>
      <div className="bg-chapter4BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <Link
          href="/chapters/chapter4/4"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col pt-20">
          <p className="text-white font-medium p-6 pb-8">
            Bem, {username}, parece que acabámos a primeira parte da nossa
            aventura pela história da multimédia e já aprendemos tanto, muito
            bem!
          </p>
          <p className="text-white font-medium pb-8">
            Agora já sabes tudo sobre as bases da multimédia desde a sua origem.
          </p>
          <p className="text-white font-medium pb-8">
            Volta em breve para veres os novos conteúdos que estamos a preparar
            para ti!
          </p>
          <Link href="/">
            <Button className="text-white">Continuar</Button>
          </Link>
          {error && (<p className=" text-red-600 text-center text-sm">{error}</p>)}
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
