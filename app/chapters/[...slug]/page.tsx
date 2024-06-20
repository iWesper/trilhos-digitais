// Import do dynamic para carregar os componentes de cada capítulo de forma dinâmica
import Chapter3Page15 from "@/components/chapters/chapter3/Chapter3Page15";
import dynamic from "next/dynamic";
import React from "react";

// Importar dinamicamente os componentes de cada capítulo
const ChapterComponents: { [key: string]: React.ComponentType<{}> } = {

  //1
  Chapter1Page1: dynamic(() => import("@/components/chapters/chapter1/Chapter1Page1").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter1Page2: dynamic(() => import("@/components/chapters/chapter1/Chapter1Page2").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter1Page3: dynamic(() => import("@/components/chapters/chapter1/Chapter1Page3").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter1Page4: dynamic(() => import("@/components/chapters/chapter1/Chapter1Page4").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter1Page5: dynamic(() => import("@/components/chapters/chapter1/Chapter1Page5").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter1Page6: dynamic(() => import("@/components/chapters/chapter1/Chapter1Page6").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter1Page7: dynamic(() => import("@/components/chapters/chapter1/Chapter1Page7").then((module) => module.default) as Promise<React.ComponentType<{}>>),

  //2
  Chapter2Page1: dynamic(() => import("@/components/chapters/chapter2/Chapter2Page1").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter2Page2: dynamic(() => import("@/components/chapters/chapter2/Chapter2Page2").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter2Page3: dynamic(() => import("@/components/chapters/chapter2/Chapter2Page3").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter2Page4: dynamic(() => import("@/components/chapters/chapter2/Chapter2Page4").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter2Page5: dynamic(() => import("@/components/chapters/chapter2/Chapter2Page5").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter2Page6: dynamic(() => import("@/components/chapters/chapter2/Chapter2Page6").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter2Page7: dynamic(() => import("@/components/chapters/chapter2/Chapter2Page7").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter2Page8: dynamic(() => import("@/components/chapters/chapter2/Chapter2Page8").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter2Page9: dynamic(() => import("@/components/chapters/chapter2/Chapter2Page9").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter2Page10: dynamic(() => import("@/components/chapters/chapter2/Chapter2Page10").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter2Page11: dynamic(() => import("@/components/chapters/chapter2/Chapter2Page11").then((module) => module.default) as Promise<React.ComponentType<{}>>),

  //3
  Chapter3Page1: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page1").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page2: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page2").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page3: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page3").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page4: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page4").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page5: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page5").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page6: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page6").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page7: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page7").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page8: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page8").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page9: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page9").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page10: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page10").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page11: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page11").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page12: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page12").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page13: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page13").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page14: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page14").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter3Page15: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page15").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  
  //4
  Chapter4Page1: dynamic(() => import("@/components/chapters/chapter4/Chapter4Page1").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  Chapter4Page2: dynamic(() => import("@/components/chapters/chapter4/Chapter4Page2").then((module) => module.default) as Promise<React.ComponentType<{}>>),

  // Adicionar mais capítulos à medida que são necessários
};

// Função que renderiza o componente do capítulo correto
export default function Chapters({ params }: { params: { slug: string[] } }) {
  // Obter o slug da página
  const { slug } = params;
  // Formar o ID do componente do capítulo
  const chapterComponentID = `Chapter${slug[0].charAt(7)}Page${slug[1]}`;

  // Associar o ID do componente do capítulo ao componente correspondente
  const ChapterComponent = ChapterComponents[chapterComponentID];

  // Se o componente existir, renderizá-lo
  if (ChapterComponent) {
    return <ChapterComponent />;
  } else {
    // Caso contrário, mostrar uma mensagem de erro
    return <div>Página não encontrada</div>;
  }
}
