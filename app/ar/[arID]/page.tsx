import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

// Cada modelo AR é carregado à parte; os QR codes apontam para /ar/1 a /ar/4
const MODELS: Record<string, ComponentType> = {
  "1": dynamic(() => import("@/components/ar/ARWagner")),
  "2": dynamic(() => import("@/components/ar/ARBauhaus")),
  "3": dynamic(() => import("@/components/ar/ARTv")),
  "4": dynamic(() => import("@/components/ar/ARPrensa")),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(MODELS).map((arID) => ({ arID }));
}

export default async function ARPage({ params }: { params: Promise<{ arID: string }> }) {
  const { arID } = await params;
  const Model = MODELS[arID];
  if (!Model) notFound();
  return <Model />;
}
