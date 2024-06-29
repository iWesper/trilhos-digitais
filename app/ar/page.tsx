"use client";

import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { ARButton, Interactive, XR } from "@react-three/xr";
import { Mesh, MeshStandardMaterial } from "three";

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
        <XR referenceSpace="local-floor">
          <OrbitControls autoRotate={true} autoRotateSpeed={0.5} />
          <PrensaAR scale={0.03} />
          <Environment preset="sunset" />
        </XR>
      </Canvas>
      <ARButton />
    </div>
  );
}

function PrensaAR(props: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/prensaAR/prensaAR-transformed.glb");
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
        animationAction.reset().play(); // Play the animation if it's not running or paused
      }
    }
  } else {
    console.error("No animation actions found");
  }
};

  return (
    <Interactive onSelect={handleInteraction}>
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group
            name="untitled001"
            position={[0.073, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0.009]}
            scale={0.01}
          >
            <mesh
              name="s__1_001"
              geometry={(nodes.s__1_001 as Mesh).geometry}
              material={materials["Vintage_Newspaper_Print_Texture_Background_58059866_1.001"]}
              position={[-404, 768, 1518]}
              scale={[9.674, 15.588, 0.229]}
            />
          </group>
          <mesh
            name="Object_2"
            geometry={(nodes.Object_2 as Mesh).geometry}
            material={new MeshStandardMaterial({ color: "#6f4e37" })}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            name="s001"
            geometry={(nodes.s001 as Mesh).geometry}
            material={materials["DD_Old_Paper_Texture_77722_DD_Old_Paper_Texture_77722.001"]}
            position={[-4.043, 15.18, -7.692]}
            rotation={[-Math.PI / 2, 0, 0.009]}
            scale={[0.097, 0.156, 0.002]}
          />
          <mesh
            name="s__2_001"
            geometry={(nodes.s__2_001 as Mesh).geometry}
            material={materials["Vintage_Newspaper_Print_Texture_Background_58059866_1.001"]}
            position={[-3.92, 14.01, 5.256]}
            rotation={[-Math.PI / 2, 0, 0.009]}
            scale={[0.063, 0.101, 0.001]}
          />
        </group>
      </group>
    </Interactive>
  );
}

useGLTF.preload("/models/prensaAR/prensaAR-transformed.glb");
