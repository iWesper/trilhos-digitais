"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/homepage/Navbar";
import { ProgressProvider } from "@/components/context/ProgressContext";
import RequireAuth from "@/components/auth/RequireAuth";
import { enter } from "@/lib/motion";

export default function BadgesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RequireAuth desktopOnly>
      <ProgressProvider>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={enter}
          className="overflow-hidden h-screen w-screen"
        >
          <Navbar />
          {children}
        </motion.main>
      </ProgressProvider>
    </RequireAuth>
  );
}
