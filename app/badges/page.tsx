"use client";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import Navbar from "@/components/homepage/Navbar";
import { useEffect, useState } from "react";
import { auth } from "../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "@/components/login/Login";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/context/AuthContext";

export default function Badges() {
  const router = useRouter();
  const { currentUser, goGetBadges, BadgeList } = useAuth();

  //Info dos Badges Default
const defaultItems = [
  { BadgeName:"Gesamtkunstwerk", name: 'Arte', bg: 'bg-red-500/50' },
  { BadgeName:"Bauhaus", name: 'Design', bg: 'bg-blue-500/50' },
  { BadgeName:"Sala de Prensas", name: 'Tecnologia', bg: 'bg-green-500/50' },
  { BadgeName:"TV Antiga", name: 'Comunicação', bg: 'bg-yellow-500/50' },
  { BadgeName:"Macintosh", name: 'Hipermédia', bg: 'bg-purple-500/50' },
  { BadgeName:"Óculos VR", name: 'Multiverso', bg: 'bg-pink-500/50' },
  { BadgeName:"Arcade", name: 'Jogo', bg: 'bg-teal-500/50 ' },
  { BadgeName:"Portátil", name: 'Inteligência Artifical', bg: 'bg-orange-500/50' },
];

  // Hook para navegar entre páginas
  if (!currentUser) {
    router.push("/authentication");
  }

   // Fetch ao montar
    useEffect(() => {

      goGetBadges();
  
    },[]);

    return (
      <main className="flex justify-center items-center h-screen bg-gray-500">
        <div className="relative md:mt-40 lg:mt-20 sm:w-[528px] sm:h-[396px] lg:w-[792px] lg:h-[594px] 2xl:w-[1055px] 2xl:h-[791px] bg-quadroBadges bg-cover bg-no-repeat bg-center">
          {/* Grid overlay */}
          <div className="absolute top-0 left-0 w-full h-full grid grid-cols-4 grid-rows-2 gap-5 p-20">
            {/* Grid items  Abaixo temos se badge existir mete a percentagem, senão mete */}
            {defaultItems.map((item, index) => {
              const badge = BadgeList.find(badge => badge.badgeInfo.nome === item.BadgeName);
              const progress = badge ? badge.percentage : 0;
    
              return (
                <div key={index} className={` ${item.bg} flex justify-center items-center`}>
                  <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
                  <div className="z-10 text-center w-[50%]">
                    <p className="text-white font-bold">{item.name}</p>
                    <Progress value={progress} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    );
}
