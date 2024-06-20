"use client";
import React from "react";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { MdQuestionMark } from "react-icons/md";
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
import { Button } from "@/components/ui/button";

export default function Chapter1Page3() {
  //BADGE DO CAPÍTULO
  const badgeId = 1;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 50;

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(16.66 + 16.66);

  //GO TO
  const nextPage = "/chapters/chapter1/4";

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

  //TIP
  const Tip =
    "Parece que o palco esconde um segredo escondido algures, perguntamo-nos onde…";

  //FUNÇÃO QUE VAI GUARDAR O PROGRESSO DO BADGE NA BD E FAZER O ROUTER PUSH
  const SaveBadgeProgressAndGoToNextPage = () => {
    //PODE IR GUARDAR
    setProgressSave(true);
  };

  return (
    <>
      <div className="bg-chapter1BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12">
        <Link
          href="/chapters/chapter1/2"
          className="text-black absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-1"></div>
        <div className="col-span-5 flex flex-col justify-center items-center p-10 mt-20 ">
          <p className="font-medium mb-10">
            Segundo <span className="italic">Wagner</span>, com a queda de
            Atenas, as artes fragmentaram-se, separando a palavra, a música e a
            dança, e este defendia que para restaurar a harmonia na arte, estas
            artes deveriam ser unidas novamente, nascendo assim o conceito de{" "}
            <span className="italic">Gesamtkunstwerk</span>, ou “Obra Total”.
          </p>
          <p className="font-medium mb-10">
            Agora, vamos ver como <span className="italic">Wagner</span> colocou
            o seu conceito em prática? Interage com o palco que te é mostrado e
            vê a sua criação ganhar vida!
          </p>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-4 flex justify-center items-center">
          <Dialog>
            <DialogTrigger>
              <Image
                src="/img/chapter1/chapter1Teatro.svg"
                alt="Foto de um Teatro"
                width={600}
                height={600}
                className="rounded"
                priority={true}
                style={{ cursor: "pointer" }}
                draggable={false}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Partir para a próxima etapa</DialogTitle>
                <DialogDescription>Vamos continuar?</DialogDescription>
                <Button onClick={SaveBadgeProgressAndGoToNextPage}>Sim</Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="col-span-1"></div>
        <div className="fixed bottom-5 left-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MdQuestionMark className="text-black h-10 w-10 justify-start items-start " />
              </TooltipTrigger>
              <TooltipContent className="bg-foreground border-none shadow-none text-white">
                <p>{Tip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* <SpeakerWaveIcon className="text-black h-10 w-10 justify-end items-end absolute bottom-5 right-5" /> */}
      </div>

      {progressSave && progressSave == true && (
        <SaveBadgeProgressScript
          badgeId={badgeId}
          progress={percentage}
          nextPage={nextPage}
        />
      )}
    </>
  )
}
