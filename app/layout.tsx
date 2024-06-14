import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Trilhos Digitais",
  description: "Uma viagem pela história da multimédia!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-primary font-sans antialiased",
          fontSans.variable
        )}>{children}</body>
    </html>
  );
}