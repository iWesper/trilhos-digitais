"use client";

import { ComponentProps } from "react";
import { motion } from "framer-motion";
import { enter } from "@/lib/motion";

// <main> que aparece com fade (para layouts que são componentes de servidor)
export default function FadeInMain(props: ComponentProps<typeof motion.main>) {
  return <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={enter} {...props} />;
}
