import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const litConfig = {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'ml-lit-components',
      },
      rollupOptions: {
        output: {
          entryFileNames: 'index.js',
        }
      },
    },
  };

  const reactConfig = {
    plugins: [react()],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/react/index.ts'),
        name: 'ml-lit-components/react',
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime'],
        output: {
          entryFileNames: 'react/index.js',
        }
      },
    },
  };

  if (mode === 'react') {
    return reactConfig;
  }
  if (mode === 'lit') {
    return litConfig;
  }
  return litConfig; // default to lit configs
});

/*
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        entry: resolve(__dirname, 'src/react/index.ts'),
        react: resolve(__dirname, 'src/react/index.ts'),
      },
      name: 'LitComponents',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        entryFileNames: ({ name }) => {
          if (name === 'entry') {
            return 'index.js';
          }
          if (name === 'react') {
            return 'react/index.js';
          }
        }
      }
    },
  },
});

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LitComponents',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        entryFileNames: 'index.js',
      }
    },
  },
})
 */