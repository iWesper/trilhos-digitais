import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { BiQrScan } from "react-icons/bi";
export default function BadgeDetails({ number }: { number: number }) {
  //3D ou AR
  const [show3DorAr, setshow3DOrAr] = useState<boolean>(false); //FALSE PARA 3D, TRUE PARA AR

  //Save number
  const BadgeIdToShow = number;

  const defaultItems = [
    {
      BadgeName: "Gesamtkunstwerk",
      id: 1,
      name: "Arte",
      description:
        "O fosso de orquestra foi uma das grandes inovações no mundo da arte, trazida por Richard Wagner, escondendo a orquestra por baixo do palco de teatro e longe da visão dos especatdores, estando assim mais próxima da Obra Total.",
      p2: "O primeiro grande passo em direção à obra total.",
      qrUrl: "/img/qrcodes/arte.svg",
    },
    {
      BadgeName: "Bauhaus",
      id: 2,
      name: "Design",
      description:
        "A Bauhaus foi uma escola de arquitetura e design que transformou a perceção da sociedade quanto à arte através da dus integração das artes plásticas com o artesanato.",
      p2: "Um verdadeiro marco na história do design",
      qrUrl: "/img/qrcodes/design.svg",
    },
    {
      BadgeName: "TV Antiga",
      id: 3,
      name: "Comunicação",
      description:
        "Surgiram  novos meios de transmissão, como os filmes na TV e os videojogos. Para além de serem consumidos de maneiras diferentes, oferecem sensações diferentes, alterando a mensagem passada.",
      p2: 'Como disse McLuhan, "O meio é a mensagem".',
      qrUrl: "/img/qrcodes/comuicacao.svg",
    },
    {
      BadgeName: "Sala de Prensas",
      id: 4,
      name: "Tecnologia",
      description:
        "As tecnologias de comunicação evoluíram de tal forma que, nos dias de hoje, podemos comunicar com alguém do outro lado do globo numa questão de segundos. A prensa é um símbolo dessa evolução, de como informações de difícil acesso e livros únicos passaram a fazer parte de uma sociedade mais abrangente.",
      p2: "Um grande ponto de viragem na educação e no conhecimento.",
      qrUrl: "/img/qrcodes/tecnologia.svg",
    },
    // {
    //   BadgeName: "Macintosh",
    //   id: 5,
    //   name: "Hipermédia",
    //   description:
    //     "A Bauhaus foi uma escola de arquitetura e design que transformou a perceção da sociedade quanto à arte através da dus integração das artes plásticas com o artesanato.",
    //   p2: "Um verdadeiro marco na história do design",
    //   qrUrl: "/img/qrcodes/hipermedia.svg",
    // },
    // {
    //   BadgeName: "Óculos VR",
    //   id: 6,
    //   name: "Multiverso",
    //   description:
    //     "A Bauhaus foi uma escola de arquitetura e design que transformou a perceção da sociedade quanto à arte através da dus integração das artes plásticas com o artesanato.",
    //   p2: "Um verdadeiro marco na história do design",
    //   qrUrl: "/img/qrcodes/multiverso.svg",
    // },
    // {
    //   BadgeName: "Arcade",
    //   id: 7,
    //   name: "Jogo",
    //   description:
    //     "A Bauhaus foi uma escola de arquitetura e design que transformou a perceção da sociedade quanto à arte através da dus integração das artes plásticas com o artesanato.",
    //   p2: "Um verdadeiro marco na história do design",
    //   qrUrl: "/img/qrcodes/jogo.svg",
    // },
    // {
    //   BadgeName: "Portátil",
    //   id: 8,
    //   name: "Inteligência Artificial",
    //   description:
    //     "A Bauhaus foi uma escola de arquitetura e design que transformou a perceção da sociedade quanto à arte através da dus integração das artes plásticas com o artesanato.",
    //   p2: "Um verdadeiro marco na história do design",
    //   qrUrl: "/img/qrcodes/inteligencia_artificial.svg",
    // },
  ];

  const handleContentSwap = (status: string) => {
    //Valor
    const value = status;

    //IF 3D
    if (value === "show3D") {
      setshow3DOrAr(false);
    }
    //IF AR
    else if (value === "showAR") {
      setshow3DOrAr(true);
    }
  };

  return (
    <div className="bg-BadgeDetailsBG h-screen w-screen bg-origin-border bg-center bg-no-repeat bg-cover items-center justify-center grid grid-cols-12">
      {!show3DorAr && (
        <>
          <div
            className={`col-span-8 w-full h-full bg-papelBadges${
              defaultItems[BadgeIdToShow - 1].id
            } bg-origin-border bg-center bg-no-repeat mt-28`}
          ></div>
          <div className="col-span-3 justify-center items-center mt-16">
            <h1 className="font-bold text-center text-white text-4xl py-6">
              {defaultItems[BadgeIdToShow - 1].BadgeName}
            </h1>
            <p className="font-medium text-xl text-white ">
              {defaultItems[BadgeIdToShow - 1].description}
            </p>
            <p className="font-medium text-xl text-white pt-8 pb-4">
              {defaultItems[BadgeIdToShow - 1].p2}
            </p>
            <Button
              className="text-white w-full text-xl"
              onClick={() => handleContentSwap("showAR")}
            >
              Realidade Aumentada
            </Button>
          </div>
          <div className="col-span-1 mt-28"></div>
        </>
      )}

      {show3DorAr && (
        <>
          <div
            className={`col-span-8 w-full h-full bg-papelBadges${
              defaultItems[BadgeIdToShow - 1].id
            } bg-origin-border bg-center bg-no-repeat mt-28 justify-center items-center flex flex-col`}
          >
            <div className="mb-8">
              <Image
                height={350}
                width={350}
                src={defaultItems[BadgeIdToShow - 1].qrUrl}
                alt="Qr code que mostra AR"
              />
            </div>
            <div className="justify-center items-center backdrop-filter p-4 bg-gray-800 rounded-xl backdrop-blur-md bg-opacity-80">
              <BiQrScan className="h-8 w-8 text-white mx-auto" />
              <p className="text-white">Aponta o telemóvel</p>
            </div>
          </div>
          <div className="col-span-3 justify-center items-center mt-16">
            <h1 className="font-bold text-center text-white text-4xl py-6">
              {defaultItems[BadgeIdToShow - 1].BadgeName}
            </h1>
            <p className="font-medium text-xl text-white">
              {defaultItems[BadgeIdToShow - 1].description}
            </p>
            <p className="font-medium text-xl text-white pt-8 pb-4">
              {defaultItems[BadgeIdToShow - 1].p2}
            </p>
            <Button
              className="text-white w-full text-xl"
              onClick={() => handleContentSwap("show3D")}
            >
              3D
            </Button>
          </div>
          <div className="col-span-1 mt-28"></div>
        </>
      )}
    </div>
  );
}
