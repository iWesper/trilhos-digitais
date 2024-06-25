"use client";
import React from "react";
import { useState, useEffect } from "react";
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

import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/context/AuthContext";
import SaveBadgeProgressScript from "../../../backend/SaveBadgeProgressScript";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

export default function Chapter3Page14() {
  //BADGE DO CAPÍTULO
  const badgeId = 3;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 100;

  //GO TO
  const nextPage = "/chapters/chapter3/15";

  //PROGRESS
  const { setProgress } = useProgress();

  //TOAST
  const { toast } = useToast();

  //AUTH Se for false tem badge, true não tem
  const { WillShowToast, willShowToastState, error } = useAuth();

  //PROGRESS VALUE
  setProgress(
    7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571
  );

  //ESTADO DA RESPOSTA
  const [resposta, setResposta] = useState<string | null>(null);

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

  //MOSTRA O BOTÃO
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    WillShowToast(badgeId);
  }, []);

  //TIP
  const Tip =
    "As modalidades referem-se à mensagem e seu significado, não apenas à sua passagem.";

  //REPOSTAS FORM
  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    //PREVINE O FORM DE FAZER O DEFAULT
    e.preventDefault();

    //VALOR QUE VEM DE CADA BUTTON
    const resposta = (e.target as HTMLButtonElement).value;

    //VERIFICA SE A RESPOSTA ESTÁ CORRETA
    if (resposta === "Perceção da Mensagem no Espaço e no Tempo") {
      //STATE A MOSTRAR À PESSOA
      setResposta("É isso mesmo, parabéns!");

      if (willShowToastState === true) {
        toast({
          title: "Nova conquista registada.",
          description: "Ganhaste o teu terceiro badge!",
        });
      }
      //MOSTRA O CONTINUAR
      setShowButton(true);
    } else if (
      resposta === "Tempo de Espera para Receber a Mensagem no Espaço"
    ) {
      //STATE A MOSTRAR À PESSOA
      setResposta("Tens a certeza? Tenta de novo.");
    }
  };

  //CINEMA CLICADO
  const SaveBadgeProgressAndGoToNextPage = () => {
    //PODE IR GUARDAR
    setProgressSave(true);
    console.log("Guardado");
  };

  return (
    <>
      <div className="bg-chapter3BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12">
        <Link
          href="/chapters/chapter3/13"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2 mb-4"></div>
        <div className="flex items-end justify-center col-span-8 mb-4 mt-32">
          <p className="font-bold text-white text-center">
            De que forma se reflete a modalidade espaciotemporal?
          </p>
        </div>
        <div className="col-span-2 mb-4"></div>

        <div className="col-span-4"></div>
        <div className="col-span-4">
          {resposta && <p className="text-white text-center">{resposta}</p>}
        </div>
        <div className="col-span-4"></div>

        <div className="col-span-4 items-center flex justify-end">
          {!showButton && (
            <form className="flex flex-row items-center justify-center mt-3">
              <Button
                type="button"
                value="Perceção da Mensagem no Espaço e no Tempo"
                onClick={handleFormSubmit}
                className=" me-3 ms-12 text-white bg-foreground hover:bg-hover"
              >
                Perceção da Mensagem no Espaço e no Tempo              </Button>
            </form>
          )}
        </div>
        <div className="col-span-4 flex justify-center items-center">
          <Image
            src="/img/chapter3/chapter3instax.svg"
            alt="Imagem de uma foto instantânea"
            width={300}
            height={300}
            className="rounded text-center"
            draggable={false}
          />
        </div>
        <div className="col-span-4 items-center flex justify-start">
          {!showButton && (
            <form className="flex flex-row items-center justify-center mt-3">
              <Button
                type="button"
                value="Tempo de Espera para Receber a Mensagem no Espaço"
                onClick={handleFormSubmit}
                className=" me-3 text-white bg-foreground hover:bg-hover"
              >
                Tempo para Receber a Mensagem no Espaço

              </Button>
            </form>
          )}
        </div>
        <div className="col-span-12 flex justify-center items-center">
          {showButton && (
            <motion.div
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              className="group"
            >
              <Button
                asChild
                className="text-white bg-foreground hover:bg-hover"
                onClick={SaveBadgeProgressAndGoToNextPage}
              >
                <Link href="/chapters/chapter3/14">
                  Continuar
                  <FaArrowRight className="ps-2 h-6 w-6 group-hover:moveRight" />
                </Link>
              </Button>
            </motion.div>
          )}
          {error && (
            <p className=" text-red-600 text-center text-sm">{error}</p>
          )}
        </div>
        <div className="fixed bottom-5 left-5">
          <TooltipProvider delayDuration={0}>
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
