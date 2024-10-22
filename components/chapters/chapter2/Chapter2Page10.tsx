"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import SaveBadgeProgressScript from "../../../backend/SaveBadgeProgressScript";
import { Button } from "@/components/ui/button";
import { MdQuestionMark } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

//HOOK QUE PERMITE RECEBER OS DADOS DO ELEMENTO ARRASTADO
import { useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PicturePhones from "./Design_Telemoveis_Drop";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/context/AuthContext";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

import testimg1 from "@/public/img/chapter2/Phone1.svg";
import testimg2 from "@/public/img/chapter2/Phone2.svg";
import testimg3 from "@/public/img/chapter2/Phone3.svg";
import testimg4 from "@/public/img/chapter2/Phone4.svg";

interface Picture {
  id: number;
  url: string;
}

export default function Chapter2Page10() {
  //TOAST
  const { toast } = useToast();

  //AUTH Se for false tem badge, true não tem
  const { WillShowToast, willShowToastState, error } = useAuth();

  //LISTA DE ELEMENTOS ARRASTÁVEIS
  //AQUI, URL É A LOCALIZAÇÃO
  const PictureList = [
    {
      id: 1,
      url: testimg1,
    },
    {
      id: 2,
      url: testimg3,
    },
    {
      id: 3,
      url: testimg2,
    },
    {
      id: 4,
      url: testimg4,
    },
  ];

  //STATE ATUALIZÁVEL COM OS ELEMENTOS QUE LÁ ESTÃO
  const [board, setBoard] = useState<Picture[]>([]);

  //SEGUNDA BOARD
  const [board2, setBoard2] = useState<Picture[]>([]);

  //TERCEIRA BOARD
  const [board3, setBoard3] = useState<Picture[]>([]);

  //QUARTA BOARD
  const [board4, setBoard4] = useState<Picture[]>([]);

  //FEEBACK CERTO OU ERRADO
  const [orderMessage, setOrderMessage] = useState<string>("");

  //IMAGEM ARRASTADA
  const draggingItemRef = useRef<number | null>(null);
  const sourceBoardRef = useRef<number | null>(null);
  const sourceBoardCopyRef = useRef<Picture[]>([]);
  const TargetBoardCopyRef = useRef<Picture[]>([]);
  const boardsRef = useRef<{ [key: number]: Picture[] }>({});
  //ESTADO INICIAL DAS BOARDS
  useEffect(() => {
    setBoard([PictureList[0]]);
    setBoard2([PictureList[1]]);
    setBoard3([PictureList[2]]);
    setBoard4([PictureList[3]]);
  }, []);

  //BOARDS POSSÍVEIS
  const boards: Record<number, Picture[]> = {
    0: board,
    2: board2,
    3: board3,
    4: board4,
  } as Record<number, Picture[]>;

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(90);

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

  //SHOW BUTTON
  const [showContinuar, setshowContinuar] = useState<boolean>(false);

  //CONTENT
  const [PContent, setPcontent] = useState<JSX.Element>(
    <>Por fim, e resumindo o que aprendemos, podemos concluir que o design não segue apenas a função ou o significado, mas ambos! Para isso, vamos dar-te um minijogo baseado num objeto com o qual estamos super habituados: o telemóvel!
    <p>Coloca-os na ordem correta do mais antigo para o mais recente.</p>
    </>
  );

  //BADGE DO CAPÍTULO
  const badgeId = 2;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 100;

  //PRÓXIMA PÁGINA
  const nextPage = "/chapters/chapter2/11";

  //MENSAGEM A ESCREVER
  let message = "";

  useEffect(() => {
    WillShowToast(badgeId);
  }, []);

  //DICA
  const Tip = "Arrasta os telemóveis entre as caixas onde estão para os ordenares.";

  const SaveBadgeProgressAndGoToNextPage = () => {
    //SAVE PROGRESS
    setProgressSave(true);
  };

  //HANDLE DRAG
  const handleDragStart = (item: Picture[]) => {
    //FAZ UMA CÓPIA DE TODAS AS BOARDS
    boardsRef.current = {
      0: [...board],
      2: [...board2],
      3: [...board3],
      4: [...board4],
    };

    //GUARDA O QUE ESTÁ A SER ARRASTADO
    draggingItemRef.current = item[0].id;

    //BOARD INICIAL
    if (
      sourceBoardRef.current !== null &&
      sourceBoardCopyRef.current !== undefined &&
      board.find((picture) => picture.id === item[0].id)
    ) {
      sourceBoardRef.current = 2 as number;
    } else if (board3.find((picture) => picture.id === item[0].id)) {
      sourceBoardRef.current = 3 as number;
    } else if (board4.find((picture) => picture.id === item[0].id)) {
      sourceBoardRef.current = 4 as number;
    } else {
      sourceBoardRef.current = 0 as number;
    }

    //CÓPIA DA BOARD INICIAL
    sourceBoardCopyRef.current = [...boards[sourceBoardRef.current]];
  };

  //Handle DROP
  const handleDrop = (TargetBoard: number) => {
    //FAZ LOGO CÓPIA, COM BASE NA CÓPIA
    TargetBoardCopyRef.current = [...boardsRef.current[TargetBoard]];

    //SE TIVER UM ITEM
    if (
      draggingItemRef.current &&
      sourceBoardCopyRef.current.length !== TargetBoard
    ) {
      //CHAMA ADD TO BOARD
      addImageToBoard(draggingItemRef.current, TargetBoard);
    }
  };

  //FUNÇÃO QUE ATUALIZA O STATE DO BOARD PARA QUE ELE MOSTRE O QUE LÁ FOI POSTO
  const addImageToBoard = (id: number, TargetBoard: number) => {
    type SetBoardFunction = React.Dispatch<React.SetStateAction<Picture[]>>;
    //UPDATES DAS BOARDS
    const setBoards: { [index: number]: SetBoardFunction } = {
      0: setBoard,
      2: setBoard2,
      3: setBoard3,
      4: setBoard4,
    };

    //PROCURA O INDEX
    const sourceItemIndex = sourceBoardCopyRef.current.findIndex(
      (item) => item.id === id
    );

    //INDEX DE TARGET BOARD
    const targetItemIndex = TargetBoardCopyRef.current.findIndex(
      (item) => item.id === id
    );

    //SE NÂO EXISTIR EM TARGET E EXISTIR EM SOURCE
    if (sourceItemIndex !== -1 && targetItemIndex === -1) {
      //GUARDA O ITEM
      const [sourceItem] = sourceBoardCopyRef.current.splice(
        sourceItemIndex,
        1
      );
      const [targetItem] = TargetBoardCopyRef.current.splice(
        targetItemIndex,
        1
      );

      //ITEM DO TARGET NO SOURCE
      sourceBoardCopyRef.current.push(targetItem);

      //COLOCA NA NOVA BOARD
      setBoards[TargetBoard]([...TargetBoardCopyRef.current, sourceItem]);

      //ATUALIZA A SOURCE BOARD
      if (sourceBoardRef.current !== null) {
        setBoards[sourceBoardRef.current](sourceBoardCopyRef.current);
      }
      //LIMPAR VALOR
      draggingItemRef.current = null;
      sourceBoardRef.current = null;
    }
  };

  //ORDEM DEFINIDA COMO CORRETA USANDO IDs
  const correctOrder = [3, 4, 2, 1];

  //COMPARAR
  useEffect(() => {
    //VER ORDEM
    const allBoardsHaveOnePicture =
      board.length === 1 &&
      board2.length === 1 &&
      board3.length === 1 &&
      board4.length === 1;

    //ORDEM ATUAL COM UM sÓ ARRAY
    const currentOrder = [
      board.map((picture) => picture.id),
      board2.map((picture) => picture.id),
      board3.map((picture) => picture.id),
      board4.map((picture) => picture.id),
    ].flat();

    //COMPARAR OS ARRAYS
    const correctPositions = currentOrder.filter(
      (value, index) => value === correctOrder[index]
    ).length;

    //NÚMERO DE IMAGENS NA POSIÇÃO CORRETA
    if (correctPositions == 4) {
      message = "Acertaste, parabéns!";

      if (willShowToastState === true) {
        toast({
          title: "Nova conquista registada.",
          description: "Ganhaste o teu segundo badge!",
        });
      }

      setPcontent(
        <>O telemóvel é um objeto que sofreu enormes alterações no seu design ao longo do tempo, deixando de ser algo apenas funcional, mas com alguns, como o iPhone, tornando-se também um símbolo, representando perfeitamente aquele que é o pico do design, e como este segue tanto a função como o significado (<span className="italic text-secondary">Form Follows It All</span>).</>
      );

      setshowContinuar(true);
    }
    //STATE DO FEEDBACK
    setOrderMessage(message);
  }, [board, board2, board3, board4]);

  //DROP AREAS
  function DropAreas({
    addImageToBoard,
    board,
    board2,
    board3,
    board4,
  }: {
    addImageToBoard: (id: number, TargetBoard: number) => void;
    board: Picture[];
    board2: Picture[];
    board3: Picture[];
    board4: Picture[];
  }) {
    //REFERÊNCIA PARA DROP
    const dropRef = useRef<HTMLDivElement>(null);
    const dropRef2 = useRef<HTMLDivElement>(null);
    const dropRef3 = useRef<HTMLDivElement>(null);
    const dropRef4 = useRef<HTMLDivElement>(null);

    //SABER SE AINDA ESTÁ A ARRASTAR
    const [{ isOver }, drop] = useDrop(() => ({
      //TIPO QUE É ACEITE, DEFINIDO NO PICTURE
      accept: "image",

      //FUNÇÃO CHAMADA QUANDO O ELEMENTO É SOLTADO
      drop: () => handleDrop(0),

      //A PARTIR DAQUI SABE SE SOLTOU OU NÃO
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    //SABER SE AINDA ESTÁ A ARRASTAR
    const [{ isOver2 }, drop2] = useDrop(() => ({
      //TIPO QUE É ACEITE, DEFINIDO NO PICTURE
      accept: "image",

      //FUNÇÃO CHAMADA QUANDO O ELEMENTO É SOLTADO
      drop: () => handleDrop(2),

      //A PARTIR DAQUI SABE SE SOLTOU OU NÃO
      collect: (monitor) => ({
        isOver2: !!monitor.isOver(),
      }),
    }));

    //SABER SE AINDA ESTÁ A ARRASTAR
    const [{ isOver3 }, drop3] = useDrop(() => ({
      //TIPO QUE É ACEITE, DEFINIDO NO PICTURE
      accept: "image",

      //FUNÇÃO CHAMADA QUANDO O ELEMENTO É SOLTADO
      drop: () => handleDrop(3),

      //A PARTIR DAQUI SABE SE SOLTOU OU NÃO
      collect: (monitor) => ({
        isOver3: !!monitor.isOver(),
      }),
    }));

    //SABER SE AINDA ESTÁ A ARRASTAR
    const [{ isOver4 }, drop4] = useDrop(() => ({
      //TIPO QUE É ACEITE, DEFINIDO NO PICTURE
      accept: "image",

      //FUNÇÃO CHAMADA QUANDO O ELEMENTO É SOLTADO
      drop: () => handleDrop(4),

      //A PARTIR DAQUI SABE SE SOLTOU OU NÃO
      collect: (monitor) => ({
        isOver4: !!monitor.isOver(),
      }),
    }));

    drop(dropRef);
    drop2(dropRef2);
    drop3(dropRef3);
    drop4(dropRef4);

    return (
      <>
        <div
          ref={dropRef}
          className="cursor-pointer w-full h-full flex justify-center items-center rounded-xl backdrop-blur-sm bg-gray-800 bg-opacity-80 col-span-2"
        >
          {board.map((picture, index) => {
            return (
              <motion.div
                key={picture.id}
                initial={{ y: 0 }}
                animate={{ y: index * 100 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <PicturePhones
                  url={picture.url}
                  id={picture.id}
                  onDragStart={handleDragStart}
                  board={board}
                />
              </motion.div>
            );
          })}
        </div>
        <div
          ref={dropRef2}
          className="cursor-pointer w-full h-full flex justify-center items-center rounded-xl backdrop-blur-sm bg-gray-800 bg-opacity-80 col-span-2"
        >
          {board2.map((picture, index) => {
            return (
              <motion.div
                key={picture.id}
                initial={{ y: 0 }}
                animate={{ y: index * 100 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <PicturePhones
                  url={picture.url}
                  id={picture.id}
                  onDragStart={handleDragStart}
                  board={board2}
                />
              </motion.div>
            );
          })}
        </div>
        <div
          ref={dropRef3}
          className="cursor-pointer w-full h-full flex justify-center items-center rounded-xl backdrop-blur-sm bg-gray-800 bg-opacity-80 col-span-2"
        >
          {board3.map((picture, index) => {
            return (
              <motion.div
                key={picture.id}
                initial={{ y: 0 }}
                animate={{ y: index * 100 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <PicturePhones
                  url={picture.url}
                  id={picture.id}
                  onDragStart={handleDragStart}
                  board={board3}
                />
              </motion.div>
            );
          })}
        </div>
        <div
          ref={dropRef4}
          className="cursor-pointer w-full h-full flex justify-center items-center  rounded-xl backdrop-blur-sm bg-gray-800 bg-opacity-80 col-span-2"
        >
          {board4.map((picture, index) => {
            return (
              <motion.div
                key={picture.id}
                initial={{ y: 0 }}
                animate={{ y: index * 100 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <PicturePhones
                  url={picture.url}
                  id={picture.id}
                  onDragStart={handleDragStart}
                  board={board4}
                />
              </motion.div>
            );
          })}
        </div>
      </>
    );
  }
  // Tooltip
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-chapter2BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center gap-4">
        <Link
          href="/chapters/chapter2/9"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col mt-10 pt-20">
          <p className="text-white font-medium pb-8">{PContent}</p>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-2"> </div>
        <DropAreas
          addImageToBoard={addImageToBoard}
          board={board}
          board2={board2}
          board3={board3}
          board4={board4}
        />
        <div className="col-span-2"> </div>

        <div className="col-span-4"></div>
        <div className="col-span-4 text-center text-white">{orderMessage}</div>
        <div className="col-span-4"></div>

        <div className="col-span-4"></div>
        <div className="col-span-4 flex justify-center items-center">
          {showContinuar && (
            <motion.div
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              className="group"
            >
              <Button
                asChild
                className="text-white bg-secondary hover:bg-hover-secondary"
                onClick={SaveBadgeProgressAndGoToNextPage}
              >
                <Link href="/chapters/chapter2/11">
                  Continuar
                  <FaArrowRight className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-all duration-150" />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
        <div className="col-span-4"></div>
        {error && <p className=" text-red-600 text-center text-sm">{error}</p>}

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
    </DndProvider>
  );
}
