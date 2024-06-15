// Import do dynamic para carregar os componentes de cada capítulo de forma dinâmica
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
  
  
  Chapter3Page1: dynamic(() => import("@/components/chapters/chapter3/Chapter3Page1").then((module) => module.default) as Promise<React.ComponentType<{}>>),
  
  
  Chapter4Page1: dynamic(() => import("@/components/chapters/chapter4/Chapter4Page1").then((module) => module.default) as Promise<React.ComponentType<{}>>),

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
