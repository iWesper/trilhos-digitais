import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { FaPlay,FaPause, FaStop } from "react-icons/fa";

//SOM
import soundUrl from '../sound/1.mp3';


//EXPORTAR
function SoundButton() {


    //ESTADO DO SUM
    const [play, { stop: stopSound,sound, }] = useSound(soundUrl, { volume: 0.1 });
    const [isPlaying, setIsPlaying] = useState(false);
    const [typewriterText, setTypewriterText] = useState('');

    const text= `We're no strangers to love
    You know the rules and so do I (do I)
    A full commitment's what I'm thinking of
    You wouldn't get this from any other guy
    I just wanna tell you how I'm feeling
    Gotta make you understand
    Never gonna give you up
    Never gonna let you down
    Never gonna run around and desert you
    Never gonna make you cry
    Never gonna say goodbye
    Never gonna tell a lie and hurt you
    We've known each other for so long
    Your heart's been aching, but you're too shy to say it (say it)
    Inside, we both know what's been going on (going on)
    We know the game and we're gonna play it
    And if you ask me how I'm feeling
    Don't tell me you're too blind to see
    Never gonna give you up
    Never gonna let you down
    Never gonna run around and desert you
    Never gonna make you cry
    Never gonna say goodbye
    Never gonna tell a lie and hurt you
    Never gonna give you up
    Never gonna let you down
    Never gonna run around and desert you
    Never gonna make you cry
    Never gonna say goodbye
    Never gonna tell a lie and hurt you
    We've known each other for so long
    Your heart's been aching, but you're too shy to say it (to say it)
    Inside, we both know what's been going on (going on)
    We know the game and we're gonna play it
    I just wanna tell you how I'm feeling
    Gotta make you understand
    Never gonna give you up
    Never gonna let you down
    Never gonna run around and desert you
    Never gonna make you cry
    Never gonna say goodbye
    Never gonna tell a lie and hurt you
    Never gonna give you up
    Never gonna let you down
    Never gonna run around and desert you
    Never gonna make you cry
    Never gonna say goodbye
    Never gonna tell a lie and hurt you
    Never gonna give you up
    Never gonna let you down
    Never gonna run around and desert you
    Never gonna make you cry
    Never gonna say goodbye
    Never gonna tell a lie and hurt you`;

    //ANIMAÇÃO TEXTO
    useEffect(() => {

        //CONTADOR
        let i = -1;

        //SE ESTIVER A TOCAR E HOUVER TEXTO
        if (isPlaying && i < text.length) {

            //TIMER A CADA 100MS
            const timer = setInterval(() => {

                //MAIS UM CARACTER
                setTypewriterText((prev) => prev + text.charAt(i));

                //QUANDO CHEGAR AO FIM DO TEXTO
                if (i === text.length) {
                    clearInterval(timer);
                }

                 //MAIS UM CARACTER
                 i++;
            }, 50);

            //LIMPA O TIMER
            return () => clearInterval(timer);
        } else {

            //LIMPA A VARIÁVEL
            setTypewriterText('');
        }
    }, [isPlaying, text]);

    //TRIGGER DE COMEÇO OU PAUSA DO SOM
    const handleClick = () => {

        console.log(isPlaying);

        //SE ESTIVER A TOCAR, PARA
        if (isPlaying) {
            
            //PARA O SOM
            stopSound();
            setIsPlaying(false);

            //SEBÃO
        } else if (!sound.playing()) {

            //TOCA
            play();
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (sound) {
            sound.pause();
            setIsPlaying(false);

        }
    };

    const handleStop = () => {
        if (sound) {

            sound.stop();
            setIsPlaying(false);

        }
    };

    return (
        <div>
            <button onClick={handleClick}><FaPlay/></button>
            <button onClick={handlePause}><FaPause/></button>
            <button onClick={handleStop}><FaStop/></button>
            <div>{typewriterText}</div>
        </div>
    );
}

export default SoundButton;