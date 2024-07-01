import React from "react";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

const Slide0 = () => {
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
      <motion.div
        initial={{ opacity: 0, x: 1500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-12 grid-rows-1 gap-4 "
      >
        <div className="col-span-9 h-full">
          <div className="h-full justify-center items-center">
            <p className="font-medium pt-8 text-white">
              Esta história começa, naturalmente, pela linguagem. Com esta
              ganhámos a capacidade de nos expressarmos e de traduzir a nossa
              realidade para outros.
            </p>
          </div>
        </div>
        <div className="h-full col-span-3 flex justify-center items-center">
          <Tilt options={defaultOptions}>
            <Image
              src="/img/chapter4/chapter4img1.svg"
              alt="Imagem do elemento de tecnologia: a linguagem"
              width={350}
              height={350}
              className="rounded tiltableImage"
              draggable={false}
            />
          </Tilt>
        </div>
      </motion.div>
    </>
  );
};

export default Slide0;
