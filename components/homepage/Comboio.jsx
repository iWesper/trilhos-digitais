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

export function Comboio() {
  
  const PictureList = [
    {
        id:1,
        url:testimg1
    },
    {
        id:2,
        url:testimg3
    },
    {
        id:3,
        url:testimg2
    },
    {
        id:4,
        url:testimg4
    },
]

  //OBJETO DAS CARRUAGENS
  const comboio = [{

    id: "0",
    img: "Cena da Frente"
  },
  {
    id: "1",
    img: "Conteúdo da carruagem 0"
  },
  {
    id: "2",
    img: "Conteúdo da carruagem 1"
  },
  {
    id: "3",
    img: "Conteúdo da carruagem 2"
  },
  {
    id: "4",
    img: "Conteúdo da carruagem 4"
  },
]

  

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                    
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
