import React, { useState } from 'react';
import Picture from 'Design_Espremedor_Drop';

//HOOK QUE PERMITE RECEBER OS DADOS DO ELEMENTO ARRASTADO
import { useDrop } from 'react-dnd';



//IMAGENS DO TESTE
import testimg1 from '../../public/img/1.png';
import testimg2 from '../../public/img/imgs/2.png';
import testimg3 from '../../public/img/imgs/3.png';
import correctimg from '../../public/img/imgs/correct.png';



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

//OBJETO DA IMAGEM CORRETA
const CorrectPic = [
    {
        id:3,
        url:correctimg
    }
]

//EXPORT
function DragDrop() {

    //STATE ATUALIZÁVEL COM OS ELEMENTOS QUE LÁ ESTÃO
    const [board,setBoard] = useState([]);

    //SABER SE AINDA ESTÁ A ARRASTAR
    const [{isOver}, drop] = useDrop(() => ({

        //TIPO QUE É ACEITE, DEFINIDO NO PICTURE
        accept: "image",

        //FUNÇÃO CHAMADA QUANDO O ELEMENTO É SOLTADO
        drop:(item) => addImageToBoard(item.id),

        //A PARTIR DAQUI SABE SE SOLTOU OU NÃO
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
    
    }),
    }))

    //FUNÇÃO QUE ATUALIZA O STATE DO BOARD PARA QUE ELE MOSTRE O QUE LÁ FOI POSTO
    const addImageToBoard = (id) => {
        console.log(id);

        //SE O ID FOR O CORRETO, ALTERA PARA A IMAGEM DA LARANJA CORTADA
        if (id===3) {

            //ATUALIZA O BOARD COM A IMAGEM DA LARANJA
            setBoard([CorrectPic[0]]);
        }
        else {

            //IR BUSCAR À LISTA DE ELEMENTOS DISPONÍVEIS, AQUELE QUE TEM O ID IGUALZINHO
            const PictureListCopy = PictureList.filter((picture) => id === picture.id);

            //ATUALIZAR O BOARD COM TODOS OS ELEMENTOS LÁ POSTOS
            //setBoard((board) => [...board, PictureListCopy[0]]);

            //SE SÓ QUISERMOS UM ELEMENTO, COLOCA-SE AQUI
            setBoard([PictureListCopy[0]]);

        }
  
    }

    //ARROW FUNCTION QUE LIMPA A TENTATIVA
    const clearBoard = () => {

        //STATE RESET
        setBoard([]);
    }


    //FUNÇÃO DE VALIDAÇÃO DO ID COLOCADO DENTRO DA ZONA DO DROP
    const validateId = (id) => {

        //VALOR ESTABELECIDO COMO CORRETO. A.K.A Laranja
        const correctId=3;

        //MENSAGEM DE VALIDAÇÃO
        return id=== correctId ? 'Exatamente! Esse é o fruto mais aparente para utilizar com este objeto. Muito bem!' : 'Não é bem esse o fruto que queremos. Tenta outra vez!';
    }

    //PARA TESTAR
    console.log('IDs lá dentro:', board.map((picture) => picture.id).join(', '));

    return(

        <>
        <h3>Dos três objetos apresentados, apenas um parece ser a escolha adequada para a sua utilização. Qual destes achas que é o correto?</h3>
        <h4>Experimenta arrastá-los para saberes</h4>
        <button onClick={clearBoard}>Limpar Tentativa</button>
        <div className='container'>
            <div className='Pictures'> 
                {PictureList.map((picture) => {
                    return <Picture url={picture.url} id={picture.id}/>
                })}
            </div>

            <div className='Board' ref={drop}>
                {board.map((picture) => {
                    return (
                    <>
                    <Picture url={picture.url} id={picture.id}/>
                    </>
                ) 
                })}
            </div>
            {board.map((picture) => {
                return (
                    <p>{validateId(picture.id)}</p>
                )
            })}
        </div>
        </>
    )
}

export default DragDrop