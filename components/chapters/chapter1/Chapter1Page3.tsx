"use client";
import React from "react";
import { Suspense, useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { MdQuestionMark } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Center,
  Environment,
  Loader,
  OrbitControls,
  Text3D,
  Outlines,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Wagner from "@/public/models/wagner/Wagner";
import { motion } from "framer-motion";

import SaveBadgeProgressScript from "../../../backend/SaveBadgeProgressScript";
import { useProgress } from "@/components/context/ProgressContext";

export default function Chapter1Page3() {
  // Estados relativos ao 3D
  const [text3DIsHovered, setText3DIsHovered] = useState(false);
  const [modelIsHovered, setModelIsHovered] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleText3DClick = () => {
    document.body.style.cursor = "auto";
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

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  // Mudar o cursor quando o Texto 3D está hovered
  useEffect(
    () =>
      void (document.body.style.cursor = text3DIsHovered ? "pointer" : "auto"),
    [text3DIsHovered]
  );

  return (
    <>
      <div className="bg-chapter1BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12">
        <Link
          href="/chapters/chapter1/2"
          className="text-black absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-1"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="col-span-5 flex flex-col justify-center items-center p-10 mt-20 "
        >
          <p className="font-medium mb-10 select-none">
            Segundo <span className="italic text-tertiary">Wagner</span>, com a
            queda de Atenas, as artes fragmentaram-se, separando a palavra, a
            música e a dança, e este defendia que para restaurar a harmonia na
            arte, estas artes deveriam ser unidas novamente, nascendo assim o
            conceito de{" "}
            <span className="italic text-tertiary">Gesamtkunstwerk</span>, ou
            “Obra Total”.
          </p>
          <p className="font-medium mb-10 select-none">
            Agora, vamos ver como{" "}
            <span className="italic text-tertiary">Wagner</span> colocou o seu
            conceito em prática? Interage com o palco que te é mostrado e vê a
            sua criação ganhar vida!
          </p>
        </motion.div>
        <div className="col-span-1"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="col-span-4 flex justify-center items-center"
        >
          <Canvas>
            <Suspense fallback={null}>
              <OrbitControls
                autoRotate={modelIsHovered ? false : true}
                autoRotateSpeed={0.2}
                enableZoom={false}
                enablePan={false}
              />
              {/* rotation={[-0.05, 3.7, 0]} em caso de necessidade*/}
              <Center position={[0, 1.5, 0]}>
                <mesh
                  onPointerEnter={(event) => (
                    event.stopPropagation(), setText3DIsHovered(true)
                  )}
                  onPointerLeave={() => setText3DIsHovered(false)}
                  onClick={handleText3DClick}
                  position={[1.8, 0.15, 0.025]}
                  scale={[3.7, 0.5, 1.1]}
                >
                  <boxGeometry attach="geometry" args={[1, 1, 0.1]} />
                  <meshBasicMaterial
                    attach="material"
                    transparent
                    opacity={0}
                  />
                </mesh>
                <Text3D
                  size={0.3}
                  font={"/fonts/Effra_Regular.json"}
                  height={0.05}
                >
                  {`Gesamtkunstwerk >`}
                  <meshStandardMaterial
                    color={text3DIsHovered ? "hsl(282, 25%, 48%)" : "hsl(207, 48%, 15%)"}
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
        </motion.div>
        <div className="col-span-1"></div>
        <div className="fixed bottom-5 left-5">
          <TooltipProvider delayDuration={0}>
            <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
              <TooltipTrigger className="cursor-help" onClick={toggleTooltip}>
                <MdQuestionMark className="text-black h-10 w-10 justify-start items-start" />
              </TooltipTrigger>
              <TooltipContent
                className="bg-[#142839] border-none shadow-none text-white"
                sideOffset={5}
              >
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
