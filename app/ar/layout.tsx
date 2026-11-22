import type { Metadata } from "next";
import { ProgressProvider } from "@/components/context/ProgressContext";
import RequireAuth from "@/components/auth/RequireAuth";

export const metadata: Metadata = { title: "Realidade Aumentada" };

export default function ARLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RequireAuth allowAnonymousOnMobile>
      <ProgressProvider>
        <main className="overflow-hidden text-sm md:text-md lg:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl">
          {children}
        </main>
      </ProgressProvider>
    </RequireAuth>
  );
}
