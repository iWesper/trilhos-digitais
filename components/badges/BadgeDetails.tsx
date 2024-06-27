import React, { useState, Suspense } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { BiQrScan } from "react-icons/bi";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Bauhaus from "@/public/models/bauhaus/Bauhaus";
import Wagner from "@/public/models/wagner/Wagner";
import Tv from "@/public/models/tv/Tv";
import Prensa from "@/public/models/prensa/Prensa";

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
        "O fosso de orquestra foi uma das grandes inovações no mundo da arte, trazida por Richard Wagner, escondendo a orquestra por baixo do palco de teatro e longe da visão dos espectadores, estando assim mais próxima da Obra Total.",
      p2: "O primeiro grande passo em direção à obra total.",
      qrUrl: "/img/qrcodes/arte.jpg",
      modelId: <Wagner position={[0, 0, 0]} scale={0.06} />,
    },
    {
      BadgeName: "Bauhaus",
      id: 2,
      name: "Design",
      description:
        "A Bauhaus foi uma escola de arquitetura e design que transformou a perceção da sociedade quanto à arte através da integração das artes plásticas com o artesanato.",
      p2: "Um verdadeiro marco na história do design.",
      qrUrl: "/img/qrcodes/design.jpg",
      modelId: <Bauhaus position={[0, 0, 0]} scale={0.3} />,
    },
    {
      BadgeName: "TV Antiga",
      id: 3,
      name: "Comunicação",
      description:
        "Surgiram  novos meios de transmissão, como os filmes na TV e os videojogos. Para além de serem consumidos de maneiras diferentes, oferecem sensações diferentes, alterando a mensagem passada.",
      p2: 'Como disse McLuhan, "O meio é a mensagem".',
      qrUrl: "/img/qrcodes/comunicacao.jpg",
      modelId: <Tv position={[0.5, 0, 0.5]} scale={1.3} />,
    },
    {
      BadgeName: "Sala de Prensas",
      id: 4,
      name: "Tecnologia",
      description:
        "As tecnologias da comunicação evoluíram ao ponto desta se tornar ubíqua. A prensa é um símbolo dessa evolução, e de como o mais fácil acesso à informação se revelou um dos principais pilares da evolução da sociedade.",
      p2: "Um ponto de viragem para a educação e conhecimento.",
      qrUrl: "/img/qrcodes/tecnologia.jpg",
      modelId: <Prensa position={[0, -1.5, 0]} scale={0.1} />,
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
            className={`col-span-7 w-full h-full bg-papelBadges${
              defaultItems[BadgeIdToShow - 1].id
            } bg-origin-border bg-center bg-no-repeat mt-28 relative`}
          >
            <div className="w-full h-full absolute top-0 left-0">
              <Canvas className="w-full h-full">
                <Suspense fallback={null}>
                  <OrbitControls
                    enableRotate={true}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    enableZoom={false}
                    enablePan={false}
                  />
                  {defaultItems[BadgeIdToShow - 1].modelId}
                  <Environment preset="sunset" />
                </Suspense>
              </Canvas>
            </div>
          </div>
          <div className="col-span-4 justify-center items-center mt-16 backdrop-filter bg-[#142839] rounded-xl backdrop-blur-xl bg-opacity-80">
            <h1 className="font-bold text-center text-white text-4xl px-8 pb-8 pt-4 ">
              {defaultItems[BadgeIdToShow - 1].BadgeName}
            </h1>
            <p className="font-medium text-xl text-white px-8 ">
              {defaultItems[BadgeIdToShow - 1].description}
            </p>
            <p className="font-medium text-xl text-white px-8 pt-8 pb-4">
              {defaultItems[BadgeIdToShow - 1].p2}
            </p>
            <div className="flex justify-center items-center w-full px-8 pb-8">
              <Button
                className="text-white m-auto w-75 text-xl"
                onClick={() => handleContentSwap("showAR")}
              >
                Realidade Aumentada
              </Button>
            </div>
          </div>
          <div className="col-span-1 mt-28"></div>
        </>
      )}

      {show3DorAr && (
        <>
          <div
            className={`col-span-7 w-full h-full bg-papelBadges${
              defaultItems[BadgeIdToShow - 1].id
            } bg-origin-border bg-center bg-no-repeat mt-28 justify-center items-center flex flex-col`}
          >
            <div className="mb-8">
              <Image
                height={350}
                width={350}
                src={defaultItems[BadgeIdToShow - 1].qrUrl}
                className="animate-scan"
                alt="Qr code que mostra AR"
              />
            </div>
            <motion.div
              className="justify-center items-center backdrop-filter p-4 bg-gray-800 rounded-xl backdrop-blur-md bg-opacity-80"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 5, duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5.5, duration: 1 }}
              >
                <BiQrScan className="text-4xl text-white mx-auto animate-scan" />
                <motion.p
                  className="text-center text-xl text-white"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  Aponta o telemóvel!
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
          <div className="col-span-4 justify-center items-center mt-16 backdrop-filter bg-gray-800 rounded-xl backdrop-blur-md bg-opacity-20">
            <h1 className="font-bold text-center text-white text-4xl px-8 pb-8 pt-4">
              {defaultItems[BadgeIdToShow - 1].BadgeName}
            </h1>
            <p className="font-medium text-xl text-white px-8">
              {defaultItems[BadgeIdToShow - 1].description}
            </p>
            <p className="font-medium text-xl text-white px-8 pt-8 pb-4">
              {defaultItems[BadgeIdToShow - 1].p2}
            </p>
            <div className="flex justify-center items-center w-full px-8 pb-8">
              <Button
                className="text-white text-xl"
                onClick={() => handleContentSwap("show3D")}
              >
                3D
              </Button>
            </div>
          </div>
          <div className="col-span-1 mt-28"></div>
        </>
      )}
    </div>
  );
}
