import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc
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
  const Percentage = progress;
  const NextPage = nextPage;

   //COLLECTION
   const isEarningBadgesCollection = collection(db, "isEarningBadges");

   //COLLECTION
   const badgesEarnedCollection = collection(db, "badgesEarned");

  //MENSAGEM DE ERRO
  const [Error, setError] = useState<string>("");

  const AddProgress = async () => {
    //BadgeID -> Number
    const numericBadgeId = +BadgeId;

    //SE JÁ TIVER O UID
    if (UserId) {

      //VER SE O BADGE EM QUESTÃO JÁ FOI GANHO
      const earnedBadgesQuery = query(badgesEarnedCollection, where("userId", "==", UserId), where("badgeId", "==", numericBadgeId));

      //RESULTADOS
      const earnedBadgesQueryResults = await getDocs(earnedBadgesQuery);

      //SE O BADGE JÁ TIVER SIDO GANHO
      if(!earnedBadgesQueryResults.empty){

        return router.push(NextPage);
      }
      //SE A PERCENTAGEM FOR 100%
      else if (Percentage === 100) {
        
        //ERROR HANDLE
        try {
          //QUERY
          const q = query(
            badgesEarnedCollection,
            where("userId", "==", UserId)
          );

          //FILTRADOS
          const queryFilter = await getDocs(q);

          const FilteredData = queryFilter.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            badgeId: doc.data().badgeId,
            userId: doc.data().userId,
          }));

          //PROCURAR DUPLICADOS
          const duplicate = FilteredData.some(
            (doc) => doc.badgeId === numericBadgeId && doc.userId === UserId
          );

          //SE NÃO HOUVER
          if (!duplicate) {
            //ADD BADGE
            await addDoc(badgesEarnedCollection, {
              badgeId: numericBadgeId,
              userId: UserId,
            });
          }

          //APAGA DA TABELA DE PROGRESSO
          //USA ESTA QUERY
          const queryDeleteDefinition = query(
            isEarningBadgesCollection,
            where("userId", "==", UserId),
            where("badgeId", "==", numericBadgeId)
          );

          //EXECUTA A QUERY
          const queryDelete = await getDocs(queryDeleteDefinition);

          //SE EXISTIR APAGA
          if (!queryDelete.empty) {

            //PARA CADA DOCUMENTO
            queryDelete.forEach(async (docSnapshot) => {

              //APAGA O DOCUMENTO
              await deleteDoc(doc(db, "isEarningBadges", docSnapshot.id));

            });
          }

          //ROUTER PARA A PÁGINA SEGUINTE
          router.push(NextPage);
        } catch (error) {
          //MENSAGEM
          setError("Erro na adição do Badge");
        }
      } else {
        //ERROR HANDLE
        try {
         

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
                percentage: Percentage,
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
          router.push(NextPage);
        } catch (error) {
          //MENSAGEM
          setError("Erro na atualização do Badge");
        }
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
