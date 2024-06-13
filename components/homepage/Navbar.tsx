import Image from "next/image";
import Link from "next/link";
import { HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="flex items-center justify-between px-10 p-4 bg-gray-800 text-white absolute top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={"/"}>
        <HomeIcon className="w-9 h-9" />
      </Link>
      <div className="mx-4 w-1/5">
        <Image
          src="/img/logo_navbar.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="w-1/2 dark:brightness-[0.2] dark:grayscale"
          priority={true}
        />
      </div>
      <Link href={"/badges"}>
        <TrophyIcon className="w-9 h-9" />
      </Link>
    </motion.nav>
  );
}
