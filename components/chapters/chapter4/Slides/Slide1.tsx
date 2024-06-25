import React from "react";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

const Slide1 = () => {
  //CONTROLO DA ANIMAÇÃO
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 15, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 5000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-1 gap-4 ">
        <motion.div
          className="col-span-9 h-full"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="h-full justify-center items-center">
            <p className="font-medium pt-8 text-white">
              A linguagem foi mantida no tempo através da sua próxima evolução,
              a escrita, permitindo-nos registar ideias, libertando espaço
              mental e acelerando a nossa atividade enquanto espécie.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="h-full col-span-3 flex justify-center items-center"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <Tilt options={defaultOptions}>
            <Image
              src="/img/chapter4/chapter4img2.svg"
              alt="Imagem do elemento de tecnologia: a escrita"
              width={350}
              height={350}
              className="rounded tiltableImage"
              draggable={false}
            />
          </Tilt>
        </motion.div>
      </div>
    </>
  );
};

export default Slide1;
