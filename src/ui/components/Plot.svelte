<script lang="ts">
    import { onMount } from "svelte";
    import functionPlot from "function-plot";
    import type { PlotOptions } from "../../types";
  
    let {plot}: { plot: PlotOptions } = $props();

    let container: HTMLDivElement;

    onMount(() => {
        functionPlot({
            target: container,
            ...plot
        })
    })
</script>

<div bind:this={container}></div>