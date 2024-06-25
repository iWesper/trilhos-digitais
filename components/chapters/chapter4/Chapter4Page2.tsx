"use client";
import React, { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { motion } from "framer-motion";
import { debounce } from 'lodash';
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

export default function Chapter4Page2() {
  //DICA
  const Tip = "Arrasta o slider para veres mais informação.";

  //ESTADO DOS PONTOS E DO SLIDER
  const [currentSliderValue, setCurrentSliderValue] = useState(0);
  const [isSliderDisabled, setIsSliderDisabled] = useState(false);
  const [score, setScore] = useState(0);

  //PROGRESS
  const { setProgress } = useProgress();

  useEffect(() => {
    //PROGRESS VALUE

    setProgress(25);
  }, []);

  //GUARDAR A MUDANÇA DO VALOR DO SLIDER
  const handleSlideChange =  debounce((e: number[]) => {

    //MEXER NO SLIDER
    const newSlide = Number(e[0]);

    //GUARDAR O VALOR ONDE PAROU
    setCurrentSliderValue(newSlide);

    //SE O UTILIZADOR TIVER MEXIDO O SLIDES, ESTE VAI SER SUPERIOR AOS SEUS PONTOS ATUAIS
    if (newSlide > score) {
      //GUARDA O PONTO
      setScore(score + 1);
    }

    //DISABLE SLIDER
    setIsSliderDisabled(true);

    //ENABLE SLIDER
    setTimeout(() => setIsSliderDisabled(false), 3000);
  },300);

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

  return (
    <>
      <div className="bg-chapter4BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1">
        <Link
          href="/chapters/chapter4/1"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <motion.div
          className="h-full col-span-2"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="h-full col-span-8"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          {RenderComponent}
        </motion.div>
        <motion.div
          className="h-full col-span-2"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="h-full col-span-2 mb-14"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="h-full col-span-8 mb-14"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <Slider
            className="w-full"
            max={4}
            min={0}
            step={1}
            defaultValue={[0]}
            onValueChange={(e) => {handleSlideChange(e)}}
            disabled={isSliderDisabled}
          />
        </motion.div>
        <motion.div
          className="h-full col-span-2 mb-14"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>
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
    </>
  );
}
