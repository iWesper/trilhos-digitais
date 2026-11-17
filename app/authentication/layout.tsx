import type { Metadata } from "next";
import RedirectIfSignedIn from "@/components/auth/RedirectIfSignedIn";

export const metadata: Metadata = { title: "Entrar" };

export default function AuthenticationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RedirectIfSignedIn>
      <main className="overflow-hidden">{children}</main>
    </RedirectIfSignedIn>
  );
}
