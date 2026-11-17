"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IoChevronBack } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { hover } from "@/lib/motion";

// "Voltar" no canto superior esquerdo das páginas de capítulo
export function BackLink({ href, tone = "light" }: { href: string; tone?: "light" | "dark" }) {
  return (
    <Link
      href={href}
      className={cn(
        "absolute top-28 left-15 flex items-center cursor-pointer",
        tone === "light" ? "text-white" : "text-black"
      )}
    >
      <IoChevronBack aria-hidden className="h-8 w-8" />
      <span>Voltar</span>
    </Link>
  );
}

// Botão para avançar ("Continuar" / "Começar") com a seta que desliza no hover
export function NextButton({
  href,
  label = "Continuar",
  className,
}: {
  href: string;
  label?: string;
  className: string;
}) {
  return (
    <motion.div whileHover={hover} className="group">
      <Button asChild className={className}>
        <Link href={href}>
          {label}
          <FaArrowRight
            aria-hidden
            className="ps-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-150 ease-out"
          />
        </Link>
      </Button>
    </motion.div>
  );
}
