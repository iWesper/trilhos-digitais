"use client";
import React, {useState} from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Chapter3Page6() {

  //PROGRESS
  const { setProgress } = useProgress();

    //PROGRESS VALUE
    setProgress(60);

    //LISTA de PALAVRAS POSSÍVEIS
    const words = ['Ecrã', 'Papel', 'Papel', 'Falas e Sons', 'Sons', 'Imagens', 'Curta-Metragem', 'Verídico', 'Ficção','errado1','errado2','errado3'];

        //BARALHA O ARRAY
        const shuffledWords= ArrayShuffle(words);

            //ESTADO DA TENTATIVA
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    //BARALHAR A ORDEM DO ARRAY
    function ArrayShuffle(array: string[]) {

        //GUARDA O TAMANHO DO ARRAY E DEIXA AS OUTRAS 2 EM BRANCO
        let index= array.length, temp, randomIndex;

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
        filme: [shuffledWords[randomIndexes[0]], shuffledWords[randomIndexes[1]], shuffledWords[randomIndexes[2]]],
        livro: [shuffledWords[randomIndexes[3]], shuffledWords[randomIndexes[4]], shuffledWords[randomIndexes[5]]],
        jogo: [shuffledWords[randomIndexes[6]], shuffledWords[randomIndexes[7]], shuffledWords[randomIndexes[8]]]

    });

    //MUDA A PALAVRA DE UMA LINHA ESPEcÌFICA DE UMA COLUNA ESPECÌFICA
    const changeWord = (column: string, row: number, direction: number) => {

        //ATUALIZA O ESTADO AO PEGAR NO ANTERIOR E COLOCAR O NOVO
        setSelectedWords(prevWords => {

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
}


    //VER SE USER ACERTOU
    const verifyWords = () => {

        //OBJETO COM AS PALAVRAS CORRETAS
        const correctWords = {
            filme: ['Ecrã', 'Falas e Sons', 'Curta-Metragem'],
            livro: ['Papel', 'sons', 'Verídico'],
            jogo: ['Papel', 'Imagens', 'Ficção']
        };
    
        //PARA CADA COLUNA
        for (let column in correctWords) {
            
            //ORDENA AS PALAVRAS SELECIONADAS E AS CORRETAS
            const sortedSelectedWords = [...selectedWords[column as keyof typeof selectedWords]].sort();
            const sortedCorrectWords = [...correctWords[column as keyof typeof correctWords]].sort();
    
            //VERIFICAR SE AS PALAVRAS SELECIONADAS SÃO IGUAIS ÀS CORRETAS
            if (!sortedSelectedWords.every((word, index) => word === sortedCorrectWords[index])) {

                //MOSTRA ERRO
                console.log(`Incorrect words selected for ${column}`);
                setIsCorrect(false);

                return;
            }
        }

        //MOSTRA QUE ESTÁ TUDO CORRETO
        console.log('All words are correct!');
        setIsCorrect(true);

        
    };

  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <Link
          href="/chapters/chapter3/4"
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col pt-20">
          <p className="text-white font-medium p-6 pb-8">
          Abaixo, tens três colunas diretamente relacionadas com o <span className="italic">“Spider-Man”</span> enquanto banda-desenhada, filme e jogo. Indica quais os meios de cada um para continuar!
          </p>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
