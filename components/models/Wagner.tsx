"use client";

import { useGLTF } from "@react-three/drei";
import { ModelProps, useModel } from "./gltf";

// Gerado com gltfjsx a partir de wagner.glb (--transform)
const URL = "/models/wagner/wagner-transformed.glb";

export default function Wagner(props: ModelProps) {
  const { nodes, materials } = useModel(URL);
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube005.geometry} material={materials.PaletteMaterial001} scale={[0.689, 8.46, 8.46]} />
    </group>
  );
}

useGLTF.preload(URL);
