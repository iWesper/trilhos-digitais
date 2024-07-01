"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, useAnimations } from "@react-three/drei";
import { ARButton, Interactive, XR } from "@react-three/xr";
import { Mesh } from "three";

export default function ARPage() {
  const [isARActive, setIsARActive] = useState(false);

  useEffect(() => {
    // Verificar se o browser suporta WebXR
    if (!navigator.xr) {
      alert(
        "O teu navegador não suporta WebXR. Por favor, utiliza um navegador compatível."
      );
    }
  }, []);

  // Ativar/desativar a AR
  const toggleAR = () => {
    setIsARActive(!isARActive);
  };

  return (
    <div className="w-screen h-screen">
      <Canvas>
        <XR referenceSpace="local">
          {isARActive && (
            <>
              <BauhausAR
                scale={0.02}
                position={[0, -0.15, -0.6]}
                rotation={[0, -2.65, 0]}
              />
              <Environment preset="sunset" />
            </>
          )}
        </XR>
      </Canvas>
      <ARButton onClick={toggleAR} />
    </div>
  );
}

function BauhausAR(props: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
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
    <Interactive onSelect={handleInteraction}>
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Cube024" scale={[0.097, 0.702, 0.097]}>
          <mesh name="Cube027" geometry={(nodes.Cube027 as Mesh).geometry} material={materials.PaletteMaterial002} />
          <mesh name="Cube027_1" geometry={(nodes.Cube027_1 as Mesh).geometry} material={materials.PaletteMaterial001} />
        </group>
        <mesh name="Cone" geometry={(nodes.Cone as Mesh).geometry} material={materials.PaletteMaterial001} position={[0, 0.564, 0]} scale={0.068} />
        <mesh name="Cone001" geometry={(nodes.Cone001 as Mesh).geometry} material={materials.PaletteMaterial001} position={[-6.273, 2.466, 0]} scale={0.068} />
        <mesh name="Cube" geometry={(nodes.Cube as Mesh).geometry} material={materials.PaletteMaterial001} position={[-2.613, -0.696, -1.194]} rotation={[0.802, 0.662, 0]} scale={0.216} />
        <mesh name="Cube001" geometry={(nodes.Cube001 as Mesh).geometry} material={materials.PaletteMaterial001} position={[4.092, 0.262, -1.194]} rotation={[0.802, 0.662, 0]} scale={0.216} />
        <mesh name="Sphere" geometry={(nodes.Sphere as Mesh).geometry} material={materials.PaletteMaterial001} position={[-0.608, 0.274, 2.131]} scale={0.319} />
      </group>
    </group>
    </Interactive>
  );
}

useGLTF.preload("/models/bauhausAR/bauhausAR-transformed.glb");
