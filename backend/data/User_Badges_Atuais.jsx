import React, { useEffect, useState } from 'react';

import { db } from '../config/firebase';

//FUNÇÃO QUE VAI BUSCAR AS ENTRIES DA BD
import {getDocs, collection, query, where} from "firebase/firestore";

//GET LOGGED USER ID
import {auth} from '../config/firebase';

import { onAuthStateChanged } from 'firebase/auth';

export const ListofEarnedBadges = () => {

    //SAVE USER
    const [UserId, setUserId] = useState(null);

    useEffect(() => {

        //SAVE USER CHANGES
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUserId(currentUser.uid);
            } else {
                setUserId(null);
            }
        });
    }, []);


    //LISTA DOS BADGES
    const [BadgeList, setBadgeList] = useState([]);

    //VARIÁVEL DA TABELA
    const BadgeListCollection = collection(db, "badgesEarned");

    //VARIÁVEL DAS MENSAGENS DE ERRO
    const [Error, setError] = useState("");

    //FUNÇÃO QUE VAI BUSCAR OS BADGES
    const GetBadges = async () => {

        //SE HOUVER USER
        if (UserId) {

            try {

                //QUERY
                const q = query(BadgeListCollection, where("userId", "==", UserId));

                const queryFilter = await getDocs(q);

                //ARRAY DE BADGES
                let FilteredData = [];

                //PARA CADA id
                for (let doc of queryFilter.docs) {

                    //DADOS
                    const data = doc.data();

                    //SE HOUVER BADGE ID
                    if (data.badgeId) {
                        
                        //BUSCAR INFO DO BADGE
                        
                        const badgeInfoArray = await getBadgeInfo(data.badgeId);

                        //PARA CADA BADGE
                        badgeInfoArray.forEach(badgeInfo => {

                            //ADICIONAR BADGE AOO ARRAY
                            FilteredData.push({ ...data, badgeInfo, id: doc.id });
                    });

                } else {

                    setError(`Document ${doc.id} does not have a badgeId`);
                }
            }
            console.log("User's Badges:",FilteredData);

                //SAVE BADGES
                setBadgeList(FilteredData);


            } catch (error) {
                console.error(error);
                setError("Erro no fetch dos dados", error);

            }
        } else {

           setError("Não há user logado");
        }
    }

    //DEtalhes dos badges
    const getBadgeInfo = async (badgeId) => {

        const BadgeCollection=collection(db, "badges");

         //QUERY
         const q = query(BadgeCollection, where("idManual", "==", badgeId));

         const queryFilter = await getDocs(q);

         const FilteredData = queryFilter.docs.map((doc) => ({
             ...doc.data(),
             id: doc.id
         }));
         
         return FilteredData;

    }

        //FETCH CADA VEZ QUE MONTA
        useEffect(() => {

            GetBadges();

        },[UserId]);

        return (
            <div>
                {Error && <p>{Error}</p>}
                {BadgeList.length > 0 ? (
                    <ul>
                        {BadgeList.map((badge) => (
                            <li key={badge.badgeId}>
                                <h1>Nome: {badge.badgeInfo.nome}</h1>
                                <p>Id do Badge:{badge.badgeInfo.idManual}</p>
                                <p>DocID:{badge.id}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You have no badges to this date.</p>
                )}
            </div>
        );
}