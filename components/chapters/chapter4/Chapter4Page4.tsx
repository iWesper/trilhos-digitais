"use client";
import React, { useEffect, useState, useRef } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { useToast } from "@/components/ui/use-toast";
import SaveBadgeProgressScript from "../../../backend/SaveBadgeProgressScript";
import { useAuth } from "@/components/context/AuthContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

export default function Chapter4Page4() {
  //BADGE DO CAPÍTULO
  const badgeId = 4;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 100;
  //GO TO
  const nextPage = "/chapters/chapter4/5";

  //TOAST
  const { toast } = useToast();

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);
  //PROGRESS
  const { setProgress } = useProgress();

  //AUTH Se for false tem badge, true não tem
  const { WillShowToast, willShowToastState, error } = useAuth();

  useEffect(() => {
  
    //TOAAST
    WillShowToast(badgeId);
    setProgress(25 + 25 + 25);
  }, []);

  const SaveBadgeProgressAndGoToNextPage = () => {
    if (willShowToastState === true) {
      toast({
        title: "Nova conquista registada.",
        description: "Ganhaste o teu quarto badge!",
      });
    }

    //PODE IR GUARDAR
    setProgressSave(true);
  };

  return (
    <>
      <div className="bg-chapter4BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <Link
          href="/chapters/chapter4/3"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col pt-20">
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-white font-medium p-6 pb-8 text-8xl font-effra"
          >
            SIM!
          </motion.h4>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-white font-medium pb-8"
          >
            É quase que uma característica psicológica nossa, a necessidade de
            criar e melhorar, incentivando-nos a nós mesmos e uns aos outros de
            evoluir, alcançando novos patamares e melhorando continuamente.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            className="group"
          >
            <Button
              asChild
              className=" text-white"
              onClick={SaveBadgeProgressAndGoToNextPage}
            >
              <Link href="/chapters/chapter4/5">
                Continuar
                <FaArrowRight className="ps-2 h-6 w-6 group-hover:moveRight" />
              </Link>
            </Button>
          </motion.div>
          {error && (
            <p className=" text-red-600 text-center text-sm">{error}</p>
          )}
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
