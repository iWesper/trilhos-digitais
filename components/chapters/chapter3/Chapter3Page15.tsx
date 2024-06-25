"use client";
import React, {useEffect} from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

export default function Chapter3Page15() {

  //PROGRESS
  const { setProgress } = useProgress();

useEffect(() => {
   //PROGRESS VALUE
   setProgress(7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571+7.1428571428571428571428571428571);
}, []);   

  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <Link
          href="/chapters/chapter3/14"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col">
          <p className="text-white font-medium pb/10">
          Parece que percebeste como é que estes meios técnicos e modalidades são utilizadas para definir a especificidade dos <span className="italic">media</span>, e deste modo como nos é passada a mensagem, muito bem!
          </p>
          <p className="text-white font-medium pb-10">
          Agora, para acabar a nossa aventura pelos pilares, vamos ver como evoluíram as ferramentas de comunicação.
          </p>
          <p className="text-white font-medium pb-10">Próxima paragem: Tecnologia!</p>
          <motion.div
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              className="group"
            >
              <Button
                asChild
                className="text-white bg-foreground hover:bg-hover"
              >
                <Link href="/chapters/chapter4/1">
                  Continuar
                  <FaArrowRight className="ps-2 h-6 w-6 group-hover:moveRight" />
                </Link>
              </Button>
            </motion.div>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
