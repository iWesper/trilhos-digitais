// 'use client' é apenas necessário quando estamos a usar componentes do lado do cliente, por exemplo, os modelos 3D do react-three-fiber
"use client";

import React, { useEffect, useState, Suspense } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import Homepage from "@/components/homepage/Homepage";

export default function Home() {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Immediately redirect if not loading and no user is found
    if (!isLoading && currentUser === null) {
      router.push("/authentication");
    }
  }, [currentUser, isLoading, router]);

  // Continue showing the loading animation until the auth check is complete
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Lottie
          animationData={animationData}
          className="bg-foreground h-20 w-20"
        />
      </div>
    );
  }

  // If not loading but currentUser is null, don't render anything
  // This handles the edge case where isLoading is false but currentUser hasn't been updated yet
  if (currentUser === null) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex justify-center items-center">
          <Lottie
            animationData={animationData}
            className="bg-foreground h-20 w-20"
          />
        </div>
      }
    >
      <main className="max-w-full overflow-hidden">
        <Homepage />
      </main>
    </Suspense>
  );
}
