"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { ARButton, Interactive, XR } from "@react-three/xr";
import { LoopOnce } from "three";

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
          <WagnerAR scale={0.0125} position={[0, 0, -1.5]} />
          <Environment preset="sunset" environmentRotation={[0, -1, 0]} />
          </>
        )}
        </XR>
      </Canvas>
      <ARButton onClick={toggleAR} />
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
    <group name="Cube" position={[0, -22.669, -8.897]} scale={[19.35, 4.588, 1.469]}>
      <mesh name="Cube_1" geometry={(nodes.Cube_1 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_2" geometry={(nodes.Cube_2 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_3" geometry={(nodes.Cube_3 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_4" geometry={(nodes.Cube_4 as any).geometry} material={materials.PaletteMaterial002} />
      <mesh name="Cube_5" geometry={(nodes.Cube_5 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_6" geometry={(nodes.Cube_6 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_7" geometry={(nodes.Cube_7 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_8" geometry={(nodes.Cube_8 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_9" geometry={(nodes.Cube_9 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_10" geometry={(nodes.Cube_10 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_11" geometry={(nodes.Cube_11 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_12" geometry={(nodes.Cube_12 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_13" geometry={(nodes.Cube_13 as any).geometry} material={materials.PaletteMaterial004} />
      <mesh name="Cube_14" geometry={(nodes.Cube_14 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_15" geometry={(nodes.Cube_15 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_16" geometry={(nodes.Cube_16 as any).geometry} material={materials.PaletteMaterial004} />
      <mesh name="Cube_17" geometry={(nodes.Cube_17 as any).geometry} material={materials.PaletteMaterial004} />
      <mesh name="Cube_18" geometry={(nodes.Cube_18 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_19" geometry={(nodes.Cube_19 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_20" geometry={(nodes.Cube_20 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_21" geometry={(nodes.Cube_21 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_22" geometry={(nodes.Cube_22 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_23" geometry={(nodes.Cube_23 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_24" geometry={(nodes.Cube_24 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_25" geometry={(nodes.Cube_25 as any).geometry} material={materials.PaletteMaterial004} />
      <mesh name="Cube_26" geometry={(nodes.Cube_26 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_27" geometry={(nodes.Cube_27 as any).geometry} material={materials.PaletteMaterial004} />
      <mesh name="Cube_28" geometry={(nodes.Cube_28 as any).geometry} material={materials.PaletteMaterial004} />
      <mesh name="Cube_29" geometry={(nodes.Cube_29 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_30" geometry={(nodes.Cube_30 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_31" geometry={(nodes.Cube_31 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_32" geometry={(nodes.Cube_32 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_33" geometry={(nodes.Cube_33 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_34" geometry={(nodes.Cube_34 as any).geometry} material={materials.PaletteMaterial004} />
      <mesh name="Cube_35" geometry={(nodes.Cube_35 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_36" geometry={(nodes.Cube_36 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_37" geometry={(nodes.Cube_37 as any).geometry} material={materials.PaletteMaterial004} />
      <mesh name="Cube_38" geometry={(nodes.Cube_38 as any).geometry} material={materials.PaletteMaterial004} />
      <mesh name="Cube_39" geometry={(nodes.Cube_39 as any).geometry} material={materials.PaletteMaterial003} />
      <mesh name="Cube_40" geometry={(nodes.Cube_40 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_41" geometry={(nodes.Cube_41 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_42" geometry={(nodes.Cube_42 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_43" geometry={(nodes.Cube_43 as any).geometry} material={materials.PaletteMaterial001} />
      <mesh name="Cube_44" geometry={(nodes.Cube_44 as any).geometry} material={materials['Textura_1.002']} />
      <mesh name="Cube_45" geometry={(nodes.Cube_45 as any).geometry} material={materials['Textura_2.002']} />
      <mesh name="Cube_46" geometry={(nodes.Cube_46 as any).geometry} material={materials['Textura_1.002']} />
      <mesh name="Cube_47" geometry={(nodes.Cube_47 as any).geometry} material={materials['Textura_2.002']} />
      <mesh name="Cube_48" geometry={(nodes.Cube_48 as any).geometry} material={materials['Textura_1.002']} />
      <mesh name="Cube_49" geometry={(nodes.Cube_49 as any).geometry} material={materials['Textura_2.002']} />
    </group>
    <mesh name="Cube005" geometry={(nodes.Cube005 as any).geometry} material={materials.PaletteMaterial001} position={[0, -5.578, 0]} scale={[0.689, 8.46, 8.46]} />
    </group>
  </group>
  </Interactive>
);
}

useGLTF.preload("/models/wagnerAR/wagnerAR-transformed.glb");
