import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    video: true,
    videoCompression: 32,
    baseUrl: "http://localhost:8080",
  },
});
