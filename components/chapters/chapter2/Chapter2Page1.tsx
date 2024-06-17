"use client";
import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import { useRouter } from "next/navigation";
import { useProgress } from "@/components/context/ProgressContext";

export default function Chapter2Page1() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE RESET
  setProgress(0);

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

  return UserId ? (
    <>
      <div className="bg-chapter2StartBG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center">
        <h1 className="font-bold text-white text-9xl mb-11 font-effra">
          Design
        </h1>
        <p className="mb-7 text-white font-medium">
          Vamos ao segundo pilar, o Design.
        </p>
        <p className=" text-white mx-8 mb-5 font-medium">
          Podemos considerar o Design como estando entre a arte e a engenharia,
          focando também no visual das obras, mas, principalmente, na
          funcionalidade. E qual o melhor sítio para estudar Design, senão a sua
          principal escola?
        </p>

        <p className=" text-white mb-6 mx-8 font-medium">
          Exatamente, vamos até à <span className="italic">Bauhaus</span>!
        </p>
        <Link href="/chapters/chapter2/2">
          <Button className="text-white">Continuar</Button>
        </Link>
        {/* <SpeakerWaveIcon className="text-white h-10 w-10 justify-end items-end absolute bottom-5 right-5" /> */}
      </div>
    </>
  ) : (
    router.push("/")
  );
}
