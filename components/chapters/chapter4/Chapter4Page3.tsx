"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import SaveBadgeProgressScript from "../../../backend/SaveBadgeProgressScript";
import { Button } from "@/components/ui/button";

export default function Chapter4Page3() {
  //BADGE DO CAPÍTULO
  const badgeId = 4;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 50;
  //GO TO
  const nextPage = "/chapters/chapter4/4";

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

  //PROGRESS
  const { setProgress } = useProgress();

  useEffect(() => {
    //PROGRESS VALUE
    setProgress(25 + 25);
  }, []);

  //REF DO BOTÃO NÃO
  const buttonRef = useRef<HTMLButtonElement>(null);

  //FUNÇÃO QUE VAI FAZER MEXER O BOTÃO
  const MoveButton = () => {
    //SAVE BUTTON
    const Button = buttonRef.current;

    //ANIMAÇÃO
    if (Button) {
      //TRANSIÇÃO DO MOVIMENTO
      Button.style.transition = "left 0.2s, top 0.2s";

      //TAMANHO DO SCREEN
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      //TAMANHO DO BOTÃO
      const ButtonWidth = Button.offsetWidth;
      const ButtonHeight = Button.offsetHeight;

      //CALCULAR POSIÇÕES ALEATÓRIAS DENTRO DOS LIMITES DA TELA
      let newXValue = Math.random() * (screenWidth - ButtonWidth);
      let newYValue = Math.random() * (screenHeight - ButtonHeight);

      //LIMITAR A POSIÇÃO DO BOTÃO PARA QUE FIQE DENTRO DOS LIMITES DA TELA
      newXValue = Math.min(newXValue, screenWidth - ButtonWidth);
      newYValue = Math.min(newYValue, screenHeight - ButtonHeight);

      //APLICAR NOVA POSIÇÃO
      Button.style.position = "fixed";
      Button.style.left = `${newXValue}px`;
      Button.style.top = `${newYValue}px`;
    }
  };

  const SaveBadgeProgressAndGoToNextPage = () => {
    //PODE IR GUARDAR
    setProgressSave(true);
  };

  return (
    <>
      <div className="bg-chapter4BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <Link
          href="/chapters/chapter4/2"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col pt-20">
          <p className="text-white font-medium p-6 pb-8">
            Como pudeste ver, a evolução da comunicação tem sido constante, mas
            isso deixa-nos com uma pergunta.
          </p>
          <p className="text-white font-medium pb-8">
            A evolução e criação de tecnologia é inevitável?
          </p>
          <div className="flex">
            <Button
              className=" mx-4 text-white"
              onClick={SaveBadgeProgressAndGoToNextPage}
            >
              Sim
            </Button>
            <Button
              ref={buttonRef}
              onMouseEnter={MoveButton}
              tabIndex={-1}
              onClick={(e) => {if (e.detail === 0) {e.preventDefault()}}}  
              className=" mx-4 bg-[#142839] hover:bg-[#142839] text-white"
            >
              Não
            </Button>
          </div>
        </div>
        <div className="col-span-2"></div>
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
