/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 bauhaus.glb --transform 
Files: bauhaus.glb [263.74KB] > C:\Users\luisp\OneDrive\Ambiente de Trabalho\ProjFinal\trilhos-digitais\public\models\bauhaus\bauhaus-transformed.glb [13.12KB] (95%)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models/bauhaus/bauhaus-transformed.glb')


  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, 0]} scale={[0.097, 0.702, 0.097]}>
        <mesh geometry={nodes.Cube027.geometry} material={materials.PaletteMaterial002} />
        <mesh geometry={nodes.Cube027_1.geometry} material={materials.PaletteMaterial001} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/bauhaus/bauhaus-transformed.glb')