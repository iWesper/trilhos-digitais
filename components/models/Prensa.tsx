"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshBasicMaterial } from "three";
import { ModelProps, useModel } from "./gltf";

// "Gutenberg Press" por B0073D (Sketchfab), licença CC-BY-4.0: ver public/models/prensa/license.txt
const URL = "/models/prensa/prensa-transformed.glb";

export default function Prensa({ progress, ...props }: ModelProps & { progress: number }) {
  const { nodes, materials } = useModel(URL);

  // Enquanto o badge não estiver completo, o modelo aparece a preto (silhueta).
  // Só a prensa precisa disto: os materiais de origem reagem à luz de forma diferente dos outros modelos.
  const silhouette = useMemo(() => new MeshBasicMaterial({ color: "black" }), []);
  const material = progress < 100 ? silhouette : materials["Scene_-_Root"];

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={material} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
}

useGLTF.preload(URL);
