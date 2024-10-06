import {
  Editor,
  type MarkdownPostProcessorContext,
  parseYaml,
  Plugin,
} from "obsidian";
import functionPlot, {
  Chart,
  type FunctionPlotOptions,
} from "function-plot";
import { parse } from "./utils";
import createStylingPlugin from "./styling";
import SettingsTab from "./ui/settings";
import {
  type chartType,
  DEFAULT_PLOT_PLUGIN_SETTINGS,
  type PluginSettings,
} from "./types";
import GraphModal from "./ui/modal";

export default class ObsidianGrapher extends Plugin {
  settings!: PluginSettings;
  graphs!: Chart[];
  pluginSettings!: (instance: chartType) => void;

  override async onload() {
    await this.loadSettings();
    this.graphs = [];
    console.log(this.settings);
    this.pluginSettings = createStylingPlugin(this);

    // Configure resources needed by the plugin.
    console.log("loaded");

    this.addSettingTab(new SettingsTab(this.app, this));

    this.addCommand({
      id: "insert-functionplot2",
      name: "Plot a function2",
    });

    this.addCommand({
      id: "insert-functionplot",
      name: "Plot a function",
      editorCallback: (editor: Editor) => {
        new GraphModal(this.app, this, (result) => {
          const line = editor.getCursor().line;
          //editor.setLine(line, parseToPlot(result))
        }).open();
      },
    });

    this.registerMarkdownCodeBlockProcessor(
      "grapher",
      this.createFunctionPlotHandler(this),
    );
  }

  async rebuild() {
    this.graphs.forEach((graph) => {
      graph.options.plugins = [this.pluginSettings];
      graph.build();
    });
  }

  async loadSettings() {
    // TODO load default settings for font size, color and line width from themes
    this.settings = Object.assign(
      {},
      DEFAULT_PLOT_PLUGIN_SETTINGS,
      await this.loadData(),
    );
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.pluginSettings = createStylingPlugin(this);
  }

  createFunctionPlotHandler(plugin: ObsidianGrapher) {
    return async (
      source: string,
      el: HTMLElement,
      _ctx:
        MarkdownPostProcessorContext, /* eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars */
    ) => {
      try {
        const options = <FunctionPlotOptions> parse(source);
        options.target = el;
        options.plugins = [this.pluginSettings];

        this.graphs.push(functionPlot(options));
      } catch (e) {
        console.log(e);
      }
    };
  }
}
