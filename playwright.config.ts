import { defineConfig } from "@playwright/test";

const port = Number(process.env.PORT ?? 3000);
const baseURL = process.env.API_URL ?? `http://localhost:${port}`;

export default defineConfig({
  testDir: "tests/api",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
  },
  webServer: {
    command: "npm run start",
    url: `${baseURL}/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
