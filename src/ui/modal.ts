import { App, Modal } from "npm:obsidian";
import functionPlot, { Chart } from "npm:function-plot";
import type { PlotOptions } from "../types.ts";
import type ObsidianGrapher from "../main.ts";

const functionPlotFunc = functionPlot as any as typeof functionPlot.default;

export default class GraphModal extends Modal {
  options!: PlotOptions;
  plugin: ObsidianGrapher;
  plot!: Chart | null;

  onSubmit: (result: PlotOptions) => void;

  constructor(
    app: App,
    plugin: ObsidianGrapher,
    onSubmit: (result: PlotOptions) => void,
  ) {
    super(app);
    this.plugin = plugin;
    this.onSubmit = onSubmit;
  }

  override async onClose() {
    let { contentEl } = this;
    contentEl.empty();
    this.plot = null;
  }

  override async onOpen() {
    this.options = Object.assign({});
    this.options.title = "test"
    const { contentEl, modalEl } = this;
    contentEl.empty();

    // Header
    contentEl.createEl("h1", { text: "Plot a function" });

    const flex = contentEl.createDiv({
      attr: {
        style: "display: flex; align-items: center; flex-direction: column;",
      },
    });

    const settings = flex.createDiv();
    const preview = flex.createDiv({ attr: { style: "padding: 1em" } });
    this.plot = functionPlotFunc(Object.assign(this.options));
    preview.createEl("p", {
      text: "Preview - Zoom is disabled while in preview",
      attr: {
        style: "margin: 0 3em; font-size: 0.8em; color: var(--text-faint)",
      },
    });
  }
}
