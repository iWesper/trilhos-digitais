'use client'

import Navbar from "@/components/homepage/Navbar";

export default function BadgesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
