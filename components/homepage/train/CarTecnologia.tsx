"use client";

import { CarFrame, CarWindow, palette } from "./parts";

// Capítulo 4 — Tecnologia: a linha do tempo do capítulo, janela a janela.
// Linguagem → escrita → prensa → comunicação ubíqua. No hover as janelas acendem em sequência.
const t = {
  body: "#1C3A55",
  lower: "#132A3F",
  interior: "#0F2133",
  paper: "#F3ECDD",
  wood: "#8A5A3B",
};

const W = 120;
const STEPS = [46, 188, 330, 472];
// Atraso crescente: a evolução lê-se da esquerda para a direita
const lightDelays = ["delay-0", "delay-75", "delay-150", "delay-200"];

function Light({ x, i }: { x: number; i: number }) {
  return (
    <rect
      x={x}
      y={88}
      width={W}
      height={84}
      fill={palette.glow}
      className={`opacity-0 transition-opacity duration-300 ease-out ${lightDelays[i]} group-hover:opacity-25 group-focus-visible:opacity-25`}
    />
  );
}

export default function CarTecnologia() {
  return (
    <CarFrame
      number={4}
      label="Tecnologia"
      body={t.body}
      lowerPanel={t.lower}
      trim={palette.green}
      plaque={palette.green}
      plaqueText={palette.navy}
    >
      {/* Marcos da linha do tempo sobre o friso verde */}
      {STEPS.map((x) => (
        <circle key={x} cx={x + W / 2} cy={184} r={6} fill={palette.green} stroke={t.lower} strokeWidth={3} />
      ))}

      {/* 1. Linguagem: duas pessoas a falar */}
      <CarWindow x={STEPS[0]} y={88} w={W} h={84} interior={t.interior}>
        <circle cx={78} cy={140} r={8} fill={palette.cream} />
        <path d="M64 172 Q78 148 92 172 Z" fill={palette.cream} />
        <circle cx={134} cy={140} r={8} fill={palette.cream} />
        <path d="M120 172 Q134 148 148 172 Z" fill={palette.cream} />
        <path d="M80 102 H118 Q124 102 124 108 V120 Q124 126 118 126 H96 L88 134 V126 H80 Q74 126 74 120 V108 Q74 102 80 102 Z" fill={palette.green} />
        <circle cx={88} cy={114} r={2.5} fill={t.interior} />
        <circle cx={99} cy={114} r={2.5} fill={t.interior} />
        <circle cx={110} cy={114} r={2.5} fill={t.interior} />
        <Light x={STEPS[0]} i={0} />
      </CarWindow>

      {/* 2. Escrita: pergaminho e pena */}
      <CarWindow x={STEPS[1]} y={88} w={W} h={84} interior={t.interior}>
        <rect x={208} y={104} width={64} height={56} fill={t.paper} />
        <rect x={202} y={100} width={76} height={8} rx={4} fill="#D9CCB2" />
        <rect x={202} y={156} width={76} height={8} rx={4} fill="#D9CCB2" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={216} y1={118 + i * 9} x2={i === 3 ? 248 : 264} y2={118 + i * 9} stroke="#8C7A5E" strokeWidth={2} />
        ))}
        <path d="M296 98 C282 112 270 130 262 148 L266 150 C276 132 290 116 300 102 Z" fill={palette.cream} />
        <path d="M262 148 L258 156 L266 150 Z" fill={palette.gold} />
        <Light x={STEPS[1]} i={1} />
      </CarWindow>

      {/* 3. Prensa de Gutenberg */}
      <CarWindow x={STEPS[2]} y={88} w={W} h={84} interior={t.interior}>
        <rect x={354} y={98} width={8} height={70} fill={t.wood} />
        <rect x={404} y={98} width={8} height={70} fill={t.wood} />
        <rect x={348} y={96} width={70} height={10} fill={t.wood} />
        <rect x={348} y={152} width={70} height={8} fill={t.wood} />
        <rect x={379} y={106} width={8} height={22} fill="#B9B9B9" />
        <rect x={364} y={128} width={38} height={8} fill="#5A3A26" />
        <rect x={366} y={144} width={34} height={8} fill={t.paper} />
        {/* Alavanca: roda um pouco no hover */}
        <g
          style={{ transformBox: "view-box", transformOrigin: "383px 112px" }}
          className="transition-transform duration-500 ease-out motion-safe:group-hover:rotate-12 motion-safe:group-focus-visible:rotate-12"
        >
          <rect x={383} y={110} width={34} height={4} rx={2} fill={palette.gold} />
          <circle cx={417} cy={112} r={4} fill={palette.gold} />
        </g>
        <Light x={STEPS[2]} i={2} />
      </CarWindow>

      {/* 4. Comunicação ubíqua: smartphone ligado ao mundo */}
      <CarWindow x={STEPS[3]} y={88} w={W} h={84} interior={t.interior}>
        <circle cx={510} cy={130} r={26} fill="#24577A" />
        <path d="M492 120 Q502 112 512 118 Q520 124 516 134 Q508 140 498 136 Q490 130 492 120 Z" fill={palette.green} opacity={0.85} />
        <path d="M514 144 Q522 140 528 146 Q526 154 518 154 Z" fill={palette.green} opacity={0.85} />
        <ellipse cx={510} cy={130} rx={26} ry={9} fill="none" stroke="#7FB6D9" strokeWidth={1.5} opacity={0.6} />
        <rect x={548} y={106} width={30} height={56} rx={6} fill="#0B1620" />
        <rect x={551} y={111} width={24} height={46} rx={3} fill="#3D7FB0" />
        <g fill="none" stroke={palette.green} strokeWidth={2.5} strokeLinecap="round">
          <path d="M556 128 Q563 121 570 128" />
          <path d="M552 123 Q563 113 574 123" />
        </g>
        <circle cx={563} cy={133} r={2.5} fill={palette.green} />
        <Light x={STEPS[3]} i={3} />
      </CarWindow>
    </CarFrame>
  );
}
