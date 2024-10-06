import { App, Modal } from "obsidian";
import type { PlotOptions } from "../types";
import type ObsidianGrapher from "../main";
import { mount } from 'svelte';
// @ts-ignore
import Test from "./Test.svelte"

export default class GraphModal extends Modal {
  options!: PlotOptions;
  plugin: ObsidianGrapher;

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
  }

  override async onOpen() {
    const options: PlotOptions = {
      title: "test",
      data : []
    }
    
    const app = mount(Test, {
      target: this.contentEl,
      props: {
        plot: options
      }
    });
  }
}
