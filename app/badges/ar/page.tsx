"use client";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Head from "next/head";

const AR = () => {
  const [isMarkerFound, setIsMarkerFound] = useState(false);

  useEffect(() => {
    const script2 = document.createElement("script");
    script2.src = "https://aframe.io/releases/1.3.0/aframe.min.js";
    document.head.appendChild(script2);
    // Dynamically load AR.js script
    const script = document.createElement("script");
    script.src =
      "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js";
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
      <div className="arjs-loader">
        <div>Loading, please wait...</div>
      </div>
      <a-scene embedded arjs>
        <a-marker preset="hiro">
          <a-entity
            position="0 0 0"
            scale="0.05 0.05 0.05"
            gltf-model="your-server/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
          ></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </>
  );
};

export default AR;
