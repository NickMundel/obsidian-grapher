import { z } from "zod";

const Plot = z.object({
  width: z.number().optional(),
  height: z.number().optional(),
  title: z.string().optional(),
  grid: z.boolean().optional(),
  disableZoom: z.boolean().optional(),
  xAxis: z.object({
    domain: z.array(z.number()).length(2),
    label: z.string().optional(),
    invert: z.boolean().optional(),
    type: z.enum(["linear", "log"]).optional(),
  }).optional(),
  yAxis: z.object({
    domain: z.array(z.number()).length(2),
    label: z.string().optional(),
    invert: z.boolean().optional(),
    type: z.enum(["linear", "log"]).optional(),
  }).optional(),
});

const BasePlotOptions = z.object({
  fnType: z.enum([
    "linear",
    "parametric",
    "implicit",
    "polar",
    "points",
    "vector",
  ]).optional(),
  nSamples: z.number().optional(),
  graphType: z.enum(["polyline", "interval", "scatter", "text"]).optional(),
  range: z.array(z.number()).length(2).optional(),
  color: z.string().optional(),
});

const PlotOptions = BasePlotOptions.partial();

const ImplicitOptions = PlotOptions.extend({
  fn: z.string(),
  fnType: z.literal("implicit"),
});

const PointsOptions = PlotOptions.extend({
  points: z.array(z.tuple([z.number(), z.number()])),
  fnType: z.literal("points"),
});

const VectorOptions = PlotOptions.extend({
  vector: z.tuple([z.number(), z.number()]),
  offset: z.tuple([z.number(), z.number()]).optional(),
  fnType: z.literal("vector"),
});

const TextOptions = PlotOptions.extend({
  graphType: z.literal("text"),
  text: z.string(),
  location: z.tuple([z.number(), z.number()]),
  attr: z.any(),
}).required({
  graphType: true,
  text: true,
  location: true,
});

const ParametricOptions = PlotOptions.extend({
  x: z.string(),
  y: z.string(),
  range: z.tuple([z.number(), z.number()]).optional(),
  fnType: z.literal("parametric"),
});

const PolarOptions = PlotOptions.extend({
  r: z.string(),
  scope: z.any(),
  fnType: z.literal("polar"),
});

const FunctionOptions = PlotOptions.extend({
  fn: z.string(),
  closed: z.boolean().optional(),
  secants: z.array(z.object(
    {
      fn: z.string().optional(),
      x0: z.number().optional(),
      x1: z.number().optional(),
      updateOnMouseMove: z.boolean().optional(),
    },
  )).optional(),
  derivative: z.object(
    {
      fn: z.string(),
      x0: z.number().optional(),
      updateOnMouseMove: z.boolean().optional(),
    },
  ).optional(),
}).refine(
  (data) =>
    !data.closed ||
    (data.graphType === "polyline" || data.graphType === "scatter"),
  {
    message: "polyline or scatter is required for closed graphs",
  },
);

const PlotDataOptions = z.union([
  ImplicitOptions,
  PointsOptions,
  VectorOptions,
  TextOptions,
  ParametricOptions,
  PolarOptions,
  FunctionOptions,
]);

export const PlotSchema = Plot.extend({
  data: z.array(PlotDataOptions),
  annotations: z.array(
    z.object({
      x: z.number().optional(),
      y: z.number().optional(),
      text: z.string().optional(),
    }).refine(
      (data) =>
        data.x !== undefined && data.y == undefined ||
        data.x == undefined && data.y !== undefined,
      {
        message: "either x or y need to be set on the object",
      },
    ),
  ).optional(),
  tip: z.object({
    xLine: z.boolean().optional(),
    yLine: z.boolean().optional(),
  }).optional(),
});
