// 'use client' é apenas necessário quando estamos a usar componentes do lado do cliente, por exemplo, os modelos 3D do react-three-fiber
"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { Suspense } from "react";
import Bmw from "../public/models/bmw/Bmw";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PictureStack from "../components/chapter2/Design_Jogo_Cadeiras";
import DragDropOrdenar from "../components/chapter2/Design_Jogo_Telemoveis";
import DragDrop from "../components/chapter2/Design_Jogo_Espremedor";

export default function Home() {
  return (
    <main className="grid grid-cols-12 gap-4 h-screen items-center justify-between p-24">
      <div className="col-span-12 border-2 border-red-600">
        linha 1 - 12 colunas
        <Canvas>
          <ambientLight color={"red"} />
          <OrbitControls enablePan={false} />
          <Suspense fallback={null}>
            <Bmw />
          </Suspense>
          <Environment preset="studio" />
        </Canvas>
      </div>
      <div className="col-span-12 border-2 border-red-600">
        linha 2 - 12 colunas
        <DndProvider backend={HTML5Backend}>
          <div className="col-span-12 flex">
            <PictureStack />
          </div>

          <DragDropOrdenar />
          <DragDrop />
        </DndProvider>
      </div>
      <div className="col-span-6 border-2 border-red-600">
        linha 3 - 6 colunas
      </div>
      <div className="col-span-6 border-2 border-red-600">
        linha 3 - 6 colunas
      </div>
    </main>
  );
}
