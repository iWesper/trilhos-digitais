"use client";

import { useGLTF } from "@react-three/drei";
import { ModelProps, useModel } from "./gltf";

// Gerado com gltfjsx a partir de bauhaus.glb (--transform)
const URL = "/models/bauhaus/bauhaus-transformed.glb";

export default function Bauhaus(props: ModelProps) {
  const { nodes, materials } = useModel(URL);
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, 0]} scale={[0.097, 0.702, 0.097]}>
        <mesh geometry={nodes.Cube027.geometry} material={materials.PaletteMaterial002} />
        <mesh geometry={nodes.Cube027_1.geometry} material={materials.PaletteMaterial001} />
      </group>
    </group>
  );
}

useGLTF.preload(URL);
