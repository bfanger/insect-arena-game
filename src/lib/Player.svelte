<script lang="ts">
  import { Point, Rectangle, Texture, Sprite as PixiSprite } from "pixi.js";
  import { onTick, Sprite } from "svelte-pixi";
  import Joystick from "./Joystick.svelte";
  import type { Keypad } from "./keypad";

  const idle = new Rectangle(8, 0, 16, 16);
  const texture = new Texture(Texture.from("/sprites.png") as any, idle);
  const frames = {
    walk: [
      idle,
      new Rectangle(8 + 16, 0, 16, 16),
      new Rectangle(8 + 32, 0, 16, 16),
    ],
    up: new Rectangle(8 + 48, 0, 16, 16),
  };
  export let bounds: Rectangle | undefined = undefined;
  let sprite: PixiSprite;
  let keypad: Keypad;

  let i = 0;
  let x = 50;
  let y = 50;
  const speed = 0.7;
  let flip = false;
  onTick((d) => {
    let up = false;
    let walking = false;
    if (keypad.up) {
      y -= d * speed;
      up = true;
      walking = true;
    }
    if (keypad.right) {
      x += d * speed;
      walking = true;
      flip = false;
    }
    if (keypad.down) {
      y += d * speed;
      walking = true;
    }
    if (keypad.left) {
      x -= d * speed;
      flip = true;
      walking = true;
    }

    if (up) {
      texture.frame = frames.up;
    } else if (walking) {
      i += 0.1;
      texture.frame = frames.walk[Math.floor(i) % frames.walk.length];
    }
    if (x < -8) {
      x = 128 + 8;
    }
    if (x > 128 + 8) {
      x = -8;
    }
    if (y < -8) {
      y = 128 + 8;
    }
    if (y > 128 + 8) {
      y = -8;
    }
    bounds = sprite.getBounds();
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

<Joystick bind:keypad />
