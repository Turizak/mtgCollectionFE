import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname,'dist')

// https://vitejs.dev/config/
// export default defineConfig({
//   root,
//   build: {
//     outDir,
//     emptyOutDir: true,
//     rollupOptions: {
//       input: {
//         main: resolve(root, 'index.html'),
//         login: resolve(root, 'login', 'index.html'),
//       }
//     }
//   }
// })

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    root,
    server: {
      open: true,
      origin: 'http://127.0.0.1:5173'
    },
    build: {
      outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(root, 'index.html'),
          login: resolve(root, 'login', 'index.html'),
        }
      }
    }
  });
}