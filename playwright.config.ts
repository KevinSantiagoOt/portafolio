import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  retries: 0,
  workers: process.env.CI ? 2 : 4,
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    // Si el Chromium de Playwright no arranca en tu equipo: PW_CHANNEL=msedge npm run test:e2e
    channel: process.env.PW_CHANNEL || undefined,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run build && npm run start",
    port: 3000,
    timeout: 240_000,
    reuseExistingServer: !process.env.CI,
  },
});
