import React from "react";
import dynamic from "next/dynamic";

// Importar dinamicamente os componentes de cada modelo AR
const ARWagner = dynamic(() => import("@/components/ar/ARWagner").then((module) => module.default) as Promise<React.ComponentType<{}>>);
const ARBauhaus = dynamic(() => import("@/components/ar/ARBauhaus").then((module) => module.default) as Promise<React.ComponentType<{}>>);
const ARTv = dynamic(() => import("@/components/ar/ARTv").then((module) => module.default) as Promise<React.ComponentType<{}>>);
const ARPrensa = dynamic(() => import("@/components/ar/ARPrensa").then((module) => module.default) as Promise<React.ComponentType<{}>>);

// Função que renderiza o componente do modelo AR correto
export default function ARPage({ params }: { params: { arID: string } }) {
  const renderComponent = () => {
    switch (params.arID) {
      case "1":
        return <ARWagner />;
      case "2":
        return <ARBauhaus />;
      case "3":
        return <ARTv />;
      case "4":
        return <ARPrensa />;
      default:
        return null;
    }
  };

  return (
    <div>
        {renderComponent()}
    </div>
  )
}
