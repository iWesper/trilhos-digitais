"use client";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import SaveBadgeProgressScript from "../../../backend/SaveBadgeProgressScript";
import { Button } from "@/components/ui/button";
import { MdQuestionMark } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

export default function Chapter2Page9() {
  //PROGRESS
  const { setProgress } = useProgress();

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

  //PROGRESS VALUE
  setProgress(80);

  //BADGE DO CAPÍTULO
  const badgeId = 2;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 75;

  //PRÓXIMA PÁGINA
  const nextPage = "/chapters/chapter2/10";

  //ESTADO INICIAL DAS VARIÁVEIS A ESCREVER
  const [P1, setP1] =
    useState<JSX.Element>(
      <>
      Para que possas verificar este conceito, montámos o seguinte <span className="italic text-secondary">showcase</span>, onde vais poder ver como o design pode alterar o significado de algo, neste caso, a frase "<span className="italic text-secondary">Hello There</span>".
      </>);

  const [P2, setP2] = useState<string>(
    `Altera o design e diz-nos que tipo de mensagem te transmite.`
  );

  //VARIÁVEL DO BG DO TESTO
  const [BGText, setBGText] = useState<string>(
    "bg-chapter2BGTexto1 bg-origin-border bg-center bg-no-repeat bg-cover mb-6 rounded-xl"
  );

  //FONTE INICIAL DO TEXTO
  const [TextFont, setTextFont] = useState<string>("font-lovedays");

  //MOSTRAR OS BOTÕES DO FORM
  const [ButtonsForm, setButtonsForm] = useState<boolean>(true);

  //NÚMERO DE VEZES QUE O FORM FOI SUBMETIDO
  const submitCount = useRef(0);

  //MOSTRAR O DIALOG
  const [showDialog, setShowDialog] = useState<boolean>(false);

  //MOSTRAR O BOTÃO DE ALTERAR
  const [AlterarState, setAlterarState] = useState<boolean>(false);

  //NÚMERO DE RESPOSTAS QUE A PESSOA ACERTOU
  const [CorretAnswers, setCorretAnswers] = useState<number>(0);

  //DICA
  const Tip = "Repara para o fundo do texto.";

  useEffect(() => {
    //Save Valor Correct Answers
    let number = CorretAnswers;

    if (number === 1) {
      //PESSOA ACERTOU UM

      //SE ALTERAR FOR FALSE E BUTTONS FORM TRUE
      if (AlterarState === false && ButtonsForm === true) {
        //MUDA FONT
        setTextFont("font-tomatoes");

        //MUDA O BG PARA O SEGUNDO
        setBGText(
          "bg-chapter2BGTexto2 bg-origin-border bg-center bg-no-repeat bg-cover mb-6 rounded-xl"
        );
      }
    } else if (number === 2) {
      //PESSOA ACERTOU DOIS

      //SE ALTERAR FOR FALSE E BUTTONS FORM TRUE
      if (AlterarState === false && ButtonsForm === true) {
        //MUDA FONT
        setTextFont("font-beautifulEveryTime");

        //MUDA O BG PARA O TERCEIRO
        setBGText(
          "bg-chapter2BGTexto3 bg-origin-border bg-center bg-no-repeat bg-cover mb-6 rounded-xl"
        );
      }
    }
  }, [CorretAnswers, AlterarState, ButtonsForm]);

  //MOSTRAR OS BOTÕES
  const showButtonsForm = () => {
    //SE O NÚMERO DE RESPOSTAS CERTAS FOR MENOR QUE 3
    if (CorretAnswers < 3) {
      //ESCONDE O BOTÃO
      setAlterarState(false);

      //MOSTRA OS BOTÕES
      setButtonsForm(true);

      //MUDA O TEXTO
      //P1
      setP1(
        <>
        Para que possas verificar este conceito, montámos o seguinte <span className="italic text-secondary">showcase</span>, onde vais poder ver como o design pode alterar o significado de algo, neste caso, a frase "<span className="italic text-secondary">Hello There</span>".
        </>
        
      );

      //P2
      setP2("Altera o design e diz-nos que tipo de mensagem te transmite.");
    }
  };

  //RESPOSTA DO BOTÃO
  const handleFormButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    //SE O NÚMERO DE RESPOSTAS CERTAS FOR 0
    if (CorretAnswers === 0) {
      //GUARDA QUE JÁ FOI SUBMETIDO A PRIMEIRA VEZ E FAZ O PRIMEIRO SWITCH
      submitCount.current = 1;
    } else if (CorretAnswers === 1) {
      //GUARDA QUE JÁ FOI SUBMETIDO A SEGUNDA VEZ E FAZ O SEGUNDO SWITCH
      submitCount.current = 2;
    } else if (CorretAnswers === 2) {
      //GUARDA QUE JÁ FOI SUBMETIDO A TERCEIRA VEZ E FAZ O TERCEIRO SWITCH
      submitCount.current = 3;
    }

    //SAVE BUTTON VALUE
    const buttonValue = event.currentTarget.value;

    //SWITCH PARA VERIFICAR O NÚMERO DE VEZES QUE O FORM FOI SUBMETIDO
    switch (submitCount.current) {
      //PRIMEIRO
      case 1:
        //ALTERAR A MENSAGEM CONFORME O QUE A PESSOA SELECIONOU
        switch (buttonValue) {
          case "Alegria": //PRIMEIRO CERTO
            //MUDA TEXTO DE CIMA
            setP1(
            <>
            Exatamente o que pensámos! Como pudeste ver, uma simples alteração de design consegue alterar o significado da frase.
            </>

            );

            //MUDA TEXTO DE BAIXO
            setP2("Que dizes tentarmos mudar o design de novo?");

            //VOLTA A APARECER BOTÃO DE ALTERAR
            setButtonsForm(false);
            setAlterarState(true);

            //GUARDA QUE ACERTOU
            setCorretAnswers(CorretAnswers + 1);
            break;

          case "Paixão": //ERRADO NESTA RUN
            //MUDA TEXTO DE CIMA
            setP1(
              <>
              Parece-nos ser algo mais feliz, mas as sensações mudam de pessoa para pessoa! O que importa é que, como pudeste ver, uma simples alteração de design consegue alterar o significado da frase.</>
                         );

            //MUDA TEXTO DE BAIXO
            setP2("Que dizes tentarmos mudar o design de novo?");

            //VOLTA A APARECER BOTÃO DE ALTERAR
            setAlterarState(true);
            setButtonsForm(false);
            break;

          case "Calma": //ERRADO NESTA RUN
            //MUDA TEXTO DE CIMA
            setP1(
<>
Parece-nos ser algo mais feliz, mas as sensações mudam de pessoa para pessoa! O que importa é que, como pudeste ver, uma simples alteração de design consegue alterar o significado da frase.</>            );

            //MUDA TEXTO DE BAIXO
            setP2("Que dizes tentarmos mudar o design de novo?");

            //VOLTA A APARECER BOTÃO DE ALTERAR
            setAlterarState(true);
            setButtonsForm(false);
            break;
        }

        break;

      //SEGUNDO
      case 2:
        //ALTERAR A MENSAGEM CONFORME O QUE A PESSOA SELECIONOU
        switch (buttonValue) {
          case "Alegria": //ERRADO NESTA RUN
            //MUDA TEXTO DE CIMA
            setP1(
<>
Parece-nos ser algo mais carinhoso, mas as sensações mudam de pessoa para pessoa! O que importa é que, como pudeste ver, uma simples alteração de design consegue alterar o significado da frase.</>            );

            //MUDA TEXTO DE BAIXO
            setP2("Que dizes tentarmos mudar o design de novo?");

            //VOLTA A APARECER BOTÃO DE ALTERAR
            setAlterarState(true);
            setButtonsForm(false);

            break;

          case "Paixão": //CERTO NESTA RUN
            //MUDA TEXTO DE CIMA
            setP1(
              <>Exatamente o que pensámos! Como pudeste ver, uma simples alteração de design consegue alterar o significado da frase.</>
            );

            //MUDA TEXTO DE BAIXO
            setP2("Que dizes tentarmos mudar o design de novo?");

            //GUARDA QUE ACERTOU
            setCorretAnswers(CorretAnswers + 1);

            //VOLTA A APARECER BOTÃO DE ALTERAR
            setAlterarState(true);
            setButtonsForm(false);
            break;

          case "Calma": //ERRADO NESTA RUN
            //MUDA TEXTO DE CIMA
            setP1(
<>
<>
              Parece-nos ser algo mais feliz, mas as sensações mudam de pessoa para pessoa! O que importa é que, como pudeste ver, uma simples alteração de design consegue alterar o significado da frase.</>
</>           );

            //MUDA TEXTO DE BAIXO
            setP2("Que dizes tentarmos mudar o design de novo?");

            //VOLTA A APARECER BOTÃO DE ALTERAR
            setAlterarState(true);
            setButtonsForm(false);

            break;
        }

        break;
      //TERCEIRO
      case 3:
        //ALTERAR A MENSAGEM CONFORME O QUE A PESSOA SELECIONOU
        switch (buttonValue) {
          case "Alegria": //ERRADO NESTA RUN
            //MUDA TEXTO DE CIMA
            setP1(<>Algo mais calmo talvez, mas de facto diferente!</>);

            //MUDA TEXTO DE BAIXO
            setP2(
              "Podes experimentar outros designs, ou pressiona o botão para continuar."
            );

            //VOLTA A APARECER BOTÃO DE ALTERAR
            setAlterarState(true);
            setButtonsForm(false);

            break;

          case "Paixão": //ERRADO NESTA RUN
            //MUDA TEXTO DE CIMA
            setP1(<>Algo mais calmo talvez, mas de facto diferente!</>);

            //MUDA TEXTO DE BAIXO
            setP2(
              "Podes experimentar outros designs, ou pressiona o botão para continuar."
            );

            //VOLTA A APARECER BOTÃO DE ALTERAR
            setAlterarState(true);
            setButtonsForm(false);
            break;

          case "Calma": //CERTO NESTA RUN
            //MUDA TEXTO DE CIMA
            setP1(
              <>Exatamente o que pensámos! Como pudeste ver, uma simples alteração de design consegue alterar o significado da frase.</>
            );

            //MUDA TEXTO DE BAIXO
            setP2("Que dizes tentarmos mudar o design de novo?");

            //GUARDA QUE ACERTOU
            setCorretAnswers(CorretAnswers + 1);

            //VOLTA A APARECER BOTÃO DE ALTERAR
            setP1(
              <>O design de algo pode mudar imensamente a mensagem e sentimento que transmite (<span className="italic text-secondary">Form Follows Meaning</span>), devendo ser algo pensado e desenhado para qualquer objeto ou peça, realçando o significado que queremos.</>
            );
            setP2(
              "Agora, que me dizes de explorarmos o último conceito? Anda daí!"
            );
            setAlterarState(false);
            setButtonsForm(false);
            setShowDialog(true);

            break;
        }

        break;
    }
  };

  const SaveBadgeProgressAndGoToNextPage = () => {
    //SAVE PROGRESS
    setProgressSave(true);
  };

  // Tooltip
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <Link
          href="/chapters/chapter2/8"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col">
          <p className="text-white font-medium pb-10">{P1}</p>
          <p className="text-white font-medium pb-10">{P2}</p>
          <AnimatePresence>
            {!showDialog && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                exit={{ opacity: 0 }}
                className={BGText}
              >
                <p className={`text-white px-20 py-10 text-6xl ${TextFont}`}>
                  Hello There.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          {AlterarState && (
            <Button asChild className="text-white bg-secondary hover:bg-hover-secondary" onClick={showButtonsForm}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ opacity: { duration: 1, delay: 0.2 } }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                className="cursor-pointer "
              >
                Responder
              </motion.div>
            </Button>
          )}

          {ButtonsForm && (
            <form className="flex flex-row justify-between items-center space-x-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ opacity: { duration: 1, delay: 0.2 } }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                className="cursor-pointer"
              >
                <Button
                  type="button"
                  value="Alegria"
                  className="text-white bg-secondary hover:bg-hover-secondary"
                  onClick={handleFormButtonClick}
                >
                  Alegria
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ opacity: { duration: 1, delay: 0.2 } }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                className="cursor-pointer"
              >
                <Button
                  type="button"
                  value="Paixão"
                  className="text-white bg-secondary hover:bg-hover-secondary"
                  onClick={handleFormButtonClick}
                >
                  Paixão
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ opacity: { duration: 1, delay: 0.2 } }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                className="cursor-pointer"
              >
                <Button
                  type="button"
                  value="Calma"
                  className="text-white bg-secondary hover:bg-hover-secondary"
                  onClick={handleFormButtonClick}
                >
                  Calma
                </Button>
              </motion.div>
            </form>
          )}

          {showDialog && (
            <Dialog>
              <DialogTrigger>
                <motion.div
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  className="group"
                >
                  <Button className="text-white bg-secondary hover:bg-hover-secondary">
                    Continuar
                    <FaArrowRight className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-all duration-150" />
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Acertaste todos!</DialogTitle>
                  <DialogDescription>Vamos continuar?</DialogDescription>
                  <Button onClick={SaveBadgeProgressAndGoToNextPage}>
                    Sim
                  </Button>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
          <div className="fixed bottom-5 left-5">
            <TooltipProvider delayDuration={0}>
              <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                <TooltipTrigger className="cursor-help" onClick={toggleTooltip}>
                  <MdQuestionMark className="text-white h-10 w-10 justify-start items-start" />
                </TooltipTrigger>
                <TooltipContent
                  className="bg-[#142839] border-none shadow-none text-white"
                  sideOffset={5}
                >
                  <p>{Tip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>

      {progressSave && progressSave === true && (
        <SaveBadgeProgressScript
          badgeId={badgeId}
          progress={percentage}
          nextPage={nextPage}
        />
      )}
    </>
  );
}
