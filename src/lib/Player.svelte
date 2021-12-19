<script lang="ts">
  import { Point, Rectangle, Texture } from "pixi.js";
  import { onTick, Sprite } from "svelte-pixi";
  import keypad from "./keypad";

  const texture = Texture.from("/sprites.png");
  const animation = [
    new Rectangle(8, 0, 16, 16),
    new Rectangle(8 + 16, 0, 16, 16),
    new Rectangle(8 + 32, 0, 16, 16),
  ];
  // eslint-disable-next-line prefer-destructuring
  texture.frame = animation[0];
  const upFrame = new Rectangle(8 + 48, 0, 16, 16);

  let i = 0;
  let x = 50;
  let y = 50;
  const speed = 0.7;
  let flip = false;
  onTick((d) => {
    let up = false;
    let walking = false;
    if ($keypad.up) {
      y -= d * speed;
      up = true;
      walking = true;
    }
    if ($keypad.right) {
      x += d * speed;
      walking = true;
      flip = false;
    }
    if ($keypad.down) {
      y += d * speed;
      walking = true;
    }
    if ($keypad.left) {
      x -= d * speed;
      flip = true;
      walking = true;
    }

    if (up) {
      texture.frame = upFrame;
    } else if (walking) {
      i += 0.1;
      texture.frame = animation[Math.floor(i) % animation.length];
    }
  });
</script>

<Sprite
  {texture}
  x={Math.round(x)}
  y={Math.round(y)}
  anchor={new Point(0.5, 0.5)}
  scale={new Point(flip ? -1 : 1, 1)}
/>
