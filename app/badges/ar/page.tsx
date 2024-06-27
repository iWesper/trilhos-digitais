"use client";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Head from "next/head";

const AR = () => {
  const [isMarkerFound, setIsMarkerFound] = useState(false);

  useEffect(() => {
    const script2 = document.createElement("script");
    script2.src = "https://aframe.io/releases/0.8.0/aframe.min.js";
    document.head.appendChild(script2);
    // Dynamically load AR.js script
    const script = document.createElement("script");
    script.src =
      "https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js";
    document.head.appendChild(script);

    // Cleanup function to remove script
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(script2);
    };
  }, []);

  const loadModels = () => {
    setIsMarkerFound(true);
  };

  return (
    <>
      <Head>
        <title>AR Experience</title>
      </Head>
      {/* AR.js scene setup */}
      <a-scene embedded arjs="sourceType: webcam;">
        <a-box position="0 0.5 0" material="opacity: 0.5;"></a-box>
        <a-marker-camera preset="hiro"></a-marker-camera>
      </a-scene>
    </>
  );
};

export default AR;
