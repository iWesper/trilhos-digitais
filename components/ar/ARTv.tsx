"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, useGLTF, useAnimations } from "@react-three/drei";
import ARScene from "./ARScene";
import { ModelProps, useModel } from "@/components/models/gltf";
import { Group, MeshStandardMaterial, VideoTexture } from "three";

export default function ARPage() {
  return (
    <>
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
      <ARScene>
        <TvAR scale={0.3} position={[0.075, -0.4, -1.25]} />
        <Environment preset="sunset" />
      </ARScene>
    </>
  );
}

function TvAR(props: ModelProps) {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useModel(
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
    <group onClick={handleInteraction}>
      <group {...props} dispose={null}>
        <mesh
          geometry={nodes.body.geometry}
          material={materials.PaletteMaterial001}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.004}
        />
        <mesh
          geometry={nodes.Cube.geometry}
          material={new MeshStandardMaterial({ map: videoTexture })}
          position={[-0.508, -0.181, 0.058]}
          scale={[0.9, 0.741, 0.07]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/tvAR/tvAR-transformed.glb");
