<script lang="ts">
  import type { Application } from "pixi.js";

  import { onMount } from "svelte";
  import { Pixi, Loader } from "svelte-pixi";
  import Enemy from "./Enemy.svelte";
  import Player from "./Player.svelte";

  let app: Application;
  onMount(async () => {
    const { Application } = await import("pixi.js");
    app = new Application({
      width: 128,
      height: 128,
    });
  });
</script>

{#if app}
  <Pixi {app}>
    <Loader resources={["/sprites.png"]}>
      <Player />
      <Enemy />
      <Enemy />
      <Enemy />
      <Enemy />
      <Enemy />
    </Loader>
  </Pixi>
{/if}

<style lang="scss">
  :global(canvas) {
    image-rendering: pixelated;
    @media (min-aspect-ratio: 1/1) {
      width: 100vh;
    }
    @media (max-aspect-ratio: 1/1) {
      height: 100vw;
    }
  }
</style>
