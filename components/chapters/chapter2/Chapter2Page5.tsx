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
import { MdQuestionMark } from "react-icons/md";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import SaveBadgeProgressScript from "../../../backend/SaveBadgeProgressScript";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//HOOK QUE PERMITE RECEBER OS DADOS DO ELEMENTO ARRASTADO
import { useDrop } from "react-dnd";
import PictureStack from "./Design_Cadeiras_Drop";

import testimg1 from "@/public/img/chapter2/chair1.svg";
import testimg2 from "@/public/img/chapter2/chair2.svg";
import testimg3 from "@/public/img/chapter2/chair3.svg";

export default function Chapter2Page5() {
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

  const router = useRouter();

  //USER ID
  const [UserId, setUserId] = useState<string | null>(null);

  //LOADING
  const [loading, setLoading] = useState<boolean>(true);

  //PROGRESS
  const { setProgress } = useProgress();

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

  //BADGE DO CAPÍTULO
  const badgeId = 2;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 50;

  //GO TO
  const nextPage = "/chapters/chapter2/6";

  //PROGRESS VALUE
  setProgress(16.66);

  //DICA
  const Tip = "Um por cima do outro, como arrumar a casa";

  const [PictureListCopy, setPictureListCopy] = useState([...PictureList]);

  //STATE DA ÁREA DAS IMAGENS
  const [board, setBoard] = useState<{ id: number; url: any }[]>([]);

  //FEEBACK CERTO OU ERRADO
  const [orderMessage, setOrderMessage] = useState("");

  //ID
  const [draggingId, setDraggingId] = useState(0);

  //ORDEM CORRETA DE IMAGENS
  const correctOrder = [3, 2, 1];

  //AO CLIQUE PARA ARRASTAR
  const handleMouseDown = (id: number) => {
    //SAVE ID
    setDraggingId(id);
  };

  //FUNÇÃO QUE ATUALIZA O STATE DO BOARD PARA QUE ELE MOSTRE O QUE LÁ FOI POSTO
  const addImageToBoard = (id: number) => {
    //PROCURA A IMAGEM PELO ID
    const picture = PictureListCopy.find((picture) => picture.id === id);

    //SE EXISTIR
    if (picture) {
      //ADICIONA A IMAGEM AO BOARD
      setBoard([...board, picture]);

      //CÓPIA
      const newPictureListCopy = [...PictureListCopy];

      //REMOVE A IMAGEM DA LISTA
      newPictureListCopy.splice(
        newPictureListCopy.findIndex((picture) => picture.id === id),
        1
      );

      //MOSTRA AS IMAGENS SEM ELA
      setPictureListCopy(newPictureListCopy);
    }
  };

  //VER SE FORAM ADICONADAS DA FORMA CORRETA
  const checkOrder = () => {
    //GUARDAR A ORDEM ATUAL
    const currentOrder = board.map((picture) => picture.id);

    //SE A ORDEM ATUAL NÃO TIVER 3 DIGITOS
    if (currentOrder.length !== 3) {
      //MENSAGEM
      setOrderMessage("Tens de adicionar 3 elementos para verificar a ordem.");
    } else {
      //VERIFICAR QUANTOS ESTÃO BEM
      let correctCount = 0;

      //PERCORRE A ORDEM ATUAL
      for (let i = 0; i < 3; i++) {
        //QUANDO COINCIDIR
        if (currentOrder[i] === correctOrder[i]) {
          //NÚMERO DE ACERTOS
          correctCount++;
        }
      }

      //MENSAGEM
      let message;

      //CONSOANTE AS VEZES QUE ACERTOU
      switch (correctCount) {
        case 1:
          message = "Acertaste 1!";
          break;
        case 2:
          message = "Acertaste 2!";
          break;
        case 3:
          message = "Acertaste todos!";

          //SALVA O PROGRESSO
          setProgressSave(true);
          break;
        default:
          message = "Não acertaste nenhum.";
      }

      //MENSAGEM DE FEEDBACK
      setOrderMessage(message);
    }
  };

  //LIMPAR TENTATIVA
  const clearBoard = () => {
    setBoard([]);
    setOrderMessage("");
    setPictureListCopy([...PictureList]);
  };

  //VER A ORDEM
  useEffect(() => {
    if (board.length === 3) {
      checkOrder();
    }
  }, [board]);

  //COMPONENTE DENTRO DE COMPONENTE PARA TER CONTEXT
  function DroppingArea({
    addImageToBoard,
    board,
    checkOrder,
  }: {
    addImageToBoard: (id: number) => void;
    board: { id: number; url: any }[];
    checkOrder: () => void;
  }): JSX.Element {
    //REF PARA O DROP
    const dropRef = useRef<HTMLDivElement>(null);

    //SABER SE EStÁ A ARRASTAR
    const [{ isOver: isOver }, drop] = useDrop({
      //TIPO ACEITO
      accept: "image",

      //FUNÇÃO CHAMADA QUANDO O ELEMENTO É SOLTADO
      //A BOARD FICA COM O QUE LÁ ESTAVA MAIS O NOVO
      drop: (item: any) => {
        //SE TIVER MENOS DE 3
        if (board.length < 3) {
          //ADICIONA MAIS
          addImageToBoard(draggingId);
        } else {
          //SE TIVER 3 OU MAIS
          setOrderMessage(
            "Só podes adicionar 3 elementos. Limpa a tua tentativa e tenta de novo."
          );
        }
      },
      //A PARTIR DAQUI SABE SE SOLTOU OU NÃO
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    //ADICIONA A REFERÊNCIA
    drop(dropRef);

    //ÁREA
    return (
      <div
        ref={dropRef}
        className="w-full h-full border-4 border-white flex flex-col items-center justify-center relative"
      >
        {board.length > 0 &&
          board.map((picture) => {
            return (
              <div className="absolute top-0">
                <Image src={picture.url} alt="Imagem da cadeira da Bauhaus" />
              </div>
            );
          })}
      </div>
    );
  }

  //VAI BUSCAR O USER ID QUANDO MONTA
  useEffect(() => {
    //SAVE USER
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        //SAVE
        setUserId(currentUser.uid);

        if (UserId) {
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

  return UserId ? (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  p-4">
        <Link
          href="/chapters/chapter2/4"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col pt-20">
          <p className="text-white font-medium p-6">
            Tal como o espremedor, o design destes bancos foi pensado de modo
            que sigam principalmente o funcionamento para poupar espaço numa
            divisão.
          </p>
          <p className="text-white font-medium">
            Arruma-os para ver como funcionam.
          </p>
        </div>
        <div className="col-span-2"></div>

        <div className="col-span-2 mt-6">
        <Button className="text-white text-center" onClick={clearBoard}>
            Limpar Tentativa
          </Button>
        </div>
        <div className="col-span-8 flex flex-col items-center justify-center">
          <DroppingArea
            addImageToBoard={addImageToBoard}
            board={board}
            checkOrder={checkOrder}
          />
        </div>
        <div className="col-span-2 flex flex-row justify-center items-center">
          {PictureListCopy.map((picture) => {
            return (
              <PictureStack
               
                url={picture.url}
                id={picture.id}
                onMouseDown={handleMouseDown}
              />
            );
          })}
            <p className="text-white font-medium mb-2">{orderMessage}</p>
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
        <SpeakerWaveIcon className="text-white h-10 w-10 justify-end items-end absolute bottom-5 right-5" />
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