"use client";

import { ReactNode, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";
import LoadingScreen from "@/components/ui/loading-screen";

const MOBILE_UA = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

// Lido só no browser; no servidor assume desktop (o conteúdo protegido nunca é renderizado no servidor)
function useIsMobile() {
  return useSyncExternalStore(
    () => () => {},
    () => MOBILE_UA.test(navigator.userAgent),
    () => false
  );
}

// Só para testes end-to-end: precisa do build com NEXT_PUBLIC_E2E=1 E de localStorage "e2e-auth" = "1".
// Em produção NEXT_PUBLIC_E2E não existe, por isso este ramo é eliminado no build.
function useE2EBypass() {
  return useSyncExternalStore(
    () => () => {},
    () => process.env.NEXT_PUBLIC_E2E === "1" && window.localStorage.getItem("e2e-auth") === "1",
    () => false
  );
}

type Props = {
  children: ReactNode;
  // Só para desktop: em mobile mostra um aviso
  desktopOnly?: boolean;
  // AR: os QR codes abrem no telemóvel, por isso em mobile não exige sessão
  allowAnonymousOnMobile?: boolean;
};

// Porta de autenticação partilhada por todas as rotas protegidas.
// Um único estado de carregamento (o do Firebase), sem estados extra por layout.
export default function RequireAuth({ children, desktopOnly = false, allowAnonymousOnMobile = false }: Props) {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();
  const isMobile = useIsMobile();
  const e2eBypass = useE2EBypass();
  const allowed = e2eBypass || currentUser !== null || (allowAnonymousOnMobile && isMobile);

  useEffect(() => {
    if (!isLoading && !allowed) router.replace("/authentication");
  }, [isLoading, allowed, router]);

  if (!e2eBypass && (isLoading || !allowed)) return <LoadingScreen />;

  if (desktopOnly && isMobile) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#142839] px-4 text-center text-white">
        <p>
          Esta plataforma é melhor utilizada num computador desktop. Por favor, acede através de um desktop para
          continuar.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
