import type { Transition } from "framer-motion";

// Curvas partilhadas. Nunca usar ease-in em UI: atrasa o momento que o utilizador está a ver.
type Bezier = [number, number, number, number];
export const ease: Record<"outExpo" | "outQuad" | "inOutCubic", Bezier> = {
  // Entradas e revelações: arranque rápido, assentamento suave
  outExpo: [0.19, 1, 0.22, 1],
  // Pressões e hovers pequenos
  outQuad: [0.25, 0.46, 0.45, 0.94],
  // Elementos que já estão no ecrã e mudam de sítio
  inOutCubic: [0.645, 0.045, 0.355, 1],
};

// Conteúdo de uma página a entrar depois de navegar
export const enter: Transition = { duration: 0.6, ease: ease.outExpo };

// Mesma entrada, mas depois de outro elemento (hierarquia: o mais importante entra primeiro)
export const enterAfter = (delay: number): Transition => ({ ...enter, delay });

// Movimento dentro do ecrã (reordenar, trocar de posição)
export const move: Transition = { duration: 0.4, ease: ease.inOutCubic };

// Hover em botões: 1–2% chega, mais do que isso "insufla"
export const hover = { scale: 1.02, transition: { duration: 0.15, ease: ease.outQuad } };
