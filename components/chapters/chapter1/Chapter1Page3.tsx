"use client";
import React from "react";
import { Suspense, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdQuestionMark } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Billboard,
  Center,
  Environment,
  Loader,
  OrbitControls,
  Text3D,
  Outlines,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Wagner from "@/public/models/wagner/Wagner";

import SaveBadgeProgressScript from "../../../backend/SaveBadgeProgressScript";
import { useProgress } from "@/components/context/ProgressContext";
import { Button } from "@/components/ui/button";

export default function Chapter1Page3() {

  // Estados relativos ao 3D
  const [text3DIsHovered, setText3DIsHovered] = useState(false);
  const [modelIsHovered, setModelIsHovered] = useState(false);

  const handleText3DClick = () => {
    setProgressSave(true);
  };

  //BADGE DO CAPÍTULO
  const badgeId = 1;

  //PERCENTAGEM CONFERIDA AQUI
  const percentage = 50;

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(16.66 + 16.66);

  //GO TO
  const nextPage = "/chapters/chapter1/4";

  //SAVE PROGRESS STATE
  const [progressSave, setProgressSave] = useState<boolean>(false);

  //TIP
  const Tip =
    "Parece que o palco esconde um segredo escondido algures, perguntamo-nos onde…";

  return (
    <>
      <div className="bg-chapter1BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12">
        <Link
          href="/chapters/chapter1/2"
          className="text-black absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-1"></div>
        <div className="col-span-5 flex flex-col justify-center items-center p-10 mt-20 ">
          <p className="font-medium mb-10 select-none">
            Segundo <span className="italic">Wagner</span>, com a queda de
            Atenas, as artes fragmentaram-se, separando a palavra, a música e a
            dança, e este defendia que para restaurar a harmonia na arte, estas
            artes deveriam ser unidas novamente, nascendo assim o conceito de{" "}
            <span className="italic">Gesamtkunstwerk</span>, ou “Obra Total”.
          </p>
          <p className="font-medium mb-10 select-none">
            Agora, vamos ver como <span className="italic">Wagner</span> colocou
            o seu conceito em prática? Interage com o palco que te é mostrado e
            vê a sua criação ganhar vida!
          </p>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-4 flex justify-center items-center">
          <Canvas>
            <Suspense fallback={null}>
              <OrbitControls
                autoRotate={modelIsHovered ? false : true}
                autoRotateSpeed={0.2}
                enableZoom={false}
                enablePan={false}
              />
              {/* rotation={[-0.05, 3.7, 0]} em caso de necessidade*/}
              <Center
                position={[0, 1.5, 0]}
                onPointerEnter={(event) => (
                  event.stopPropagation(), setText3DIsHovered(true)
                )}
                onPointerLeave={() => setText3DIsHovered(false)}
                onClick={handleText3DClick}
              >
                <Text3D size={0.3} font={"/fonts/Effra_Regular.json"} height={0.05}>
                  {`Gesamtkunstwerk >`}
                  <meshStandardMaterial
                    color={text3DIsHovered ? "orange" : "hsl(207, 48%, 15%)"}
                    
                  />
                  <Outlines thickness={0.005} color="white" />
                </Text3D>
              </Center>
              <Wagner
                rotation={[0, 0, 0]}
                scale={0.05}
                onPointerEnter={(event: React.PointerEvent) => (
                  event.stopPropagation(), setModelIsHovered(true)
                )}
                onPointerLeave={() => setModelIsHovered(false)}
              />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
          <Loader />
        </div>
        <div className="col-span-1"></div>
        <div className="fixed bottom-5 left-5">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="cursor-help">
                <MdQuestionMark className="text-black h-10 w-10 justify-start items-start " />
              </TooltipTrigger>
              <TooltipContent className="bg-foreground border-none shadow-none text-white">
                <p>{Tip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {progressSave && progressSave == true && (
        <SaveBadgeProgressScript
          badgeId={badgeId}
          progress={percentage}
          nextPage={nextPage}
        />
      )}
    </>
  );
}
