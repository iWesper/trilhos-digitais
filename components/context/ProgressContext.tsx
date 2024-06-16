import { createContext, useContext, useState, ReactNode } from "react";

//TIPOS
interface ProgressContextType {
  progress: number;
  setProgress: (value: number) => void;
}

//CRIAR CONTEXTO
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

//PROVIDER
export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  //ESTADO  
  const [progress, setProgress] = useState(0);
  
  //MANDA PROGRESSO PARA COMPONENTS FILHOS
  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

//HOOK ESPECÍFICO
export const useProgress = () => {

    //ACEDE CONTEXXTO
  const context = useContext(ProgressContext);

  //SE NÃO EXISTIR
  if (!context) {

    //ERRO
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
