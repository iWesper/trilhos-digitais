import React from "react";
import Image from "next/image";
import { Tilt } from "@/components/ui/tilt";
import { motion } from "framer-motion";
import { hover } from "@/lib/motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";

const Slide4 = () => {
  //CONTROLO DA ANIMAÇÃO
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 8, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.03, // 2 = 200%, 1.5 = 150%, etc..
    speed: 400, // Speed of the enter/exit transition
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
        >
          <div className="h-full justify-center items-center flex flex-col">
            <p className="font-medium pt-8 text-white">
              Por fim chegamos à comunicação ubíqua, a troca de informações
              entre pessoas localizadas em locais geográficos diferentes,
              tornada possível pela invenção de tecnologias como a internet,
              deixando assim uma grande parte do mundo alcançável.
            </p>
            <motion.div
              whileHover={hover}
              className="group mt-8"
            >
              <Button
                asChild
                className="text-white bg-primary hover:bg-hover-primary"
              >
                <Link href="/chapters/chapter4/3">
                  Continuar
                  <FaArrowRight className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-150 ease-out" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="h-full col-span-3 flex justify-center items-center"
          initial={{ x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: 0.08 }}
        >
          <Tilt options={defaultOptions}>
            <Image
              src="/img/chapter4/chapter4img4.svg"
              alt="Imagem do elemento de tecnologia: a comunicação ubíqua"
              width={350}
              height={350}
              className="rounded"
              draggable={false}
            />
          </Tilt>
        </motion.div>
      </div>
    </>
  );
};

export default Slide4;
