<script lang="ts">
  import { Joystick, Direction } from "pixi-virtual-joystick";
  import { Container, Sprite } from "pixi.js";
  import { getContext, onMount } from "svelte";
  import fallback, { Keypad } from "./keypad";

  const idle = { up: false, right: false, down: false, left: false };
  const directions: Record<Direction, Keypad> = {
    top: { up: true, right: false, down: false, left: false },
    right: { up: false, right: true, down: false, left: false },
    top_right: { up: true, right: true, down: false, left: false },
    bottom: { up: false, right: false, down: true, left: false },
    bottom_left: { up: false, right: false, down: true, left: true },
    bottom_right: { up: false, right: true, down: true, left: false },
    left: { up: false, right: false, down: false, left: true },
    top_left: { up: true, right: false, down: false, left: true },
  };
  export let keypad = idle;

  const stage = getContext<Container>("pixi/stage");

  const joystick = new Joystick({
    outer: Sprite.from("joystick.png"),
    inner: Sprite.from("joystick-handle.png"),
    outerScale: { x: 0.15, y: 0.15 },
    innerScale: { x: 0.2, y: 0.2 },

    onChange: (data) => {
      const $keypad = directions[data.direction];
      if ($keypad) {
        keypad = $keypad;
      }
    },

    onEnd: () => {
      keypad = idle;
    },
  });
  joystick.position.set(20, 110);

  onMount(() => {
    let first = true;
    return fallback.subscribe(($keypad) => {
      if (first) {
        first = false;
      }
      keypad = $keypad;
      if (!first) {
        stage.removeChild(joystick);
      }
    });
  });

  onMount(() => {
    stage.addChild(joystick);
    return () => {
      stage.removeChild(joystick);
    };
  });
</script>
