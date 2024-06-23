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
import { addDoc, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

import { useRouter } from "next/navigation";

// Definição do tipo de dados que o AuthContext vai ter
interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
  handlePasswordReset: (email: string) => Promise<void>;
  goGetUsername: (userId: string) => Promise<void>;
  goGetBadges: () => Promise<void>;
  WillShowToast: (BadgeId: number) => Promise<boolean>;
  hasSeenBadgeTutorial: () => Promise<void>;
  UpdateBadgesTutorial: () => Promise<void>;
  UpdateHasSeenTutorialScript: () => Promise<void>;
  CheckHasSeenTutorialScript: () => Promise<void>;
  username: string;
  error: string | null;
  tutorialState: boolean;
  BadgeList: any[];
  willShowToastState: boolean;
  tutorialBadge: boolean;
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
  // Estado para guardar o erro
  const [error, setError] = useState<string | null>(null);
  // Estado para guardar o username
  const [username, setUsername] = useState("");
  // Estado para guardar o estado do tutorial
  const [tutorialState, setTutorialState] = useState(false);
  // Lista de Badges
  const [BadgeList, setBadgeList] = useState<any[]>([]);
  // Estado para guardar se a página está a carregar
  const [isLoading, setIsLoading] = useState(true);
  //SABER SE USER TEM O BADGE OU NÃO
  const [willShowToastState, setwillShowToastState] = useState<boolean>(false);
  // Tutorial dos badges
  const [tutorialBadge, setTutorialBadge] = useState<boolean>(false);;

  // Efeito para verificar se o utilizador está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
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
      setError("Ocorreu um erro no login. Por favor, tenta novamente.");
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
      setError(
        "Ocorreu um erro no login da Google. Por favor, tenta novamente."
      );
    }
  };

  // Handler para fazer reset à password
  const handlePasswordReset = async (email: string) => {
    setError(null); // Reset error state
    if (!email || email.trim() === "") {
      setError("Por favor, insere o teu email.");
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
      setError("Ocorreu um erro no logout. Por favor, tenta novamente.");
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
      setError("Erro a ir buscar o username.");
    }
  };

  // Handler para ir buscar os badges ganhos e o progresso dos não ganhos
  const goGetBadges = async () => {
    // Primeira tabela
    const BadgeListCollection = collection(db, "badgesEarned");

    // Segunda tabela
    const isEarningBadgesCollection = collection(db, "isEarningBadges");

    // Se houver User
    if (currentUser) {
      try {
        // Primeira Query
        const q = query(
          BadgeListCollection,
          where("userId", "==", currentUser.uid)
        );

        // Buscar Dados
        const queryFilter = await getDocs(q);

        // Array Badges
        let FilteredData: Array<any> = [];

        // Para cada id
        for (let doc of queryFilter.docs) {
          // Dados
          const data = doc.data();

          // Se houver badge id
          if (data.badgeId) {
            // Buscar info do badge
            const badgeInfoArray = await getBadgeInfo(data.badgeId);

            // Para cada badge
            badgeInfoArray.forEach((badgeInfo) => {
              // Adicionar badge ao array
              FilteredData.push({
                ...data,
                badgeInfo,
                id: doc.id,
                percentage: 100,
              });
            });
          } else {
            // Erro sem badge id
            setError(`O Documento não tem um Badge Id.`);
          }
        }

        // Agora vai buscar os badges que estão em progresso

        // Segunda Query
        const q2 = query(
          isEarningBadgesCollection,
          where("userId", "==", currentUser.uid)
        );

        // Buscar Dados
        const queryFilter2 = await getDocs(q2);

        // Para cada badge
        for (let doc of queryFilter2.docs) {
          // Dados
          const data = doc.data();

          // Se houver badge id
          if (data.badgeId) {
            // Buscar info do badge
            const badgeInfoArray = await getBadgeInfo(data.badgeId);

            // Para cada badge
            badgeInfoArray.forEach((badgeInfo) => {
              // Adicionar badge ao array
              FilteredData.push({
                ...data,
                badgeInfo,
                id: doc.id,
                percentage: data.percentage,
              });
            });
          } else {
            // Erro sem badge id
            setError(`O Documento não tem um Badge Id.`);
          }
        }

        // Save no estado
        setBadgeList(FilteredData);
      } catch (e) {
        // Temp log do erro
        setError(`Ocorreu um erro na busca dos dados.`);
      }
    } else {
      // Erro sem User
      setError("Não há User logado.");
    }
  };

  // Função dos detalhes do badge
  const getBadgeInfo = async (badgeId: number) => {
    // Primeira tabela
    const BadgeCollection = collection(db, "badges");

    // Query
    const q = query(BadgeCollection, where("idManual", "==", badgeId));

    // Buscar Dados
    const queryFilter = await getDocs(q);

    // Array de Badges
    const FilteredData = queryFilter.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return FilteredData;
  };

  // Função para dar trigger ao toast
  const WillShowToast = async (BadgeId: number): Promise<boolean> => {
    // Primeira tabela
    const BadgeListCollection = collection(db, "badgesEarned");

    // Se houver user
    if (currentUser) {
      try {
        // Query
        const q = query(
          BadgeListCollection,
          where("userId", "==", currentUser.uid),
          where("badgeId", "==", BadgeId)
        );

        // Buscar Dados
        const queryFilter = await getDocs(q);

        // Se houver não docs faz if not empty que será false
        if (!queryFilter.empty) {
          setwillShowToastState(false);
        } else {
          // Se não houver docs, dá true
          setwillShowToastState(true);
        }
      } catch (e) {
        // Erro
        setError(`Ocorreu um erro na busca dos dados.`);
      }
    } else {
      // Erro
      setError("Não há User logado.");
    }

    return false;
  };

  //Função para ver se o user já viu o tutorial dos badges
  const hasSeenBadgeTutorial = async () => {

    //SE JÁ TIVER O UID
    if (currentUser) {

      //ERROR HANDLE
      try {
        //COLLECTION
        const hasSeenTutorialcollection = collection(db, "hasSeenTutorial");

        //QUERY PARA ENCONTRAR O DOCUMENTO
        const q = query(
          hasSeenTutorialcollection,
          where("userId", "==", currentUser.uid)
        );

        //EXECUTA A QUERY
        const queryTutorial = await getDocs(q);

        //PARA CADA DO || VAI SER SÓ UM
        queryTutorial.forEach(async (docSnapshot) => {

          setTutorialBadge(docSnapshot.data().hasSeenBadgeTutorial);
        });

      } catch (error) {

        //MENSAGEM
        setError("Erro na atualização do Tutorial");
      }
    } else {
      setError("Nenhum Utilizador Encontrado");
    }

  }

  // Função para atualizar que o user já viu o tutorial dos badges
  const UpdateBadgesTutorial = async () => {

    //SE JÁ TIVER O UID
    if (currentUser) {

      //ERROR HANDLE
      try {
          //COLLECTION
          const hasSeenTutorialcollection = collection(db, "hasSeenTutorial");

          //QUERY PARA ENCONTRAR O DOCUMENTO
          const q = query(hasSeenTutorialcollection, where("userId", "==", currentUser.uid));

          //EXECUTA A QUERY
          const queryTutorial = await getDocs(q);

          //PARA CADA DO || VAI SER SÓ UM
          queryTutorial.forEach(async (docSnapshot) => {

          //ATUALIZA O CAMPO DE VER TUTORIAL
              await updateDoc(doc(db, "hasSeenTutorial", docSnapshot.id), {

                hasSeenBadgeTutorial: true
              });
          });


      } catch (error) {

          //MENSAGEM
          setError("Erro na atualização do Tutorial");
      }
  }
  else {

      setError("Nenhum Utilizador Encontrado");

  }
  }

  //Função para saber se viu o tutorial
  const CheckHasSeenTutorialScript = async () => {

    //SE JÁ TIVER O UID
    if (currentUser) {
      //ERROR HANDLE
      try {
        //COLLECTION
        const hasSeenTutorialcollection = collection(db, "hasSeenTutorial");

        //QUERY PARA ENCONTRAR O DOCUMENTO
        const q = query(
          hasSeenTutorialcollection,
          where("userId", "==", currentUser.uid)
        );

        //EXECUTA A QUERY
        const queryTutorial = await getDocs(q);

        //PARA CADA DO || VAI SER SÓ UM
        queryTutorial.forEach(async (docSnapshot) => {

          setTutorialState(docSnapshot.data().hasSeenMainTutorial);

        });
      } catch (error) {

        //MENSAGEM
        setError("Erro na atualização do Tutorial");
      }
    } else {
      setError("Nenhum Utilizador Encontrado");
    }
  }

  // Função de update de ter visto o tutorial principal
  const UpdateHasSeenTutorialScript = async () => {

     //SE JÁ TIVER O UID
     if (currentUser) {

      //ERROR HANDLE
      try {
          //COLLECTION
          const hasSeenTutorialcollection = collection(db, "hasSeenTutorial");

          //QUERY PARA ENCONTRAR O DOCUMENTO
          const q = query(hasSeenTutorialcollection, where("userId", "==", currentUser.uid));

          //EXECUTA A QUERY
          const queryTutorial = await getDocs(q);

          //PARA CADA DO || VAI SER SÓ UM
          queryTutorial.forEach(async (docSnapshot) => {

          //ATUALIZA O CAMPO DE VER TUTORIAL
              await updateDoc(doc(db, "hasSeenTutorial", docSnapshot.id), {

                  hasSeenMainTutorial: true
              });
          });


      } catch (error) {

          //MENSAGEM
          setError("Erro na atualização do Tutorial");
      }
  }
  else {

      setError("Nenhum Utilizador Encontrado");

  }


  }

  // Valor do contexto
  const value = {
    currentUser,
    logout,
    handleLogin,
    handleGoogleSignIn,
    handlePasswordReset,
    goGetUsername,
    goGetBadges,
    BadgeList,
    WillShowToast,
    username,
    error,
    tutorialState,
    isLoading,
    willShowToastState,
    tutorialBadge,
    hasSeenBadgeTutorial,
    UpdateBadgesTutorial,
    UpdateHasSeenTutorialScript,
    CheckHasSeenTutorialScript,
  };

  // Retorna o provider com o valor
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
