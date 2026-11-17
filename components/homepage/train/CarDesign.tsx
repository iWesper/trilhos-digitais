"use client";

import { CSSProperties } from "react";
import { CarFrame, CarWindow } from "./parts";

// Capítulo 2 — Design: carruagem Bauhaus. Formas primárias, a cadeira Wassily e a evolução do telemóvel.
const b = {
  cream: "#EFE6D2",
  ink: "#1B1B1B",
  red: "#D7392B",
  yellow: "#F2C230",
  blue: "#1F4E9C",
  wall: "#F7F2E6",
  grey: "#D9D2C2",
};

// Rodar à volta do próprio centro (SVG)
const ownCenter: CSSProperties = { transformBox: "fill-box", transformOrigin: "center" };
const shift = "transition-transform duration-300 ease-out";

export default function CarDesign() {
  return (
    <CarFrame
      number={2}
      label="Design"
      body={b.cream}
      lowerPanel={b.ink}
      trim={b.red}
      plaque={b.yellow}
      plaqueText={b.ink}
    >
      {/* Blocos de cor no painel inferior */}
      <rect x={48} y={194} width={56} height={24} fill={b.red} />
      <rect x={110} y={194} width={24} height={24} fill={b.blue} />
      <rect x={506} y={194} width={24} height={24} fill={b.yellow} />
      <rect x={536} y={194} width={56} height={24} fill={b.blue} />

      {/* Formas primárias (o questionário de Kandinsky) */}
      <CarWindow x={50} y={90} w={128} h={82} interior={b.wall}>
        <polygon
          points="78,158 98,122 118,158"
          fill={b.yellow}
          style={ownCenter}
          className={`${shift} motion-safe:group-hover:-translate-y-1.5 motion-safe:group-focus-visible:-translate-y-1.5`}
        />
        <rect
          x={110}
          y={104}
          width={28}
          height={28}
          fill={b.red}
          style={ownCenter}
          className={`${shift} motion-safe:group-hover:rotate-45 motion-safe:group-focus-visible:rotate-45`}
        />
        <circle
          cx={150}
          cy={148}
          r={14}
          fill={b.blue}
          style={ownCenter}
          className={`${shift} motion-safe:group-hover:-translate-x-1.5 motion-safe:group-focus-visible:-translate-x-1.5`}
        />
        <rect x={60} y={158} width={108} height={4} fill={b.ink} />
      </CarWindow>

      {/* Cadeira Wassily (Marcel Breuer) diante de um cartaz Bauhaus */}
      <CarWindow x={208} y={80} w={224} h={102} interior={b.wall}>
        <rect x={220} y={92} width={40} height={78} fill={b.red} />
        <circle cx={240} cy={112} r={11} fill={b.cream} />
        <rect x={226} y={132} width={28} height={4} fill={b.ink} />
        <rect x={226} y={142} width={20} height={4} fill={b.ink} />
        <text x={224} y={164} style={{ fontFamily: "var(--font-effra), sans-serif" }} fontWeight={700} fontSize={8} fill={b.cream} letterSpacing={0.5}>
          bauhaus
        </text>
        <rect x={208} y={170} width={224} height={12} fill={b.grey} />
        {/* Estrutura em tubo de aço */}
        <g fill="none" stroke={b.ink} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M296 170 H392" />
          <path d="M304 170 V128 H384 V170" />
          <path d="M378 128 L392 98" />
          <path d="M304 144 H392" />
        </g>
        {/* Tiras de couro */}
        <path d="M310 126 L384 132 L380 140 L308 136 Z" fill="#3A2E2A" />
        <path d="M370 106 L388 100 L384 132 L366 132 Z" fill="#3A2E2A" />
        <rect x={300} y={140} width={8} height={18} fill="#3A2E2A" />
        <rect x={380} y={140} width={8} height={18} fill="#3A2E2A" />
      </CarWindow>

      {/* Evolução do telemóvel: do "tijolo" ao smartphone */}
      <CarWindow x={462} y={90} w={128} h={82} interior={b.wall}>
        <rect x={472} y={164} width={108} height={4} fill={b.ink} />
        {/* Tijolo */}
        <rect x={480} y={118} width={20} height={46} rx={3} fill="#4A4A4A" />
        <rect x={486} y={106} width={4} height={14} fill="#4A4A4A" />
        <rect x={484} y={124} width={12} height={8} fill="#9FB7A0" />
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => <rect key={`${r}${c}`} x={484 + c * 7} y={138 + r * 7} width={5} height={4} fill="#BDBDBD" />)
        )}
        {/* Flip */}
        <rect x={512} y={126} width={20} height={38} rx={4} fill={b.blue} />
        <rect x={515} y={130} width={14} height={14} rx={2} fill="#BFD3F2" />
        {/* Smartphone */}
        <g className={`${shift} motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-y-1`}>
          <rect x={544} y={110} width={30} height={54} rx={6} fill={b.ink} />
          <rect x={547} y={115} width={24} height={44} rx={3} fill="#2D3E55" />
          <rect x={547} y={115} width={24} height={44} rx={3} fill="#FFD98A" className="opacity-0 transition-opacity duration-300 group-hover:opacity-40 group-focus-visible:opacity-40" />
          <rect x={552} y={113} width={14} height={3} rx={1.5} fill={b.ink} />
        </g>
      </CarWindow>
    </CarFrame>
  );
}
