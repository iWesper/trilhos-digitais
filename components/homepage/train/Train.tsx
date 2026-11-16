"use client";

import { ComponentType, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import Locomotive from "./Locomotive";
import CarArte from "./CarArte";
import CarDesign from "./CarDesign";
import CarComunicacao from "./CarComunicacao";
import CarTecnologia from "./CarTecnologia";
import { CAR_H, TrainProvider } from "./parts";

type Car = { chapter: number; title: string; Art: ComponentType };

const CARS: Car[] = [
  { chapter: 1, title: "Arte", Art: CarArte },
  { chapter: 2, title: "Design", Art: CarDesign },
  { chapter: 3, title: "Comunicação", Art: CarComunicacao },
  { chapter: 4, title: "Tecnologia", Art: CarTecnologia },
];

// Curva de travagem: arranque rápido, assentamento suave
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

export default function Train() {
  const scroller = useRef<HTMLDivElement>(null);
  // Só depois de montar: o servidor não sabe a preferência, e o markup tem de coincidir na hidratação
  const prefersReduced = useReducedMotion();
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(!!prefersReduced), [prefersReduced]);

  // Chegada à estação: o comboio entra pela direita e trava
  const arrival = useMotionValue(0);
  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    if (reduced) {
      arrival.set(0);
      setHasArrived(true);
      return;
    }
    arrival.set(window.innerWidth * 0.75);
    const controls = animate(arrival, 0, {
      duration: 1.6,
      ease: EASE_OUT_EXPO,
      onComplete: () => setHasArrived(true),
    });
    return () => controls.stop();
  }, [arrival, reduced]);

  // Escala px -> unidades SVG, para as rodas girarem à velocidade certa
  const unitsPerPx = useMotionValue(1);
  useEffect(() => {
    const el = scroller.current?.querySelector("svg");
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const h = entry.contentRect.height;
      if (h > 0) unitsPerPx.set(CAR_H / h);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [unitsPerPx]);

  const { scrollX } = useScroll({ container: scroller });
  const distance = useTransform(
    [scrollX, arrival, unitsPerPx] as const,
    ([s, a, u]: number[]) => (reduced ? 0 : (s - a) * u)
  );

  // Rodas do rato na vertical deslocam o comboio na horizontal
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Dica de navegação: aparece se o utilizador ainda não explorou, desaparece ao deslizar
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showHint, setShowHint] = useState(false);
  useMotionValueEvent(scrollX, "change", (v) => {
    if (v > 24) setHasScrolled(true);
  });
  useEffect(() => {
    if (!hasArrived || hasScrolled) return;
    const t = setTimeout(() => setShowHint(true), 1200);
    return () => clearTimeout(t);
  }, [hasArrived, hasScrolled]);

  return (
    <TrainProvider value={{ distance, reduced }}>
      <nav aria-label="Capítulos" className="absolute inset-x-0 bottom-[9vh] z-[2]">
        <AnimatePresence>
          {showHint && !hasScrolled && (
            <motion.p
              key="hint"
              className="absolute right-[6vw] -top-16 flex items-center gap-3 rounded-full bg-[#142839]/85 px-5 py-2.5 text-white backdrop-blur-md"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            >
              Desliza para conheceres o comboio
              <FaArrowRight aria-hidden className="motion-safe:animate-nudge-x" />
            </motion.p>
          )}
        </AnimatePresence>

        <div
          ref={scroller}
          className="no-scrollbar overflow-x-auto overflow-y-hidden overscroll-x-contain [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]"
        >
          <div className="relative w-max min-w-full pl-[6vw] pr-[24vw] pt-12 pb-[14px]">
          <motion.ul
            className="flex items-end"
            style={{ x: arrival }}
          >
            <li className="h-[clamp(190px,34vh,320px)]">
              <Locomotive />
            </li>
            {CARS.map(({ chapter, title, Art }) => (
              <li key={chapter} className="h-[clamp(190px,34vh,320px)]">
                <Link
                  href={`/chapters/chapter${chapter}/1`}
                  aria-label={`Capítulo ${chapter}: ${title}`}
                  // Com o teclado, a carruagem focada fica centrada no ecrã
                  onFocus={(e) =>
                    e.currentTarget.scrollIntoView({
                      inline: "center",
                      block: "nearest",
                      behavior: reduced ? "auto" : "smooth",
                    })
                  }
                  className="group block h-full rounded-2xl outline-none focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                >
                  <Art />
                </Link>
              </li>
            ))}
          </motion.ul>
          {/* Carril contínuo: fica parado enquanto o comboio chega */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[14px]">
            <div data-rail="" className="h-[5px] bg-[#59646E]" />
            <div className="h-[9px] bg-[repeating-linear-gradient(90deg,#5B4030_0_18px,transparent_18px_34px)]" />
          </div>
          </div>
        </div>
      </nav>
    </TrainProvider>
  );
}
