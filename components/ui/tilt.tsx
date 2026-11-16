"use client";

import { ComponentProps } from "react";
import { Tilt as ReactTilt } from "react-tilt";
import { useReducedMotion } from "framer-motion";

// Tilt 3D nas imagens. Com "reduzir movimento" ativo, o efeito fica a zero
// (mesmo markup no servidor e no cliente, para não quebrar a hidratação).
export function Tilt({ options, ...props }: ComponentProps<typeof ReactTilt>) {
  const reduced = useReducedMotion();
  const safeOptions = reduced ? { ...options, max: 0, scale: 1 } : options;
  return <ReactTilt options={safeOptions} {...props} />;
}
