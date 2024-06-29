"use client";

import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { ARButton, Interactive, XR } from "@react-three/xr";
import { Mesh, LoopOnce } from "three";

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
          <WagnerAR scale={0.0195} position={[0, 0, -1.5]} />
          <Environment preset="sunset" />
        </XR>
      </Canvas>
      <ARButton />
    </div>
  );
}

function WagnerAR(props: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/wagnerAR/wagnerAR-transformed.glb"
  );
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
      // Fazer a animação parar no fim
      animationAction.clampWhenFinished = true;
      // Fazer a animação correr uma vez
      animationAction.setLoop(LoopOnce, 1);

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
            <group name="WAGNER_comorquestra_1001" position={[3.704, -0.993, -6.205]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <group name="Cube" position={[-489.464, -298.582, 1564.252]} rotation={[-1.57, 0, 0]} scale={[19.35, 4.588, 1.469]}>
                    <mesh name="Scene003" geometry={(nodes.Scene003 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_1" geometry={(nodes.Scene003_1 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_2" geometry={(nodes.Scene003_2 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_3" geometry={(nodes.Scene003_3 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_4" geometry={(nodes.Scene003_4 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_5" geometry={(nodes.Scene003_5 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_6" geometry={(nodes.Scene003_6 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_7" geometry={(nodes.Scene003_7 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_8" geometry={(nodes.Scene003_8 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_9" geometry={(nodes.Scene003_9 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_10" geometry={(nodes.Scene003_10 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_11" geometry={(nodes.Scene003_11 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_12" geometry={(nodes.Scene003_12 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_13" geometry={(nodes.Scene003_13 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_14" geometry={(nodes.Scene003_14 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_15" geometry={(nodes.Scene003_15 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_16" geometry={(nodes.Scene003_16 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_17" geometry={(nodes.Scene003_17 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_18" geometry={(nodes.Scene003_18 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_19" geometry={(nodes.Scene003_19 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_20" geometry={(nodes.Scene003_20 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_21" geometry={(nodes.Scene003_21 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_22" geometry={(nodes.Scene003_22 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_23" geometry={(nodes.Scene003_23 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_24" geometry={(nodes.Scene003_24 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_25" geometry={(nodes.Scene003_25 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_26" geometry={(nodes.Scene003_26 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_27" geometry={(nodes.Scene003_27 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_28" geometry={(nodes.Scene003_28 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_29" geometry={(nodes.Scene003_29 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_30" geometry={(nodes.Scene003_30 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_31" geometry={(nodes.Scene003_31 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_32" geometry={(nodes.Scene003_32 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_33" geometry={(nodes.Scene003_33 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_34" geometry={(nodes.Scene003_34 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_35" geometry={(nodes.Scene003_35 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_36" geometry={(nodes.Scene003_36 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_37" geometry={(nodes.Scene003_37 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_38" geometry={(nodes.Scene003_38 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_39" geometry={(nodes.Scene003_39 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_40" geometry={(nodes.Scene003_40 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_41" geometry={(nodes.Scene003_41 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_42" geometry={(nodes.Scene003_42 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_43" geometry={(nodes.Scene003_43 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_44" geometry={(nodes.Scene003_44 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_45" geometry={(nodes.Scene003_45 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_46" geometry={(nodes.Scene003_46 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_47" geometry={(nodes.Scene003_47 as Mesh).geometry} material={materials.PaletteMaterial001} />
                    <mesh name="Scene003_48" geometry={(nodes.Scene003_48 as Mesh).geometry} material={materials.PaletteMaterial001} />
                </group>
            </group>
            <mesh name="Cube_005" geometry={(nodes.Cube_005 as Mesh).geometry} material={materials.PaletteMaterial001} position={[-0.396, 0.607, 0.495]} scale={[0.007, 0.085, 0.085]} />
        </group>
    </group>
    </Interactive>
);
}

useGLTF.preload("/models/wagnerAR/wagnerAR-transformed.glb");
