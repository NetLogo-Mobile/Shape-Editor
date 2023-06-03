# NLW SVG Editor

An SVG editor for NetLogo Web.

## Sample Usage

```svelte
<script lang="ts">
  import Editor from "./editor/Editor.svelte";
  import type { JSONShape } from "./editor/json";
  import item from "./NLW-Shapes.json";

  let open: (input?: JSONShape) => void;

  const openWrapper = (shape?: Object) => {
    if (!shape) {
      return () => {
        open();
      };
    }

    return () => {
      open(shape as JSONShape);
    };
  };

  function closeHook(shape: JSONShape) {
    // do something with the shape, e.g. save it somewhere
    console.log(shape);
  }
</script>

<main>
  <Editor bind:open {closeHook} />
  <div>
    <!-- open with imported shape -->
    {#each Object.entries(item) as [name, shape]}
      <button on:click={openWrapper(shape)}>{name}</button>
    {/each}
    <!-- open with blank canvas -->
    <button on:click={openWrapper()} />
  </div>
</main>
```
