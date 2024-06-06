import React, { useEffect, useState } from 'react';
import { db, auth } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

import { ListofEarnedBadges } from 'User_Badges_Atuais';

export const ListofBadges = () => {

    let UserId;

    //GET CURRENT LOGGED USER
    if (auth.currentUser) {

        //USER ID
        UserId = auth.currentUser.uid;
    }

    const [badgeList, setBadgeList]= useState([]);

    const BadgesCollectionRef= collection(db, 'badges');

    const [error,setError]= useState('');

    useEffect(() => {

        const getListofBadges = async () => {

            try {

                //GET DADOS
                const data= await getDocs(BadgesCollectionRef);

                let filteredData= data.docs.map((doc) => ({

                    ...doc.data(), 
                    id: doc.id

                }));

                
                filteredData = filteredData.sort((a, b) => a.idManual - b.idManual);

                console.log(filteredData);

                setBadgeList(filteredData);

            } catch(error) {

                setError("Failed to get data", error);

            }
        };

        getListofBadges();

    },[]);

    return (
        <div>
            <h3>Está é a lista de todos os badges que a BD tem:</h3>
            <p>O Id do badge, servirá para adicionar um badge a um user e para saber qual o badge a inspecionar quando clicado.</p>
            {error && <p>{error}</p>}
            <div>
                {badgeList.map((badge) => {
                    return (
                        <div key={badge.id}>
                            <h1>Nome: {badge.nome}</h1>
                            <p>Id do Badge:{badge.idManual}</p>
                            <p>DocID:{badge.id}</p>
                        </div>
                    );
                })}
            </div>
            <h4>Agora vamos chamar o componente que ficará encarregue de ir buscar os badges que uma pessoa tem:</h4>
            {UserId && <ListofEarnedBadges />}
        </div>
        
    )
}