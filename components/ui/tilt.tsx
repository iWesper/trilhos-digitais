"use client";

import { ComponentProps } from "react";
import { Tilt as ReactTilt } from "react-tilt";
import { useReducedMotion } from "framer-motion";

type TiltOptions = NonNullable<ComponentProps<typeof ReactTilt>["options"]>;

// Valores por omissão do efeito de tilt usado em todas as imagens dos capítulos
const defaults: TiltOptions = {
  reverse: false,
  max: 8,
  perspective: 1000,
  scale: 1.03,
  speed: 400,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

// Tilt 3D nas imagens. Com "reduzir movimento" ativo, o efeito fica a zero
// (mesmo markup no servidor e no cliente, para não quebrar a hidratação).
export function Tilt({ options, ...props }: ComponentProps<typeof ReactTilt>) {
  const reduced = useReducedMotion();
  const merged = { ...defaults, ...options, ...(reduced ? { max: 0, scale: 1 } : {}) };
  return <ReactTilt options={merged} {...props} />;
}
