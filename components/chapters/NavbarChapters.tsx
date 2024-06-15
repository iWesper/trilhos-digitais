import Image from "next/image";
import Link from "next/link";
import { HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { Progress } from "@/components/ui/progress";

interface NavbarChaptersProps {
  progress?: number;
}

const NavbarChapters: React.FC<NavbarChaptersProps> = ({ progress }) => {
  return (
    <div className="flex items-center justify-between px-10 p-4 bg-gray-800 text-white absolute top-0 left-0 right-0 rounded-b-xl backdrop-blur-md bg-opacity-80">
      <Link href={"/"}>
        <HomeIcon className="w-9 h-9" />
      </Link>

      <div className="mx-4 bg-gray-700 rounded-full h-2.5 dark:bg-gray-700 w-3/12">
        <Progress value={progress || 0} />
      </div>

      <Link href={"/badges"}>
        <TrophyIcon className="w-9 h-9" />
      </Link>
    </div>
  );
};

export default NavbarChapters;
