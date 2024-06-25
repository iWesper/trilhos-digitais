import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="bg-404PageBG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover  items-center justify-center grid grid-cols-12">
      <div className="col-span-2 mt-20"></div>
      <div className="col-span-8 justify-center items-center mt-20"><h1 className="font-bold text-center">Ups. parece que perdeste a tua paragem.</h1></div>
      <div className="col-span-2 mt-20"></div>

      <div className="col-span-4"></div>
      <div className="col-span-4 flex justify-center items-center">
       
          <Image  src={"/img/404/fundoerro404_icon.svg"} alt="Icon Error"  width={400} height={400} />
      
      </div>
      <div className="col-span-4"></div>

      <div className="col-span-4"></div>
      <div className="col-span-4 justify-center items-center">

      <Link href="/">
      <Button className="text-white w-full bg-foreground hover:bg-hover">Voltar</Button>
      </Link>

      </div>
      <div className="col-span-4"></div>

     

    </div>
  );
}
