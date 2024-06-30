/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 bauhausAR.glb --transform 
Files: bauhausAR.glb [393.02KB] > C:\Users\luisp\OneDrive\Ambiente de Trabalho\ProjFinal\trilhos-digitais\public\models\bauhausAR\bauhausAR-transformed.glb [96.09KB] (76%)
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/bauhausAR-transformed.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Bone} />
        </group>
        <group name="Armature001" position={[-33.686, 0.173, 34.246]} rotation={[0, Math.PI / 2, 0]}>
          <primitive object={nodes.Bone_1} />
        </group>
        <group name="Armature002" position={[-27.67, 0.173, 41.248]} rotation={[0, Math.PI / 2, 0]}>
          <primitive object={nodes.Bone_2} />
        </group>
        <group name="Armature003" position={[2.372, 0.727, 66.345]} rotation={[Math.PI, 0, Math.PI]}>
          <primitive object={nodes.Bone_3} />
        </group>
        <group name="Cube024" position={[0, 0, 32.645]} scale={[0.097, 0.702, 0.097]}>
          <mesh name="Cube027" geometry={nodes.Cube027.geometry} material={materials.PaletteMaterial002} />
          <mesh name="Cube027_1" geometry={nodes.Cube027_1.geometry} material={materials.PaletteMaterial001} />
        </group>
        <skinnedMesh name="Cube" geometry={nodes.Cube.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Cube.skeleton} />
        <skinnedMesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Cube001.skeleton} position={[-33.686, 0.173, 34.246]} rotation={[0, Math.PI / 2, 0]} />
        <skinnedMesh name="Cube002" geometry={nodes.Cube002.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Cube002.skeleton} position={[-27.67, 0.173, 41.248]} rotation={[0, Math.PI / 2, 0]} />
        <skinnedMesh name="Cube003" geometry={nodes.Cube003.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Cube003.skeleton} position={[2.372, 0.727, 66.345]} rotation={[-Math.PI, 0, -Math.PI]} />
      </group>
    </group>
  )
}

useGLTF.preload('/bauhausAR-transformed.glb')
