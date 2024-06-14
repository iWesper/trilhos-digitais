"use client";
import { HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import NavbarChapters from "@/components/chapters/NavbarChapters";
import { useState } from "react";

export default function ChaptersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Example progress value
const [progress,setProgress]= useState(25) // This should be dynamic based on actual progress
  return (
    <main>
      <NavbarChapters progress={progress} />
      {children}
    </main>
  );
}
