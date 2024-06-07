
import React, { useEffect, useState, useCallback} from "react";
import {collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import {db, auth} from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const UpdateHasSeenTutorialScript = () => {

    //USER ID
    const [UserId, setUserId] = useState(null);

    //MENSAGEM DE ERRO
    const [Error,setError]= useState("");

    const AddTutorialState = useCallback(async () => {

        //SE JÁ TIVER O UID
        if (UserId) {

            //ERROR HANDLE
            try {
                //COLLECTION
                const hasSeenTutorialcollection = collection(db, "hasSeenTutorial");

                //QUERY PARA ENCONTRAR O DOCUMENTO
                const q = query(hasSeenTutorialcollection, where("userId", "==", UserId));

                //EXECUTA A QUERY
                const queryTutorial = await getDocs(q);

                //PARA CADA DO || VAI SER SÓ UM
                queryTutorial.forEach(async (docSnapshot) => {

                //ATUALIZA O CAMPO DE VER TUTORIAL
                    await updateDoc(doc(db, "hasSeenTutorial", docSnapshot.id), {

                        hasSeenTutorial: true
                    });
                });


            } catch (error) {

                //MENSAGEM
                setError("Erro na atualização do Tutorial");
            }
        }
        else {

            setError("Nenhum Utilizador Encontrado");

        }
    }, [UserId]);

     //VAI BUSCAR O USER ID QUANDO MONTA
     useEffect(() => {

        //SAVE USER
        onAuthStateChanged(auth, (currentUser) => {

            if(currentUser){

                //SAVE
                setUserId(currentUser.uid);

                if (UserId) {
                    AddTutorialState();
                }
            } 
            else {
                setUserId(null);
            }
        });
    },[AddTutorialState, UserId]);

}

export default UpdateHasSeenTutorialScript;
