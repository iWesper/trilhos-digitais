import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import PictureStack from 'Design_Cadeiras_Drop';


import testimg1 from '../../public/img/chair1.png';
import testimg2 from '../../public/img/chair2.png';
import testimg3 from '../../public/img/chair3.png';


//LISTA DE ELEMENTOS ARRASTÁVEIS
//AQUI, URL É A LOCALIZAÇÃO
const PictureList = [
    {
        id:1,
        url:testimg1
    },
    {
        id:2,
        url:testimg2
    },
    {
        id:3,
        url:testimg3
    },

]

function DragDropStack() {

    const [PictureListCopy, setPictureListCopy]= useState([...PictureList]);

    //STATE DA ÁREA DAS IMAGENS
    const [board, setBoard] = useState([]);

    //FEEBACK CERTO OU ERRADO
    const [orderMessage, setOrderMessage] = useState('');

    //ID
    const [draggingId, setDraggingId]= useState(0);

    //ORDEM CORRETA DE IMAGENS
    const correctOrder = [3, 2, 1];

    //AO CLIQUE PARA ARRASTAR
    const handleMouseDown = (id) => {

        //SAVE ID
        setDraggingId(id);

    }
    
    //FUNÇÃO QUE ATUALIZA O STATE DO BOARD PARA QUE ELE MOSTRE O QUE LÁ FOI POSTO
    const addImageToBoard = (id) => {

        //ADICIONA A IMAGEM AO BOARD
        setBoard([...board,PictureListCopy.find((picture) => picture.id ===id)]);

        //CÓPIA
        const newPictureListCopy = [...PictureListCopy];

        //REMOVE A IMAGEM DA LISTA
        newPictureListCopy.splice(newPictureListCopy.findIndex((picture) => picture.id === id), 1);
    
        //MOSTRA AS IMAGENS SEM ELA
        setPictureListCopy(newPictureListCopy);

    }

    //SABER SE EStÁ A ARRASTAR
    const [{isOver:isOver}, drop] = useDrop({

        //TIPO ACEITO
        accept: 'image',

        //FUNÇÃO CHAMADA QUANDO O ELEMENTO É SOLTADO
        //A BOARD FICA COM O QUE LÁ ESTAVA MAIS O NOVO
        drop: (item) => {

            //SE TIVER MENOS DE 3
        if (board.length < 3) {

            //ADICIONA MAIS
            addImageToBoard(draggingId);
        }
        else {

            //SE TIVER 3 OU MAIS
            setOrderMessage("Só podes adicionar 3 elementos. Limpa a tua tentativa e tenta de novo.")
        }
        },        
        //A PARTIR DAQUI SABE SE SOLTOU OU NÃO
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
    
    }),
    });

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
                    message = 'Acertaste 1!';
                    break;
                case 2:
                    message = 'Acertaste 2!';
                    break;
                case 3:
                    message = 'Acertaste todos!';
                    break;
                default:
                    message = 'Não acertaste nenhum.';
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
    }

    //VER A ORDEM
    useEffect(() => {
        if (board.length === 3) {
            checkOrder();
        }
    }, [board]);

    return (
        <div>
            <h4>Arrasta as cadeiras para a área delineada e empilha-as de forma correta</h4>
            
            <div className='Pictures'>{PictureListCopy.map((picture) => {
                return <PictureStack url={picture.url} id={picture.id} onMouseDown={handleMouseDown}/>
                })}
            </div>
            <button onClick={clearBoard}>Limpar Tentativa</button>

            <h1>
            {orderMessage}
            </h1>
            <div className='boardstack-container'>
            <div className='Boardstack' ref={drop}>
                {board.length > 0 && board.map((picture) => {
                    return (
                        <div className="stacked-picture">
                            <img src={picture.url} />
                        </div>
                    )
                })}
            </div>

            </div>
        </div>
    );
}

export default DragDropStack;