"use client";

import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { ARButton, Interactive, XR } from "@react-three/xr";
import { Mesh } from "three";

export default function ARPage() {
  useEffect(() => {
    // Verificar se o browser suporta WebXR
    if (!navigator.xr) {
      alert(
        "O teu navegador não suporta WebXR. Por favor, utiliza um navegador compatível."
      );
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      <Canvas>
        <XR referenceSpace="local">
          <BauhausAR scale={0.025} position={[0.08, -0.15, 0.1]} rotation={[0,-3,0]}/>
          <Environment preset="sunset" />
        </XR>
      </Canvas>
      <ARButton />
    </div>
  );
}

function BauhausAR(props: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/bauhausAR/bauhausAR-transformed.glb");
  const { actions } = useAnimations(animations, group);

// Handler das interações
const handleInteraction = () => {
  // Ir buscar o nome das animações
  const actionNames = Object.keys(actions);
  // Verificar se existem animações
  if (actionNames.length > 0) {
    const firstActionName = actionNames[0];
    const animationAction = actions[firstActionName];
    if (animationAction) {
      if (animationAction.isRunning() && !animationAction.paused) {
        animationAction.paused = true; // Pausar a animação se estiver a correr
      } else {
        animationAction.reset().play(); // Iniciar a animação se não estiver a correr ou pausada
      }
    }
  } else {
    return;
  }
};

  return (
    <Interactive onSelect={handleInteraction}>
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Bone} />
        </group>
        <group name="Armature001" position={[-33.686, 0.173, 34.246]} rotation={[0, Math.PI / 2, 0]}>
          <primitive object={nodes.Bone_1} />
        </group>
        <group name="Armature002" position={[-27.67, 0.173, 41.248]} rotation={[0, Math.PI / 2, 0]}>
          <primitive object={nodes.Bone_2} />
        </group>
        <group name="Armature003" position={[2.372, 0.727, 66.345]} rotation={[Math.PI, 0, Math.PI]}>
          <primitive object={nodes.Bone_3} />
        </group>
        <group name="Cube024" position={[0, 0, 32.645]} scale={[0.097, 0.702, 0.097]}>
          <mesh name="Cube027" geometry={(nodes.Cube027 as Mesh).geometry} material={materials.PaletteMaterial002} />
          <mesh name="Cube027_1" geometry={(nodes.Cube027_1 as Mesh).geometry} material={materials.PaletteMaterial001} />
        </group>
        <skinnedMesh name="Cube" geometry={(nodes.Cube as any).geometry} material={materials.PaletteMaterial001} skeleton={(nodes.Cube as any).skeleton} />
        <skinnedMesh name="Cube001" geometry={(nodes.Cube001 as any).geometry} material={materials.PaletteMaterial001} skeleton={(nodes.Cube001 as any).skeleton} position={[-33.686, 0.173, 34.246]} rotation={[0, Math.PI / 2, 0]} />
        <skinnedMesh name="Cube002" geometry={(nodes.Cube002 as any).geometry} material={materials.PaletteMaterial001} skeleton={(nodes.Cube002 as any).skeleton} position={[-27.67, 0.173, 41.248]} rotation={[0, Math.PI / 2, 0]} />
        <skinnedMesh name="Cube003" geometry={(nodes.Cube003 as any).geometry} material={materials.PaletteMaterial001} skeleton={(nodes.Cube003 as any).skeleton} position={[2.372, 0.727, 66.345]} rotation={[-Math.PI, 0, -Math.PI]} />
      </group>
    </group>
    </Interactive>
  );
}

useGLTF.preload("/models/bauhausAR/bauhausAR-transformed.glb");
