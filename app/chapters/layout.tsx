"use client";

import NavbarChapters from "@/components/chapters/NavbarChapters";
import { useState } from "react";
import { ProgressProvider } from "@/components/context/ProgressContext";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import React, {useEffect} from "react";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";

export default function ChaptersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (!currentUser) {
  //     router.push("/authentication");
  //   } else {
  //     setIsLoading(false); // User is authenticated, proceed to render the component
  //   }
  // }, [currentUser, router]);

  // if (isLoading) {
  //   return (
  //     <div className="h-screen w-screen flex justify-center items-center">
  //       <Lottie
  //         animationData={animationData}
  //         className="bg-foreground h-20 w-20 "
  //       />
  //     </div>
  //   );
  // }
  
  return (
    <ProgressProvider>
      <main>
        <NavbarChapters />
        {children}
      </main>
    </ProgressProvider>
  );
}
