import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { FcGoogle } from "react-icons/fc";

import { useState } from 'react';
import { db,auth, googleProvider } from '../../backend/config/firebase.jsx';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc,collection } from 'firebase/firestore';
import HomepagePage from '../../app/homepage/page.tsx';
import Login from "../login/Login.jsx";

export const Auth = () => {

    //EMAIL E PASSWORD
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    //USERNAME
    const [usernameForm, setUsernameForm] = useState("");

    //GO TO HOMePAGE
    const [goToHomePage, setGoToHomePage] = useState(false);

    //STATE DO RENDER
    const [Render, setRender] = useState(true);
    
    //ERROR FEEDBACK
    const [error,setError] = useState("");

    //TABELA DE USERNAMES
    const UsernameCollection= collection(db,"usernames");

    //TABELA DE VER O TUTORIAL
    const HasSeenTutorialCollection = collection(db,"hasSeenTutorial");


    //FUNÇÃO DE REGISTO
    const SignUp = async () => {


        //SE NÃO HOUVER EMAIL, PASSWORD OU USERNAME
        if (!email || !password || !usernameForm) {

            //PEDE ESSES DADOS
            setError("Deves preencher os três campos antes de submeter.");

            return;
        }

        //SE A PASSWORD TIVER MENOS DE 6 CARACTERES
        if (password.length < 6) {

            //PEDE UMA PASSWORD MAIS SEGURA
            setError("Para ser mais segura, a tua password deve ter pelo menos 6 caracteres.");

        }
        else {

            //REGISTA O UTILIZADOR
            try {

                //CRIA O UTILIZADOR
                const SignUpResult = await createUserWithEmailAndPassword(auth, email, password);

                //ID DO UTILIZADOR VINDO DA PROMISE
                const NewUserID= SignUpResult.user.uid;

                //ADICIONA O USERNAME À COLEÇÃO DE USERNAMES
                await addDoc(UsernameCollection, {

                    userId:NewUserID,
                    username:usernameForm
                });

                //ADICIONA FALSE NO HAS SEEN TUTORIAL
                await addDoc(HasSeenTutorialCollection, {
                        
                        hasSeenTutorial:false,
                        userId:NewUserID
                        
                    });

                //ABRE HOMEPAGE
                 setGoToHomePage(true);

            } catch(error) {
                
                //SE HOUVER ERRO, MOSTRA-O
                setError("Erro ao criar conta", error);
            }

            
        }


    };

    //FUNÇÃO DE REGISTO COM GOOGLE
    const SignInWithGoogle = async () => {

        //SE NÃO HOUVER USERNAME
        if (!usernameForm) {

            //PEDE O USERNAME
            setError("Deves preencher o campo de username antes de submeter.");
        }
        else {

            try {

                //CRIA O UTILIZADOR COM O GOOGLE
                const GoogleSignUpResult = await signInWithPopup(auth, googleProvider);
    
                //ID DO UTILIZADOR VINDO DA PROMISE
                const NewUserID= GoogleSignUpResult.user.uid;
    
                //ADICIONA O USERNAME À COLEÇÃO DE USERNAMES
                await addDoc(UsernameCollection, {
    
                    userId:NewUserID,
                    username:usernameForm
                });

                //ADICIONA FALSE NO HAS SEEN TUTORIAL
                await addDoc(HasSeenTutorialCollection, {
                        
                    hasSeenTutorial:false,
                    userId:NewUserID
                    
                });

                //ABRE HOMEPAGE
                setGoToHomePage(true);
    
            } catch(error) {
                    
                //SE HOUVER ERRO, MOSTRA-O
                setError("Erro ao criar conta", error);
            }

        }
        
    };

     //FUNÇÃO QUE TROCA O RENDER
    const ChangeRender = () => {
      setRender(false);
    };

    return(
      <div>
        {Render ? (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <div className="flex items-center justify-center py-12">
                  <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                      <h1 className="text-3xl font-bold">Bem-vindo!</h1>
                      <p className="text-balance text-muted-foreground">
                     Cria a tua conta para começares a explorar o mundo dos Trilhos Digitais.
                     </p>
                    </div>
                    <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Username</Label>
                        <Input
                          id="usernmae"
                          type="usernmae"
                          placeholder="Username"
                          required
                          onChange={(e) => setUsernameForm(e.target.value)} name="username"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@mail.com"
                          required
                          onChange={(event) => setEmail(event.target.value)} name="email" aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                        </div>
                        <Input id="password" type="password"  placeholder={"*********"} onChange={(event) => setPassword(event.target.value)} name="psswd" />
                      </div>
                      <Button type="submit" className="w-full" onClick={SignUp}>
                        Registar
                      </Button>
                      <Button variant="outline" className="w-full" onClick={SignInWithGoogle}>
                        <FcGoogle size={24} /> Registar com Google
                      </Button>
                      <div className="mt-4 text-center text-sm" style={{cursor:"pointer"}}>
                        Já tens uma conta?{" "}
                        <a onClick={ChangeRender} className="underline">
                        Entrar
                        </a>
                    </div>
                  </div>
                </div>
                <div className="hidden bg-muted lg:block">
                  <Image
                    src="/img/ecra_login3.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
                </div>
                {goToHomePage && <HomepagePage/>}
              </div>

      ): (
        <Login />
      )}
      </div>
  );
};