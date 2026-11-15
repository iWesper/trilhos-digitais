"use client";

import { ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { createXRStore, IfInSessionMode, XR } from "@react-three/xr";
import type { WebGLRenderer } from "three";

// Cena AR partilhada pelos modelos (Canvas + sessão WebXR + botão de entrada)
export default function ARScene({ children }: { children: ReactNode }) {
  // Uma store XR por cena. Não oferecer a sessão automaticamente: o utilizador entra pelo botão
  const [store] = useState(() => createXRStore({ offerSession: false }));
  const glRef = useRef<WebGLRenderer | null>(null);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  const session = useSyncExternalStore(
    store.subscribe,
    () => store.getState().session,
    () => undefined
  );

  useEffect(() => {
    const checkSupport = () => {
      if (!navigator.xr) {
        setIsSupported(false);
        return;
      }
      navigator.xr
        .isSessionSupported("immersive-ar")
        .then(setIsSupported)
        .catch(() => setIsSupported(false));
    };

    // Verificar se o browser suporta WebXR
    if (!navigator.xr && store.getState().emulator == null) {
      alert(
        "O teu navegador não suporta WebXR. Por favor, utiliza um navegador compatível."
      );
    }
    checkSupport();
    // Em localhost a store injeta um emulador WebXR de forma assíncrona: voltar a verificar quando estiver pronto
    return store.subscribe((state, prev) => {
      if (state.emulator && !prev.emulator) checkSupport();
    });
  }, [store]);

  // Ativar/desativar a AR
  const toggleAR = () => {
    if (session) {
      session.end();
      return;
    }
    // As posições dos modelos foram calibradas para o espaço "local"
    // (origem na posição do telemóvel ao entrar), não para "local-floor"
    glRef.current?.xr.setReferenceSpaceType("local");
    store.enterAR().catch(console.error);
  };

  const label = session
    ? "Sair de AR"
    : isSupported === false
      ? "AR não suportado"
      : "Entrar em AR";

  return (
    <div className="w-screen h-screen">
      <Canvas onCreated={({ gl }) => (glRef.current = gl)}>
        <XR store={store}>
          <IfInSessionMode allow="immersive-ar">{children}</IfInSessionMode>
        </XR>
      </Canvas>
      <button
        type="button"
        onClick={toggleAR}
        disabled={isSupported === false}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[99999] rounded border border-white bg-black/10 px-6 py-3 text-[0.8125rem] text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {label}
      </button>
    </div>
  );
}
