<script lang="ts">
  import { Point, Rectangle, Texture } from "pixi.js";
  import { onTick, Sprite } from "svelte-pixi";

  const typeIndex = Math.floor(Math.random() * 7);
  const texture = new Texture(
    Texture.from("/sprites.png") as any,
    new Rectangle(typeIndex * 16, 32, 16, 16)
  );

  let x = Math.random() * 128;
  let y = Math.random() * 128;
  //   const i = 0;
  const speed = 0.6;
  let flip = false;
  const horizontal = Math.random() > 0.5;
  onTick((d) => {
    const factor = flip ? -speed : speed;
    if (horizontal) {
      x += d * speed * factor;
      if (x > 128) {
        x = 128;
        flip = true;
      }
      if (x < 0) {
        x = 0;
        flip = false;
      }
    } else {
      y += d * speed * factor;
      if (y > 128) {
        y = 128;
        flip = true;
      }
      if (y < 0) {
        y = 0;
        flip = false;
      }
    }
    //
  });
</script>

<Sprite
  {texture}
  x={Math.round(x)}
  y={Math.round(y)}
  anchor={new Point(0.5, 0.5)}
  scale={new Point(flip ? -1 : 1, 1)}
/>
