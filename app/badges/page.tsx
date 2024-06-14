"use client";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import Navbar from "@/components/homepage/Navbar";
import { useEffect,useState } from "react";
import { auth } from "../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "@/components/login/Login";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import { useRouter } from 'next/navigation';


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
          <Lottie animationData={animationData} className="bg-foreground h-20 w-20 " />
    </div>
  )
  }

  return (
    
    UserId ? (
      <main>
      </main>
    ) : (
      router.push("/")
    )
  );
}
