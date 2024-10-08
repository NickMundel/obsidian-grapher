import { z } from "zod";
import { PlotSchema } from "./verify";
import { parseYaml } from "obsidian";

export function parse(input: string) {
  const parsedStuff = parseYaml(input);
  console.log(parsedStuff);
  try {
    const validatedData = PlotSchema.parse(parsedStuff);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validierungsfehler:", error.errors);
    } else {
      console.error("Unerwarteter Fehler:", error);
    }
    throw error;
  }
}
