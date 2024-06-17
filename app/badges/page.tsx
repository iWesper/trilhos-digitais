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
import { useProgress } from "@/components/context/ProgressContext";

export default function Badges() {
  const router = useRouter();
  //USER ID
  const [UserId, setUserId] = useState<string | null>(null);

  //LOADING
  const [loading, setLoading] = useState<boolean>(true);

  //VAI BUSCAR O USER ID QUANDO MONTA
  useEffect(() => {
    //SAVE USER
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        //SAVE
        setUserId(currentUser.uid);

        if (UserId) {
          return;
        }
      } else {
        setUserId(null);
      }

      //ACABA O LOAD
      setLoading(false);
    });
  }, [UserId]);

  //SE ESTIVER A CARREGAR
  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Lottie
          animationData={animationData}
          className="bg-foreground h-20 w-20 "
        />
      </div>
    );
  }

  //PROGRESSO
  const { progress } = useProgress();

  return UserId ? (
    <main className="flex justify-center items-center h-screen bg-gray-500">
      <div className="relative md:mt-40 lg:mt-20 sm:w-[528px] sm:h-[396px] lg:w-[792px] lg:h-[594px] 2xl:w-[1055px] 2xl:h-[791px] bg-quadroBadges bg-cover bg-no-repeat bg-center">
        {/* Grid overlay */}
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-4 grid-rows-2 gap-5 p-20">
          {/* Grid items */}
          <div className="relative bg-red-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Arte</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-blue-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Design</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-green-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Tecnologia</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-yellow-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Comunicação</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-purple-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Hipermédia</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-pink-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Multiverso</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-teal-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Jogo</p>
              <Progress value={progress || 0} />
            </div>
          </div>
          <div className="bg-orange-500/50 flex justify-center items-center">
            <div className="bg-[url('/path/to/background-image.jpg')] bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0 opacity-75"></div>
            <div className="z-10 text-center w-[50%]">
              <p className="text-white font-bold">Inteligência Artifical</p>
              <Progress value={progress || 0} />
            </div>
          </div>
        </div>
      </div>
    </main>
  ) : (
    router.push("/")
  );
}
