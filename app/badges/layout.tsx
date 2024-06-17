"use client";

import Navbar from "@/components/homepage/Navbar";
import { ProgressProvider } from "@/components/context/ProgressContext";

export default function BadgesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <ProgressProvider>
        <Navbar />
        {children}
      </ProgressProvider>
    </main>
  );
}
