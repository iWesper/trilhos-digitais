"use client";

import { motion, useTransform } from "framer-motion";
import { palette, useSvgId, useSvgTransform, useTrain, useWheelAngle, Wheel } from "./parts";

export const LOCO_W = 560;

const DRIVER_R = 34;
const DRIVERS = [236, 316, 396];
const CRANK = 12;

// Fumo: decorativo, só corre se o utilizador não pediu menos movimento
function Steam() {
  const { reduced } = useTrain();
  if (reduced) return null;
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          fill="#FFFFFF"
          initial={{ cx: 196, cy: 24, r: 8, opacity: 0 }}
          animate={{ cx: [196, 236], cy: [24, -24], r: [8, 26], opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, ease: [0.19, 1, 0.22, 1], repeat: Infinity, delay: i * 1 }}
        />
      ))}
    </g>
  );
}

// Biela: acompanha a rotação das rodas motrizes
function DriveRod() {
  const angle = useWheelAngle(DRIVER_R);
  const ref = useSvgTransform(
    useTransform(angle, (a) => {
      const rad = (a * Math.PI) / 180;
      return `translate(${Math.cos(rad) * CRANK} ${Math.sin(rad) * CRANK})`;
    })
  );
  return (
    <g ref={ref}>
      <rect x={DRIVERS[0] - 6} y={262} width={DRIVERS[2] - DRIVERS[0] + 12} height={8} rx={4} fill={palette.gold} />
      {DRIVERS.map((d) => (
        <circle key={d} cx={d} cy={266} r={5} fill={palette.navyDeep} />
      ))}
    </g>
  );
}

export default function Locomotive() {
  const glowId = useSvgId("headlight");
  return (
    <svg
      viewBox={`0 0 ${LOCO_W} 300`}
      className="h-full w-auto overflow-visible"
      role="img"
      aria-label="Locomotiva do Expresso Digital"
    >
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor={palette.glow} stopOpacity={0.9} />
          <stop offset="100%" stopColor={palette.glow} stopOpacity={0} />
        </radialGradient>
      </defs>

      <Steam />

      {/* Chaminé */}
      <path d="M180 66 L176 34 H216 L212 66 Z" fill={palette.navy} />
      <rect x={172} y={28} width={48} height={10} rx={4} fill={palette.navyDeep} />
      <rect x={178} y={46} width={36} height={6} fill={palette.green} />

      {/* Cúpula */}
      <path d="M262 70 Q262 50 282 50 H300 Q320 50 320 70 Z" fill={palette.navy} />

      {/* Caldeira com nariz aerodinâmico */}
      <path d="M412 72 H150 C80 72 26 118 22 176 C20 212 36 232 66 232 H412 Z" fill={palette.navy} />
      {/* Reflexo */}
      <path d="M150 86 C100 90 62 118 50 150" stroke="#FFFFFF" strokeOpacity={0.12} strokeWidth={8} strokeLinecap="round" fill="none" />

      {/* Cabine */}
      <rect x={404} y={52} width={144} height={180} rx={10} fill={palette.navy} />
      <rect x={394} y={38} width={164} height={18} rx={8} fill={palette.navyDeep} />
      <rect x={428} y={76} width={92} height={62} rx={8} fill="#24435F" />
      <rect x={428} y={76} width={92} height={62} rx={8} fill={palette.glow} opacity={0.22} />
      <path d="M440 86 L462 86 L446 126 L430 126 Z" fill="#FFFFFF" opacity={0.12} />
      <rect x={428} y={76} width={92} height={62} rx={8} fill="none" stroke={palette.navyDeep} strokeWidth={5} />

      {/* Faixa verde que acompanha o nariz */}
      <path d="M548 176 H104 C74 176 50 184 32 198 L36 212 C54 198 76 192 104 192 H548 Z" fill={palette.green} />

      {/* Marca */}
      <image href="/img/logo_navbar.svg" x={178} y={104} width={40} height={40} />
      <text
        x={228}
        y={131}
        fontFamily="Effra, sans-serif"
        fontWeight={700}
        fontSize={16}
        letterSpacing={1.5}
        fill={palette.cream}
      >
        EXPRESSO DIGITAL
      </text>

      {/* Farol */}
      <circle cx={46} cy={158} r={34} fill={`url(#${glowId})`} />
      <circle cx={46} cy={158} r={10} fill={palette.glow} />
      <circle cx={46} cy={158} r={10} fill="none" stroke={palette.navyDeep} strokeWidth={3} />

      {/* Limpa-vias */}
      <path d="M70 232 L34 270 H120 L128 232 Z" fill={palette.steel} />
      {[50, 70, 90, 110].map((x) => (
        <line key={x} x1={x} y1={268} x2={x + 14} y2={234} stroke={palette.navyDeep} strokeWidth={3} />
      ))}

      {/* Chassis, armação das rodas e engate */}
      <rect x={60} y={230} width={490} height={14} rx={4} fill={palette.navyDeep} />
      <rect x={128} y={240} width={400} height={30} rx={6} fill={palette.navyDeep} />
      <rect x={540} y={212} width={20} height={12} rx={3} fill={palette.navyDeep} />

      {/* Rodas */}
      <Wheel cx={150} cy={280} r={20} />
      {DRIVERS.map((x) => (
        <Wheel key={x} cx={x} cy={300 - DRIVER_R} r={DRIVER_R} />
      ))}
      <Wheel cx={500} cy={278} r={22} />
      <DriveRod />
    </svg>
  );
}
