import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      host: true,
      port: 4173,
      strictPort: true
    },
    root,
  });
};
