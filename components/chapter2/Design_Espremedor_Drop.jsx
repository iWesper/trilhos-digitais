import React from "react";

//SABER O ELEMENTO QUE ESTÁ A SER ARRASTADO
import { useDrag } from "react-dnd";

function Picture({id,url}) {

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

        <img
        ref={drag} 
        src={url} 
        alt="fruit" 
        />
        
    )
}

export default Picture;