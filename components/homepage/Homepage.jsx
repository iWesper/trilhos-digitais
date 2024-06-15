import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import UpdateHasSeenTutorialScript from "../../backend/UpdateHasSeenTutorialScript";
import { MdSwipe } from "react-icons/md";
import { delay, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Comboio } from "./Comboio";
import Navbar from "./Navbar";

export default function Homepage({ tutorialState }) {
  // Animação do parallax
  const animacaoParallax = (speed) => ({
    // Definir a posição inicial e final
    x: [-100 * speed + "vw", 0 ],
    // Definir a duração da animação
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 20,
      ease: "linear",
    },
  });
  const [tutorialSeen, setTutorialSeen] = useState(false);

  //USER ID
  const [UserId, setUserId] = useState(null);

  //ERRO
  const [Error, setError] = useState("");

  //MENSAGEM
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const [tutorialMessages, setTutorialMessages] = useState([]);

  const [username, setUsername] = useState("");

  const GoGetUsername = async () => {
    //SE USERID TIVER CHEGADO
    if (UserId) {
      //ERROR HANDLE
      try {
        //COLLECTION PARA IR BUSCAR USERNAME
        const usernameCollection = collection(db, "usernames");

        //QUERY PARA ENCONTRAR O USERNAME
        const q = query(usernameCollection, where("userId", "==", UserId));

        //EXECUTA A QUERY
        const queryUsername = await getDocs(q);

        //PARA CADA DOC || VAI SER SÓ UM
        queryUsername.forEach(async (docSnapshot) => {
          //DEFINE AS MENSAGENS
          setTutorialMessages([
            `Olá ${
              docSnapshot.data().username
            }, bem-vindo aos Trilhos Digitais!`,

            "Vais embarcar no Expresso Digital, um comboio que te vai levar a explorar toda a história da multimédia, desde os seus pilares fundadores até aos dias de hoje, percebendo o seu impacto e a sua presença no dia-a-dia de todos nós.",

            "A tua viagem está separada em duas partes principais: os Quatro Pilares, onde vais ser introduzido às bases da multimédia, e a Hipermédia, onde vais ver a evolução da multimédia desde a introdução do computador.",

            "Caso queiras fazer um desvio e explorar os vários capítulos noutra ordem, não te preocupes, podes fazê-lo através da seleção de capítulos, na homepage.",

            "Presta atenção, pois a cada capítulo terás uma recompensa pela tua exploração na forma de um badge para desbloquear e mais tarde inspecionar! Sempre que estiveres numa situação em que podes desbloquear partes do badge, caso não percebas o que tens de fazer, ser-te-á dada uma pista.",

            "Quando desbloqueares o badge, vais ser notificado no ícone situado no topo do teu ecrã, e caso queiras inspecionar os badges que já tens, ou verificar os que tens por desbloquear, basta clicares nesse ícone.",

            "Agora que sabes tudo sobre a tua viagem, estás pronto? Todos a bordo!",
          ]);

          //SAVE USERNAME
          setUsername(docSnapshot.data().username);
        });
      } catch (error) {
        //MENSAGEM
        setError("Erro na procura do username.");
      }
    } else {
      //ERRO
      setError("Nenhum Utilizador Encontrado");
    }
  };

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
      if (currentUser) {
        //SAVE
        setUserId(currentUser.uid);

        if (UserId) {
          GoGetUsername();
        }
      } else {
        setUserId(null);
      }
    });
  }, [UserId]);

  return (
    <>
      <Navbar />
      {/* {!tutorialState && !tutorialSeen && (
        <Dialog>
          <DialogTrigger>
            <Button className="bg-secondary hover:bg-orange-500">Clica Aqui</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Introdução</DialogTitle>
              <DialogDescription className=" text-black">
                {tutorialMessages[currentMessageIndex]}
              </DialogDescription>
              <Button onClick={handleContinue}>Continuar</Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )} */}

      {tutorialSeen && <UpdateHasSeenTutorialScript />}
      {/* Container dos fundos para o parallax */}
      <div className="absolute w-screen h-screen overflow-hidden">
        {/* Container dos fundos para o parallax */}
        <motion.div
          className="absolute w-[600vw] h-full flex"
          animate={animacaoParallax(3)}
          style={{ zIndex: 0 }}
        >
          {/* Fundo camada 5 trilhos */}
          <div
            className="w-[200vw] h-full bg-comboioTrilhosFundo5 bg-center"
            style={{ zIndex: 0 }}
          ></div>
          <div
            className="w-[200vw] h-full bg-comboioTrilhosFundo5 bg-center"
            style={{ zIndex: 0 }}
          ></div>
        </motion.div>
        {/* Fundo camada 1 */}
        <motion.div
          className="absolute w-[600vw] h-full flex"
          animate={animacaoParallax(3)}
          style={{ zIndex: -1 }}
        >
          <div
            className="w-[200vw] h-full bg-comboioParallaxFundo1 bg-center"
            style={{ zIndex: -1 }}
          ></div>
          <div
            className="w-[200vw] h-full bg-comboioParallaxFundo1 bg-center"
            style={{ zIndex: -1 }}
          ></div>
        </motion.div>
        {/* Fundo camada 2 */}
        <motion.div
          className="absolute w-[600vw] h-full flex"
          animate={animacaoParallax(2)}
          style={{ zIndex: -2 }}
        >
          <div
            className="w-[200vw] h-full bg-comboioParallaxFundo2 bg-center"
            style={{ zIndex: -2 }}
          ></div>
          <div
            className="w-[200vw] h-full bg-comboioParallaxFundo2 bg-center"
            style={{ zIndex: -2 }}
          ></div>
        </motion.div>
        {/* Fundo camada 3 */}
        <motion.div
          className="absolute w-[600vw] h-full flex"
          animate={animacaoParallax(1)}
          style={{ zIndex: -3 }}
        >
          <div
            className="w-[200vw] h-full bg-comboioParallaxFundo3 bg-center"
            style={{ zIndex: -3 }}
          ></div>
          <div
            className="w-[200vw] h-full bg-comboioParallaxFundo3 bg-center"
            style={{ zIndex: -3 }}
          ></div>
        </motion.div>
        {/* Fundo camada 4 */}
        <motion.div
          className="absolute w-[600vw] h-full flex"
          animate={animacaoParallax(0.5)}
          style={{ zIndex: -4 }}
        >
          <div
            className="w-[200vw] h-full bg-comboioParallaxFundo4 bg-center"
            style={{ zIndex: -4 }}
          ></div>
          <div
            className="w-[200vw] h-full bg-comboioParallaxFundo4 bg-center"
            style={{ zIndex: -4 }}
          ></div>
        </motion.div>
      </div>
      <motion.div
        className="flex flex-col items-center justify-center w-full select-none h-screen max-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-center text-5xl font-bold rounded-xl p-4 mb-4 mt-4 bg-gray-800 text-white font-effra z-50 backdrop-filter backdrop-blur-md bg-opacity-80"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Bem-vindo aos Trilhos Digitais, {username}!
        </motion.div>

        {/* Comboio Component with higher z-index */}
        <motion.div
          draggable="false"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Comboio />
        </motion.div>
        <motion.div
          className="mt-4 flex flex-col items-center justify-center backdrop-filter p-4 bg-gray-800 rounded-xl backdrop-blur-md bg-opacity-80"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.5, duration: 1 }}
          >
            <MdSwipe className="text-4xl text-white animate-swipe" />
          </motion.div>
          <motion.p
            className="text-center text-xl text-white"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Arrasta para o lado!
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  );
}
