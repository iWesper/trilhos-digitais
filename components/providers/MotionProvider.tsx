"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

// Respeita "reduzir movimento" do sistema em todas as animações Framer Motion:
// mantém as transições de opacidade e remove as de posição/escala.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
