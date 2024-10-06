<script lang="ts">
  import Plot from "./components/Plot.svelte"
  import {PlotOptions} from "../types"

  let {plot}: PlotOptions = $props();
</script>

<Plot plot={plot}/>