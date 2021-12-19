<script lang="ts">
  import { Application, Point, Rectangle, TextStyle } from "pixi.js";
  import { Pixi, Loader, Container, Text } from "svelte-pixi";

  import Background from "./Background.svelte";
  import Enemy from "./Enemy.svelte";
  import Player from "./Player.svelte";

  let playerBounds: Rectangle;
  let enemies: Array<{ dead: boolean }> = [];
  function restart() {
    enemies = new Array(6).fill(null).map(() => ({ dead: false }));
  }
  restart();

  $: gameover = !enemies.some((enemy) => enemy.dead === false);
  $: if (gameover) {
    setTimeout(restart, 3000);
  }

  const app = new Application({
    width: 128,
    height: 128,
  });
</script>

<Pixi {app}>
  <Loader resources={["/sprites.png"]}>
    <Container>
      {#if gameover}
        <Text
          text="You won"
          style={new TextStyle({
            fontSize: 25,
            fill: "white",
            dropShadow: true,
          })}
          x={64}
          y={64}
          anchor={new Point(0.5, 0.5)}
        />
      {:else}
        <Background />
      {/if}
    </Container>
    <Container>
      <Player bind:bounds={playerBounds} />
    </Container>
    <Container>
      {#each enemies as enemy}
        {#if !enemy.dead}
          <Enemy
            {playerBounds}
            on:die={() => {
              enemy.dead = true;
            }}
          />
        {/if}
      {/each}
    </Container>
  </Loader>
</Pixi>

<svelte:window
  on:keydown={(e) => {
    if (e.key === "r") {
      // press "r" to restart
      window.location.reload();
    }
  }}
/>

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
