"use client";

import { useGLTF } from "@react-three/drei";
import { ModelProps, useModel } from "./gltf";

// Gerado com gltfjsx a partir de tv.glb (--transform)
const URL = "/models/tv/tv-transformed.glb";

export default function Tv(props: ModelProps) {
  const { nodes, materials } = useModel(URL);
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.body.geometry} material={materials.PaletteMaterial001} rotation={[Math.PI / 2, 0, 0]} scale={0.004} />
    </group>
  );
}

useGLTF.preload(URL);
