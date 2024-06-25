"use client";
import React, { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { Tilt } from "react-tilt";
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
import Wagner2 from "@/public/models/wagner/Wagner2";

export default function Chapter1Page4() {
  const router = useRouter();

  // Estados relativos ao 3D
  const [text3DIsHovered, setText3DIsHovered] = useState(false);
  const [modelIsHovered, setModelIsHovered] = useState(false);

  const handleText3DClick = () => {
    router.push("/chapters/chapter1/5");
  };

  //PROGRESS
  const { setProgress } = useProgress();

  //PROGRESS VALUE
  setProgress(16.66 + 16.66 + 16.66);

  //CONTROLO DA ANIMAÇÃO
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 10, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 2500, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  return (
    <>
      <div className="bg-chapter1BG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover grid grid-cols-12">
        <Link
          href="/chapters/chapter1/3"
          className="text-black absolute top-20 left-15 flex items-center cursor-pointer"
        >
          <IoChevronBack className=" h-8 w-8" />
          <span>Voltar</span>
        </Link>
        <div className="col-span-1"></div>
        <div className="col-span-5 flex flex-col justify-center items-center p-10 mt-20 ">
          <p className="font-medium mb-10 select-none">
            <span className="italic">Wagner</span> implementou uma “fossa de
            orquestra” em palcos de teatro, reintroduzindo harmonia às peças
            neles tocadas através da música ao vivo, unindo todos estes
            elementos numa única obra, dando ao espectador uma experiência e
            sensação única.
          </p>
          <Link href="/chapters/chapter1/5">
            <Button>Continuar</Button>
          </Link>
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
                position={[0, 2, 0]}
                onPointerEnter={(event) => (
                  event.stopPropagation(), setText3DIsHovered(true)
                )}
                onPointerLeave={() => setText3DIsHovered(false)}
                onClick={handleText3DClick}
              >
                <Text3D
                  position={[0, 1, 0]}
                  size={0.3}
                  font={"/fonts/Effra_Regular.json"}
                  height={0.05}
                >
                  {`Gesamtkunstwerk >`}
                  <meshStandardMaterial
                    color={text3DIsHovered ? "orange" : "hsl(207, 48%, 15%)"}
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
          <Loader />
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
}
