"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { FaStar } from "react-icons/fa";
import  {useProgress} from "@/components/context/ProgressContext";
import { useState ,useEffect } from "react";

import { cn } from "@/lib/utils";

// Função que retorna os milestones para cada capítulo
export const getMilestonesForChapter = (chapterId: string): number[] => {
  const milestones: { [key: string]: number[] } = {
    chapter1: [33, 66],
    chapter2: [20, 40, 80, 90],
    chapter3: [36, 93],
    chapter4: [50, 75], 
    // Adicionar mais capítulos à medida que são necessários
  };

  return milestones[chapterId] || [];
};


const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    milestones?: number[]; // Array de números que representam os milestones
  }
>(({ className, value, milestones, ...props }, ref) => {

  const [importedProgress, setImportedProgress] = useState(0);
  const { progress } = useProgress();

  useEffect(() => {
    // Atualiza o estado com o progresso importado
    setImportedProgress(progress);
  }, [progress]);
  
  
  return (
  // Container para conseguir posicionar os milestones fora do overflow
  <div className="relative">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "h-4 w-full overflow-hidden rounded-full bg-gray-500",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
    { /* Renderizar os milestones */ }
    {milestones?.map((milestone, index) => (
      <FaStar
        key={index}
        className="absolute"
        style={{
          color: importedProgress > milestone? '#ffd900' : '#BEBEBE', // Cinzento claro
          opacity: 1,
          left: `calc(${milestone}% - 18px)`, // Ajustar com base no tamanho do ícone (metade do tamanho do ícone para centrar horizontalmente)
          top: '50%',
          transform: 'translateY(-55%)',
          fontSize: '36px',
        }}
      />
    ))}
  </div>
);
});

Progress.displayName = "Progress";

export { Progress };
