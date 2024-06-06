import { useState } from 'react';
import { auth, googleProvider } from '../../backend/config/firebase.jsx';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const Auth = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const [Result, setResult] = useState("");

    //INFO DO USER COM LOGIN
    //console.log(auth?.currentUser?.uid)

    const SignUp = async () => {

        setError("");

        if (!email || !password) {
            setError("Both fields must be filled out.");
            return;
        }

        if (password.length < 6) {

            setError("Password must be at least 6 characters long");

        }
        else {

            try {

                await createUserWithEmailAndPassword(auth, email, password);

                setResult("Account created successfully! Welcome!");
            

            } catch(error) {
                    
                    setError("Failed to create an account", error);
            }

            
        }


    };

    const SignInWithGoogle = async () => {

        try {

            await signInWithPopup(auth, googleProvider);

            setResult("Logged in successfully! Welcome!");

        } catch(error) {
                
                setError("Failed to create an account", error);
        }
    };

    const LogOut = async () => {

        setError("");
        setEmail("");
        setPassword("");
        setResult("Logged out successfully! Bye!");  

        try {

            await signOut(auth);

            setError("");
            setEmail("");
            setPassword("");
            setResult("Logged out successfully! Bye!");

        } catch(error) {
                
                setError("Failed to Sing Out", error);
        }
    };


    return(
        <div>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={SignUp}>Sign Up</button>
            <button onClick={SignInWithGoogle}>Sign Up with Google</button>
            <button onClick={LogOut}>Log Out</button>
            {error && <p>{error}</p>}
            {Result && <p>{Result}</p>}
        </div>
    )
}