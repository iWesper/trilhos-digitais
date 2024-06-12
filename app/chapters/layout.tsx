import { HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import NavbarChapters from "@/components/chapters/NavbarChapters";

export default function ChaptersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Example progress value
  const progress = 1; // This should be dynamic based on actual progress
  return (
    <main>
      <NavbarChapters progress={1} />
      {children}
    </main>
  );
}
