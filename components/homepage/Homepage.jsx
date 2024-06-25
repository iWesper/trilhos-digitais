import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { MdSwipe } from "react-icons/md";
import { delay, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function Homepage() {
  const router = useRouter();

  const {
    currentUser,
    goGetUsername,
    username,
    CheckHasSeenTutorialScript,
    UpdateHasSeenTutorialScript,
    tutorialState,
    error,
  } = useAuth();

  const [tutorialSeen, setTutorialSeen] = useState(false);

  //MENSAGEM
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const [tutorialMessages, setTutorialMessages] = useState([]);

  //MENSAGENS DO TUTORIAL
  const handleContinue = () => {
    //SE NÃO FOR A ÚLTIMA MENSAGEM
    if (currentMessageIndex < tutorialMessages.length - 1) {
      //AVANÇA
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      //FECHA O TUTORIAL
      setTutorialSeen(true);

      //Guarda que já viu o tutorial
      UpdateHasSeenTutorialScript();
    }
  };

  //VAI BUSCAR O USER ID QUANDO MONTA
  useEffect(() => {
    if (currentUser) {
      //Vai saber se já viu tutorial
      CheckHasSeenTutorialScript();

      //Vai buscar o username
      goGetUsername(currentUser.uid);
    } else {
      router.push("/authentication");
    }
  }, []);

  useEffect(() => {
    setTutorialMessages([
      `Olá ${username}, bem-vindo(a) aos Trilhos Digitais!`,

      "Vais embarcar no Expresso Digital, um comboio que te vai levar a explorar toda a história da multimédia, desde os seus pilares fundadores até aos dias de hoje, percebendo o seu impacto e a sua presença no dia-a-dia de todos nós.",

      "A tua viagem está separada em duas partes principais: os Quatro Pilares, onde vais ser introduzido às bases da multimédia, e a Hipermédia, onde vais ver a evolução da multimédia desde a introdução do computador.",

      "Caso queiras fazer um desvio e explorar os vários capítulos noutra ordem, não te preocupes, podes fazê-lo através da seleção de capítulos, na homepage.",

      "Presta atenção, pois a cada capítulo terás uma recompensa pela tua exploração na forma de um badge para desbloquear e mais tarde inspecionar! Sempre que estiveres numa situação em que podes desbloquear partes do badge, caso não percebas o que tens de fazer, ser-te-á dada uma pista.",

      "Quando desbloqueares o badge, vais ser notificado no ícone situado no topo do teu ecrã, e caso queiras inspecionar os badges que já tens, ou verificar os que tens por desbloquear, basta clicares nesse ícone.",

      "Agora que sabes tudo sobre a tua viagem, estás pronto? Todos a bordo!",
    ]);
  }, [username]);

  return (
    <>
      <Navbar />

      {/* Container dos fundos para o parallax */}
      <div className="absolute h-screen w-screen overflow-hidden">
        {!tutorialState && !tutorialSeen && (
          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                className="bg-secondary rounded-md px-2 py-2 mx-2 my-2 text-white hover:bg-orange-500 cursor-pointer absolute bottom-0 z-20"
                whileHover={{ scale: 1.1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  delay: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1,
                }}
              >
                Clica Aqui
              </motion.button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-4">Introdução</DialogTitle>
                <DialogDescription className=" text-black">
                  {tutorialMessages[currentMessageIndex]}
                </DialogDescription>
                <Button onClick={handleContinue}>Continuar</Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}

        {/* Container do conteúdo da página */}
        {/* Estacao */}
        <motion.div
          className="absolute w-screen h-screen bg-comboioParallaxEstacao bg-center bg-no-repeat bg-cover"
          style={{
            zIndex: 0,
          }}
        ></motion.div>
        {/* Verde */}
        <motion.div
          className="absolute w-screen h-screen bg-comboioParallaxFundo1 bg-center bg-no-repeat bg-cover"
          style={{
            zIndex: -1,
          }}
        ></motion.div>
        {/* Arbustos */}
        <motion.div
          className="absolute w-screen h-screen bg-comboioParallaxFundo2 bg-center bg-no-repeat bg-cover"
          style={{
            zIndex: -2,
          }}
        ></motion.div>
        {/* Árvores */}
        <motion.div
          className="absolute w-screen h-screen bg-comboioParallaxFundo3 bg-center bg-no-repeat bg-cover"
          style={{
            zIndex: -3,
          }}
        ></motion.div>
        {/* Fog */}
        <motion.div
          className="absolute w-screen h-screen bg-comboioParallaxFundo4 bg-center bg-no-repeat bg-cover"
          style={{
            zIndex: -4,
          }}
        ></motion.div>
        <motion.div
          className="flex flex-col items-center w-full select-none h-screen max-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-center text-5xl font-bold rounded-xl p-4 absolute top-[15%] 2xl:top-[10%] bg-gray-800 text-white font-effra z-50 backdrop-filter backdrop-blur-md bg-opacity-80"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Bem-vindo aos Trilhos Digitais, {username}!
          </motion.div>
          <motion.div
            className="mt-4 flex flex-col items-center justify-center absolute lg:top-[80%] backdrop-filter p-4 bg-gray-800 rounded-xl backdrop-blur-md bg-opacity-80"
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
      </div>
      {/* Comboio */}
      <motion.div
        className="absolute w-screen h-screen"
        draggable="false"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Comboio />
      </motion.div>
    </>
  );
}
