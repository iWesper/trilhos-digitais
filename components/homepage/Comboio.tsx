import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image";
import Link from "next/link";

import comboio_inicio from '../../public/img/comboio/comboio.svg';
import arte from '../../public/img/comboio/carruagem_cap1_arte.svg';
import design from '../../public/img/comboio/carruagem_cap2_design.svg';
import tecnologia from '../../public/img/comboio/carruagem_cap3_tecnologia.svg';
import comunicacao from '../../public/img/comboio/carruagem_cap4_comunicacao.svg';



export function Comboio() {

//OBJETO DAS CARRUAGENS
const comboio = [
    {
        id:0,
        url:comboio_inicio
    },
    {
        id:1,
        url:arte
    },
    {
        id:2,
        url:design
    },
    {
        id:3,
        url:tecnologia
    },
    {
      id:4,
      url:comunicacao
    }
]


  return (
    <Carousel className="w-full max-w-2xl">
      <CarouselContent>
        {comboio.map((carruagem) => (
            <CarouselItem key={carruagem.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                {carruagem.id === 0 ? (
                  <Image src={carruagem.url} alt={`Imagem ${carruagem.id}`} className="select-none" />
              ) : (
                  <Link href={`/chapters/chapter${carruagem.id}/1`}>
                    <Image src={carruagem.url} alt={`Imagem ${carruagem.id}`} />
                   </Link>
              )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
