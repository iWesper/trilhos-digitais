'use client'
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Head from "next/head";

const AR = () => {
  const [isMarkerFound, setIsMarkerFound] = useState(false);

  useEffect(() => {
    // Dynamically load AR.js script
    const script = document.createElement("script");
    script.src =
      "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js";
    document.head.appendChild(script);

    // Cleanup function to remove script
    return () => {
      document.head.removeChild(script);
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
      <a-scene className="w-full h-full" embedded arjs="sourceType: webcam;">
        <a-marker preset="hiro" onMarkerFound={() => loadModels()}>
          <a-entity position="0 0 0" />
          {isMarkerFound && (
            <Canvas>
              <OrbitControls />
              {/* Render the model when the marker is found */}
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
              </mesh>
              <Environment preset="sunset" />
            </Canvas>
          )}
        </a-marker>
        <a-entity camera />
      </a-scene>
    </>
  );
};

export default AR;
