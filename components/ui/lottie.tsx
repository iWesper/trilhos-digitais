"use client";

import dynamic from "next/dynamic";

// lottie-web acede a `document` ao ser importado, por isso só pode ser carregado no browser
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default Lottie;
