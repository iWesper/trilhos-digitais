import { defineConfig, devices } from "@playwright/test";

// Smoke tests end-to-end. Fazem build de produção com NEXT_PUBLIC_E2E=1 (permite saltar o login nos testes)
// e chaves Firebase falsas: nada é escrito em nenhum projeto Firebase real.
const PORT = 3100;

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "off",
    ...devices["Desktop Chrome"],
    viewport: { width: 1440, height: 900 },
  },
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}/authentication`,
    timeout: 300_000,
    reuseExistingServer: !process.env.CI,
    env: {
      NEXT_TELEMETRY_DISABLED: "1",
      NEXT_PUBLIC_E2E: "1",
      NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyE2EDummyDummyDummyDummyDummyDum00",
      NEXT_PUBLIC_AUTH_DOMAIN: "e2e.firebaseapp.com",
      NEXT_PUBLIC_PROJECT_ID: "e2e-dummy",
      NEXT_PUBLIC_STORAGE_BUCKET: "e2e-dummy.appspot.com",
      NEXT_PUBLIC_MESSAGING_SENDER_ID: "000",
      NEXT_PUBLIC_APP_ID: "1:000:web:000",
      NEXT_PUBLIC_MEASUREMENT_ID: "G-000",
    },
  },
});
