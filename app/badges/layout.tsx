import type { Metadata } from "next";
import Navbar from "@/components/homepage/Navbar";
import { ProgressProvider } from "@/components/context/ProgressContext";
import RequireAuth from "@/components/auth/RequireAuth";
import FadeInMain from "@/components/ui/fade-in-main";

export const metadata: Metadata = { title: "Badges" };

export default function BadgesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RequireAuth desktopOnly>
      <ProgressProvider>
        <FadeInMain className="overflow-hidden h-screen w-screen">
          <Navbar />
          {children}
        </FadeInMain>
      </ProgressProvider>
    </RequireAuth>
  );
}
