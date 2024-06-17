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

  const chapters = ["chapter1", "chapter2", "chapter3", "chapter4", "chapter5", "chapter6", "chapter7", "chapter8"]; // Array de strings que representam os capítulos
  let milestones: number[] = []; // Array de números que representam os milestones do capítulo atual
  
  for (const chapter of chapters) {
    if (pathname.includes(chapter)) {
      milestones = getMilestonesForChapter(chapter); // Trazer os milestones do capítulo atual como um array de números
      break;
    }
  }

  return (
    <div className="flex items-center justify-between px-10 p-4 bg-gray-800 text-white absolute top-0 left-0 right-0 rounded-b-xl backdrop-blur-md bg-opacity-80">
      <Link href={"/"}>
        <HomeIcon className="w-9 h-9" />
      </Link>

      <div className="mx-4 bg-gray-700 rounded-full h-2.5 dark:bg-gray-700 w-3/12">
        <Progress value={progress || 0} milestones={milestones.map(Number)}/>
      </div>

      <Link href={"/badges"}>
        <TrophyIcon className="w-9 h-9" />
      </Link>
    </div>
  );
};

export default NavbarChapters;
