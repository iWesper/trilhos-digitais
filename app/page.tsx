// 'use client' é apenas necessário quando estamos a usar componentes do lado do cliente, por exemplo, os modelos 3D do react-three-fiber
"use client";

import React, { useEffect, useState } from "react";
import { db, auth } from "../backend/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import CheckHasSeenTutorialScript from "../backend/CheckHasSeenTutorialScript";
import Login from "@/components/login/Login";

import { Button } from "@/components/ui/button";

export default function Home() {
  //COMPONENT BOOLEAN COM TIPOS POSSÍVEIS PARA TSX
  const [ComponentToRender, setComponentToRender] = useState<
    boolean | undefined
  >(undefined);

  //ERROR STRING COM TIPOS POSSÍVEIS PARA TSX
  const [error, setError] = useState<string | undefined>(undefined);

  //QUANDO COMPONENTE MONTA
  useEffect(() => {
    //VER SE HÁ LOGIN
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        //SE HOUVER LOGIN
        setComponentToRender(true);
      } else {
        //SE NÃO HOUVER LOGIN
        setComponentToRender(false);
      }
    });
  }, []);

  const LogOut = async () => {
    try {
      //TERMINA A SESSÃO
      await signOut(auth);
    } catch (error) {
      //SE HOUVER ERRO, MOSTRA-O
      setError("Ocorreu um erro ao terminar a sessão");
    }
  };
  return (
    <main className="max-w-full overflow-hidden">
        {ComponentToRender === true ? (
          <CheckHasSeenTutorialScript />
        ) : (
          ComponentToRender === false && <Login />
        )}
        {/* <Button onClick={LogOut} className="bg-secondary hover:bg-orange-500">Log Out</Button> */}
    </main>
  );
}
