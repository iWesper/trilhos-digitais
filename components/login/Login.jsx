
//IMPORTA A VARIÁVEL DE AUTENTICAÇÃO
import {auth, googleProvider} from '../../backend/config/firebase';

//IMPORTA FUNÇÃO DE CRIAÇÃO DE UTILIZADOR E DA GOOGLE  E MÉTODO DE LOGOUT
import {signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, sendPasswordResetEmail} from 'firebase/auth';

//DP PARA PSSWD RESET
import { db } from '../config/firebase';

//IMPORTA Os hooks
import {useState, useEffect} from 'react';

//FAZER LOGIN COM EMAIL E PASSWORD
const Login = () => {

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

    const [Result, setResult] = useState("");

    //VARIÁVEIS QUE VÃO PERMITIR GUARDAR OS DADOS INTRODUZIDOS
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");


    //FUNÇÃO A CHAMAR COM LOGIN NORMAL
    const handleLogin = async (event) => {

        event.preventDefault();

        if (!Email || !Password) {
            setError("Both fields must be filled out.");
            return;
        }

        //SE A PASSWORD NÃO CUMPRIR O MÍNIMO DE 6 CARACTERES
        if (Password.length < 6) {

            //ERRO QUE MOSTRA À PESSOA
            setError("The password must have, at least, 6 characters.");

        } else {

            //ESPERA A FUNÇÃO
            //CRIA UTILIZADOR
            try {

                //FAZ LOGIN ÀS PESSOAS
                await signInWithEmailAndPassword(auth, Email, Password);

                setResult("Logged in successfully! Welcome!");

            } catch (error) {

                //ERRO QUE MOSTRA À PESSOA
                setError("There was an error during the process. Please, try again.")
            }
        }
    }
    //FUNÇÃO A CHAMAR COM LOGIN GOOGLE
    const handleGoogleSignIn = async () => {

        //ESPERA A FUNÇÃO
        //CRIA UTILIZADOR
        try {

            //ABRE O POP UP DA GOOGLE
            await signInWithPopup(auth, googleProvider);

            setResult("Logged in successfully! Welcome!");


        } catch (error) {

            //ERRO QUE MOSTRA À PESSOA
            setError("There was an error during the process. Please, try again.");

        }
    }

    //FUNÇÃO DE MUDAR A PASSWORD
    const handlePasswordReset = async () => {

        if(!Email || Email.trim() === "") {

            setError("In order to help you, we will require you email");
        }
        else {

            //TRY
            try{
                //MANDA EMAIL Á PESSOA
                await sendPasswordResetEmail(auth, Email);

                setError("Email Enviado");
                
            } catch (error) {

                setError("Ocorreu um erro no processo, por favor, tente novamente.")
            }

        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input placeholder={"example@mail.com"} onChange={(event) => setEmail(event.target.value)} type={"email"} name="email" aria-describedby="emailHelp"/>
                <div>
                    We'll never share your email with anyone else.
                </div>
                
                <div>
                    <label htmlFor="psswd">Password:</label>
                    <input placeholder={"*********"} onChange={(event) => setPassword(event.target.value)} type={"password"} name="psswd"/> 
                    <p onClick={handlePasswordReset}>Forgot your Password?</p>
                </div>
                    {Error && <p>{Error}</p>}
                    <button type="submit">Log In</button>
                    <p>Or</p>
                    <hr></hr>
                    <button type="button" onClick={handleGoogleSignIn}>
                        <span>Google</span>
                    </button>
                    </form>
                    {Result && <p>{Result}</p>}

        </div>
    )
}
export default Login;