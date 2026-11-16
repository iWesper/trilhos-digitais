"use client";

import { CarFrame, CarWindow, palette } from "./parts";

// Capítulo 1 — Arte: carruagem-teatro. Wagner e a Gesamtkunstwerk: música, palco e palavra numa só obra.
const c = {
  body: "#A9372F",
  lower: "#7C2520",
  curtain: "#C8433A",
  curtainDark: "#962B25",
  interior: "#2A1114",
  pit: "#140708",
  floor: "#7A4A2E",
};

const STAGE = "M208 182 V104 Q208 78 236 78 H404 Q432 78 432 104 V182 Z";

export default function CarArte() {
  return (
    <CarFrame
      number={1}
      label="Arte"
      body={c.body}
      lowerPanel={c.lower}
      trim={palette.gold}
      plaque={palette.gold}
      plaqueText={palette.navy}
    >
      {/* Música: pauta e notas */}
      <CarWindow x={50} y={90} w={128} h={82} interior={c.interior}>
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={60} x2={168} y1={108 + i * 10} y2={108 + i * 10} stroke={palette.gold} strokeOpacity={0.45} strokeWidth={1.5} />
        ))}
        <g
          fill={palette.cream}
          className="transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-y-1"
        >
          <ellipse cx={86} cy={148} rx={7} ry={5} transform="rotate(-20 86 148)" />
          <ellipse cx={114} cy={138} rx={7} ry={5} transform="rotate(-20 114 138)" />
          <rect x={91} y={110} width={3} height={38} />
          <rect x={119} y={100} width={3} height={38} />
          <path d="M91 110 L122 100 V108 L91 118 Z" />
          <ellipse cx={148} cy={128} rx={7} ry={5} transform="rotate(-20 148 128)" />
          <rect x={153} y={94} width={3} height={34} />
          <path d="M156 94 q10 6 4 18 q2 -9 -4 -11 Z" />
        </g>
      </CarWindow>

      {/* Palco: proscénio, cortinas, foco de luz, intérprete e fossa de orquestra */}
      <CarWindow x={208} y={78} w={224} h={104} path={STAGE} interior={c.interior}>
        <polygon
          points="320,78 284,154 356,154"
          fill={palette.glow}
          className="opacity-20 transition-opacity duration-300 ease-out group-hover:opacity-50 group-focus-visible:opacity-50"
        />
        <rect x={208} y={152} width={224} height={10} fill={c.floor} />
        {/* Intérprete */}
        <circle cx={320} cy={118} r={6} fill={palette.cream} />
        <path d="M320 124 L305 152 H335 Z" fill={palette.gold} />
        <path d="M322 130 L336 114" stroke={palette.gold} strokeWidth={3} strokeLinecap="round" />
        {/* Fossa de orquestra */}
        <rect x={208} y={162} width={224} height={20} fill={c.pit} />
        {Array.from({ length: 12 }, (_, i) => {
          const x = 226 + i * 17;
          if (Math.abs(x - 320) < 10) return null;
          return (
            <g key={i}>
              <circle cx={x} cy={172} r={4.5} fill="#4A2A30" />
              {i % 2 === 0 && <line x1={x + 3} y1={176} x2={x + 11} y2={168} stroke={palette.gold} strokeOpacity={0.7} strokeWidth={1.5} />}
            </g>
          );
        })}
        <circle cx={320} cy={170} r={5} fill={palette.cream} />
        <line x1={324} y1={168} x2={336} y2={160} stroke={palette.cream} strokeWidth={1.5} strokeLinecap="round" />
        {/* Cortinas: abrem um pouco no hover */}
        <g className="transition-transform duration-500 ease-out motion-safe:group-hover:-translate-x-3 motion-safe:group-focus-visible:-translate-x-3">
          <path d="M208 78 H266 C254 104 270 128 256 156 L208 160 Z" fill={c.curtain} />
          <path d="M228 84 C226 110 232 134 226 158 M246 84 C242 110 250 132 242 156" stroke={c.curtainDark} strokeWidth={3} fill="none" />
        </g>
        <g className="transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-3 motion-safe:group-focus-visible:translate-x-3">
          <path d="M432 78 H374 C386 104 370 128 384 156 L432 160 Z" fill={c.curtain} />
          <path d="M412 84 C414 110 408 134 414 158 M394 84 C398 110 390 132 398 156" stroke={c.curtainDark} strokeWidth={3} fill="none" />
        </g>
        {/* Sanefa */}
        <path
          d="M208 78 H432 V90 Q422 98 412 90 Q402 98 392 90 Q382 98 372 90 Q362 98 352 90 Q342 98 332 90 Q322 98 312 90 Q302 98 292 90 Q282 98 272 90 Q262 98 252 90 Q242 98 232 90 Q222 98 208 90 Z"
          fill={c.curtainDark}
        />
      </CarWindow>
      <path d={STAGE} fill="none" stroke={palette.gold} strokeWidth={3} transform="translate(0 0)" />

      {/* Palavra: libreto aberto */}
      <CarWindow x={462} y={90} w={128} h={82} interior={c.interior}>
        <path d="M526 152 L482 144 V106 L526 114 Z" fill={palette.cream} />
        <path d="M526 152 L570 144 V106 L526 114 Z" fill="#EBDCC2" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} stroke="#9C7A55" strokeWidth={1.5}>
            <line x1={489} y1={118 + i * 7} x2={519} y2={124 + i * 7} />
            <line x1={533} y1={124 + i * 7} x2={563} y2={118 + i * 7} />
          </g>
        ))}
        <path d="M526 114 V152" stroke="#9C7A55" strokeWidth={1.5} />
      </CarWindow>
    </CarFrame>
  );
}
