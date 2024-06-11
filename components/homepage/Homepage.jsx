import React, {useState, useEffect} from "react";
import {collection, query, where, getDocs} from "firebase/firestore";
import {auth} from "../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import UpdateHasSeenTutorialScript from "../../backend/UpdateHasSeenTutorialScript"
 

export default function Homepage({ tutorialState }) {

    const [tutorialSeen, setTutorialSeen] = useState(false);

    //USER ID
    const [UserId, setUserId] = useState(null);

    //ERRO
    const [Error,setError]= useState("");

    //MENSAGEM
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    const [tutorialMessages, setTutorialMessages] = useState([]);

    const GoGetUsername = async () => {

        //SE USERID TIVER CHEGADO
        if (UserId) {

            //ERROR HANDLE
            try {
                
                //COLLECTION PARA IR BUSCAR USERNAME
                const usernameCollection= collection(db,"usernames");

                //QUERY PARA ENCONTRAR O USERNAME
                const q= query(usernameCollection, where("userId", "==", UserId));

                //EXECUTA A QUERY
                const queryUsername = await getDocs(q);

                //PARA CADA DOC || VAI SER SÓ UM
                queryUsername.forEach(async (docSnapshot) => {

                    //DEFINE AS MENSAGENS
                    setTutorialMessages([

                        `Olá ${docSnapshot.data().username}, bem-vindo aos Trilhos Digitais!`,

                        "Vais embarcar no Expresso Digital, um comboio que te vai levar a explorar toda a história da multimédia, desde os seus pilares fundadores até aos dias de hoje, percebendo o seu impacto e a sua presença no dia-a-dia de todos nós.",

                        "A tua viagem está separada em duas partes principais: os Quatro Pilares, onde vais ser introduzido às bases da multimédia, e a Hipermédia, onde vais ver a evolução da multimédia desde a introdução do computador.",

                        "Caso queiras fazer um desvio e explorar os vários capítulos noutra ordem, não te preocupes, podes fazê-lo através da seleção de capítulos, na homepage.",

                        "Presta atenção, pois a cada capítulo terás uma recompensa pela tua exploração na forma de um badge para desbloquear e mais tarde inspecionar! Sempre que estiveres numa situação em que podes desbloquear partes do badge, caso não percebas o que tens de fazer, ser-te-á dada uma pista.",

                        "Quando desbloqueares o badge, vais ser notificado no ícone situado no topo do teu ecrã, e caso queiras inspecionar os badges que já tens, ou verificar os que tens por desbloquear, basta clicares nesse ícone.",

                        "Agora que sabes tudo sobre a tua viagem, estás pronto? Todos a bordo! ",
                ]);
                });

                

            } catch (error) {

                //MENSAGEM
                setError("Erro na procura do username.");

            }
        }
        else {

            //ERRO
            setError("Nenhum Utilizador Encontrado");

        }


    }

    //MENSAGENS DO TUTORIAL
    const handleContinue = () => {

        //SE NÃO FOR A ÚLTIMA MENSAGEM
        if (currentMessageIndex < tutorialMessages.length - 1) {

            //AVANÇA
            setCurrentMessageIndex(currentMessageIndex + 1);

        } else {

            //FECHA O TUTORIAL
            setTutorialSeen(true);

        }
    };

    //VAI BUSCAR O USER ID QUANDO MONTA
    useEffect(() => {

        //SAVE USER
        onAuthStateChanged(auth, (currentUser) => {

            if(currentUser){

                //SAVE
                setUserId(currentUser.uid);

                if (UserId) {
                    
                    GoGetUsername();
                }
            } 
            else {

                setUserId(null);
            }
        });

    },[UserId]);

   

    return (
        <div>
            {!tutorialState && !tutorialSeen  && currentMessageIndex < tutorialMessages.length && (
                <div>
                    <p>{tutorialMessages[currentMessageIndex]}</p>
                    <button onClick={handleContinue}>Continuar</button>
                </div>
            )}

            {tutorialSeen && <UpdateHasSeenTutorialScript /> }

            <div className="bg-primary h-screen">

            </div>
        </div>
    );
}