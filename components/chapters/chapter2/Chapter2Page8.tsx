"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { auth } from "../../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import Image from "next/image";
import { Tilt } from "react-tilt";

import { Button } from "@/components/ui/button";

export default function Chapter2Page8() {
  const router = useRouter();

  //USER ID
  const [UserId, setUserId] = useState<string | null>(null);

  //LOADING
  const [loading, setLoading] = useState<boolean>(true);

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(70);

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

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

  return UserId ? (
    <>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <Link
          href="/chapters/chapter2/7"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col pt-20">
          <p className="text-white font-medium p-6 pb-8">
            Para que possas verificar este conceito, montámos o seguinte
            showcase, onde vais poder ver como o design pode alterar o
            significado de algo, neste caso, a frase “Hello there”.
          </p>
          <p className="text-white font-medium pb-8">
            Altera o design e diz-nos que tipo de mensagem te transmite.
          </p>
          <div className=" bg-opacity-50 bg-black rounded-xl mb-6">
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
  ) : (
    router.push("/")
  );
}
