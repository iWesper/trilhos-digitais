import { HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function ChaptersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Example progress value
  const progress = 1; // This should be dynamic based on actual progress
  return (
    <main>
      <div className="flex items-center justify-between px-10 p-4 bg-gray-800 text-white">
        <Link href={"/"}>
          <HomeIcon className="w-6 h-6" />
        </Link>

        <div className="mx-4 bg-gray-700 rounded-full h-2.5 dark:bg-gray-700 w-3/12">
          <Progress value={33} />
        </div>

        <TrophyIcon className="w-6 h-6" />
      </div>
      {children}
    </main>
  );
}
