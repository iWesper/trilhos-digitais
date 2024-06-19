import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


//COMPONENTE QUE VAI DAR RENDER
function Columns() {

    //BARALHAR A ORDEM DO ARRAY
    function ArrayShuffle(array) {

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

    //LISTA de PALAVRAS POSSÍVEIS
    const words = ['filme1', 'filme2', 'filme3', 'livro1', 'livro2', 'livro3', 'jogo1', 'jogo2', 'jogo3','errado1','errado2','errado3'];

    //BARALHA O ARRAY
    const shuffledWords= ArrayShuffle(words);

    //GERA 9 NÚMEROS ALEATÓRIOS PARA SEREM AS PALAVRAS ALEATÓRIAS INICIAS
    function RandomNumbers(n, max) {

        //SET PARA SEREM ÚNICOS
        const randomNumbers = new Set();
    
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
    const randomIndexes = RandomNumbers(9, words.length);

    //PALAVRAS QUE A PESSOA ESCOLHE
    const [selectedWords, setSelectedWords] = useState({

        //PALAVRAS EM FILME, LIVRO E JOGO INICIAIS ALEATÓRIAS	
        filme: [shuffledWords[randomIndexes[0]], shuffledWords[randomIndexes[1]], shuffledWords[randomIndexes[2]]],
        livro: [shuffledWords[randomIndexes[3]], shuffledWords[randomIndexes[4]], shuffledWords[randomIndexes[5]]],
        jogo: [shuffledWords[randomIndexes[6]], shuffledWords[randomIndexes[7]], shuffledWords[randomIndexes[8]]]

    });

    //ESTADO DA TENTATIVA
    const [isCorrect, setIsCorrect] = useState(null);

    //MUDA A PALAVRA DE UMA LINHA ESPEcÌFICA DE UMA COLUNA ESPECÌFICA
    const changeWord = (column, row, direction) => {

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
        const newColumnWords = [...prevWords[column]];

        //ATUALIZA A PALAVRA ATUAL PARA A NOVA
        newColumnWords[row] = newIndex;

        //RETORNA UMA CÓPIA DO ESTADO ATUALIZADO
        return { ...prevWords, [column]: newColumnWords };
});
    };

    //VER SE USER ACERTOU
    const verifyWords = () => {

        //OBJETO COM AS PALAVRAS CORRETAS
        const correctWords = {
            filme: ['filme1', 'filme2', 'filme3'],
            livro: ['livro1', 'livro2', 'livro3'],
            jogo: ['jogo1', 'jogo2', 'jogo3']
        };
    
        //PARA CADA COLUNA
        for (let column in correctWords) {
            
            //ORDENA AS PALAVRAS SELECIONADAS E AS CORRETAS
            const sortedSelectedWords = [...selectedWords[column]].sort();
            const sortedCorrectWords = [...correctWords[column]].sort();
    
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
        <div>
            <h4>Cada palavra aqui presente, só se pode repetir uma vez, por isso, se estiver numa coluna, deve ser retirada antes de ser colocada noutra</h4>
            <p>A ordem das palavras selecionadas, não é linear, mas sim randomizada.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            {['filme', 'livro', 'jogo'].map(column => (
                <div key={column}>
                    <h2>{column}</h2>
                    {selectedWords[column].map((word, index) => (
                        <div key={index}>
                            <button onClick={() => changeWord(column, index, -1)}><FaArrowLeft/></button>
                            <span>{word}</span>
                            <button onClick={() => changeWord(column, index, 1)}><FaArrowRight/></button>
                        </div>
                    ))}
                </div>
            ))}
            <div style={{ gridColumn: 'span 3', textAlign: 'center' }}>
                <button onClick={verifyWords}>Verify</button>
                {isCorrect !== null && (
                    <h3 style={{ color: isCorrect ? 'green' : 'red' }}>
                {isCorrect ? 'All words are correct!' : 'Incorrect words selected'}
                    </h3>
                )}
            </div>
        </div>
        </div>
        
    );
}

export default Columns;