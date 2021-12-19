import { readable } from "svelte/store";

const idle = { up: false, right: false, down: false, left: false };
export type Keypad = typeof idle;

const keypad = readable(idle, (set) => {
  const $keypad = { ...idle };
  function onKey(e: KeyboardEvent) {
    const value = e.type === "keydown";
    if (e.key === "ArrowRight") {
      $keypad.right = value;
    }
    if (e.key === "ArrowLeft") {
      $keypad.left = value;
    }
    if (e.key === "ArrowUp") {
      $keypad.up = value;
    }
    if (e.key === "ArrowDown") {
      $keypad.down = value;
    }
    set($keypad);
  }
  window.addEventListener("keydown", onKey);
  window.addEventListener("keyup", onKey);

  return () => {
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("keyup", onKey);
  };
});
export default keypad;
