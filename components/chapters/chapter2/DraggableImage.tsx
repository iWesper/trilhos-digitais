"use client";

import Image, { StaticImageData } from "next/image";
import { useDrag } from "react-dnd";

// Imagem arrastável (react-dnd) usada nas atividades de ordenação do capítulo 2
export default function DraggableImage({
  id,
  url,
  alt,
  className,
  onMouseDown,
}: {
  id: number;
  url: StaticImageData | string;
  alt: string;
  className?: string;
  onMouseDown?: () => void;
}) {
  const [, drag] = useDrag(() => ({ type: "image", item: { id } }), [id]);

  return (
    <Image
      // react-dnd liga-se ao elemento através de um ref de callback
      ref={(node) => {
        drag(node);
      }}
      src={url}
      alt={alt}
      className={className}
      onMouseDown={onMouseDown}
    />
  );
}
