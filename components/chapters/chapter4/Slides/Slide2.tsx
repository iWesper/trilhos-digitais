import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Loader } from "@react-three/drei";
import Prensa from "@/public/models/prensa/Prensa";

const Slide2 = () => {
  // Estados relativos ao 3D
  const [modelIsHovered, setModelIsHovered] = useState(false);

  //CONTROLO DA ANIMAÇÃO
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 15, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 5000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };
  return (
    <>
      <motion.div
        className="h-full grid grid-cols-6 grid-rows-1 gap-4 justify-center items-center"
        initial={{ opacity: 0, x: 1500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="col-span-6 h-full justify-center">
          <div className="h-full justify-center items-center flex">
            <p className="font-medium pt-8 text-white select-none">
              No entanto, livros demoravam muito a serem escritos. Para acelerar
              esse processo, foi inventada a prensa, uma máquina que permitia
              não só o registo rápido de informação, mas que também a criação e
              partilha desses livros para um maior número de pessoas.
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="h-full w-full col-span-6 flex justify-center items-center"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="h-full w-full justify-center items-center">
          <Canvas className="w-full">
            <Suspense fallback={null}>
              <OrbitControls
                autoRotate={modelIsHovered ? false : true}
                autoRotateSpeed={0.2}
                enableZoom={false}
                enablePan={false}
              />
              {/* rotation={[-0.05, 3.7, 0]} em caso de necessidade*/}
              <Prensa
                position={[0, -1, 0]}
                scale={0.08}
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
      </motion.div>
    </>
  );
};

export default Slide2;
