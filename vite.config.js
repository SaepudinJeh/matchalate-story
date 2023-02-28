import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from '@originjs/vite-plugin-federation'

import pkg from './package.json';



const federationPluginOpt = {
  name: 'myself_story',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App',
  },
  shared: {
    ...Object.entries(pkg.dependencies).reduce((acc, [key, version]) => {
      acc[key] = {
        version: version,
      };
      return acc;
    }, {}),
  },
  // react: { singleton: true }, "react-dom": { singleton: true } },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation(federationPluginOpt)
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
