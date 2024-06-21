"use client";
import React, { useEffect, useState, useRef } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { useToast } from "@/components/ui/use-toast";
import SaveBadgeProgressScript from "../../../backend/SaveBadgeProgressScript";
import { useAuth } from "@/components/context/AuthContext";
import { Button } from "@/components/ui/button";

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
    //PROGRESS VALUE

    //TOAAST
    WillShowToast(badgeId);
    setProgress(25 + 25 + 25);
  }, []);

  const SaveBadgeProgressAndGoToNextPage = () => {
    if (willShowToastState === true) {
      toast({
        title: "Nova conquista registada.",
        description: "Ganhaste o teu terceiro badge!",
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
          className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-2"></div>
        <div className="col-span-8 flex justify-start items-center text-center flex-col pt-20">
          <h4 className="text-white font-medium p-6 pb-8 text-8xl font-effra">
            SIM!
          </h4>
          <p className="text-white font-medium pb-8">
            É quase que uma característica psicológica nossa, a necessidade de
            criar e melhorar, incentivando-nos a nós mesmos e uns aos outros de
            evoluir, alcançando novos patamares e melhorando continuamente.
          </p>
          <Button
            className=" text-white"
            onClick={SaveBadgeProgressAndGoToNextPage}
          >
            Continuar
          </Button>
          {error && (<p className=" text-red-600 text-center text-sm">{error}</p>)}
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
