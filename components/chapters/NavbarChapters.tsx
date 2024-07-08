import Link from "next/link";
import React, { useState, useEffect, use } from "react";
import { HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/components/context/ProgressContext";
import { getMilestonesForChapter } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NavbarChapters: React.FC = () => {
  //PROGRESSO
  const { progress } = useProgress();
  // Obter o pathname da página
  const pathname = usePathname();

  //State Show Navbar
  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  //capítulos possíveis com number
  const allowedChapters = [1, 2, 3, 4]; //Depois colocar os restantes 4

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

  //OBJETO DE CAPÍTULOS
  const chaptersObj = [
    {
      nome: "Arte",
      numero: 1,
    },
    {
      nome: "Design",
      numero: 2,
    },
    {
      nome: "Comunicação",
      numero: 3,
    },
    {
      nome: "Tecnologia",
      numero: 4,
    },
    {
      nome: "Hipermédia",
      numero: 5,
    },
    {
      nome: "Virtual/Metaverso",
      numero: 5,
    },
    {
      nome: "Jogo",
      numero: 7,
    },
    {
      nome: "Inteligência Artificial",
      numero: 8,
    },
  ];

  let milestones: number[] = []; // Array de números que representam os milestones do capítulo atual
  let chapterNumber: number; // Número do capítulo atual

  useEffect(() => {
    const chapterMatch = pathname.match(/chapter(\d+)/); // Ajuste para capturar apenas dígitos após "chapter"
    const chapterContent = chapterMatch ? chapterMatch[1] : "";
    let chapterNum = parseInt(chapterContent, 10);


    // Ajuste para garantir que setShowNavbar seja chamado com true para capítulos permitidos
    if (!isNaN(chapterNum) && allowedChapters.includes(chapterNum)) {
      // Ajuste para garantir que chapterNumber seja atualizado apenas para capítulos permitidos
      chapterNumber = chapterNum;


      // Ajuste para garantir que milestones seja atualizado apenas para capítulos permitidos
      milestones = getMilestonesForChapter(`chapter${chapterNum}`);

      // Ajuste para garantir que setShowNavbar seja chamado com true para capítulos permitidos
      setShowNavbar(true);
    } else {
      // Ajuste para garantir que setShowNavbar seja chamado com false para capítulos não permitidos
      setShowNavbar(false);
    }
  }, [pathname, allowedChapters]);

  // Encontrar o objeto correspondente no array
  const currentChapterObj = chaptersObj.find(
    (obj) => obj.numero === chapterNumber
  );
  const chapterInfo = currentChapterObj
    ? `Capítulo ${currentChapterObj.numero} - ${currentChapterObj.nome}`
    : "";

  return (
    <>
      {showNavbar === true && (
        <div className="grid grid-cols-12 gap-4 items-center justify-between px-10 p-4 bg-[#142839] text-white absolute top-0 left-0 right-0 rounded-b-xl backdrop-blur-xl bg-opacity-80">
          <div className="col-span-2 flex justify-start flex-grow">
            <Link href={"/"}>
              <div className="relative group">
                <Image
                  src="/img/logo_navbar.svg"
                  alt="Logo"
                  width="1920"
                  height="1080"
                  className="w-9 h-9 transition duration-300 ease-in-out group-hover:-translate-y-10 group-hover:opacity-0"
                  priority={true}
                />
                <span className="absolute left-0 top-0 opacity-0 pt-2 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  Home
                </span>
              </div>
            </Link>
          </div>
          <div className="col-span-8 justify-center">
            <p className="text-center text-lg pb-2">{chapterInfo} </p>
            <Progress
              value={progress || 0}
              milestones={milestones.map(Number)}
            />
          </div>

          <div className="col-span-2 flex justify-end">
            <Link href={"/badges"} className="relative group">
              <TrophyIcon className="w-9 h-9 transition duration-300 ease-in-out group-hover:-translate-y-10 group-hover:opacity-0" />
              <span className="absolute left-[-50%] top-0 opacity-0 pt-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
                Badges
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarChapters;
