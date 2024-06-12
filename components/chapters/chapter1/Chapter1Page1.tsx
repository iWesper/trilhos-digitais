"use client";
import React from "react";
import { useEffect,useState } from "react";
import { auth } from "../../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "@/components/login/Login";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";

export default function Chapter1Page1() {

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
          <Lottie animationData={animationData} className="bg-foreground h-20 w-20 " />
    </div>
  )
  }

  return (
      UserId ? (
        <>
        <div className="bg-chapter1StartBG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center">
          <h1 className="font-bold text-black text-9xl mb-11">Arte</h1>
          <p className="mb-11">A nossa primeira paragem é no primeiro dos Quatro Pilares, a Arte.</p>
          <Button>Continuar</Button>
          <SpeakerWaveIcon className="text-white h-10 w-10 justify-end items-end" />
        </div>
        </>
        
        
      ) : (
        router.push("/")
      )
      
    );
}