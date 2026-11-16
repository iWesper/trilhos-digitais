"use client";

import { createContext, ReactNode, useContext, useEffect, useId, useRef } from "react";
import { MotionValue, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";

// Paleta partilhada por todo o comboio (azul marinho e verde da marca + acentos por capítulo)
export const palette = {
  navy: "#142839",
  navyDeep: "#0C1925",
  steel: "#2B3F52",
  green: "#86BE41",
  cream: "#F6EBD9",
  gold: "#E3B04B",
  glow: "#FFD98A",
};

// Geometria comum das carruagens (unidades SVG). As rodas assentam em y = 300.
export const CAR_W = 640;
export const CAR_H = 300;

type TrainContextValue = {
  // Distância percorrida pelo comboio (em unidades SVG). Faz girar as rodas.
  distance: MotionValue<number>;
  reduced: boolean;
};

const TrainContext = createContext<TrainContextValue | null>(null);

export function TrainProvider({
  value,
  children,
}: {
  value: TrainContextValue;
  children: ReactNode;
}) {
  return <TrainContext.Provider value={value}>{children}</TrainContext.Provider>;
}

export function useTrain() {
  const ctx = useContext(TrainContext);
  const fallback = useMotionValue(0);
  return ctx ?? { distance: fallback, reduced: true };
}

// Ids de SVG não podem ter ":" (useId devolve ":r0:")
export function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/:/g, "")}`;
}

// Ângulo de uma roda de raio r depois de percorrer a distância d (rolar para a esquerda = sentido anti-horário)
export function useWheelAngle(r: number) {
  const { distance } = useTrain();
  return useTransform(distance, (d) => (-d / (2 * Math.PI * r)) * 360);
}

// Aplica um valor animado ao atributo "transform" de um elemento SVG, sem re-renders
export function useSvgTransform(value: MotionValue<string>) {
  const ref = useRef<SVGGElement>(null);
  useEffect(() => {
    ref.current?.setAttribute("transform", value.get());
  }, [value]);
  useMotionValueEvent(value, "change", (v) => ref.current?.setAttribute("transform", v));
  return ref;
}

export function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const angle = useWheelAngle(r);
  // Rotação com centro explícito no eixo: a roda gira sem nunca sair do sítio
  const ref = useSvgTransform(useTransform(angle, (a) => `rotate(${a} ${cx} ${cy})`));
  const spokes = 8;
  return (
    <g data-wheel="">
      <g ref={ref}>
        <circle cx={cx} cy={cy} r={r} fill={palette.navyDeep} />
        <circle cx={cx} cy={cy} r={r - 4} fill="none" stroke={palette.steel} strokeWidth={3} />
        {Array.from({ length: spokes }, (_, i) => {
          const a = (i / spokes) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + Math.cos(a) * (r - 6)}
              y2={cy + Math.sin(a) * (r - 6)}
              stroke={palette.steel}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          );
        })}
      </g>
      <circle data-hub="" cx={cx} cy={cy} r={r * 0.24} fill={palette.gold} />
    </g>
  );
}

// Janela com moldura, recorte do conteúdo e brilho que acende no hover/focus da carruagem
export function CarWindow({
  x,
  y,
  w,
  h,
  r = 10,
  path,
  interior,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  path?: string;
  interior: string;
  children?: ReactNode;
}) {
  const clipId = useSvgId("win");
  const shape = path ? (
    <path d={path} />
  ) : (
    <rect x={x} y={y} width={w} height={h} rx={r} />
  );
  return (
    <g>
      <clipPath id={clipId}>{shape}</clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect x={x} y={y} width={w} height={h} fill={interior} />
        {children}
        {/* Luz interior: acende quando a carruagem está em hover/focus */}
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          fill={palette.glow}
          className="opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-20 group-focus-visible:opacity-20"
        />
      </g>
      {path ? (
        <path d={path} fill="none" stroke={palette.navy} strokeWidth={6} />
      ) : (
        <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke={palette.navy} strokeWidth={6} />
      )}
    </g>
  );
}

// Estrutura comum de uma carruagem: tejadilho, corpo, chassis, bogies, rodas, engates e placa
export function CarFrame({
  number,
  label,
  body,
  lowerPanel,
  trim,
  plaque,
  plaqueText,
  children,
}: {
  number: number;
  label: string;
  body: string;
  lowerPanel: string;
  trim: string;
  plaque: string;
  plaqueText: string;
  children: ReactNode;
}) {
  const plaqueW = 84 + label.length * 13;
  return (
    <svg
      viewBox={`0 0 ${CAR_W} ${CAR_H}`}
      className="h-full w-auto overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      {/* Engates */}
      <rect x={0} y={212} width={30} height={12} rx={3} fill={palette.navyDeep} />
      <rect x={610} y={212} width={30} height={12} rx={3} fill={palette.navyDeep} />

      {/* Tejadilho */}
      <path d="M34 72 Q34 44 66 44 H574 Q606 44 606 72 Z" fill={palette.navy} />
      <rect x={60} y={36} width={520} height={10} rx={5} fill={palette.navyDeep} />

      {/* Corpo */}
      <rect x={24} y={66} width={592} height={166} rx={12} fill={body} />
      <path d="M24 184 H616 V220 Q616 232 604 232 H36 Q24 232 24 220 Z" fill={lowerPanel} />
      <rect x={24} y={182} width={592} height={4} fill={trim} />
      <rect x={24} y={74} width={592} height={3} fill={trim} opacity={0.6} />

      {children}

      {/* Placa com o número e o nome do capítulo */}
      <g transform="translate(320 207)">
        <rect x={-plaqueW / 2} y={-17} width={plaqueW} height={34} rx={7} fill={plaque} />
        <circle cx={-plaqueW / 2 + 19} cy={0} r={11} fill={plaqueText} />
        <text
          x={-plaqueW / 2 + 19}
          y={4.5}
          textAnchor="middle"
          fontFamily="Effra, sans-serif"
          fontWeight={700}
          fontSize={14}
          fill={plaque}
        >
          {number}
        </text>
        <text
          x={-plaqueW / 2 + 38}
          y={7}
          fontFamily="Effra, sans-serif"
          fontWeight={700}
          fontSize={19}
          letterSpacing={2}
          fill={plaqueText}
        >
          {label.toUpperCase()}
        </text>
      </g>

      {/* Chassis, bogies e rodas */}
      <rect x={36} y={230} width={568} height={14} rx={4} fill={palette.navyDeep} />
      {/* Bogies: pivô ligado ao chassis + armação que segura os eixos das rodas */}
      {[133, 507].map((cx) => (
        <g key={cx}>
          <rect x={cx - 14} y={240} width={28} height={16} fill={palette.navyDeep} />
          <rect x={cx - 66} y={252} width={132} height={14} rx={6} fill={palette.steel} />
        </g>
      ))}
      <Wheel cx={102} cy={274} r={26} />
      <Wheel cx={164} cy={274} r={26} />
      <Wheel cx={476} cy={274} r={26} />
      <Wheel cx={538} cy={274} r={26} />
    </svg>
  );
}
