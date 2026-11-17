"use client";

import React, { useRef } from "react";
import { Environment, useGLTF, useAnimations } from "@react-three/drei";
import ARScene from "./ARScene";
import { ModelProps, useModel } from "./gltf";
import { Group } from "three";

export default function ARPage() {
  return (
    <ARScene>
      <BauhausAR
        scale={0.02}
        position={[0, -0.15, -0.6]}
        rotation={[0, -2.65, 0]}
      />
      <Environment preset="sunset" />
    </ARScene>
  );
}

function BauhausAR(props: ModelProps) {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useModel(
    "/models/bauhausAR/bauhausAR-transformed.glb"
  );
  const { actions } = useAnimations(animations, group);

  // Handler das interações
  const handleInteraction = () => {
    // Ir buscar o nome das animações
    const actionNames = Object.keys(actions);
    // Verificar se existem animações
    if (actionNames.length > 0) {
      actionNames.forEach((actionName) => {
        const animationAction = actions[actionName];
        if (animationAction) {
          if (animationAction.isRunning() && !animationAction.paused) {
            animationAction.paused = true; // Pausar a animação se estiver a correr
          } else {
            animationAction.reset().play(); // Iniciar a animação se não estiver a correr ou pausada
          }
        }
      });
    } else {
      return;
    }
  };

  return (
    <group onClick={handleInteraction}>
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Cube024" scale={[0.097, 0.702, 0.097]}>
          <mesh name="Cube027" geometry={nodes.Cube027.geometry} material={materials.PaletteMaterial002} />
          <mesh name="Cube027_1" geometry={nodes.Cube027_1.geometry} material={materials.PaletteMaterial001} />
        </group>
        <mesh name="Cone" geometry={nodes.Cone.geometry} material={materials.PaletteMaterial001} position={[0, 0.564, 0]} scale={0.068} />
        <mesh name="Cone001" geometry={nodes.Cone001.geometry} material={materials.PaletteMaterial001} position={[-6.273, 2.466, 0]} scale={0.068} />
        <mesh name="Cube" geometry={nodes.Cube.geometry} material={materials.PaletteMaterial001} position={[-2.613, -0.696, -1.194]} rotation={[0.802, 0.662, 0]} scale={0.216} />
        <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.PaletteMaterial001} position={[4.092, 0.262, -1.194]} rotation={[0.802, 0.662, 0]} scale={0.216} />
        <mesh name="Sphere" geometry={nodes.Sphere.geometry} material={materials.PaletteMaterial001} position={[-0.608, 0.274, 2.131]} scale={0.319} />
      </group>
    </group>
    </group>
  );
}

useGLTF.preload("/models/bauhausAR/bauhausAR-transformed.glb");
