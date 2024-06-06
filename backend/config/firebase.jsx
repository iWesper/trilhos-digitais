import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBWhdtyXAhLjZ-lD21mJ9iFFfcaVdVbY8",
  authDomain: "trilhos-digitais.firebaseapp.com",
  projectId: "trilhos-digitais",
  storageBucket: "trilhos-digitais.appspot.com",
  messagingSenderId: "710542861208",
  appId: "1:710542861208:web:63cb0cee4cbe6ffe29c1ed",
  measurementId: "G-R8PSCQFJW6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider= new GoogleAuthProvider();
export const db = getFirestore(app);
