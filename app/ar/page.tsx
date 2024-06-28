"use client";

import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { ARButton, XR } from "@react-three/xr";
import Bauhaus from "@/public/models/bauhaus/Bauhaus";

// Step 4: Main AR Page Component
export default function ARPage() {
  useEffect(() => {
    // Check for WebXR support
    if (!navigator.xr) {
      alert("WebXR is not supported in your browser.");
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      <Canvas>
        <XR>
          <OrbitControls autoRotate={true} autoRotateSpeed={0.5} />
          <Bauhaus />
          <Environment preset="sunset" />
        </XR>
      </Canvas>
      <ARButton />
    </div>
  );
}
