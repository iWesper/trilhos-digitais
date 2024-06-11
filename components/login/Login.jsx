import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { FcGoogle } from "react-icons/fc";

//IMPORTA A VARIÁVEL DE AUTENTICAÇÃO
import {auth, googleProvider} from '../../backend/config/firebase';

//IMPORTA FUNÇÃO DE CRIAÇÃO DE UTILIZADOR E DA GOOGLE  E MÉTODO DE LOGOUT
import {signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, sendPasswordResetEmail} from 'firebase/auth';

//DP PARA PSSWD RESET
import { db } from '../../backend/config/firebase';

//IMPORTA FUNÇÕES DO FIRESTORE
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';

//IMPORTA Os hooks
import {useState, useEffect} from 'react';
import {Auth} from '../register/Register';

//FAZER LOGIN COM EMAIL E PASSWORD
const Login = () => {

    //STATE DO RENDER
    const [Render, setRender] = useState(true);

    //SAVE USER
    const [User, setUser] = useState(null);

    useEffect(() => {

        //SAVE USER CHANGES
    onAuthStateChanged(auth, (currentUser) => {

        //SE HOUVER USER
        setUser(currentUser);

    });
    }, []);

    //VARIÁVEL DAS MENSAGENS DE ERRO
    const [Error, setError] = useState("");

    //VARIÁVEIS QUE VÃO PERMITIR GUARDAR OS DADOS INTRODUZIDOS
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");


    //FUNÇÃO A CHAMAR COM LOGIN NORMAL
    const handleLogin = async (event) => {

        event.preventDefault();

        if (!Email || !Password) {

            setError("Os campos devem estar preenchidos.");

            return;
        }

        //SE A PASSWORD NÃO CUMPRIR O MÍNIMO DE 6 CARACTERES
        if (Password.length < 6) {

            //ERRO QUE MOSTRA À PESSOA
            setError("Por razões de segurança, a password deve ter no mínimo 6 caracteres.");

        } else {

            //ESPERA A FUNÇÃO
            //CRIA UTILIZADOR
            try {

                //FAZ LOGIN ÀS PESSOAS
                await signInWithEmailAndPassword(auth, Email, Password);

               //REDIRECT PARA CHECKTUTORIAL

            } catch (error) {

                //ERRO QUE MOSTRA À PESSOA
                setError("Ocorreu um erro no processo, por favor, tente novamente.");
            }
        }
    }
    //FUNÇÃO A CHAMAR COM LOGIN GOOGLE
    const handleGoogleSignIn = async () => {

        //ESPERA A FUNÇÃO
        //CRIA UTILIZADOR
        try {

            //ABRE O POP UP DA GOOGLE
            const result = await signInWithPopup(auth, googleProvider);

            //ADICIONA O USERNAME À COLEÇÃO DE USERNAMES
            const UsernameCollection = collection(db, "usernames");

            //VÊ SE O USERNAME JÁ EXISTE
            const UsernameQuery = query(UsernameCollection, where("userId", "==", result.user.uid));
            const UsernameQuerySnapshot = await getDocs(UsernameQuery);

            //GUARDA SÓ SE NÃO EXISTIR
            if (UsernameQuerySnapshot.empty) {
    
                await addDoc(UsernameCollection, {
                    userId: result.user.uid,
                    username: result.user.displayName
                });
            }
 
            //ADICIONA FALSE NO HAS SEEN TUTORIAL
            const HasSeenTutorialCollection = collection(db, "hasSeenTutorial");
            
            const HasSeenTutorialQuery = query(HasSeenTutorialCollection, where("userId", "==", result.user.uid));
            const HasSeenTutorialQuerySnapshot = await getDocs(HasSeenTutorialQuery);

            //GUARDA SÓ SE NÃO EXISTIR
            if (HasSeenTutorialQuerySnapshot.empty) {
                
                await addDoc(HasSeenTutorialCollection, {
                    hasSeenTutorial: false,
                    userId: result.user.uid
                });
            }


        } catch (error) {

            //ERRO QUE MOSTRA À PESSOA
            setError("Ocorreu um erro no processo, por favor, tente novamente.");

        }
    }

    //FUNÇÃO DE MUDAR A PASSWORD
    const handlePasswordReset = async () => {

        if(!Email || Email.trim() === "") {

            setError("Para conseguir alterar a password, por favor, insere o teu email.");
        }
        else {

            //TRY
            try{
                //MANDA EMAIL Á PESSOA
                await sendPasswordResetEmail(auth, Email);
                
            } catch (error) {

                setError("Ocorreu um erro no processo, por favor, tente novamente.")
            }

        }
    }

    //FUNÇÃO QUE TROCA O RENDER
    const ChangeRender = () => {

        setRender(false);
    }

    return (
        <div>
            {Render === true ? (
                <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <div className="flex items-center justify-center py-12">
                  <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                      <h1 className="text-3xl font-bold">Bem-vindo!</h1>
                      <p className="text-balance text-muted-foreground">
                      Para teres acesso à experiência completa que a Trilhos Digitais tem para te oferecer, deverás primeiro entrar na tua conta.
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
                          onChange={(event) => setEmail(event.target.value)} name="email" aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <p onClick={handlePasswordReset}>Esqueceste-te a Palavra-Passe?</p>
                        </div>
                        <Input id="password" type="password"  placeholder={"*********"} onChange={(event) => setPassword(event.target.value)} name="psswd" />
                      </div>
                      <Button type="submit" className="w-full" onClick={handleLogin}>
                        Entrar
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                        <FcGoogle /> Entrar com Google
                      </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                    Ainda não tens uma conta?{" "}
                    <a onClick={ChangeRender} className="underline">Regista-te!</a>
                    </div>
                  </div>
                </div>
                <div className="hidden bg-muted lg:block">
                  <Image
                    src="/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
              </div>
            ) : (
                Render === false && <Auth/>
            )}
        </div>
    )
}
export default Login;