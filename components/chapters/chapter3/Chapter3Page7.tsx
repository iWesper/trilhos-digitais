"use client";
import React, { Suspense, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProgress } from "@/components/context/ProgressContext";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { Environment, Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Tv from "@/public/models/tv/Tv";

export default function Chapter3Page7() {
  const router = useRouter();
  // Estados relativos ao 3D
  const [modelIsHovered, setModelIsHovered] = useState(false);

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(
    7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571 +
      7.1428571428571428571428571428571
  );

  return (
    <>
      <div className="bg-chapter3BG h-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12  justify-center items-center p-4">
        <Link
          href="/chapters/chapter3/6"
          className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-1"></div>
        <div className="col-span-4 flex justify-start items-center text-center flex-col">
          <p className="text-white font-medium pb-10 select-none">
            Uau, parece que percebeste bem como são distinguidos os meios
            técnicos. No entanto, existem também quatro modalidades que permitem
            distinguir os <span className="italic">media</span>.
          </p>
          <p className="text-white font-medium pb-10 select-none">Vamos descobri-las!</p>
          <motion.div
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            className="group"
          >
            <Button asChild className="text-white bg-foreground hover:bg-hover">
              <Link href="/chapters/chapter3/8">
                Continuar
                <FaArrowRight className="ps-2 h-6 w-6 group-hover:moveRight" />
              </Link>
            </Button>
          </motion.div>
        </div>
        <div className="col-span-6 h-full w-full">
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
                rotation={[0, 0, 0]}
                scale={1}
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
      </div>
    </>
  );
}
