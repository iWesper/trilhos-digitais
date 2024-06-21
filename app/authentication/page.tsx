"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FcGoogle } from "react-icons/fc";

//IMPORTA Os hooks
import { useState, useEffect } from "react";
import { Auth } from "@/components/register/Register";

// Importa os hooks de autenticação e de navegação
import { useAuth } from "@/components/context/AuthContext";

// Página de login
const Login = () => {
  const { handleLogin, handleGoogleSignIn, handlePasswordReset } =
    useAuth();

  //STATE DO RENDER
  const [Render, setRender] = useState(true);

  //VARIÁVEIS QUE VÃO PERMITIR GUARDAR OS DADOS INTRODUZIDOS
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  //FUNÇÃO QUE TROCA O RENDER
  const ChangeRender = () => {
    setRender(false);
  };

  return (
    <>
      {Render === true ? (
        <div className="w-full h-screen bg-white lg:grid lg:grid-cols-2 lg:grid-rows-1 overflow-hidden">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold font-effra">Bem-vindo!</h1>
                <p className="text-balance text-muted-foreground">
                  Para teres acesso à experiência completa que a Trilhos
                  Digitais tem para te oferecer, deverás primeiro entrar na tua
                  conta.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder={"*********"}
                    onChange={(event) => setPassword(event.target.value)}
                    name="psswd"
                  />
                  <p
                    onClick={() => handlePasswordReset(Email)}
                    className="underline cursor-pointer"
                  >
                    Esqueceste-te da Palavra-Passe?
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  onClick={() => handleLogin(Email, Password)}
                >
                  Entrar
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleGoogleSignIn}
                >
                  <FcGoogle size={24} /> Entrar com Google
                </Button>
              </div>
              <div
                className="mt-4 text-center text-sm"
                style={{ cursor: "pointer" }}
              >
                Ainda não tens uma conta?{" "}
                <a onClick={ChangeRender} className="underline">
                  Regista-te!
                </a>
              </div>
            </div>
          </div>
          <div className="hidden bg-muted lg:block">
            <Image
              src="/img/ecra_login.svg"
              alt="Image"
              width="1920"
              height="1080"
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              priority={true}
            />
          </div>
        </div>
      ) : (
        Render === false && <Auth />
      )}
    </>
  );
};
export default Login;
