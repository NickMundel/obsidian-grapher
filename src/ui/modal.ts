import { App, Modal } from "npm:obsidian";
import functionPlot, { Chart } from "npm:function-plot";
import type { PlotOptions } from "../types.ts";
import type ObsidianGrapher from "../main.ts";
import { mount } from 'npm:svelte';


import Test from "./Test.svelte"

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
    const app = mount(Test, {
      target: this.contentEl,
      props: {
        variable: 1
      }
    });
  }
}
