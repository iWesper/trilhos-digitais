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

  // Tooltip
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <div className="bg-chapter3BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12">
        <Link
          href="/chapters/chapter3/13"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>

        {!showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center col-span-12 mt-32"
          >
            <div className="col-span-2 mb-4"></div>
            <p className="font-bold text-white text-center">
              De que forma se reflete a modalidade espaciotemporal?
            </p>
            <div className="col-span-2 mb-4"></div>
          </motion.div>
        )}

        <div className="col-span-1"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="col-span-3 items-center flex justify-center lg:justify-end lg:mb-40"
        >
          {!showButton && (
            <form className="flex flex-row items-center justify-center mt-3 ms-3 max-w-full">
              <Button
                type="button"
                value="Perceção da Mensagem no Espaço e no Tempo"
                onClick={handleFormSubmit}
                className=" me-3 py-6 px-8 text-wrap text-white bg-[#142839] hover:bg-hover max-w-full"
              >
                Perceção da Mensagem no Espaço e no Tempo
              </Button>
            </form>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`col-span-4 flex flex-col justify-start items-center ${
            showButton ? "mt-28" : ""
          }`}
        >
          {resposta && (
            <p className="text-white text-center pb-4">{resposta}</p>
          )}
          <Image
            src="/img/chapter3/chapter3instax.svg"
            alt="Imagem de uma foto instantânea"
            width={300}
            height={300}
            className="rounded text-center max-h-full"
            draggable={false}
          />
          {showButton && (
            <motion.div
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              className="group p-4"
            >
              <Button
                asChild
                className="text-white bg-[#142839] hover:bg-hover"
                onClick={SaveBadgeProgressAndGoToNextPage}
              >
                <Link href="/chapters/chapter3/14">
                  Continuar
                  <FaArrowRight className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-all duration-150" />
                </Link>
              </Button>
            </motion.div>
          )}
          {error && (
            <p className=" text-red-600 text-center text-sm">{error}</p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="col-span-3 items-center flex justify-center lg:justify-start lg:mb-40"
        >
          {!showButton && (
            <form className="flex flex-row items-center justify-center mt-3 max-w-full">
              <Button
                type="button"
                value="Tempo de Espera para Receber a Mensagem no Espaço"
                onClick={handleFormSubmit}
                className=" me-3 py-6 px-8 text-wrap text-white bg-[#142839] hover:bg-hover max-w-full"
              >
                Tempo para Receber a Mensagem no Espaço
              </Button>
            </form>
          )}
        </motion.div>
        <div className="col-span-1"></div>
        <div className="fixed bottom-5 left-5">
          <TooltipProvider delayDuration={0}>
            <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
              <TooltipTrigger className="cursor-help" onClick={toggleTooltip}>
                <MdQuestionMark className="text-white h-10 w-10 justify-start items-start" />
              </TooltipTrigger>
              <TooltipContent
                className="bg-[#142839] border-none shadow-none text-white"
                sideOffset={5}
              >
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
