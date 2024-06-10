// Importar os componentes dos capítulos
import Chapter1Page1 from "@/components/chapter1/Chapter1Page1";

// Função que retorna o componente do capítulo correspondente ao caminho da página
export default function Chapters({ params }: { params: { slug: string[] } }) {
  // Se o caminho for /chapters/chapter1/1, retorna a página 1 do capítulo 1
  if (params.slug[0] === "chapter1" && params.slug[1] === "1") {
    return <Chapter1Page1 />;
  }
  else {
    // Se o caminho não corresponder a nenhum capítulo, retorna uma mensagem de erro
    return <div>Página não encontrada</div>;
  }
}
