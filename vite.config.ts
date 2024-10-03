import { defineConfig } from 'npm:vite';
import { svelte } from 'npm:@sveltejs/vite-plugin-svelte@next';
import sveltePreprocess from 'npm:svelte-preprocess';
import builtins from 'npm:builtin-modules';

const sveltePreprocessFunc = sveltePreprocess as any as typeof sveltePreprocess.default;

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocessFunc(),
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
      entry: 'src/main.ts',
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
      "npm:obsidian": "obsidian",
      "npm:function-plot": "function-plot",
      "npm:zod": "zod",
      "npm:svelte": "svelte"
    }
  }
});