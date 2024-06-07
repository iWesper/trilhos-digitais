//DEVER SER CHAMADO ASSIM
//<AddBadgeScript badgeId={BadgeId}       const BadgeId= 2;

import React, { useEffect, useState, useCallback} from "react";
import {addDoc, collection, query, where, getDocs} from "firebase/firestore";
import {db, auth} from "config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AddBadgeScript = ({ badgeId }) => {

    //USER ID
    const [UserId, setUserId] = useState(null);

    //GUARDA O ID DO BADGE QUE TE FOI COMUNICADO
    const BadgeId= badgeId;

    //MENSAGEM DE ERRO
    const [Error,setError]= useState("");


    const AddBadge = useCallback(async () => {


        //BadgeID -> Number
        const numericBadgeId = +BadgeId;

        //COLLECTION
        const badgesEarnedCollection = collection(db, "badgesEarned");

        //SE JÁ TIVER O UID
        if (UserId) {

            //ERROR HANDLE
            try {

                //QUERY
                const q  = query(badgesEarnedCollection, where("userId", "==", UserId));

                //FILTRADOS
                const queryFilter= await getDocs(q);

                const FilteredData = queryFilter.docs.map((doc) => ({...doc.data(), id: doc.id}));

                //PROCURAR DUPLICADOS
                const duplicate = FilteredData.some(doc => doc.badgeId === numericBadgeId && doc.userId === UserId);

                //SE NÃO HOUVER
                if(!duplicate) {

                    //ADD BADGE
                    await addDoc(badgesEarnedCollection, {
                        badgeId:numericBadgeId,
                        userId:UserId
                    });

                    //BADGE ADDED
                    setError("Badge Added!");
                }
                else {

                    setError("Badge already Earned!");
                }
            } catch (error) {

                //MENSAGEM
                setError("Erro na adição do Badge");
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
                    AddBadge();
                }
            } 
            else {
                setUserId(null);
            }
        });
    },[AddBadge, UserId]);

    return (
        <div>
            {Error && <p>{Error}</p>}
        </div>
    )
}

export default AddBadgeScript;
