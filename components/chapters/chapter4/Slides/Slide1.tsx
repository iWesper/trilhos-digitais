import React from "react";
import Image from "next/image";
import { Tilt } from "@/components/ui/tilt";
import { motion } from "framer-motion";

const Slide1 = () => {
  return (
    <>
      <motion.div
        className="grid grid-cols-12 grid-rows-1 gap-4 "
      >
        <div className="col-span-9 h-full">
          <div className="h-full justify-center items-center">
            <p className="font-medium pt-8 text-white">
              A linguagem foi mantida no tempo através da sua próxima evolução,
              a escrita, permitindo-nos registar ideias, libertando espaço
              mental e acelerando a nossa atividade enquanto espécie.
            </p>
          </div>
        </div>
        <div className="h-full col-span-3 flex justify-center items-center">
          <Tilt>
            <Image
              src="/img/chapter4/chapter4img2.svg"
              alt="Imagem do elemento de tecnologia: a escrita"
              width={350}
              height={350}
              className="rounded"
              draggable={false}
            />
          </Tilt>
        </div>
      </motion.div>
    </>
  );
};

export default Slide1;
