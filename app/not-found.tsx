import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-404PageBG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover  items-center justify-center grid grid-cols-12">
      <div className="col-span-2"></div>
      <div className="col-span-8 justify-center items-center"><h1 className="font-bold text-center">Ups. parece que perdeste a tua paragem.</h1></div>
      <div className="col-span-2"></div>

      <div className="col-span-4"></div>
      <div className="col-span-4 justify-center items-center">

      </div>
      <div className="col-span-4"></div>

      <div className="col-span-4"></div>
      <div className="col-span-4 justify-center items-center">

      <Link href="/">
      <Button className="text-white w-full">Voltar</Button>
      </Link>

      </div>
      <div className="col-span-4"></div>

     

    </div>
  );
}
