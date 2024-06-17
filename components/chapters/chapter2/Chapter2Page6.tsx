"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { auth } from "../../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import { useRouter } from "next/navigation";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import Image from "next/image";
import { Tilt } from "react-tilt";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Chapter2Page6() {
  const router = useRouter();

  //USER ID
  const [UserId, setUserId] = useState<string | null>(null);

  //LOADING
  const [loading, setLoading] = useState<boolean>(true);

  //PROGRESS
  const { setProgress } = useProgress();

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

  //PROGRESS VALUE
  setProgress(16.66);

  //CONTROLO DA ANIMAÇÃO
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 10, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 2500, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  const [showDialog, setShowDialog] = useState<boolean>(false);

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
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  p-4">
        <Link
          href="/chapters/chapter2/5"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col pt-20">
          <p className="text-white font-medium p-6">
            Como te dissémos, estas cadeiras foram pensadas de modo a ocupar o
            menor espaço possível, e conseguem isto inserindo-se dentro umas das
            outras.
          </p>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex flex-col items-center justify-center">
          <Tilt options={defaultOptions}>
            <Image
              src="/img/chapter2/chapter2cadeiras_cadeirasempilhadas.svg"
              alt="Cadeiras empilhadas"
              width={400}
              height={400}
            />
          </Tilt>
          <Link href={"/chapters/chapter2/7"}>
            <Button className="text-white">Continuar</Button>
          </Link>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  ) : (
    router.push("/")
  );
}
