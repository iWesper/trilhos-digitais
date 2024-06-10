import { useState } from 'react';
import { db,auth, googleProvider } from '../../backend/config/firebase.jsx';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc,collection } from 'firebase/firestore';
import HomepagePage from '../../app/homepage/page.tsx';

export const Auth = () => {

    //EMAIL E PASSWORD
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    //USERNAME
    const [usernameForm, setUsernameForm] = useState("");

    //GO TO HOMePAGE
    const [goToHomePage, setGoToHomePage] = useState(false);
    
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

    return(
        <div>
            <label>
                <input type="text" placeholder="Username" onChange={(e) => setUsernameForm(e.target.value)}/>
               Lembra-te que não poderás alterar este nome no futuro.
            </label>
            
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={SignUp}>Sign Up</button>
            <button onClick={SignInWithGoogle}>Sign Up with Google</button>
            {error && <p>{error}</p>}
            {goToHomePage && <HomepagePage/>}
        </div>
    )
}