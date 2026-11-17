/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Valor fixado no build: "1" só nos testes end-to-end. Com "0" o desvio de login é removido do código de produção.
    NEXT_PUBLIC_E2E: process.env.NEXT_PUBLIC_E2E === "1" ? "1" : "0",
  },
};

export default nextConfig;
