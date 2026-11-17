"use client";

import { useGLTF } from "@react-three/drei";
import { ModelProps, useModel } from "./gltf";

// Gerado com gltfjsx a partir de wagner2.glb (--transform)
const URL = "/models/wagner/wagner2-transformed.glb";

export default function Wagner2(props: ModelProps) {
  const { nodes, materials } = useModel(URL);
  return (
    <group {...props} dispose={null}>
      <group position={[0, -23.273, -8.897]} scale={[19.35, 4.588, 1.469]}>
        <mesh geometry={nodes.Cube_1.geometry} material={materials.PaletteMaterial002} />
        <mesh geometry={nodes.Cube_2.geometry} material={materials.PaletteMaterial001} />
        <mesh geometry={nodes.Cube_3.geometry} material={materials.PaletteMaterial003} />
        <mesh geometry={nodes.Cube_4.geometry} material={materials.PaletteMaterial004} />
        <mesh geometry={nodes.Cube_5.geometry} material={materials["Textura_1.002"]} />
        <mesh geometry={nodes.Cube_6.geometry} material={materials["Textura_2.002"]} />
      </group>
    </group>
  );
}

useGLTF.preload(URL);
