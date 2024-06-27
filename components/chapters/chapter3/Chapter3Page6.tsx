"use client";
import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SaveBadgeProgressScript from "@/backend/SaveBadgeProgressScript";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdQuestionMark } from "react-icons/md";

export default function Chapter3Page6() {
  // Estado do dialog do tutorial
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(
    7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571
  );

  //LISTA de PALAVRAS POSSÍVEIS
  const words = [
    "Ecrã",
    "Monitor",
    "Papel",
    "Falas e Sons",
    "Gráficos",
    "Imagens",
    "Longa-Metragem",
    "Mundo Digital",
    "Ficção",
    "Ruído",
    "Post-its",
  ];

  const wordsCopy = [...words];

  //BARALHA O ARRAY
  const shuffledWords = ArrayShuffle(words);

  //ESTADO DA TENTATIVA
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  //COLUNA ERRADA
  const [wrongColumn, setWrongColumn] = useState<string>("");
  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

  const Tip =
    "Lembra-te, os meios técnicos referem-se ao porte físico, os básicos a como é transmitido e os qualificados aos géneros.";

  //BADGE DO CAPÍTULO
  const badgeId = 3;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 50;

  //GO TO
  const nextPage = "/chapters/chapter3/7";

  //BARALHAR A ORDEM DO ARRAY
  function ArrayShuffle(array: string[]) {
    //GUARDA O TAMANHO DO ARRAY E DEIXA AS OUTRAS 2 EM BRANCO
    let index = array.length,
      temp,
      randomIndex;

    //ENQUANTO NÃO BARALHARES TUDO
    while (0 !== index) {
      //VAI BUSCAR UM INDEX ALEATÓRIO DOS QUE FALTAM
      randomIndex = Math.floor(Math.random() * index);

      //REDUZ O TAMANHO DO QUE FALTA
      index -= 1;

      //GUARDA O VALOR ATUAL EM TEMP VALUE
      temp = array[index];

      //O VALOR DAQUI GUARDADO VAI SER IGUAL AO VALOR ALEATÓRIO DE OUTRA POSIÇÃO
      array[index] = array[randomIndex];

      //GUARDA AQUELE VALOR INICIAL NO RANDOM QUE ACABASTE DE USAR PARA MUDAR O OUTRO
      array[randomIndex] = temp;

      //PEGA NUM, TROCA POR OUTRO E METE O VALOR DO PRIMEIRO NO SEGUNDO
    }

    return array;
  }

  //GERA 9 NÚMEROS ALEATÓRIOS PARA SEREM AS PALAVRAS ALEATÓRIAS INICIAS
  function RandomNumbers(n: number, max: number): number[] {
    //SET PARA SEREM ÚNICOS
    const randomNumbers: Set<number> = new Set();

    //ENQUANTO NÃO FOREM SUFICIENTES
    while (randomNumbers.size < n) {
      //GERA MAIS
      const randomNumber = Math.floor(Math.random() * max);

      //GURDA NO SET
      randomNumbers.add(randomNumber);
    }

    //RESULTADO
    return Array.from(randomNumbers);
  }

  //CHAMA A FUNÇÃO, DIZENDO QUE QUERES 9 ELEMENTOS DOS X DISPONÍVEIS
  const randomIndexes: Array<number> = RandomNumbers(9, words.length);

  //PALAVRAS QUE A PESSOA ESCOLHE
  const [selectedWords, setSelectedWords] = useState({
    //PALAVRAS EM FILME, LIVRO E JOGO INICIAIS ALEATÓRIAS
    "Meios Técnicos de Exposição": [
      shuffledWords[randomIndexes[0]],
      shuffledWords[randomIndexes[1]],
      shuffledWords[randomIndexes[2]],
    ],
    "Meios Básicos": [
      shuffledWords[randomIndexes[3]],
      shuffledWords[randomIndexes[4]],
      shuffledWords[randomIndexes[5]],
    ],
    "Meios Qualificados": [
      shuffledWords[randomIndexes[6]],
      shuffledWords[randomIndexes[7]],
      shuffledWords[randomIndexes[8]],
    ],
    "Meios técnicos de Exposição": [],
    "Meios básicos": [],
    "Meios qualificados": [],
  });

  //MUDA A PALAVRA DE UMA LINHA ESPEcÌFICA DE UMA COLUNA ESPECÌFICA
  const changeWord = (column: string, row: number, direction: number) => {
    // console.log("ORIGINAL",wordsCopy);

    setSelectedWords((prevWords) => {
      // Cria uma cópia das palavras que estão na coluna atual
      const currentColumnWords = [
        ...prevWords[column as keyof typeof prevWords],
      ];

      //PALAVRA QUE VAI SER PROCURADA
      let WordToSearch = currentColumnWords[row];

      //PROCURA O ÍNDICE DE WORDTOSEARCH EM WORDSCOPY
      let currentIndex = wordsCopy.findIndex((word) => word === WordToSearch); //0 até 10

      //  const words = [ "Ecrã","Monitor","Papel", "Falas e Sons", "Gráficos","Imagens","Longa-Metragem","Mundo Digital","Ficção","Ruído","Post-its",];

      let newIndex = 0;

      //SE A DIREÇÃO FOR PARA A ESQUERDA
      if (direction === -1) {
        //ALTERA O INDEX PEDIDO PARA O VALOR A SEGUIR, MAS DENTRO DO ARRAY DISPONÍVEL
        //SE INDEX FOR O PRIMEIRO, DÁ TRUE E COLOCA A ÚLTIMA PALAVRA //SE DER FALSE DIMINUI UMA PALAVRA
        newIndex = currentIndex === 0 ? 10 : currentIndex - 1;
      } else if (direction === 1) {
        //IR PARA A DIREITA

        //ALTERA O INDEX PEDIDO PARA O VALOR A SEGUIR, MAS DENTRO DO ARRAY DISPONÍVEL
        //SE INDEX FOR O ÚLTIMO, DÁ TRUE E COLOCA 0 PARA A PRIMEIRA PALAVRA //SE DER FALSE AUMENTA UMA PALAVRA
        newIndex = currentIndex === 10 ? 0 : currentIndex + 1;
      }

      // Atualiza a palavra na posição específica com a nova palavra
      currentColumnWords[row] = wordsCopy[newIndex];

      //console.log("A palavra",WordToSearch, "vai ser substituida por",wordsCopy[newIndex]);

      // Retorna uma cópia do estado atualizado
      return { ...prevWords, [column]: currentColumnWords };
    });
  };

  //Acertou
  const SaveBadgeProgressAndGoToNextPage = () => {
    //PODE IR GUARDAR
    setProgressSave(true);
  };

  //VER SE USER ACERTOU
  const verifyWords = () => {
    //OBJETO COM AS PALAVRAS CORRETAS
    const correctWords = {
      "Meios Técnicos de Exposição": ["Ecrã", "Monitor", "Papel"],
      "Meios Básicos": ["Falas e Sons", "Gráficos", "Imagens"],
      "Meios Qualificados": ["Longa-Metragem", "Mundo Digital", "Ficção"],
    };

    //PARA CADA COLUNA
    for (let column in correctWords) {
      //ORDENA AS PALAVRAS SELECIONADAS E AS CORRETAS
      const sortedSelectedWords = [
        ...selectedWords[column as keyof typeof selectedWords],
      ].sort();
      const sortedCorrectWords = [
        ...correctWords[column as keyof typeof correctWords],
      ].sort();

      //VERIFICAR SE AS PALAVRAS SELECIONADAS SÃO IGUAIS ÀS CORRETAS
      if (
        !sortedSelectedWords.every(
          (word, index) => word === sortedCorrectWords[index]
        )
      ) {
        //MOSTRA ERRO
        setWrongColumn(column);
        setIsCorrect(false);

        return;
      }
    }

    //MOSTRA QUE ESTÁ TUDO CORRETO
    setIsCorrect(true);
    // Abre o dialog
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 justify-center items-center p-4">
        <Link
          href="/chapters/chapter3/5"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="col-span-8 flex justify-start items-center text-center flex-col pt-20"
        >
          <p className="text-white font-medium pt-6">
            Vamos analisar o “<span className="italic">Spider-Man</span>”
            enquanto banda-desenhada, filme e jogo.
          </p>
          <p className="text-white font-medium pb-4">
            Indica quais os meios de cada um para continuar!
          </p>
        </motion.div>
        <div className="col-span-2"></div>

        <div className="col-span-2"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="col-span-8 flex justify-center items-center"
        >
          {isCorrect !== null && isCorrect === false && wrongColumn !== "" && (
            <p className="text-white font-medium text-center text-sm">
              Ora parece que te confundiste nos {wrongColumn}. Vamos, tenta de
              novo.{" "}
            </p>
          )}
        </motion.div>
        <div className="col-span-2"></div>
        {/* Images */}
        <div className="col-span-3"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="col-span-2 flex justify-center items-center"
        >
          <Image
            src="/img/chapter3/chapter3SpiderManFilme.svg"
            alt="Imagem de capa The SpiderMan"
            width={150}
            height={150}
            className="rounded mx-4"
            draggable={false}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="col-span-2 flex justify-center items-center"
        >
          <Image
            src="/img/chapter3/chapter3SpiderManGame.svg"
            alt="Imagem de capa The SpiderMan"
            width={150}
            height={150}
            className="rounded me-8 ms-20"
            draggable={false}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="col-span-2 flex justify-center items-center"
        >
          <Image
            src="/img/chapter3/chapter3SpiderManBD.svg"
            alt="Imagem de capa The SpiderMan"
            width={150}
            height={150}
            className="rounded ms-32 me-8"
            draggable={false}
          />
        </motion.div>
        <div className="col-span-3"></div>
        {/* Word rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex flex-col mt-4 col-span-12"
        >
          {[
            "Meios Técnicos de Exposição",
            "Meios Básicos",
            "Meios Qualificados",
          ].map((column) => (
            <div
              key={column}
              className="flex flex-row items-center text-white my-2"
            >
              <h2 className="font-extrabold text-base text-end flex-[3] w-[10%] text-white me-4 ms-8">
                {column}
              </h2>
              <div className="flex flex-row justify-between flex-[6]">
                {selectedWords[column as keyof typeof selectedWords].map(
                  (word: string, index: number) => (
                    <div
                      key={index}
                      className="flex justify-center items-center mx-2 flex-1 bg-[#142839] p-2 rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-80 h-12"
                    >
                      <button onClick={() => changeWord(column, index, -1)}>
                        <FaArrowLeft className="text-white" />
                      </button>
                      <span className="px-8 text-sm text-center w-40">
                        {word}
                      </span>
                      <button onClick={() => changeWord(column, index, 1)}>
                        <FaArrowRight className="text-white" />
                      </button>
                    </div>
                  )
                )}
              </div>
              <div className="flex-[3]"></div>
            </div>
          ))}
        </motion.div>
        <div className="col-span-4"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="col-span-4 flex justify-center items-center"
        >
          {isCorrect === false && (
            <Button
              asChild
              className="text-white bg-[#142839] hover:bg-hover"
              onClick={verifyWords}
            >
              <motion.div
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                className="cursor-pointer"
              >
                Verificar
              </motion.div>
            </Button>
          )}

          {isCorrect !== null && isCorrect === true && (
            <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(!isDialogOpen)}>
               <DialogTrigger>
                <Button className=" text-white ms-5 bg-[#142839] hover:bg-hover">
                  Continuar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="pb-4">É isso, conseguiste!</DialogTitle>
                  <DialogDescription className="py-4">Vamos continuar?</DialogDescription>
                  <Button onClick={SaveBadgeProgressAndGoToNextPage}>
                    Sim
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
        <div className="col-span-4"></div>
      </div>

      <div className="fixed bottom-5 left-5">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger className="cursor-help">
              <MdQuestionMark className="text-white h-10 w-10 justify-start items-start" />
            </TooltipTrigger>
            <TooltipContent className="bg-[#142839] border-none shadow-none text-white">
              <p>{Tip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
