"use client";
import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { Canvas } from "@react-three/fiber";
import Bauhaus from "@/public/models/bauhaus/Bauhaus";
import {
  Center,
  Environment,
  Loader,
  OrbitControls,
  Text3D,
  Outlines,
} from "@react-three/drei";
import { MdQuestionMark } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export default function Chapter2Page2() {
  //Dica
  const Tip = "Interage com o modelo da Bauhaus para avançares.";
  const router = useRouter();
  //PROGRESS
  const { setProgress } = useProgress();

  // Estados relativos ao 3D
  const [text3DIsHovered, setText3DIsHovered] = useState(false);
  const [modelIsHovered, setModelIsHovered] = useState(false);

  const handleText3DClick = () => {
    router.push("/chapters/chapter2/3");
  };

  //PROGRESS VALUE
  setProgress(10);

  return (
    <>
      <div className="bg-chapter2BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12 grid-rows-1">
        <Link
          href="/chapters/chapter2/1"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-1 h-full"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="col-span-4 h-full"
        >
          <div className="h-full flex flex-col justify-center items-center p-10 text-white ">
            <p className="font-medium mb-4 select-none">
              A <span className="italic text-secondary">Bauhaus</span>uma das
              escolas mais influentes na história do Design, transformando a
              perceção da sociedade quanto à arte através da sua integração das
              artes plásticas com o artesanato.
            </p>
            <p className="font-medium mb-10 select-none">
              Que dizes de explorarmos o seu método de criação? Anda daí!
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full col-span-6 flex justify-center items-center"
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
              <Center
                position={[0, 1.5, 0]}
                onPointerEnter={(event) => (
                  event.stopPropagation(), setText3DIsHovered(true)
                )}
                onPointerLeave={() => setText3DIsHovered(false)}
                onClick={handleText3DClick}
              >
                <Text3D
                  size={0.3}
                  font={"/fonts/Effra_Regular.json"}
                  height={0.05}
                >
                  {`Bauhaus >`}
                  <meshStandardMaterial
                    color={text3DIsHovered ? "orange" : "hsl(0, 0%, 98%)"}
                  />
                  <Outlines thickness={0.005} color="hsl(207, 48%, 15%)" />
                </Text3D>
              </Center>
              <Bauhaus
                rotation={[0, 3.7, 0]}
                scale={0.3}
                onPointerEnter={(event: React.PointerEvent) => (
                  event.stopPropagation(), setModelIsHovered(true)
                )}
                onPointerLeave={() => setModelIsHovered(false)}
              />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>

          {/* <Link href="/chapters/chapter2/3">Temp go to next</Link> */}
        </motion.div>
        <div className="h-full col-span-1"></div>
      </div>
      <div className="fixed bottom-5 left-5">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger className="cursor-help">
              <MdQuestionMark className="text-white h-10 w-10 justify-start items-start " />
            </TooltipTrigger>
            <TooltipContent className="bg-[#142839] border-none shadow-none text-white">
              <p>{Tip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
