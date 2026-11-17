"use client";
import { BackLink, NextButton } from "@/components/chapters/ChapterNav";
import React, { useEffect } from "react";
import { useState } from "react";
import { MdQuestionMark } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";

export default function Chapter3Page13() {
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
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
        7.1428571428571428571428571428571
    );
  }, [setProgress]);

  //ESTADO DA RESPOSTA
  const [resposta, setResposta] = useState<string | null>(null);

  //MOSTRA O BOTÃO
  const [showButton, setShowButton] = useState<boolean>(false);

  //TIP
  const Tip = "Lembra-te que estas são interações que tu sentes.";

  //REPOSTAS FORM
  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    //PREVINE O FORM DE FAZER O DEFAULT
    e.preventDefault();

    //VALOR QUE VEM DE CADA BUTTON
    const resposta = (e.target as HTMLButtonElement).value;

    //VERIFICA SE A RESPOSTA ESTÁ CORRETA
    if (resposta === "Sensorial") {
      //STATE A MOSTRAR À PESSOA
      setResposta("Exatamente! Vamos a mais uma pergunta.");

      //MOSTRA O CONTINUAR
      setShowButton(true);
    } else if (resposta === "Semiótica") {
      //STATE A MOSTRAR À PESSOA
      setResposta("Não nos parece ser a modalidade certa, anda tenta de novo.");
    } else if (resposta === "Material") {
      setResposta("Não nos parece ser a modalidade certa, anda tenta de novo.");
    }
  };
  // Tooltip
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <div className="bg-chapter3BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12">
        <BackLink href="/chapters/chapter3/12" />
        <div className="col-span-2 mt-24 mb-4"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="flex items-end justify-center col-span-8 mt-10 pt-20"
        >
          <p className="font-bold text-white text-center">
            Qual modalidade que se refere a como os{" "}
            <span className="italic text-foreground">media</span> interagem com os nossos orgãos
            como os olhos, ouvidos, entre outros?
          </p>
        </motion.div>
        <div className="col-span-2"></div>

        <div className="col-span-4"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="col-span-4 flex flex-col justify-end items-center"
        >
          {resposta && (
            <p className="text-white text-center text-sm xl:text-xl">{resposta}</p>
          )}
          <Image
            src="/img/chapter3/chapter3folhear.svg"
            alt="Imagem de um livro"
            width={300}
            height={300}
            className="rounded text-center"
            draggable={false}
          />
        </motion.div>
        <div className="col-span-4"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="col-span-12 flex justify-center items-center"
        >
          {!showButton && (
            <form className="flex flex-row items-center justify-center">
              <motion.div
                whileHover={hover}
                className="cursor-pointer"
              >
                <Button
                  type="button"
                  value="Material"
                  className="text-white bg-[#142839] hover:bg-hover m-5"
                  onClick={handleFormSubmit}
                >
                  Material
                </Button>
              </motion.div>
              <motion.div
                whileHover={hover}
                className="cursor-pointer"
              >
                <Button
                  type="button"
                  value="Sensorial"
                  className="text-white bg-[#142839] hover:bg-hover m-5"
                  onClick={handleFormSubmit}
                >
                  Sensorial
                </Button>
              </motion.div>
              <motion.div
                whileHover={hover}
                className="cursor-pointer"
              >
                <Button
                  type="button"
                  value="Semiótica"
                  className="text-white bg-[#142839] hover:bg-hover m-5"
                  onClick={handleFormSubmit}
                >
                  Semiótica
                </Button>
              </motion.div>
            </form>
          )}

          {showButton && (
            <NextButton href="/chapters/chapter3/14" className="text-white bg-[#142839] hover:bg-hover" />
          )}
        </motion.div>
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
    </>
  );
}
