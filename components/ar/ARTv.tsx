"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, useAnimations } from "@react-three/drei";
import { ARButton, Interactive, XR } from "@react-three/xr";
import { Mesh, MeshStandardMaterial, VideoTexture } from "three";

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
      <video
        id="video"
        playsInline
        webkit-playsinline
        loop
        autoPlay
        width={1920}
        height={1080}
        src="/videos/tvar.mp4"
        style={{ display: "none" }}
      ></video>
      <Canvas>
        <XR referenceSpace="local">
          {isARActive && (
            <>
              <TvAR scale={0.3} position={[0.1, -0.25, -1.25]} />
              <Environment preset="sunset" />
            </>
          )}
        </XR>
      </Canvas>
      <ARButton onClick={toggleAR} />
    </div>
  );
}

function TvAR(props: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/tvAR/tvAR-transformed.glb"
  );
  const video = document.getElementById("video") as HTMLVideoElement;
  const videoTexture = new VideoTexture(video);
  videoTexture.flipY = false;

  // Handler das interações
  const handleInteraction = () => {
    if (video.paused) {
      video.play(); // Reproduzir o vídeo se estiver pausado
    } else {
      video.pause(); // Pausar o vídeo se estiver a reproduzir
    }
  };

  useFrame(() => {
    videoTexture.needsUpdate = true;
  });

  return (
    <Interactive onSelect={handleInteraction}>
      <group {...props} dispose={null}>
        <mesh
          geometry={(nodes.body as Mesh).geometry}
          material={materials.PaletteMaterial001}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.004}
        />
        <mesh
          geometry={(nodes.Cube as Mesh).geometry}
          material={new MeshStandardMaterial({ map: videoTexture })}
          position={[-0.508, -0.181, 0.058]}
          scale={[0.9, 0.741, 0.07]}
        />
      </group>
    </Interactive>
  );
}

useGLTF.preload("/models/tvAR/tvAR-transformed.glb");
