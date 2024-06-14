//DEVER SER CHAMADO ASSIM
//<SaveBadgeProgressScript badgeId={badgeId} progress={percentage}          const badgeId=4 const percentage=25; const nextPage="/chapters/chapter1/4";

import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

interface SaveBadgeProgressScriptProps {
  badgeId: number;
  progress: number;
  nextPage: string;
}

const SaveBadgeProgressScript: React.FC<SaveBadgeProgressScriptProps> = ({
  badgeId,
  progress,
  nextPage,
}) => {
  const router = useRouter();

  //USER ID
  const [UserId, setUserId] = useState<string | null>(null);

  //GUARDA O ID DO BADGE QUE TE FOI COMUNICADO
  const BadgeId = badgeId;

  //MENSAGEM DE ERRO
  const [Error, setError] = useState<string>("");

  const AddProgress = async () => {
    //BadgeID -> Number
    const numericBadgeId = +BadgeId;

    //SE JÁ TIVER O UID
    if (UserId) {
      //ERROR HANDLE
      try {
        //COLLECTION
        const isEarningBadgesCollection = collection(db, "isEarningBadges");

        //QUERY PARA ENCONTRAR O DOCUMENTO
        const q = query(
          isEarningBadgesCollection,
          where("userId", "==", UserId),
          where("badgeId", "==", numericBadgeId)
        );

        //EXECUTA A QUERY
        const queryEdit = await getDocs(q);

        //SE O DOCUMENTO EXISTIR ATUALIZA SE NÃO CRIA UM NOVO
        if (!queryEdit.empty) {

          //PARA CADA DO || VAI SER SÓ UM
          queryEdit.forEach(async (docSnapshot) => {

            //ATUALIZA O CAMPO PERCENTAGE
            await updateDoc(doc(db, "isEarningBadges", docSnapshot.id), {

              percentage: progress,
            });
          });

        } else {

          //CRIA UM NOVO DOCUMENTO
          await addDoc(isEarningBadgesCollection, {

            userId: UserId,
            badgeId: numericBadgeId,
            percentage: progress,
          });
        }

        //ROUTER PARA A PÁGINA SEGUINTE
        router.push(nextPage);
      } catch (error) {

        //MENSAGEM
        setError("Erro na atualização do Badge");
      }
    } else {
      setError("Nenhum Utilizador Encontrado");
    }
  };

  //VAI BUSCAR O USER ID QUANDO MONTA
  useEffect(() => {
    //FUNÇÃO ASYNC PARA GUARDAR ANTES DE REDIRECT
    const SaveAndRedirect = async () => {
      //SAVE USER
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          //SAVE
          setUserId(currentUser.uid);

          if (UserId) {
            //ESPERA QUE ADICIONE À bd
            await AddProgress();
          }
        } else {
          setUserId(null);
        }
      });
    };

    //CHAMA A FUNÇÃO
    SaveAndRedirect();
  }, [AddProgress, UserId]);

  return null;
};

export default SaveBadgeProgressScript;
