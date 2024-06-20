"use client";
import React from "react";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { MdQuestionMark } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SaveBadgeProgressScript from "../../../backend/SaveBadgeProgressScript";
import { useProgress } from "@/components/context/ProgressContext";

export default function Chapter1Page5() {
  //BADGE DO CAPÍTULO
  const badgeId = 3;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 100;

  //GO TO
  const nextPage = "/chapters/chapter3/14";

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(16.66 + 16.66 + 16.66 + 16.66);

  //ESTADO DA RESPOSTA
  const [resposta, setResposta] = useState<string | null>(null);

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

  //MOSTRA O BOTÃO
    const [showButton, setShowButton] = useState<boolean>(false);

  //TIP
  const Tip = "Uma experiência para sempre melhor com uma caixa de pipocas.";

  //REPOSTAS FORM
  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    //PREVINE O FORM DE FAZER O DEFAULT
    e.preventDefault();

    //VALOR QUE VEM DE CADA BUTTON
    const resposta = (e.target as HTMLButtonElement).value;

    //VERIFICA SE A RESPOSTA ESTÁ CORRETA
    if (resposta === "Sensorial") {
      //STATE A MOSTRAR À PESSOA
      setResposta(
        "Exatamente! Vamos a mais uma pergunta."
      );

            //MOSTRA O CONTINUAR
            setShowButton(true);

    }  else if (resposta === "Semiótica") {
      //STATE A MOSTRAR À PESSOA
      setResposta(
        "Não me parece ser a modalidade certa, anda tenta de novo."
      );



    } else if(resposta === "Material"){
      setResposta(
        "Não me parece ser a modalidade certa, anda tenta de novo."
      );
    }
  };

  //CINEMA CLICADO
  const SaveBadgeProgressAndGoToNextPage = () => {
    
    //PODE IR GUARDAR
    setProgressSave(true);
  };

  return (
    <>
      <div className="bg-chapter3BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12">
        <Link
          href="/chapters/chapter3/12"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2 mt-24 mb-4"></div>
        <div className="flex items-center justify-center col-span-8 mt-24 mb-4">
            <p className="font-bold text-white text-center">
            Qual modalidade que se refere a como os media interagem com os nossos orgãos
            como os olhos, ouvidos, entre outros?
            </p>
          </div>
          <div className="col-span-2 mt-24 mb-4"></div>

          <div className="col-span-4"></div>
          <div className="col-span-4">
          {resposta && (
            <p className="text-white text-center">{resposta}</p>
          )}
          </div>
          <div className="col-span-4"></div>

          <div className="col-span-4"></div>
        <div className="col-span-4 flex justify-center items-center">
            
            <Image
               src="/img/chapter3/chapter3folhear.svg"
              alt="Imagem de um livro"
              width={300}
              height={300}
              className="rounded text-center"
              draggable={false}
            />
            </div>
         <div className="col-span-4"></div>
        <div className="col-span-12 flex justify-center items-center"> 
          {!showButton && (<form className="flex flex-row items-center justify-center mt-3">
            <Button
              type="button"
              value="Material"
              onClick={handleFormSubmit}
              className=" m-3 text-white"
            >
              Material
            </Button>
              <Button
                type="button"
                value="Sensorial"
                onClick={handleFormSubmit}
                className=" m-3 text-white"
              >
                Sensorial
              </Button>
            <Button
              type="button"
              value="Semiótica"
              onClick={handleFormSubmit}
              className=" m-3 text-white"
            >
              Semiótica
            </Button>
          </form>)}

          {showButton && (<Button className="text-white" onClick={SaveBadgeProgressAndGoToNextPage}>Continuar</Button>)}
          
        </div>
        <div className="fixed bottom-5 left-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MdQuestionMark className="text-white h-10 w-10 justify-start items-start " />
              </TooltipTrigger>
              <TooltipContent className="bg-foreground border-none shadow-none text-white">
                <p>{Tip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {progressSave && progressSave === true && (
        <SaveBadgeProgressScript
          badgeId={badgeId}
          progress={percentage}
          nextPage={nextPage}
        />
      )}
    </>
  );
}
