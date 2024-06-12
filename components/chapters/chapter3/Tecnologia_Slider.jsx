import React from "react";
import { useState } from "react";

//SLIDERS
import Slide0 from "Slides/Slide0";
import Slide1 from "Slides/Slide1";
import Slide2 from "Slides/Slide2";
import Slide3 from "Slides/Slide3";
import Slide4 from "Slides/Slide4";
import Slide5 from "Slides/Slide5";


function SliderTest () {


    //ESTADO DOS PONTOS E DO SLIDER
    const [currentSliderValue, setCurrentSliderValue] = useState(0);
    const [score, setScore] = useState(0);

    //GUARDAR A MUDANÇA DO VALOR DO SLIDER
    const handleSlideChange = (event) => {

        //MEXER NO SLIDER
        const newSlide = Number(event.target.value);

        //GUARDAR O VALOR ONDE PAROU
        setCurrentSliderValue(newSlide);

        //SE O UTILIZADOR TIVER MEXIDO O SLIDES, ESTE VAI SER SUPERIOR AOS SEUS PONTOS ATUAIS
        if (newSlide > score) {

            //GUARDA O PONTO
            setScore(score + 1);

        }
    }

    //COMPONENTE QUE VAI DAR RENDER
    let RenderComponent;

    //TODOS OS CASOS
    switch (currentSliderValue) {

        case 0:
            RenderComponent= <Slide0 />;
            break;

        case 1:
            RenderComponent= <Slide1 />;
            break;

        case 2:
            RenderComponent= <Slide2 />;
            break;

        case 3:
            RenderComponent= <Slide3 />;
            break;

        case 4:
            RenderComponent= <Slide4 />;
            break;

        case 5:
            RenderComponent= <Slide5 />;
            break;
    }

    return(

        <div style={{ marginTop: '5rem' }}>
            <h3>Tenham em atenção que aqui, os pontos do user não estão a levar reset</h3>
            <input type="range" min="0" max="5" value={currentSliderValue} onChange={handleSlideChange} style={{ width: '50%', height: '25px' }} />
            <h3>Valor atual do slider:{currentSliderValue}</h3>
            <h4>Pontos do user:{score}</h4>

            {RenderComponent}
        </div>
    )
    
}

export default SliderTest;
