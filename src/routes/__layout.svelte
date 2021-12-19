<slot />

<style lang="scss">
  :global(html) {
    height: 100%;
    background: #0e1102;
  }
  :global(body) {
    margin: 0;
    min-height: 100%;
  }
  :global(svelte-app) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
