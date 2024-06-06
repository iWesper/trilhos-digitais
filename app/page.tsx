'use client'

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { Suspense } from "react";
import Bmw from '../public/models/bmw/Bmw'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24">
      <Canvas>
        <ambientLight color={'red'} />
        <OrbitControls enablePan={false} />
        <Suspense fallback={null}>
          <Bmw />
        </Suspense>
        <Environment preset="studio" />
      </Canvas>
    </main>
  );
}
