import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import builtins from 'builtin-modules';

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
      compilerOptions: {
        hydratable: true,
        css: "injected" // Dies schaltet die separate CSS-Ausgabe aus
      },
      emitCss: false // Dies verhindert die Erstellung separater CSS-Dateien
    })
  ],
  build: {
    minify: false,
    lib: {
      entry: 'src/main',
      name: 'main',
      fileName: () => 'main.js',
      formats: ['cjs'],
    },
    outDir: '.', // Setzt das Ausgabeverzeichnis auf den Stammordner
    emptyOutDir: false, // Verhindert das Leeren des Ausgabeverzeichnisses
    rollupOptions: {
      external: [          
        'obsidian',
        'electron',
        '@codemirror/autocomplete',
        '@codemirror/closebrackets',
        '@codemirror/collab',
        '@codemirror/commands',
        '@codemirror/comment',
        '@codemirror/fold',
        '@codemirror/gutter',
        '@codemirror/highlight',
        '@codemirror/history',
        '@codemirror/language',
        '@codemirror/lint',
        '@codemirror/matchbrackets',
        '@codemirror/panel',
        '@codemirror/rangeset',
        '@codemirror/rectangular-selection',
        '@codemirror/search',
        '@codemirror/state',
        '@codemirror/stream-parser',
        '@codemirror/text',
        '@codemirror/tooltip',
        '@codemirror/view',
        '@lezer/common',
        '@lezer/highlight',
        '@lezer/lr',
        ...builtins]
    }
  },
  resolve: {
    alias: {
      "$components": "./src/ui/components"
    }
  }
});