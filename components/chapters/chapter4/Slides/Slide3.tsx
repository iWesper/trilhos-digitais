import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Loader } from "@react-three/drei";
import Prensa from "@/components/models/Prensa";

const Slide3 = () => {
  // Estados relativos ao 3D
  const [modelIsHovered, setModelIsHovered] = useState(false);

  return (
    <>
      <motion.div
        className="h-full grid grid-cols-12 grid-rows-1 gap-4 justify-center items-center"
      >
        <div className="col-span-6 h-full justify-center">
          <div className="h-full justify-center items-center flex flex-col">
            <p className="font-medium pt-8 text-white select-none">
              Esta facilitou a passagem de conhecimento, criando condições para
              a próxima evolução, o método científico. O método científico é a
              criação de teses, hipóteses e teorias, aumentando o conhecimento
              científico da população, tudo graças à massificação da escrita e
              dos livros.
            </p>
            <p className="font-medium pt-8 text-white select-none">
              A produção em massa tornou este processo mais fácil e cómodo
              através da automatização, criando novas matérias e processos.
            </p>
          </div>
        </div>
        <div className="h-full w-full col-span-6 flex justify-center items-center">
          <div className="h-full w-full justify-center items-center flex">
            <Canvas>
              <Suspense fallback={null}>
                <OrbitControls
                  autoRotate={modelIsHovered ? false : true}
                  autoRotateSpeed={0.2}
                  enableZoom={false}
                  enablePan={false}
                />
                <Prensa
                  progress={100}
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
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Slide3;
