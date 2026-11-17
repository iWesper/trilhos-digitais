"use client";
import React, { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useProgress } from "@/components/context/ProgressContext";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Center,
  Text3D,
  Outlines,
  Environment,
  Loader,
} from "@react-three/drei";
import Wagner2 from "@/components/models/Wagner2";
import { motion } from "framer-motion";
import { enterAfter } from "@/lib/motion";

export default function Chapter1Page4() {
  const router = useRouter();

  // Estados relativos ao 3D
  const [text3DIsHovered, setText3DIsHovered] = useState(false);
  const [modelIsHovered, setModelIsHovered] = useState(false);

  const handleText3DClick = () => {
    document.body.style.cursor = "auto";
    router.push("/chapters/chapter1/5");
  };

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  useEffect(() => {
    setProgress(16.66 + 16.66 + 16.66);
  }, [setProgress]);


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
          href="/chapters/chapter1/3"
          className="text-black absolute top-28 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-1"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enterAfter(0.25)}
          className="col-span-5 flex flex-col justify-center items-center p-10 mt-20 "
        >
          <p className="font-medium mb-10 select-none">
            <span className="italic text-tertiary">Wagner</span> implementou uma
            “fossa de orquestra” em palcos de teatro, reintroduzindo harmonia às
            peças neles tocadas através da música ao vivo, unindo todos estes
            elementos numa única obra, dando ao espectador uma experiência e
            sensação única.
          </p>
        </motion.div>
        <div className="col-span-1"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enterAfter(0.25)}
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
              <Center position={[0, 2, 0]}>
                <mesh
                  onPointerEnter={(event) => (
                    event.stopPropagation(), setText3DIsHovered(true)
                  )}
                  onPointerLeave={() => setText3DIsHovered(false)}
                  onClick={handleText3DClick}
                  position={[1.8, 1.1275, 0.025]}
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
                  position={[0, 1, 0]}
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
              <Wagner2
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
      </div>
    </>
  );
}
