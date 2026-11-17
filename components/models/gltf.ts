import type { AnimationClip, Material, Mesh } from "three";
import type { ThreeElements } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Tipo de um modelo carregado: nós e materiais por nome, sem casts "as any" em cada malha
export type GLTFModel = {
  nodes: Record<string, Mesh>;
  materials: Record<string, Material>;
  animations: AnimationClip[];
};

export type ModelProps = ThreeElements["group"];

export function useModel(path: string): GLTFModel {
  return useGLTF(path) as unknown as GLTFModel;
}
