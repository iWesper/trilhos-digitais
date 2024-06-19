"use client";

import Navbar from "@/components/homepage/Navbar";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";
import { ProgressProvider } from "@/components/context/ProgressContext";

export default function BadgesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push("/authentication");
    } else {
      setIsLoading(false); // User is authenticated, proceed to render the component
    }
  }, [currentUser, router]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Lottie
          animationData={animationData}
          className="bg-foreground h-20 w-20 "
        />
      </div>
    );
  }

  return (
    <ProgressProvider>
      <main>
        <Navbar />
        {children}
      </main>
    </ProgressProvider>
  );
}
