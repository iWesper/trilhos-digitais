// 'use client' é apenas necessário quando estamos a usar componentes do lado do cliente, por exemplo, os modelos 3D do react-three-fiber
"use client";

import React, { useEffect, useState } from "react";
import {db,auth} from "../backend/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import CheckHasSeenTutorialScript from "../backend/CheckHasSeenTutorialScript";
import Login from "@/components/login/Login";

import { Button } from "@/components/ui/button";

export default function Home() {

  //COMPONENT BOOLEAN COM TIPOS POSSÍVEIS PARA TSX
  const [ComponentToRender, setComponentToRender] = useState<boolean | undefined>(undefined);

  //ERROR STRING COM TIPOS POSSÍVEIS PARA TSX
  const [error, setError] = useState<string | undefined>(undefined);

  //QUANDO COMPONENTE MONTA
  useEffect(() => {

    //VER SE HÁ LOGIN
    onAuthStateChanged(auth, (currentUser => {

      if(currentUser) {

        //SE HOUVER LOGIN
        setComponentToRender(true);
      }
      else {
        //SE NÃO HOUVER LOGIN
        setComponentToRender(false);
      }

      
    }))
  },[])

  const LogOut = async () => {
    try {

        //TERMINA A SESSÃO
        await signOut(auth);

    } catch(error) {
            
        //SE HOUVER ERRO, MOSTRA-O    
        setError("Ocorreu um erro ao terminar a sessão");
    }
};
  return (
    <main className="grid grid-cols-12 gap-4 h-screen items-center justify-between p-24">
      <div className="col-span-12 border-2 border-red-600">
        linha 1 - 12 colunas
        {ComponentToRender=== true ? <CheckHasSeenTutorialScript /> : ComponentToRender === false && <Login/>}
        <Button onClick={LogOut}>Log Out</Button>

        
      </div>
      <div className="col-span-12 border-2 border-red-600">
        linha 2 - 12 colunas
        
      </div>
      <div className="col-span-6 border-2 border-red-600">
        linha 3 - 6 colunas
      </div>
      <div className="col-span-6 border-2 border-red-600">
        linha 3 - 6 colunas
      </div>
    </main>
  );
}
