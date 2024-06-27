import { HomeIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout, username } = useAuth();

  return (
    <motion.nav
      className="flex items-center justify-between px-10 p-4 bg-[#142839] text-white absolute top-0 left-0 right-0 z-50 rounded-b-xl backdrop-blur-xl bg-opacity-80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-start flex-grow">
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
      <motion.div
        className="text-center text-3xl font-bold rounded-xl text-white font-effra z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Bem-vindo(a) aos Trilhos Digitais,{" "}
        <span className="text-secondary">{username}</span>!
      </motion.div>
      <div className="flex justify-end flex-grow gap-8">
        <Link href={"/badges"}>
          <div className="relative group">
            <TrophyIcon className="w-9 h-9 transition duration-300 ease-in-out group-hover:-translate-y-10 group-hover:opacity-0" />
            <span className="absolute left-[-50%] top-0 opacity-0 pt-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
              Badges
            </span>
          </div>
        </Link>
        <div className="relative group cursor-pointer" onClick={() => logout()}>
          <MdLogout className="w-9 h-9 transition duration-300 ease-in-out group-hover:-translate-y-10 group-hover:opacity-0" />
          <span className="absolute left-[-50%] top-0 opacity-0 pt-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out">
            Logout
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
