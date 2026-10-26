import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { channel: 'msedge', headless: true },
  workers: 1,
  reporter: 'list',
  webServer: {
    command: 'npm run dev -- --port 5174 --strictPort',
    url: 'http://127.0.0.1:5174/',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
