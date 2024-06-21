import Link from "next/link";
import { HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/components/context/ProgressContext";
import { getMilestonesForChapter } from "@/components/ui/progress";
import { usePathname } from "next/navigation";

const NavbarChapters: React.FC = () => {
  //PROGRESSO
  const { progress } = useProgress();
  // Obter o pathname da página
  const pathname = usePathname();

  const chapters = [
    "chapter1",
    "chapter2",
    "chapter3",
    "chapter4",
    "chapter5",
    "chapter6",
    "chapter7",
    "chapter8",
  ]; // Array de strings que representam os capítulos
  let milestones: number[] = []; // Array de números que representam os milestones do capítulo atual

  for (const chapter of chapters) {
    if (pathname.includes(chapter)) {
      milestones = getMilestonesForChapter(chapter); // Trazer os milestones do capítulo atual como um array de números
      break;
    }
  }

  return (
    <div className="grid grid-cols-12 gap-4 items-center justify-between px-10 p-4 bg-foreground text-white absolute top-0 left-0 right-0 rounded-b-xl backdrop-blur-md bg-opacity-80">
      <Link href={"/"} className="col-span-3">
        <div className="relative group">
          <HomeIcon className="w-9 h-9 transition duration-300 ease-in-out group-hover:-translate-y-10 group-hover:opacity-0" />
          <span className="absolute left-0 top-0 opacity-0 pt-2 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            Home
          </span>
        </div>
      </Link>

      <div className="col-span-6 bg-gray-700 rounded-full h-2.5 dark:bg-gray-700">
        <Progress value={progress || 0} milestones={milestones.map(Number)} />
      </div>

      <div className="col-span-3 flex justify-end">
        <Link href={"/badges"} className="relative group">
          <TrophyIcon className="w-9 h-9 transition duration-300 ease-in-out group-hover:-translate-y-10 group-hover:opacity-0" />
          <span className="absolute left-[-50%] top-0 opacity-0 pt-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
            Badges
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NavbarChapters;
