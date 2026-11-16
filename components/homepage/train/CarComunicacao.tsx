"use client";

import { CarFrame, CarWindow, palette } from "./parts";

// Capítulo 3 — Comunicação: "O Meio É A Mensagem" (McLuhan).
// Uma foto (um só frame) vs. um filme (vários frames) e os signos: ícone, índice, símbolo.
const k = {
  body: "#24475E",
  lower: "#18334A",
  orange: "#FD9A02",
  paper: "#F3ECDD",
  dark: "#151E26",
  screen: "#20313F",
};

const shift = "transition-transform duration-300 ease-out";

export default function CarComunicacao() {
  return (
    <CarFrame
      number={3}
      label="Comunicação"
      body={k.body}
      lowerPanel={k.lower}
      trim={k.orange}
      plaque={k.orange}
      plaqueText={palette.navy}
    >
      {/* Modalidade espaciotemporal: uma fotografia instantânea, um só frame */}
      <CarWindow x={50} y={90} w={128} h={82} interior={k.dark}>
        <g
          transform="rotate(-6 114 131)"
          className={`${shift} motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-y-1`}
        >
          <rect x={90} y={100} width={48} height={58} rx={2} fill={k.paper} />
          <rect x={95} y={105} width={38} height={36} fill="#7FA7C2" />
          <circle cx={123} cy={114} r={5} fill={palette.glow} />
          <path d="M95 141 L108 124 L117 133 L124 126 L133 141 Z" fill="#3E6B52" />
        </g>
      </CarWindow>

      {/* Ecrã de cinema: o mesmo tema contado frame a frame, com o letreiro de McLuhan */}
      <CarWindow x={208} y={80} w={224} h={102} interior={k.dark}>
        <rect x={208} y={80} width={224} height={26} fill={k.orange} />
        <text
          x={320}
          y={98}
          textAnchor="middle"
          fontFamily="Effra, sans-serif"
          fontWeight={700}
          fontSize={13}
          letterSpacing={1.5}
          fill={palette.navy}
        >
          O MEIO É A MENSAGEM
        </text>
        {/* Película: 4 frames em sequência */}
        <g className={`${shift} motion-safe:group-hover:-translate-x-6 motion-safe:group-focus-visible:-translate-x-6`}>
          <rect x={200} y={116} width={262} height={56} fill="#0B1117" />
          {Array.from({ length: 14 }, (_, i) => (
            <g key={i} fill="#3B4C5A">
              <rect x={206 + i * 18} y={119} width={8} height={5} rx={1} />
              <rect x={206 + i * 18} y={164} width={8} height={5} rx={1} />
            </g>
          ))}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 214 + i * 50;
            return (
              <g key={i}>
                <rect x={x} y={128} width={42} height={32} fill="#7FA7C2" />
                <path d={`M${x} 160 L${x + 13} 143 L${x + 22} 152 L${x + 29} 145 L${x + 42} 160 Z`} fill="#3E6B52" />
                {/* O sol vai-se pondo de frame para frame */}
                <circle cx={x + 30} cy={136 + i * 3} r={4} fill={palette.glow} />
              </g>
            );
          })}
        </g>
      </CarWindow>

      {/* Modalidade semiótica: ícone (rosto), índice (pegada), símbolo (coração) */}
      <CarWindow x={462} y={90} w={128} h={82} interior={k.dark}>
        {[472, 512, 552].map((x) => (
          <rect key={x} x={x} y={110} width={30} height={42} rx={4} fill={k.paper} />
        ))}
        {/* Ícone: semelhante ao real */}
        <circle cx={487} cy={124} r={6} fill={k.body} />
        <path d="M477 146 Q487 130 497 146 Z" fill={k.body} />
        {/* Índice: indica algo (alguém passou aqui) */}
        <ellipse cx={527} cy={134} rx={6} ry={9} fill={k.body} />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={520 + i * 4.6} cy={121 - (i === 1 || i === 2 ? 2 : 0)} r={2} fill={k.body} />
        ))}
        {/* Símbolo: pura convenção */}
        <path d="M567 144 C551 132 555 118 567 126 C579 118 583 132 567 144 Z" fill="#D7392B" />
      </CarWindow>
    </CarFrame>
  );
}
