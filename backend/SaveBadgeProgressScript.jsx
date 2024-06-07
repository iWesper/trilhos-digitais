//DEVER SER CHAMADO ASSIM
//<SaveBadgeProgressScript badgeId={badgeId} progress={percentage}          const badgeId=4 const percentage=25;

import React, { useEffect, useState, useCallback} from "react";
import {collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import {db, auth} from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const SaveBadgeProgressScript = ({ badgeId, progress }) => {

    //USER ID
    const [UserId, setUserId] = useState(null);

    //GUARDA O ID DO BADGE QUE TE FOI COMUNICADO
    const BadgeId= badgeId;

    //MENSAGEM DE ERRO
    const [Error,setError]= useState("");


    const AddProgress = useCallback(async () => {


        //BadgeID -> Number
        const numericBadgeId = +BadgeId;

        //SE JÁ TIVER O UID
        if (UserId) {

            //ERROR HANDLE
            try {
                //COLLECTION
                const isEarningBadgesCollection = collection(db, "isEarningBadges");

                //QUERY PARA ENCONTRAR O DOCUMENTO
                const q= query(isEarningBadgesCollection, where("userId", "==", UserId), where("badgeId", "==", numericBadgeId));

                //EXECUTA A QUERY
                const queryEdit = await getDocs(q);

                //PARA CADA DO || VAI SER SÓ UM
                queryEdit.forEach(async (docSnapshot) => {

                //ATUALIZA O CAMPO PERCENTAGE
                    await updateDoc(doc(db, "isEarningBadges", docSnapshot.id), {

                        percentage: progress
                    });
                });

            } catch (error) {

                //MENSAGEM
                setError("Erro na atualização do Badge");
            }
        }
        else {

            setError("Nenhum Utilizador Encontrado");

        }
    }, [UserId, BadgeId]);

     //VAI BUSCAR O USER ID QUANDO MONTA
     useEffect(() => {

        //SAVE USER
        onAuthStateChanged(auth, (currentUser) => {

            if(currentUser){

                //SAVE
                setUserId(currentUser.uid);

                if (UserId) {

                    AddProgress();
                }
            } 
            else {
                setUserId(null);
            }
        });
    },[AddProgress, UserId]);


}

export default SaveBadgeProgressScript;
