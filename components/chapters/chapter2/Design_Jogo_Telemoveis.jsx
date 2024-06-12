import React, { useState, useEffect, useRef } from 'react';
import PicturePhones from './Design_Telemoveis_Drop';

//HOOK QUE PERMITE RECEBER OS DADOS DO ELEMENTO ARRASTADO
import { useDrop } from 'react-dnd';


import testimg1 from '../../public/img/Phone1.png';
import testimg2 from '../../public/img/Phone2.png';
import testimg3 from '../../public/img//Phone3.png';
import testimg4 from '../../public/img//Phone4.png';


//LISTA DE ELEMENTOS ARRASTÁVEIS
//AQUI, URL É A LOCALIZAÇÃO
const PictureList = [
    {
        id:1,
        url:testimg1
    },
    {
        id:2,
        url:testimg3
    },
    {
        id:3,
        url:testimg2
    },
    {
        id:4,
        url:testimg4
    },
]

//EXPORT
function DragDropOrdenar() {

    //STATE ATUALIZÁVEL COM OS ELEMENTOS QUE LÁ ESTÃO
    const [board,setBoard] = useState([]);

    //SEGUNDA BOARD
    const [board2,setBoard2] = useState([]);

    //TERCEIRA BOARD
    const [board3,setBoard3] = useState([]);

    //QUARTA BOARD
    const [board4,setBoard4] = useState([]);

    //FEEBACK CERTO OU ERRADO
    const [orderMessage, setOrderMessage] = useState('');

    //IMAGEM ARRASTADA
    const draggingItemRef = useRef();
    const sourceBoardRef = useRef();
    const sourceBoardCopyRef=useRef();
    const TargetBoardCopyRef=useRef();
    const boardsRef= useRef();

    //ESTADO INICIAL DAS BOARDS
    useEffect(() => {
    setBoard([PictureList[0]]);
    setBoard2([PictureList[1]]);
    setBoard3([PictureList[2]]);
    setBoard4([PictureList[3]]);
}, []);

    //BOARDS POSSÍVEIS
    const boards = {
        0: board, 
        2: board2, 
        3: board3, 
        4: board4
    };

    //HANDLE DRAG
    const handleDragStart = (item) => {

        //FAZ UMA CÓPIA DE TODAS AS BOARDS
        boardsRef.current = {
            0: [...board],
            2: [...board2],
            3: [...board3],
            4: [...board4]
        };
        
        //GUARDA O QUE ESTÁ A SER ARRASTADO
        draggingItemRef.current = item[0].id;

        //BOARD INICIAL
        if (board.find(picture => picture.id === item[0].id)) {
            sourceBoardRef.current = 0;
        } else if (board2.find(picture => picture.id === item[0].id)) {
            sourceBoardRef.current = 2;
        } else if (board3.find(picture => picture.id === item[0].id)) {
            sourceBoardRef.current = 3;
        } else if (board4.find(picture => picture.id === item[0].id)) {
            sourceBoardRef.current = 4;
        
        }

        //CÓPIA DA BOARD INICIAL
        sourceBoardCopyRef.current = [...boards[sourceBoardRef.current]];
    }

    //Handle DROP
    const handleDrop = (TargetBoard) => {

        //FAZ LOGO CÓPIA, COM BASE NA CÓPIA
        TargetBoardCopyRef.current = [...boardsRef.current[TargetBoard]];

        //SE TIVER UM ITEM
        if(draggingItemRef.current && sourceBoardCopyRef.current !== TargetBoard) {

            //CHAMA ADD TO BOARD
            addImageToBoard(draggingItemRef.current, TargetBoard);
        }
    }

    //SABER SE AINDA ESTÁ A ARRASTAR
    const [{isOver:isOver}, drop] = useDrop(() => ({

        //TIPO QUE É ACEITE, DEFINIDO NO PICTURE
        accept: "image",

        //FUNÇÃO CHAMADA QUANDO O ELEMENTO É SOLTADO
        drop: () => handleDrop(0),

        //A PARTIR DAQUI SABE SE SOLTOU OU NÃO
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
    
    }),
    }))

    //SABER SE AINDA ESTÁ A ARRASTAR
    const [{isOver2:isOver2}, drop2] = useDrop(() => ({

        //TIPO QUE É ACEITE, DEFINIDO NO PICTURE
        accept: "image",

        //FUNÇÃO CHAMADA QUANDO O ELEMENTO É SOLTADO
        drop: () => handleDrop(2),

        //A PARTIR DAQUI SABE SE SOLTOU OU NÃO
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
    
    }),
    }))

    //SABER SE AINDA ESTÁ A ARRASTAR
    const [{isOver3}, drop3] = useDrop(() => ({

        //TIPO QUE É ACEITE, DEFINIDO NO PICTURE
        accept: "image",

        //FUNÇÃO CHAMADA QUANDO O ELEMENTO É SOLTADO
        drop: () => handleDrop(3),

        //A PARTIR DAQUI SABE SE SOLTOU OU NÃO
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
    
    }),
    }))

     //SABER SE AINDA ESTÁ A ARRASTAR
     const [{isOver4}, drop4] = useDrop(() => ({

        //TIPO QUE É ACEITE, DEFINIDO NO PICTURE
        accept: "image",

        //FUNÇÃO CHAMADA QUANDO O ELEMENTO É SOLTADO
        drop: () => handleDrop(4),

        //A PARTIR DAQUI SABE SE SOLTOU OU NÃO
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
    
    }),
    }))


    //FUNÇÃO QUE ATUALIZA O STATE DO BOARD PARA QUE ELE MOSTRE O QUE LÁ FOI POSTO
    const addImageToBoard = (id,TargetBoard) => {

        //UPDATES DAS BOARDS
    const setBoards = {
        0: setBoard,
        2: setBoard2,
        3: setBoard3,
        4: setBoard4
    };
    
    //PROCURA O INDEX
    const sourceItemIndex = sourceBoardCopyRef.current.findIndex(item => item.id === id)

    //INDEX DE TARGET BOARD
    const targetItemIndex = TargetBoardCopyRef.current.findIndex(item => item.id === id);
    
    //SE NÂO EXISTIR EM TARGET E EXISTIR EM SOURCE
    if(sourceItemIndex !== -1 && targetItemIndex === -1) {

        //GUARDA O ITEM
        const [sourceItem] = sourceBoardCopyRef.current.splice(sourceItemIndex, 1);
        const [targetItem] = TargetBoardCopyRef.current.splice(targetItemIndex, 1);

         //ITEM DO TARGET NO SOURCE
        sourceBoardCopyRef.current.push(targetItem);

         //COLOCA NA NOVA BOARD
         setBoards[TargetBoard]([...TargetBoardCopyRef.current, sourceItem]);

         //ATUALIZA A SOURCE BOARD
         setBoards[sourceBoardRef.current](sourceBoardCopyRef.current);

         //LIMPAR VALOR
         draggingItemRef.current=null;
         sourceBoardRef.current=null;;
    }

    }

    //ORDEM DEFINIDA COMO CORRETA USANDO IDs
    const correctOrder = [3,4,2,1];

    //COMPARAR
    useEffect(() => {

    //VER ORDEM
    const allBoardsHaveOnePicture = board.length === 1 && board2.length === 1 && board3.length === 1 && board4.length === 1;

    //ORDEM ATUAL COM UM sÓ ARRAY
    const currentOrder = [board.map((picture) => picture.id), board2.map((picture) => picture.id), board3.map((picture) => picture.id), board4.map((picture) => picture.id)].flat();

    //COMPARAR OS ARRAYS
    const correctPositions = currentOrder.filter((value,index) => value === correctOrder[index]).length;

    //MENSAGEM A ESCREVER
    let message = '';

    //NÚMERO DE IMAGENS NA POSIÇÃO CORRETA
    switch(correctPositions) {

        //1 IMAGEM
        case 1:
            message = 'Estás num bom caminho, acertaste 1 de 4 imagens!';
            break;

        //2 IMAGENS
        case 2:
            message = 'Continua! Metade das imagens estão corretas';
            break;

        //3 IMAGENS
        case 3:
            message = 'Estás quase lá, continua o esforço!';
            break;
        
        //4 IMAGENS
        case 4:
            message = 'Parabéns! Todas as imagens estão em posições corretas';
            break;

        //NENHUMA IMAGEM
        default:
            message = 'Nenhuma imagem está na sua posição correta.';
    }

    //STATE DO FEEDBACK
    setOrderMessage(message);
}, [board, board2, board3, board4]);

    return(

        <>
        <h3>Coloca os telemóveis apresentados de modo que fiquem organizados do design mais antigo ao mais recente.</h3>
        <h1>
            {orderMessage}
        </h1>
        <div className="boards-container">
           
            <div ref={drop} style={{width:"200px", height:"200px", border:"solid 5px white"}}>
                {board.map((picture) => {
                    return <PicturePhones url={picture.url} id={picture.id} 
                    onDragStart={handleDragStart} 
                    board={board} 
                     />
                })}
            </div>

            <div ref={drop2} style={{width:"200px", height:"200px", border:"solid 5px white"}}>
                {board2.map((picture) => {
                    return <PicturePhones url={picture.url} id={picture.id} 
                    onDragStart={handleDragStart} 
                    board={board2} 
                     />
                })}
            </div>

            <div ref={drop3} style={{width:"200px", height:"200px", border:"solid 5px white"}}>
                {board3.map((picture) => {
                    return <PicturePhones url={picture.url} id={picture.id} 
                    onDragStart={handleDragStart} 
                    board={board3} 
                     />
                })}
            </div>
            <div  ref={drop4} style={{width:"200px", height:"200px", border:"solid 5px white"}}>
                {board4.map((picture) => {
                    return <PicturePhones url={picture.url} id={picture.id} 
                    onDragStart={handleDragStart} 
                    board={board4} 
                     />
                })}
            </div>
        </div>
        </>
    )
}

export default DragDropOrdenar