"use client";
import { useEffect, useState, Suspense } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/context/AuthContext";
import BadgeDetails from "@/components/badges/BadgeDetails";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Bauhaus from "@/public/models/bauhaus/Bauhaus";
import Wagner from "@/public/models/wagner/Wagner";
import Tv from "@/public/models/tv/Tv";
import Prensa from "@/public/models/prensa/Prensa";
import { FaStar } from "react-icons/fa";

export default function Badges() {
  const router = useRouter();
  const {
    currentUser,
    goGetBadges,
    BadgeList,
    error,
    hasSeenBadgeTutorial,
    tutorialBadge,
    UpdateBadgesTutorial,
  } = useAuth();

  const [selectedBadgeNumber, setSelectedBadgeNumber] = useState<number | null>(
    0
  );
  const [showBadgeDetail, setShowBadgeDetail] = useState<boolean>(false);

  // Estado do tutorial
  const [tutorialSeen, setTutorialSeen] = useState(false);
  const [isCheckingTutorialState, setIsCheckingTutorialState] = useState(true);
  // Estado que representa se o utilizador quer ignorar o tutorial
  const [hasSkippedTutorial, setHasSkippedTutorial] = useState(false);
  // Estado do dialog do tutorial
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //MENSAGEM
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  //Info dos Badges Default
  const defaultItems = [
    {
      BadgeName: "Gesamtkunstwerk",
      id: 1,
      name: "Arte",
      modelId: Wagner,
      scale: 0.05,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    },
    {
      BadgeName: "Bauhaus",
      id: 2,
      name: "Design",
      modelId: Bauhaus,
      scale: 0.2,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    },
    {
      BadgeName: "TV Antiga",
      id: 3,
      name: "Comunicação",
      modelId: Tv,
      scale: 1,
      position: [-0.25, 0, 0.5],
      rotation: [0, -0.75, 0],
    },
    {
      BadgeName: "Prensa",
      id: 4,
      name: "Tecnologia",
      modelId: Prensa,
      scale: 0.09,
      position: [0.2, -1, 0.2],
      rotation: [0, 0, 0],
    },
    // { BadgeName: "Macintosh", id:5, name: "Hipermédia"},
    // { BadgeName: "Óculos VR", id:6,  name: "Multiverso"},
    // { BadgeName: "Arcade",id:7, name: "Jogo"},
    // {BadgeName: "Portátil", id:8, name: "Inteligência Artificial"},
  ];

  const TutorialMessages = [
    `Bem-vindo(a) à tua zona de Badges! Aqui vais encontrar e poder inspecionar todos os badges que desbloqueaste na tua viagem pelos Trilhos Digitais!`,

    "Cada badge pode ser inspecionado em 3D nesta mesma página, ou em AR se o preferires através do teu telemóvel. Vais poder rodar os objetos, vê-los de perto, e quem sabe descobrir alguns dos seus segredos ao interagires com eles.",

    "Para os desbloqueares, basta progredires pela aventura e completares os passos necessários para cada badge. Podes ver a percentagem do progresso de cada badge que tens e o quanto te falta para desbloquear cada um deles.",

    "Ao chegares a esta página, tens ao teu dispôr os badges que já desbloqueaste, que podes inspecionar!, ",

    "Cada objeto representa o teu progresso por um capítulo específico da história da multimédia, e da tua aventura pelos Trilhos Digitais. E tu podes analisá-lo de vários ângulos e interagir com ele!",

    "Cada um dos teus badges, terá interações escondidas, que tens de tentar encontrar.",

    "Poderás também inspecionar o teu badge em Realidade Aumentada! Basta clicares no botão de AR, e apontares a câmara do teu telemóvel para o marcador que te fornecemos.",

    "Todos os teus objetivos alcançados num só lugar, que entusiasmante! Regressa a esta página sempre que quiseres inspecionar um badge ou ver o teu progresso para desbloquear um badge específico. Até breve!",
  ];

  //MENSAGENS DO TUTORIAL
  const handleContinue = () => {
    //SE NÃO FOR A ÚLTIMA MENSAGEM
    if (currentMessageIndex < TutorialMessages.length - 1) {
      //AVANÇA
      setCurrentMessageIndex(currentMessageIndex + 1);
    } else {
      //FECHA O TUTORIAL
      setTutorialSeen(true);

      //Update na BD
      UpdateBadgesTutorial();
    }
  };

  // Hook para navegar entre páginas
  if (!currentUser) {
    router.push("/authentication");
  }

  // Hook para verificar se o tutorial foi visto
  useEffect(() => {
    if (!tutorialBadge && !isDialogOpen && !isCheckingTutorialState) {
      setIsDialogOpen(true);
    }
  }, [tutorialBadge, isDialogOpen, isCheckingTutorialState]);

  // Fetch ao montar
  useEffect(() => {
    //Vai saber se já viu tutorial
    hasSeenBadgeTutorial()
      .then((boolean) => {
        //Se já viu tutorial
        setIsCheckingTutorialState(boolean);
      })
      .catch((boolean) => {
        setIsCheckingTutorialState(boolean);
      });
    //Vai buscar os badges
    goGetBadges();
    //Redefine o estado do tutorial
    setHasSkippedTutorial(false);
  }, []);

  const handleBadgeClick = (badgeNumber: number) => {
    //Modelo de Badge
    setSelectedBadgeNumber(badgeNumber);
    setShowBadgeDetail(true);
  };

  return (
    <>
      {showBadgeDetail && selectedBadgeNumber !== null ? (
        <>
          <BadgeDetails number={selectedBadgeNumber} />
          <div
            onClick={() => setShowBadgeDetail(false)}
            className="text-white absolute top-28 left-15 flex items-center cursor-pointer"
          >
            <IoChevronBack className=" h-8 w-8" />
            <span>Voltar</span>
          </div>
        </>
      ) : (
        <main className="bg-BadgesBG flex justify-center items-center h-screen bg-cover bg-no-repeat bg-center">
          <div className="relative md:mt-40 lg:mt-20 md:mb-40 lg:mb-20 sm:w-[600px] sm:h-[400px] lg:w-[1000px] lg:h-[800px] 2xl:w-[1100px] 2xl:h-[900px] bg-quadroBadges bg-cover bg-no-repeat bg-center">
            {/* Grid overlay */}
            <div className="absolute top-0 left-0 w-full h-full grid grid-cols-12 grid-rows-2 p-32">
              {/* Grid items  Abaixo temos se badge existir mete a percentagem, senão mete */}
              {defaultItems.map((item, index) => {
                const badge = BadgeList.find(
                  (badge) => badge.badgeInfo.nome === item.BadgeName
                );
                const progress = badge ? badge.percentage : 0;
                // Definir as classes de background
                const bgClasses = [
                  "bg-papelBadges1",
                  "bg-papelBadges2",
                  "bg-papelBadges3",
                  "bg-papelBadges4",
                ];
                // Ir buscar a class consoante o index
                const bgClass = bgClasses[index % bgClasses.length];

                // saber se vai permitir o clique
                const WillCursorBePointer =
                  progress === 100 ? "cursor-pointer" : "";

                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    key={index}
                    className={`flex justify-center items-center relative ${WillCursorBePointer} col-span-4 overflow-visible group`}
                    {...(progress === 100
                      ? { onClick: () => handleBadgeClick(item.id) }
                      : {})}
                  >
                    <div
                      className={`${bgClass} bg-contain bg-center bg-no-repeat w-full h-full absolute top-0 left-0`}
                    ></div>
                    <div className="w-full h-full absolute top-0 left-0">
                      <Canvas className="w-full h-full">
                        <Suspense fallback={null}>
                          <OrbitControls
                            enableRotate={false}
                            autoRotate={true}
                            autoRotateSpeed={0.5}
                            enableZoom={false}
                            enablePan={false}
                          />
                          <item.modelId
                            progress={progress}
                            position={item.position}
                            rotation={item.rotation}
                            scale={item.scale}
                          />
                          {progress === 100 ? (
                            <>
                              <Environment preset="sunset" />
                            </>
                          ) : (
                            <ambientLight intensity={1} color={"black"} />
                          )}
                        </Suspense>
                      </Canvas>
                    </div>
                    {progress != 100 ? (
                      <div className="w-auto min-w-[50%] z-10 text-center bg-[#142839] rounded-xl backdrop-blur-[2px] bg-opacity-80 p-2 absolute bottom-[20%]">
                        <p className="text-white font-bold text-sm pb-2">
                          {item.name}
                        </p>
                        <Progress className="h-2" value={progress} />
                      </div>
                    ) : (
                      <div className="w-auto z-10 text-center bg-[#142839] rounded-xl backdrop-blur-[2px] bg-opacity-80 p-2 absolute bottom-[20%] group-hover:scale-110 transition-all duration-150">
                        <div className="flex flex-row justify-center items-center">
                          <FaStar className="text-[#ffd900] size-6 me-2 text-start" />
                          <div className="text-white font-bold text-sm">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
              <div className="col-span-1 mt-4"></div>
              <div className="bg-papelMaisBadges max-h-[100%] flex justify-center items-center h-screen bg-cover bg-no-repeat bg-center col-span-6 mt-4">
                <h1 className="text-black text-center text-xl font-bold font-effra w-full ">
                  Mais <span className="italic">Badges</span> em Breve
                </h1>
              </div>
              <div className="col-span-1 mt-4"></div>
            </div>
            {error && (
              <p className=" text-red-600 text-center text-sm">{error}</p>
            )}
          </div>
          <div>
            {!tutorialBadge &&
              !tutorialSeen &&
              isDialogOpen &&
              !hasSkippedTutorial && (
                <Dialog
                  open={isDialogOpen}
                  onOpenChange={() => {
                    setIsDialogOpen(false);
                    setHasSkippedTutorial(true);
                  }}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="pb-2">Introdução</DialogTitle>
                      <DialogDescription className="py-4 text-foreground">
                        {TutorialMessages[currentMessageIndex]}
                      </DialogDescription>
                      <Button onClick={handleContinue}>Continuar</Button>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
          </div>
        </main>
      )}
    </>
  );
}
