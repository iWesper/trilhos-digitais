"use client";
import { HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import NavbarChapters from "@/components/chapters/NavbarChapters";
import { useState } from "react";
import { ProgressProvider } from "@/components/context/ProgressContext";

export default function ChaptersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  
  return (
    <ProgressProvider>
      <main>
        <NavbarChapters />
        {children}
      </main>
    </ProgressProvider>
  );
}
