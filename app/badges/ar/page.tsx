"use client";
import { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import Bauhaus from "@/public/models/bauhaus/Bauhaus";
// import "@/public/models/bauhaus/bauhaus.glb";

const AR = () => {
  const [isMarkerFound, setIsMarkerFound] = useState(false);

  useEffect(() => {
    // Dynamically load AR.js script
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@ar-js-org/ar.js@3.3.2/aframe/build/aframe-ar.js";
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
      {/* AR.js scene setup */}
      <a-scene className="w-full h-full" embedded arjs="sourceType: webcam;">
        <a-marker preset="hiro" onMarkerFound={() => loadModels()}>
          <a-entity position="0 0 0" />{" "}
          {isMarkerFound && (
                <Canvas>
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  {/* Render the model when the marker is found */}
                  <Bauhaus />
                </Canvas>
              )}
        </a-marker>
        <a-entity camera />
      </a-scene>
    </>
  );
};

export default AR;
