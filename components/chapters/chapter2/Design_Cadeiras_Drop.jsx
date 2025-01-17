import React from "react";
import Image from 'next/image'

//SABER O ELEMENTO QUE ESTÁ A SER ARRASTADO
import { useDrag } from "react-dnd";

function PictureStack({id,url, onMouseDown}) {

    //ESTADO DO ARRASTAR
    const [{isDragging}, drag] = useDrag(() => ({
        
        //TIPO DE ELEMENTOS ACEITE
        type:"image",

        //SAVE DO ID
        item: {id:id},
        
        //SABER SE O ELEMENTO ESTÁ A SER ARRASTADO
        collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
        
        }),
        
    }))

    //LISTAR IMAGENS A ARRASTAR
    return(

        <Image
        ref={drag} 
        src={url} 
        alt="Chairs"
        onMouseDown={() => onMouseDown(id)} 
        className="max-h-full"
        />
        
    )
}

export default PictureStack;