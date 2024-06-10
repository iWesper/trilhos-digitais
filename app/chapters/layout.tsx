import { HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

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

        <div className="w-full mx-4 bg-gray-700 rounded-full h-2.5 dark:bg-gray-700 w-3/12">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <TrophyIcon className="w-6 h-6" />
      </div>
      {children}
    </main>
  );
}
