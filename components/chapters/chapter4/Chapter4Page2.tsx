"use client";
import { BackLink } from "@/components/chapters/ChapterNav";
import React, { useState, useEffect, useRef } from "react";
import { useProgress } from "@/components/context/ProgressContext";
import { AnimatePresence, motion } from "framer-motion";
import { ease, enter } from "@/lib/motion";
import { Slider } from "@/components/ui/slider";
import { MdQuestionMark } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

//SLIDERS
import Slide0 from "./Slides/Slide0";
import Slide1 from "./Slides/Slide1";
import Slide2 from "./Slides/Slide2";
import Slide3 from "./Slides/Slide3";
import Slide4 from "./Slides/Slide4";

// Avançar = entra pela direita e sai pela esquerda; recuar = o inverso
const slideVariants = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: ease.outExpo } },
  exit: (dir: number) => ({ x: dir * -32, opacity: 0, transition: { duration: 0.15, ease: ease.outQuad } }),
};

export default function Chapter4Page2() {
  //DICA
  const Tip = "Arrasta o slider para veres mais informação.";

  //ESTADO DOS PONTOS E DO SLIDER
  const [currentSliderValue, setCurrentSliderValue] = useState(0);
  const [score, setScore] = useState(0);
  // Direção da navegação: 1 = avançar (entra pela direita), -1 = recuar (entra pela esquerda)
  const direction = useRef(1);

  //PROGRESS
  const { setProgress } = useProgress();

  useEffect(() => {
    //PROGRESS VALUE

    setProgress(25);
  }, [setProgress]);

  //GUARDAR A MUDANÇA DO VALOR DO SLIDER
  // A animação é interrompível, por isso o slider já não precisa de ficar bloqueado entre slides
  const handleSlideChange = (e: number[]) => {
    //MEXER NO SLIDER
    const newSlide = Number(e[0]);
    if (newSlide === currentSliderValue) return;
    direction.current = newSlide > currentSliderValue ? 1 : -1;

    //GUARDAR O VALOR ONDE PAROU
    setCurrentSliderValue(newSlide);

    //SE O UTILIZADOR TIVER MEXIDO O SLIDES, ESTE VAI SER SUPERIOR AOS SEUS PONTOS ATUAIS
    if (newSlide > score) {
      //GUARDA O PONTO
      setScore(score + 1);
    }

  };

  //COMPONENTE QUE VAI DAR RENDER
  let RenderComponent;

  //TODOS OS CASOS
  switch (currentSliderValue) {
    case 0:
      RenderComponent = <Slide0 />;
      break;

    case 1:
      RenderComponent = <Slide1 />;
      break;

    case 2:
      RenderComponent = <Slide2 />;
      break;

    case 3:
      RenderComponent = <Slide3 />;
      break;

    case 4:
      RenderComponent = <Slide4 />;
      break;
  }

  // Tooltip
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <div className="bg-chapter4BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1">
        <BackLink href="/chapters/chapter4/1" />
        <motion.div
          className="h-full col-span-2"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={enter}
        ></motion.div>
        <div className="h-full col-span-8 justify-center items-center flex overflow-hidden">
          <AnimatePresence mode="wait" custom={direction.current}>
            <motion.div
              key={currentSliderValue}
              custom={direction.current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {RenderComponent}
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.div
          className="h-full col-span-2"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={enter}
        ></motion.div>
      </div>
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
      <motion.div
        className="w-[50vh] fixed bottom-[20%] left-[50%] transform translate-x-[-50%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={enter}
      >
        <Slider
          className="w-full"
          max={4}
          min={0}
          step={1}
          defaultValue={[0]}
          onValueChange={(e) => {
            handleSlideChange(e);
          }}
        />
      </motion.div>
    </>
  );
}
