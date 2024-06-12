import React from "react";
import { useEffect,useState } from "react";
import { auth } from "../../../backend/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "@/components/login/Login";
import Lottie from "lottie-react";
import animationData from "@/public/animations/loading_animation.json";


export default function Chapter4Page1() {
  //USER ID
  const [UserId, setUserId] = useState<string | null>(null);

  //LOADING
  const [loading, setLoading] = useState<boolean>(true);

  //VAI BUSCAR O USER ID QUANDO MONTA
  useEffect(() => {
   //SAVE USER
   onAuthStateChanged(auth, (currentUser) => {

     if (currentUser) {
       //SAVE
       setUserId(currentUser.uid);

       if (UserId) {
         return;
       }
     } else {
       setUserId(null);
     }

     //ACABA O LOAD
     setLoading(false);
   });
 }, [UserId]);

 //SE ESTIVER A CARREGAR
 if (loading) {
   return (
   <div className="h-screen w-screen flex justify-center items-center">
         <Lottie animationData={animationData} className="bg-foreground h-20 w-20 " />
   </div>
 )
 }


 return (
  UserId ? (
    <div>
    <h1>Capítulo 4 - Página 1</h1>
  </div>
    
  ) : (
    <Login />
  )
  
);
}