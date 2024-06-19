"use client";
import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SaveBadgeProgressScript from "@/backend/SaveBadgeProgressScript";

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
  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(60);

  //LISTA de PALAVRAS POSSÍVEIS
  const words = [
    "Ecrã",
    "Cartaz",
    "Papel",
    "Falas e Sons",
    "Sons",
    "Imagens",
    "Curta-Metragem",
    "Verídico",
    "Ficção",
    "Ruído",
    "Post-its",
  ];

  //BARALHA O ARRAY
  const shuffledWords = ArrayShuffle(words);

  //ESTADO DA TENTATIVA
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  //COLUNA ERRADA
  const [wrongColumn, setWrongColumn] = useState<string>("");
  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

  const Tip =
    "Ordena as palavras de cada coluna de acordo com a sua categoria.";

  //BADGE DO CAPÍTULO
  const badgeId = 3;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 100;

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
    //ATUALIZA O ESTADO AO PEGAR NO ANTERIOR E COLOCAR O NOVO
    setSelectedWords((prevWords) => {
      //CRIA UM ARRAY COM TODAS AS PALAVRAS SELECIONADAS EM TODAS AS COLUNAS
      const allWords = Object.values(prevWords).flat();

      //ENCONTRA O INDEX DA PALAVRA ATUAL
      let currentIndex = words.indexOf(allWords[row]);

      //VARIÁVEL PARA GUARDAR O INDEX DA NOVA PALAVRA
      let newIndex;

      //LOOP PARA ANDAR NOS ÍNDICES ATÉ ENCONTRAR UMA PALAVRA QUE NÃO ESTEJA JÁ SELECIONADA
      do {
        //CALCULA O INDEX DA PRÓXIMA PALAVRA E GUARDA. USA O MOD PARA ESTAR DENTRO DO ARRAY
        currentIndex = (currentIndex + direction + words.length) % words.length;

        //GUARDA A NOVA PALAVRA DO ARRAY NO INDEX
        newIndex = words[currentIndex];

        //ENQUANTO A PALAVRA NOVA ESTIVER NO ARRAY
      } while (allWords.includes(newIndex));

      //CRIA UMA CÓPIA DAS PALAVRAS DA COLUNA ATUAL
      const newColumnWords = [...prevWords[column as keyof typeof prevWords]];

      //ATUALIZA A PALAVRA ATUAL PARA A NOVA
      newColumnWords[row] = newIndex;

      //RETORNA UMA CÓPIA DO ESTADO ATUALIZADO
      return { ...prevWords, [column]: newColumnWords };
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
      "Meios Técnicos de Exposição": ["Ecrã", "Falas e Sons", "Curta-Metragem"],
      "Meios básicos": ["Cartaz", "Sons", "Verídico"],
      "Meios qualificados": ["Papel", "Imagens", "Ficção"],
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
  };

  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 justify-center items-center p-4">
        <Link
          href="/chapters/chapter3/4"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-4"></div>
        <div className="col-span-4 flex justify-start items-center text-center flex-col pt-20">
          <p className="text-white font-medium p-6">
            Abaixo, tens três colunas diretamente relacionadas com o{" "}
            <span className="italic">“Spider-Man”</span> enquanto
            banda-desenhada, filme e jogo. Indica quais os meios de cada um para
            continuar!
          </p>
        </div>
        <div className="col-span-4"></div>

        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-center items-center">
          {isCorrect !== null && isCorrect === false && (
            <p className="text-white font-medium text-center">
              Ora parece que te confundiste nos {wrongColumn}. Vamos, tenta de
              novo.{" "}
            </p>
          )}
        </div>
        <div className="col-span-2"></div>
        {/* Images */}
        <div className="col-span-3"></div>
        <div className="col-span-2 flex justify-center items-center">
          <Image
            src="/img/chapter3/chapter3SpiderManFilme.svg"
            alt="Imagem de capa The SpiderMan"
            width={150}
            height={150}
            className="rounded"
            draggable={false}
          />
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <Image
            src="/img/chapter3/chapter3SpiderManGame.svg"
            alt="Imagem de capa The SpiderMan"
            width={150}
            height={150}
            className="rounded"
            draggable={false}
          />
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <Image
            src="/img/chapter3/chapter3SpiderManBD.svg"
            alt="Imagem de capa The SpiderMan"
            width={150}
            height={150}
            className="rounded"
            draggable={false}
          />
        </div>
        <div className="col-span-3"></div>
        {/* Word rows */}
        <div className="col-span-2"></div>
        <div className="flex flex-col mt-8 col-span-8">
          {[
            "Meios Técnicos de Exposição",
            "Meios Básicos",
            "Meios Qualificados",
          ].map((column) => (
            <div
              key={column}
              className="flex flex-row justify-center items-center text-white mb-8"
            >
              <h2 className="font-bold w-[15%] text-white mr-4">{column}</h2>
              <div className="flex flex-row justify-between w-full me-40">
                {selectedWords[column as keyof typeof selectedWords].map(
                  (word: string, index: number) => (
                    <div key={index} className="flex justify-center items-center mx-2 w-full">
                      <button onClick={() => changeWord(column, index, -1)}>
                        <FaArrowLeft className="text-white" />
                      </button>
                      <span className="px-6">{word}</span>
                      <button onClick={() => changeWord(column, index, 1)}>
                        <FaArrowRight className="text-white" />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-4"></div>
        <div className="col-span-4 flex justify-center items-center">
          <Button className="text-white" onClick={verifyWords}>
            Verificar
          </Button>

          {isCorrect !== null && isCorrect === true && (
            <Dialog>
              <DialogTrigger>
                <Button>Continuar</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>É isso, conseguiste!</DialogTitle>
                  <DialogDescription>Vamos continuar?</DialogDescription>
                  <Button onClick={SaveBadgeProgressAndGoToNextPage}>
                    Sim
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="col-span-4"></div>
      </div>

      <div className="fixed bottom-5 left-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MdQuestionMark className="text-white h-10 w-10 justify-start items-start" />
            </TooltipTrigger>
            <TooltipContent className="bg-foreground border-none shadow-none text-white">
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
