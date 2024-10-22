/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 tvAR.glb --transform 
Files: tvAR.glb [1.88MB] > C:\Users\luisp\OneDrive\Ambiente de Trabalho\ProjFinal\trilhos-digitais\public\models\tvAR\tvAR-transformed.glb [72.35KB] (96%)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/tvAR-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.body.geometry} material={materials.PaletteMaterial001} rotation={[Math.PI / 2, 0, 0]} scale={0.004} />
      <mesh geometry={nodes.Cube.geometry} material={materials['Material.001']} position={[-0.508, -0.181, 0.058]} scale={[1.009, 0.741, 0.07]} />
    </group>
  )
}

useGLTF.preload('/tvAR-transformed.glb')
