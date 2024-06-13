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
import { MdQuestionMark } from "react-icons/md";
import { Button } from "@/components/ui/button";

export default function Chapter1Page5() {

  const router = useRouter();

   //USER ID
   const [UserId, setUserId] = useState<string | null>(null);

   //ESTADO DA RESPOSTA
   const [resposta, setResposta] = useState<string | null>(null);

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

  //REPOSTAS FORM
  const handleFormSubmit = ( e: React.MouseEvent<HTMLButtonElement> ) => {
  
    //PREVINE O FORM DE FAZER O DEFAULT
    e.preventDefault();
  
    //VALOR QUE VEM DE CADA BUTTON
    const resposta = (e.target as HTMLButtonElement).value;
  
    //VERIFICA SE A RESPOSTA ESTÁ CORRETA
    if(resposta === "Videojogos"){

        //STATE A MOSTRAR À PESSOA
        setResposta("Não me parece que seja esta a evolução da “Obra Total”, tenta outra vez!");
  
    }
    else if(resposta === "Cinema") {

         //STATE A MOSTRAR À PESSOA
         setResposta("Exatamente, o cinema é a 7ª Arte!");

         //VAI PARA A PRÓXIMA PAGINA DEPOIS DE UM ATRASO
        setTimeout(() => {

            router.push("/chapters/chapter1/6");

        }, 2000);
  
    }
    else if(resposta === "VR") {

         //STATE A MOSTRAR À PESSOA
         setResposta("Não me parece que seja esta a evolução da “Obra Total”, tenta outra vez!");
  
    }
  }

  return (
      UserId ? (
        <>
        <div className="bg-chapter1BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover  ">
            <Link href="/chapters/chapter1/4" className="text-black absolute top-20 left-15 flex items-center cursor-pointer" >
                <IoChevronBack className=" h-8 w-8" />
                <span>Voltar</span>
            </Link>
            <div className="flex items-center justify-center h-screen flex-col">
                <div>
                    <h3 className="text-black text-center mb-5">Este conceito tornou-se o novo <span className="italic">standard</span> no teatro e, naturalmente, evoluiu para aquela que hoje é conhecida como a 7ª arte</h3>
                    <p className="font-bold text-black text-center">Qual dos seguintes tipos de arte achas que representa esta evolução?</p>
                </div>
                <form className="flex flex-row items-center justify-center mt-3">
                    <Button type="button" value="Videojogos" onClick={handleFormSubmit} className=" m-3">Videojogos</Button>
                    <Button type="button" value="Cinema" onClick={handleFormSubmit} className=" m-3">Cinema</Button>
                    <Button type="button" value="VR" onClick={handleFormSubmit} className=" m-3">VR</Button>
                </form>
                {resposta && <p className="text-black text-center mt-2">{resposta}</p>}

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