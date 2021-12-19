<script lang="ts">
  import { Rectangle, Texture } from "pixi.js";
  import { TilingSprite } from "svelte-pixi";

  const texture = new Texture(
    Texture.from("/sprites.png") as any,
    new Rectangle(7 * 16, 32, 16, 16)
  );
</script>

<TilingSprite {texture} x={0} y={0} width={128} height={128} />
