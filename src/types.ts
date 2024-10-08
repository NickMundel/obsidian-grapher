import { z } from "zod";
import type { Chart } from "function-plot";
import type { PlotSchema } from "./verify";
import { EventEmitter } from "events"

export interface PluginSettings {
  [key: string]: number | string;
  titleFontSize: number;
  scaleFontSize: number;
  labelFontSize: number;
  // annotationFontSize: number

  lineWidth: number;
  gridWidth: number;

  fontColor: string;
  // annotationColor: string
  lineColor: string;
  gridColor: string;
}

export const DEFAULT_PLOT_PLUGIN_SETTINGS: PluginSettings = {
  titleFontSize: 24,
  scaleFontSize: 12,
  labelFontSize: 12,
  // annotationFontSize: 16,

  lineWidth: 2,
  gridWidth: 1,

  fontColor: "var(--text-normal)",
  // annotationColor: '#000',
  lineColor: "gray",
  gridColor: "var(--interactive-hover)",
};

export type chartType = Chart & EventEmitter;

export type PlotOptions = z.infer<typeof PlotSchema>;
