"use client";
import React from "react";
import { useEffect,useState } from "react";
import { auth } from "../../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import { useRouter } from 'next/navigation';
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { IoChevronBack } from "react-icons/io5";
import Link from 'next/link';
import Image from "next/image";
import { MdQuestionMark } from "react-icons/md";

export default function Chapter1Page3() {

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
        <div className="bg-chapter1BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-2">
            <Link href="/chapters/chapter1/2" className="text-black absolute top-20 left-15 flex items-center cursor-pointer" >
                    <IoChevronBack className=" h-8 w-8" />
                    <span>Voltar</span>
            </Link>
            <div className="flex flex-col justify-center items-center p-10 mt-20 ">
                <p className="font-medium mb-10">Segundo <span className="italic">Wagner</span>, com a queda de Atenas, as artes fragmentaram-se, separando a palavra, a música e a dança, e este defendia que para restaurar a harmonia na arte, estas artes deveriam ser unidas novamente, nascendo assim o conceito de <span className="italic">Gesamtkunstwerk</span>, ou “Obra Total”.</p>
                <p className="font-medium mb-10">Agora, vamos ver como <span className="italic">Wagner</span> colocou o seu conceito em prática? Interage com o palco que te é mostrado e vê a sua criação ganhar vida!</p>
            </div>
            <div className="flex justify-center items-center">
            <Link href="/chapters/chapter1/4">
              <Image src="/img/chapter1/chapter1Teatro.svg" alt="Foto de um Teatro" width={600} height={600} className="rounded" />
            </Link>
            </div>
            <MdQuestionMark className="text-black h-10 w-10 justify-start items-start absolute bottom-5 left-5" />
            <SpeakerWaveIcon className="text-black h-10 w-10 justify-end items-end absolute bottom-5 right-5" />
        </div>
        </>
        
        
      ) : (
        router.push("/")
      )
      
    );
}