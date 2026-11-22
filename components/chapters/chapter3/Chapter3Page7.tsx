"use client";
import { BackLink, NextButton } from "@/components/chapters/ChapterNav";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/components/context/ProgressContext";

import { motion } from "framer-motion";
import { enterAfter, hover } from "@/lib/motion";
import { Environment, Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Tv from "@/components/models/Tv";

export default function Chapter3Page7() {
  const router = useRouter();
  // Estados relativos ao 3D
  const [modelIsHovered, setModelIsHovered] = useState(false);

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
    setProgress(
      7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571 +
        7.1428571428571428571428571428571
    );
  }, [setProgress]);

  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <BackLink href="/chapters/chapter3/6" />
        <div className="col-span-1"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enterAfter(0.25)}
          className="col-span-4 flex justify-start items-center text-center flex-col"
        >
          <p className="text-white font-medium pb-10 select-none">
            Uau, parece que percebeste bem como são distinguidos os <span className="text-foreground">meios técnicos</span>. No entanto, existem também quatro modalidades que permitem
            distinguir os <span className="italic text-foreground">media</span>.
          </p>
          <p className="text-white font-medium pb-10 select-none">
            Vamos descobri-las!
          </p>
          <NextButton href="/chapters/chapter3/8" className="text-white bg-[#142839] hover:bg-hover select-none" />
        </motion.div>
        <motion.div           initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enterAfter(0.25)} className="col-span-6 h-full w-full">
          <Canvas>
            <Suspense fallback={null}>
              <OrbitControls
                autoRotate={modelIsHovered ? false : true}
                autoRotateSpeed={0.2}
                enableZoom={false}
                enablePan={false}
              />
              {/* rotation={[-0.05, 3.7, 0]} em caso de necessidade*/}
              <Tv
                rotation={[0, -0.75, 0]}
                position={[-0.25, 0, 0.5]}
                scale={1}
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
      </div>
    </>
  );
}
