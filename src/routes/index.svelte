<script lang="ts">
  import { onMount, SvelteComponent } from "svelte";

  let Game: typeof SvelteComponent;
  onMount(async () => {
    const module = await import("$lib/Game.svelte");
    Game = module.default;
  });
</script>

<svelte:component this={Game} />
<slot />

>
