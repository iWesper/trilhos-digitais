"use client";
import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
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
  //USER ID
  const [UserId, setUserId] = useState<string | null>(null);

  //LOADING
  const [loading, setLoading] = useState<boolean>(true);

  //VAI BUSCAR O USER ID QUANDO MONTA
  useEffect(() => {
    //SAVE USER
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        //SAVE
        setUserId(currentUser.uid);

        if (UserId) {
          return;
        }
      } else {
        setUserId(null);
      }

      //ACABA O LOAD
      setLoading(false);
    });
  }, [UserId]);

  //SE ESTIVER A CARREGAR
  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Lottie
          animationData={animationData}
          className="bg-foreground h-20 w-20 "
        />
      </div>
    );
  }

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

  return UserId ? (
    <>
      <div className="bg-chapter1BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid">
        <Link
          href="/chapters/chapter1/6"
          className="text-black absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="flex flex-col justify-center items-center p-10 mt-20 ">
          <p className="font-medium mb-10">{content}</p>
          <Button onClick={handleContentSwap}>Continuar</Button>
        </div>
        <SpeakerWaveIcon className="text-black h-10 w-10 justify-end items-end absolute bottom-5 right-5" />
      </div>
    </>
  ) : (
    router.push("/")
  );
}
