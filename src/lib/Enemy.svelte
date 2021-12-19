<script lang="ts">
  import { Point, Rectangle, Texture, Sprite as PixiSprite } from "pixi.js";
  import { createEventDispatcher } from "svelte";
  import { onTick, Sprite } from "svelte-pixi";

  const dispatch = createEventDispatcher();

  const typeIndex = Math.floor(Math.random() * 7);
  const texture = new Texture(
    Texture.from("/sprites.png") as any,
    new Rectangle(typeIndex * 16, 32, 16, 16)
  );
  export let playerBounds: Rectangle;

  let sprite: PixiSprite;

  let x = 8 + Math.random() * 112;
  let y = 8 + Math.random() * 112;

  const speed = 0.3 + Math.random() * 0.4;
  let flip = false;
  const horizontal = Math.random() > 0.5;

  onTick((d) => {
    const factor = flip ? -speed : speed;
    if (horizontal) {
      x += d * speed * factor;
      if (x > 120) {
        x = 120;
        flip = true;
      }
      if (x < 8) {
        x = 8;
        flip = false;
      }
    } else {
      y += d * speed * factor;
      if (y > 120) {
        y = 120;
        flip = true;
      }
      if (y < 8) {
        y = 8;
        flip = false;
      }
    }
    const bounds = sprite.getBounds();
    if (playerBounds) {
      if (
        bounds.contains(playerBounds.x, playerBounds.y) ||
        bounds.contains(playerBounds.x + playerBounds.width, playerBounds.y) ||
        bounds.contains(
          playerBounds.x + playerBounds.width,
          playerBounds.y + playerBounds.height
        ) ||
        bounds.contains(playerBounds.x, playerBounds.y + playerBounds.height)
      ) {
        dispatch("die");
      }
    }
  });
</script>

<Sprite
  bind:instance={sprite}
  {texture}
  x={Math.round(x)}
  y={Math.round(y)}
  anchor={new Point(0.5, 0.5)}
  scale={new Point(flip ? -1 : 1, 1)}
/>
