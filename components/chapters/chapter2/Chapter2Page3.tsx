"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { auth } from "../../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import { useRouter } from "next/navigation";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { Button } from "@/components/ui/button";
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

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//HOOK QUE PERMITE RECEBER OS DADOS DO ELEMENTO ARRASTADO
import { useDrop } from "react-dnd";
import Picture from "./Design_Espremedor_Drop";

//IMAGENS DO TESTE
import testimg1 from "@/public/img/chapter2/chapter2frutas_morango.svg";
import testimg2 from "@/public/img/chapter2/chapter2frutas_maca.svg";
import testimg3 from "@/public/img/chapter2/chapter2frutas_laranja.svg";
import correctimg from "@/public/img/chapter2/chapter2frutas_laranjapartida.svg";

export default function Chapter2Page3() {
  //LISTA DE ELEMENTOS ARRASTÁVEIS
  //AQUI, URL É A LOCALIZAÇÃO
  const PictureList = [
    {
      id: 1,
      url: testimg1,
    },
    {
      id: 2,
      url: testimg2,
    },
    {
      id: 3,
      url: testimg3,
    },
  ];

  //OBJETO DA IMAGEM CORRETA
  const CorrectPic = [
    {
      id: 3,
      url: correctimg,
    },
  ];

  const router = useRouter();

  //USER ID
  const [UserId, setUserId] = useState<string | null>(null);

  const [showDialog, setShowDialog] = useState<boolean>(false);

  //LOADING
  const [loading, setLoading] = useState<boolean>(true);

  //PROGRESS
  const { setProgress } = useProgress();

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);
  
  //BADGE DO CAPÍTULO
  const badgeId = 2;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 25;

  //GO TO
  const nextPage = "/chapters/chapter2/4";

  //DICA
  const Tip = "Pareces ter sede, que tal um copo de sumo?";

  //STATE ATUALIZÁVEL COM OS ELEMENTOS QUE LÁ ESTÃO
  const [board, setBoard] = useState<{ id: number; url: any }[]>([]);

  //FUNÇÃO QUE ATUALIZA O STATE DO BOARD PARA QUE ELE MOSTRE O QUE LÁ FOI POSTO
  const addImageToBoard = (id: number) => {
    //SE O ID FOR O CORRETO, ALTERA PARA A IMAGEM DA LARANJA CORTADA
    if (id === 3) {
      //ATUALIZA O BOARD COM A IMAGEM DA LARANJA
      setBoard([CorrectPic[0]]);

      //SALVA O PROGRESSO
      setShowDialog(true);
    } else {
      //IR BUSCAR À LISTA DE ELEMENTOS DISPONÍVEIS, AQUELE QUE TEM O ID IGUALZINHO
      const PictureListCopy = PictureList.filter(
        (picture) => id === picture.id
      );

      //ATUALIZAR O BOARD COM TODOS OS ELEMENTOS LÁ POSTOS
      //setBoard((board) => [...board, PictureListCopy[0]]);

      //SE SÓ QUISERMOS UM ELEMENTO, COLOCA-SE AQUI
      setBoard([PictureListCopy[0] as { id: number; url: any }]);
    }
  };

  //ARROW FUNCTION QUE LIMPA A TENTATIVA
  const clearBoard = () => {
    //STATE RESET
    setBoard([]);

    setShowDialog(false);
  };

  //FUNÇÃO DE VALIDAÇÃO DO ID COLOCADO DENTRO DA ZONA DO DROP
  const validateId = (id: number) => {
    //VALOR ESTABELECIDO COMO CORRETO. A.K.A Laranja
    const correctId = 3;

    //MENSAGEM DE VALIDAÇÃO
    return id === correctId
      ? ""
      : "Não é bem esse o fruto que queremos. Tenta outra vez!";
  };

  //VAI BUSCAR O USER ID QUANDO MONTA
  useEffect(() => {
    //SAVE USER
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        //SAVE
        setUserId(currentUser.uid);

        if (UserId) {
          //PROGRESS VALUE
          setProgress(20);
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
        <Lottie
          animationData={animationData}
          className="bg-foreground h-20 w-20 "
        />
      </div>
    );
  }

  //COMPONENTE QUE RECEBE OS ELEMENTOS ARRASTÁVEIS. TEM DE SER COMPONENTE PARA ACEDER A UM CONTEXT
  function DropArea({
    addImageToBoard,
    board,
    validateId,
  }: {
    addImageToBoard: (id: number) => void;
    board: { id: number; url: any }[];
    validateId: (id: number) => string;
  }) {
    //REFERÊNCIA PARA O ELEMENTO QUE VAI RECEBER OS ELEMENTOS ARRASTÁVEIS
    const dropRef = useRef<HTMLDivElement>(null);

    //HOOK QUE PERMITE RECEBER OS DADOS DO ELEMENTO ARRASTADO
    const [{ isOver }, drop] = useDrop(() => ({
      //TIPO DE ELEMENTO QUE PODE SER ARRASTADO
      accept: "image",

      //FUNÇÃO QUE É CHAMADA QUANDO O ELEMENTO É SOLTADO
      drop: (item: any) => addImageToBoard(item.id),

      //A PARTIR DAQUI SABE SE SOLTOU OU NÃO
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    //ADICIONA A REFERÊNCIA AO ELEMENTO
    drop(dropRef);

    //CONSTRÓI A ÁREA
    return (
      <div
        ref={dropRef}
        className="bg-espremedorBG w-1/2 h-full bg-origin-border bg-center bg-no-repeat bg-cover flex flex-col justify-start items-start"
      >
        {board.map((picture) => {
          return <Picture url={picture.url} id={picture.id} />;
        })}
      </div>
    );
  }
  //FUNÇÃO QUE VAI GUARDAR O PROGRESSO DO BADGE NA BD E FAZER O ROUTER PUSH
  const SaveBadgeProgressAndGoToNextPage = () => {
    //PODE IR GUARDAR
    setProgressSave(true);
  };

  return UserId ? (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1">
        <Link
          href="/chapters/chapter2/2"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-7 h-full flex flex-col justify-center p-10 text-white ">
          <p className="font-medium mb-4 pt-8">
            Hm, que design interessante, e parece que é utilizado em conjunto
            com outros objetos, pergunto-me para que serve.
          </p>
          <p className="font-medium pb-10">
            Arrasta-os para o objeto e vamos descobrir como funciona.
          </p>
          <div className="flex flex-row">
            {PictureList.map((picture) => {
              return <Picture url={picture.url} id={picture.id} />;
            })}
          </div>
          <Button
            onClick={clearBoard}
            className="text-white flex flex-row mt-4 mx-auto"
          >
            Limpar Tentativa
          </Button>
          {board.map((picture) => {
            return (
              <p className="text-white font-medium mt-2">
                {validateId(picture.id)}
              </p>
            );
          })}
          {showDialog && (
            <Dialog>
              <DialogTrigger>
                <Button className="text-white">Continuar</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Exatamente! Esse é o fruto mais aparente para utilizar com
                    este objeto. Muito bem!
                  </DialogTitle>
                  <DialogDescription>Vamos continuar?</DialogDescription>
                  <Button onClick={SaveBadgeProgressAndGoToNextPage}>
                    Sim
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="col-span-5 h-full justify-center items-center flex flex-col">
          <DropArea
            addImageToBoard={addImageToBoard}
            board={board}
            validateId={validateId}
          />
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
        {/* <SpeakerWaveIcon className="text-white h-10 w-10 justify-end items-end absolute bottom-5 right-5" /> */}
      </div>

      {progressSave && progressSave === true && (
        <SaveBadgeProgressScript
          badgeId={badgeId}
          progress={percentage}
          nextPage={nextPage}
        />
      )}
    </DndProvider>
  ) : (
    router.push("/")
  );
}
