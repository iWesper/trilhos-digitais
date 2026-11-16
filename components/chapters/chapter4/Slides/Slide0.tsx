import React from "react";
import Image from "next/image";
import { Tilt } from "@/components/ui/tilt";
import { motion } from "framer-motion";

const Slide0 = () => {
  return (
    <>
      <motion.div
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
          <Tilt>
            <Image
              src="/img/chapter4/chapter4img1.svg"
              alt="Imagem do elemento de tecnologia: a linguagem"
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

export default Slide0;
