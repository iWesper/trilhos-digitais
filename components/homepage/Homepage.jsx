import React, { useState, useEffect } from "react";
import { MdSwipe } from "react-icons/md";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  } = useAuth();

  // Estado do tutorial
  const [tutorialSeen, setTutorialSeen] = useState(false);
  const [isCheckingTutorialState, setIsCheckingTutorialState] = useState(true);
  // Estado que representa se o utilizador quer ignorar o tutorial
  const [hasSkippedTutorial, setHasSkippedTutorial] = useState(false);
  // Estado do dialog do tutorial
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //MENSAGEM
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Mensagens do tutorial
  const [tutorialMessages, setTutorialMessages] = useState([]);

  useEffect(() => {
    if (!tutorialState && !isDialogOpen && !isCheckingTutorialState) {
      setIsDialogOpen(true);
    }
  }, [tutorialState, isDialogOpen, isCheckingTutorialState]);

  //MENSAGENS DO TUTORIAL
  const handleContinue = () => {
    //SE NÃO FOR A ÚLTIMA MENSAGEM
    if (currentMessageIndex < tutorialMessages.length - 1) {
      //AVANÇA
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      //FECHA O TUTORIAL
      setTutorialSeen(true);
      setIsDialogOpen(false);

      //Guarda que já viu o tutorial
      UpdateHasSeenTutorialScript();
    }
  };

  //VAI BUSCAR O USER ID QUANDO MONTA
  useEffect(() => {
    if (currentUser) {
      //Vai buscar o username
      goGetUsername(currentUser.uid);
      //Vai saber se já viu tutorial e espera pela resposta
      CheckHasSeenTutorialScript()
        .then((boolean) => {
          //Se já viu tutorial
          setIsCheckingTutorialState(boolean);
        })
        .catch((boolean) => {
          setIsCheckingTutorialState(boolean);
        });

      //Redefine o estado do tutorial
      setHasSkippedTutorial(false);
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
        {!tutorialState &&
          !tutorialSeen &&
          isDialogOpen &&
          !hasSkippedTutorial && (
            <Dialog
              open={isDialogOpen}
              onOpenChange={() => {
                setIsDialogOpen(false);
                setHasSkippedTutorial(true);
              }}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="pb-2">Introdução</DialogTitle>
                  <DialogDescription className="py-4 text-foreground">
                    {tutorialMessages[currentMessageIndex]}
                  </DialogDescription>
                  <Button onClick={handleContinue}>Continuar</Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}

        {/* Container do conteúdo da página */}
        {/* Arbustos frente */}
        <motion.div
          className="absolute w-full h-screen bg-comboioParallaxFundo2 bg-center bg-no-repeat bg-cover bottom-[30%] saturate-[.85]"
          style={{
            zIndex: 1,
          }}
        ></motion.div>
        {/* Verde */}
        <motion.div
          className="absolute w-screen h-screen bg-comboioParallaxFundo1 bg-center bg-no-repeat bg-cover saturate-[.85]"
          style={{
            zIndex: -1,
          }}
        ></motion.div>
        {/* Arbustos trás*/}
        <motion.div
          className="absolute w-screen h-screen bg-comboioParallaxFundo2 bg-center bg-no-repeat bg-cover blur-[1px] saturate-[.85]"
          style={{
            zIndex: -2,
          }}
        ></motion.div>
        {/* Árvores */}
        <motion.div
          className="absolute w-screen h-screen bg-comboioParallaxFundo3 bg-center bg-no-repeat bg-cover blur-[1px] saturate-[.85]"
          style={{
            zIndex: -3,
          }}
        ></motion.div>
        {/* Fog */}
        <motion.div
          className="absolute w-screen h-screen bg-comboioParallaxFundo4 bg-center bg-no-repeat bg-cover blur-[2px] saturate-[.85]"
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
            className="mt-4 flex flex-col items-center justify-center absolute lg:top-[80%] backdrop-filter p-4 bg-[#142839] rounded-xl backdrop-blur-md bg-opacity-80 z-[1]"
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
