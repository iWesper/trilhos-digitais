"use client";
import React from "react";
import { useEffect,useState } from "react";
import { auth } from "../../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { IoChevronBack } from "react-icons/io5";
import Link from 'next/link';
import Image from "next/image";
import { Tilt } from "react-tilt";


export default function Chapter1Page4() {

  const router = useRouter();
   //USER ID
   const [UserId, setUserId] = useState<string | null>(null);

   //LOADING
   const [loading, setLoading] = useState<boolean>(true);

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
          <Lottie animationData={animationData} className="bg-foreground h-20 w-20 " />
    </div>
  )
  }

  return (
      UserId ? (
        <>
        <div className="bg-chapter1BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-2">
            <Link href="/chapters/chapter1/3" className="text-black absolute top-20 left-15 flex items-center cursor-pointer" >
                    <IoChevronBack className=" h-8 w-8" />
                    <span>Voltar</span>
            </Link>
            <div className="flex flex-col justify-center items-center p-10 mt-20 ">
                <p className="font-medium mb-10"><span className="italic">Wagner</span> implementou uma “fossa de orquestra” em palcos de teatro, reintroduzindo harmonia às peças neles tocadas através da música ao vivo, unindo todos estes elementos numa única obra, dando ao espectador uma experiência e sensação única.</p>
                <Link href="/chapters/chapter1/5"><Button>Continuar</Button></Link>
            </div>
            <div className="flex justify-center items-center">
              <Tilt options={defaultOptions}>
                <Image src="/img/chapter1/chapter1Teatro.svg" alt="Foto de um Teatro" width={600} height={600} className="rounded" />
              </Tilt>
            </div>
            <SpeakerWaveIcon className="text-black h-10 w-10 justify-end items-end absolute bottom-5 right-5" />
        </div>
        </>
        
        
      ) : (
        router.push("/")
      )
      
    );
}