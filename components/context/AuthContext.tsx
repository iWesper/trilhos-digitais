"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/backend/config/firebase";
import {
  BadgeEntry,
  ensureUserDocs,
  getBadges,
  getTutorialFlags,
  getUsername,
  hasEarnedBadge,
  markTutorialSeen,
} from "@/lib/firestore";

// Sessão (Firebase Auth) + dados do utilizador (Firestore, via lib/firestore).
// A API é a mesma de antes; por dentro, as funções são estáveis (useCallback) e o valor é memorizado,
// para não re-renderizar todos os componentes a cada mudança e para poderem entrar nas dependências dos efeitos.
interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
  handlePasswordReset: (email: string) => Promise<void>;
  goGetUsername: (userId: string) => Promise<void>;
  goGetBadges: () => Promise<void>;
  // true se o badge ainda não foi ganho (o toast deve aparecer); também atualiza willShowToastState
  WillShowToast: (BadgeId: number) => Promise<boolean>;
  // Os dois "check" resolvem com o valor de "ainda a verificar": false quando correu bem
  hasSeenBadgeTutorial: () => Promise<boolean>;
  UpdateBadgesTutorial: () => Promise<void>;
  UpdateHasSeenTutorialScript: () => Promise<void>;
  CheckHasSeenTutorialScript: () => Promise<boolean>;
  username: string;
  error: string | null;
  tutorialState: boolean;
  BadgeList: BadgeEntry[];
  willShowToastState: boolean;
  tutorialBadge: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const NO_USER = "Nenhum Utilizador Encontrado";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [tutorialState, setTutorialState] = useState(false);
  const [BadgeList, setBadgeList] = useState<BadgeEntry[]>([]);
  const [willShowToastState, setWillShowToastState] = useState(false);
  const [tutorialBadge, setTutorialBadge] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);

  const uid = currentUser?.uid ?? null;

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      setError(null);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/");
      } catch {
        setError("Ocorreu um erro no login. Por favor, tenta novamente.");
      }
    },
    [router]
  );

  const handleGoogleSignIn = useCallback(async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await ensureUserDocs(result.user);
    } catch {
      setError("Ocorreu um erro no login da Google. Por favor, tenta novamente.");
    }
  }, []);

  const handlePasswordReset = useCallback(async (email: string) => {
    setError(null);
    if (!email || email.trim() === "") {
      setError("Por favor, insere o teu email.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
    } catch {
      setError("Ocorreu um erro no processo, por favor, tente novamente.");
    }
  }, []);

  const logout = useCallback(async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch {
      setError("Ocorreu um erro no logout. Por favor, tenta novamente.");
    }
  }, []);

  const goGetUsername = useCallback(async (userId: string) => {
    setError(null);
    try {
      const name = await getUsername(userId);
      if (name !== null) setUsername(name);
    } catch {
      setError("Erro a ir buscar o username.");
    }
  }, []);

  const goGetBadges = useCallback(async () => {
    if (!uid) {
      setError("Não há User logado.");
      return;
    }
    try {
      setBadgeList(await getBadges(uid));
    } catch {
      setError("Ocorreu um erro na busca dos dados.");
    }
  }, [uid]);

  const WillShowToast = useCallback(
    async (BadgeId: number) => {
      if (!uid) {
        setError("Não há User logado.");
        return false;
      }
      try {
        const show = !(await hasEarnedBadge(uid, BadgeId));
        setWillShowToastState(show);
        return show;
      } catch {
        setError("Ocorreu um erro na busca dos dados.");
        return false;
      }
    },
    [uid]
  );

  const hasSeenBadgeTutorial = useCallback(async () => {
    if (!uid) {
      setError(NO_USER);
      return true;
    }
    try {
      const flags = await getTutorialFlags(uid);
      if (flags) setTutorialBadge(flags.hasSeenBadgeTutorial);
      return false;
    } catch {
      setError("Erro na atualização do Tutorial");
      return true;
    }
  }, [uid]);

  const CheckHasSeenTutorialScript = useCallback(async () => {
    if (!uid) {
      setError(NO_USER);
      throw true;
    }
    try {
      const flags = await getTutorialFlags(uid);
      if (flags) setTutorialState(flags.hasSeenMainTutorial);
      return false;
    } catch {
      setError("Erro na atualização do Tutorial");
      throw true;
    }
  }, [uid]);

  const UpdateBadgesTutorial = useCallback(async () => {
    if (!uid) return setError(NO_USER);
    try {
      await markTutorialSeen(uid, "hasSeenBadgeTutorial");
    } catch {
      setError("Erro na atualização do Tutorial");
    }
  }, [uid]);

  const UpdateHasSeenTutorialScript = useCallback(async () => {
    if (!uid) return setError(NO_USER);
    try {
      await markTutorialSeen(uid, "hasSeenMainTutorial");
    } catch {
      setError("Erro na atualização do Tutorial");
    }
  }, [uid]);

  const value = useMemo<AuthContextType>(
    () => ({
      currentUser,
      isLoading,
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
      willShowToastState,
      tutorialBadge,
      hasSeenBadgeTutorial,
      UpdateBadgesTutorial,
      UpdateHasSeenTutorialScript,
      CheckHasSeenTutorialScript,
    }),
    [
      currentUser,
      isLoading,
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
      willShowToastState,
      tutorialBadge,
      hasSeenBadgeTutorial,
      UpdateBadgesTutorial,
      UpdateHasSeenTutorialScript,
      CheckHasSeenTutorialScript,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
