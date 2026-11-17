"use client";
import { BackLink } from "@/components/chapters/ChapterNav";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { useAuth } from "@/components/context/AuthContext";
import { motion } from "framer-motion";
import { enter, hover } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { HiCheck } from "react-icons/hi";

export default function Chapter4Page5() {
  const { goGetUsername, username, currentUser, error } = useAuth();
  const { setProgress } = useProgress();

  useEffect(() => {
    //PROGRESS VALUE
    setProgress(25 + 25 + 25 + 25);

    if (currentUser !== null) {
      //USERNAME
      goGetUsername(currentUser.uid);
    }
  }, [currentUser, goGetUsername, setProgress]);


  return (
    <>
      <div className="bg-chapter4BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <BackLink href="/chapters/chapter4/4" />
        <div className="col-span-2"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="col-span-8 flex justify-start items-center text-center flex-col pt-20"
        >
          <p className="text-white font-medium p-6 pb-8">
            Bem, {username}, parece que acabámos a primeira parte da nossa
            aventura pela história da multimédia e já aprendemos tanto, muito
            bem!
          </p>
          <p className="text-white font-medium pb-8">
            Agora já sabes tudo sobre as bases da multimédia desde a sua origem.
          </p>
          <p className="text-white font-medium pb-8">
            Volta em breve para veres os novos conteúdos que estamos a preparar
            para ti!
          </p>
          <motion.div
              whileHover={hover}
              className="group"
            >
              <Button
                asChild
                className="text-white bg-primary hover:bg-hover-primary"
              >
                <Link href="/">
                  Concluir
                  <HiCheck className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-all duration-150" />
                </Link>
              </Button>
            </motion.div>
          {error && (
            <p className=" text-red-600 text-center text-sm">{error}</p>
          )}
        </motion.div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
