"use client";

import NavbarChapters from "@/components/chapters/NavbarChapters";
import { ProgressProvider } from "@/components/context/ProgressContext";
import RequireAuth from "@/components/auth/RequireAuth";

export default function ChaptersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RequireAuth desktopOnly>
      <ProgressProvider>
        <main className="overflow-hidden text-sm md:text-md lg:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl">
          <NavbarChapters />
          {children}
        </main>
      </ProgressProvider>
    </RequireAuth>
  );
}
