"use client";
import React from "react";
import { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { MdQuestionMark } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";
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
import { useToast } from "@/components/ui/use-toast";
import SaveBadgeProgressScript from "../../../backend/SaveBadgeProgressScript";
import { useProgress } from "@/components/context/ProgressContext";

export default function Chapter1Page5() {

  //TOAST
  const { toast } = useToast();

  //AUTH Se for false tem badge, true não tem
  const { WillShowToast, willShowToastState, error } = useAuth();

  //BADGE DO CAPÍTULO
  const badgeId = 1;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 100;

  //GO TO
  const nextPage = "/chapters/chapter1/6";

  
  //CHAMAR A FUNÇÃO ONMOUNT
  useEffect(() => {

    WillShowToast(badgeId);

  }, []);

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(16.66 + 16.66 + 16.66 + 16.66);

  //ESTADO DA RESPOSTA
  const [resposta, setResposta] = useState<string | null>(null);

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

  //TIP
  const Tip = "Uma experiência para sempre melhor com uma caixa de pipocas.";

  //REPOSTAS FORM
  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    //PREVINE O FORM DE FAZER O DEFAULT
    e.preventDefault();

    //VALOR QUE VEM DE CADA BUTTON
    const resposta = (e.target as HTMLButtonElement).value;

    //VERIFICA SE A RESPOSTA ESTÁ CORRETA
    if (resposta === "Videojogos") {
      //STATE A MOSTRAR À PESSOA
      setResposta(
        "Não me parece que seja esta a evolução da “Obra Total”, tenta outra vez!"
      );
    } else if (resposta === "VR") {
      //STATE A MOSTRAR À PESSOA
      setResposta(
        "Não me parece que seja esta a evolução da “Obra Total”, tenta outra vez!"
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
      <div className="bg-chapter1BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12">
        <Link
          href="/chapters/chapter1/4"
          className="text-black absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-3"></div>
        <div className="col-span-6 flex items-center justify-end flex-col pb-10">
          <div>
            <h3 className="text-black text-center mb-5">
              Este conceito tornou-se o novo{" "}
              <span className="italic">standard</span> no teatro e,
              naturalmente, evoluiu para aquela que hoje é conhecida como a 7ª
              arte
            </h3>
            <p className="font-bold text-black text-center">
              Qual dos seguintes tipos de arte achas que representa esta
              evolução?
            </p>
          </div>
          {resposta && (
            <p className="text-black text-center mt-2">{resposta}</p>
          )}
        </div>
        <div className="col-span-3"></div>
        <div className="col-span-2"></div>
        <form className="col-span-8 items-start justify-center mt-3 grid grid-cols-8 grid-rows-1">
          <div className="col-span-2 flex justify-center items-center">
            <Button
              type="button"
              value="Videojogos"
              onClick={handleFormSubmit}
              className="w-full m-3"
            >
              Videojogos
            </Button>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-2 flex justify-center items-center w-full">
            <Dialog className="w-full">
              <DialogTrigger className="w-full">
                <Button
                  type="button"
                  value="Cinema"
                  className="w-full m-3"
                  onClick={() => {
                    if (willShowToastState) {
                      toast({
                        title: "Nova conquista registada.",
                        description: "Ganhaste o teu primeiro badge!",
                      });
                    }
                  }}
                >
                  Cinema
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full">
                <DialogHeader>
                  <DialogTitle>Exatamente, o cinema é a 7ª Arte!</DialogTitle>
                  <DialogDescription>Vamos continuar?</DialogDescription>
                  <Button
                    onClick={SaveBadgeProgressAndGoToNextPage}
                    className="w-full"
                  >
                    Sim
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-2 flex justify-center items-center">
            <Button
              type="button"
              value="VR"
              onClick={handleFormSubmit}
              className="w-full m-3"
            >
              VR
            </Button>
          </div>
        </form>
        {error && (<p className=" text-red-600 text-center text-sm">{error}</p>)}
        <div className="col-span-2"></div>
        <div className="fixed bottom-5 left-5">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="cursor-help">
                <MdQuestionMark className="text-black h-10 w-10 justify-start items-start " />
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
