"use client";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/context/AuthContext";
import BadgeDetails from "@/components/badges/BadgeDetails";
import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Badges() {
  const router = useRouter();
  const { currentUser, goGetBadges, BadgeList, error, hasSeenBadgeTutorial, tutorialBadge, UpdateBadgesTutorial } = useAuth();

  const [selectedBadgeNumber, setSelectedBadgeNumber] = useState<number | null>(
    0
  );
  const [showBadgeDetail, setShowBadgeDetail] = useState<boolean>(false);

  const [tutorialSeen, setTutorialSeen] = useState(false);


     //MENSAGEM
     const [currentMessageIndex, setCurrentMessageIndex] = useState(0);


  //Info dos Badges Default
  const defaultItems = [
    { 
      BadgeName: "Gesamtkunstwerk", 
      id: 1, 
      name: "Arte" 
    },
    { 
      BadgeName: "Bauhaus", 
      id: 2, 
      name: "Design"},
    {
      BadgeName: "TV Antiga",
      id: 3,
      name: "Comunicação",  
    },
    {
      BadgeName: "Sala de Prensas",
      id: 4,
      name: "Tecnologia",
    },
    // { BadgeName: "Macintosh", id:5, name: "Hipermédia"},
    // { BadgeName: "Óculos VR", id:6,  name: "Multiverso"},
    // { BadgeName: "Arcade",id:7, name: "Jogo"},
    // {BadgeName: "Portátil", id:8, name: "Inteligência Artificial"},
  ];

  const TutorialMessages = [
    `Bem-vindo à tua zona de Badges! Aqui vais encontrar e poder inspecionar todos os badges que desbloqueaste na tua viagem pelos Trilhos Digitais!`,

    "Cada badge pode ser inspecionado em 3D nesta mesma página, ou em AR se o preferires através do teu telemóvel. Vais poder rodar os objetos, vê-los de perto, e quem sabe descobrir alguns dos seus segredos ao interagires com eles.",

    "Para os desbloqueares, basta progredires pela aventura e completares os passos necessários para cada badge. Podes ver aqui que badges tens e quais te faltam, tal como quantos passos já completaste para cada um deles.",

    "Ao chegares a esta página, tens ao teu dispôr os badges que já desbloqueaste, que podes inspecionar!, ",

    "Cada objeto representa o teu progresso por um capítulo específico da história da multimédia, e da tua aventura pelos Trilhos Digitais. E tu podes analisá-lo de vários ângulos e interagir com ele!",

    "Cada um dos teus badges, terá interações escondidas, que tens de tentar encontrar.",

    "Poderás também inspecionar o teu badge em Realidade Aumentada! Basta clicares no botão de AR, e apontares a câmara do teu telemóvel para o marcador que te fornecemos.",

    "Todos os teus objetivos alcançados num só lugar, que entusiasmante! Regressa a esta página sempre que quiseres inspecionar um badge ou ver o teu progresso para desbloquear um badge específico. Até breve!"
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

  // Fetch ao montar
  useEffect(() => {
    goGetBadges();
    hasSeenBadgeTutorial();
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
            className="text-white absolute top-20 left-15 flex items-center cursor-pointer"
          >
            <IoChevronBack className=" h-8 w-8" />
            <span>Voltar</span>
          </div>
        </>
      ) : (
        <main className="bg-BadgesBG flex justify-center items-center h-screen bg-cover bg-no-repeat bg-center">
          <div className="relative md:mt-40 lg:mt-20 md:mb-40 lg:mb-20 sm:w-[600px] sm:h-[400px] lg:w-[1000px] lg:h-[800px] 2xl:w-[1100px] 2xl:h-[900px] bg-quadroBadges bg-cover bg-no-repeat bg-center">
            {/* Grid overlay */}
            <div className="absolute top-0 left-0 w-full h-full grid grid-cols-12 grid-rows-2 gap-5 p-40">
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
                const WillCursorBePointer = progress === 100 ? "cursor-pointer" : "";

                return (
                  <div
                    key={index}
                    className={`flex justify-center items-center relative ${WillCursorBePointer} col-span-3`}
                    {...(progress > 0 ? { onClick: () => handleBadgeClick(item.id) } : {})}
                  >
                    <div
                      className={`${bgClass} bg-cover bg-center bg-no-repeat w-full h-full absolute top-0 left-0`}
                    ></div>
                    <div className="z-10 text-center w-[50%]">
                      <p className="text-black font-bold text-sm">{item.name}</p>
                      <Progress value={progress} />
                    </div>
                  </div>
                );
              })}
              <div className="col-span-2 mt-4"></div>
              <div className="bg-papelMaisBadges max-h-[100%] flex justify-center items-center h-screen bg-cover bg-no-repeat bg-center col-span-8 mt-4">
                <h1 className="text-black shadow text-center text-xl font-bold font-efrra w-full ">
                  Mais <span className="italic">Badges</span> em Breve
                </h1>
              </div>
              <div className="col-span-2 mt-4"></div>
            </div>
            {error && (
              <p className=" text-red-600 text-center text-sm">{error}</p>
            )}
          </div>
          {!tutorialBadge && !tutorialSeen && (
        <Dialog>
        <DialogTrigger asChild>
          <motion.button className="bg-secondary rounded-md px-2 py-2 text-white hover:bg-orange-500 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            delay: 2,
            repeat: Infinity,
            repeatType: "loop",
            duration: 1,
          }}
          >
            Clica Aqui
            </motion.button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Introdução</DialogTitle>
            <DialogDescription className=" text-black">
              {TutorialMessages[currentMessageIndex]}
            </DialogDescription>
            <Button onClick={handleContinue}>Continuar</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      )}
        </main>
      )}
    </>
  );
}
