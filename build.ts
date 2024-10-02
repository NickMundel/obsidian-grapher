import * as esbuild from "npm:esbuild";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";

import process from "node:process";

try {
  const result = await esbuild.build({
    plugins: [
      ...denoPlugins({ configPath: await Deno.realPath("./deno.json") }),
    ],
    entryPoints: ["./src/main.ts"],
    outfile: "./main.js",
    bundle: true,
    format: "cjs",
    minify: true,
    target: ["es2017"],
    external: ["obsidian"],
    platform: "browser",
  });
  console.log("Hauptbundle erfolgreich erstellt:", result);
} catch (error) {
  console.error("Fehler beim Erstellen des Hauptbundles:", error);
  process.exit(1);
}
