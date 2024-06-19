"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth, googleProvider, db } from "@/backend/config/firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

import { useRouter } from "next/navigation";

// Definição do tipo de dados que o AuthContext vai ter
interface AuthContextType {
  currentUser: User | null;
  logout: () => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
  handlePasswordReset: (email: string) => Promise<void>;
  goGetUsername: (userId: string) => Promise<void>;
  username: string;
  error: string | null;
  tutorialState: boolean;
}

// Criação do contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para usar o contexto
export const useAuth = () => {
  // Verifica se o contexto foi usado fora do provider
  const context = useContext(AuthContext);
  // Se o contexto for undefined, lança um erro
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider para envolver a aplicação
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Hook para navegar entre páginas
  const router = useRouter();
  // Estado para guardar o utilizador atual
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // Estado para guardar o username
  const [username, setUsername] = useState("");
  // Estado para guardar o erro
  const [error, setError] = useState<string | null>(null);
  // Estado para guardar o estado do tutorial
  const [tutorialState, setTutorialState] = useState(false);

  // Efeito para verificar se o utilizador está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Handler para fazer login com email e password
  const handleLogin = async (email: string, password: string) => {
    setError(null);
    try {
      // Faz login com email e password e redireciona para a página inicial
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (e) {
      setError("Login failed. Please try again.");
    }
  };

  // Handler para fazer login com a conta Google
  const handleGoogleSignIn = async () => {
    setError(null); // Reset error state
    try {
      //ABRE O POP UP DA GOOGLE
      const result = await signInWithPopup(auth, googleProvider);

      //ADICIONA O USERNAME À COLEÇÃO DE USERNAMES
      const UsernameCollection = collection(db, "usernames");

      //VÊ SE O USERNAME JÁ EXISTE
      const UsernameQuery = query(
        UsernameCollection,
        where("userId", "==", result.user.uid)
      );
      const UsernameQuerySnapshot = await getDocs(UsernameQuery);

      //GUARDA SÓ SE NÃO EXISTIR
      if (UsernameQuerySnapshot.empty) {
        await addDoc(UsernameCollection, {
          userId: result.user.uid,
          username: result.user.displayName,
        });
      }

      //ADICIONA FALSE NO HAS SEEN TUTORIAL
      const HasSeenTutorialCollection = collection(db, "hasSeenTutorial");

      const HasSeenTutorialQuery = query(
        HasSeenTutorialCollection,
        where("userId", "==", result.user.uid)
      );
      const HasSeenTutorialQuerySnapshot = await getDocs(HasSeenTutorialQuery);

      //GUARDA SÓ SE NÃO EXISTIR
      if (HasSeenTutorialQuerySnapshot.empty) {
        await addDoc(HasSeenTutorialCollection, {
          hasSeenTutorial: false,
          userId: result.user.uid,
        });
      }
    } catch (e) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  // Handler para fazer reset à password
  const handlePasswordReset = async (email: string) => {
    setError(null); // Reset error state
    if (!email || email.trim() === "") {
        setError(
          "Para conseguir alterar a password, por favor, insere o teu email."
        );
      } else {
        //TRY
        try {
          //MANDA EMAIL Á PESSOA
          await sendPasswordResetEmail(auth, email);
        } catch (e) {
          setError("Ocorreu um erro no processo, por favor, tente novamente.");
        }
      }
  };

  // Handler para fazer logout
  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (e) {
      setError("Logout failed. Please try again.");
    }
  };

  // Handler para ir buscar o username
  const goGetUsername = async (userId: string) => {
    setError(null);
    try {
      const usernameCollection = collection(db, "usernames");
      const q = query(usernameCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUsername(doc.data().username);
      });
    } catch (e) {
      setError("Failed to fetch username. Please try again.");
    }
  };

  // Valor do contexto
  const value = {
    currentUser,
    logout,
    handleLogin,
    handleGoogleSignIn,
    handlePasswordReset,
    goGetUsername,
    username,
    error,
    tutorialState,
  };

  // Retorna o provider com o valor
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
