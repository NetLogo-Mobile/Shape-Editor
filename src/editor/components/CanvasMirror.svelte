<!--
This component provides a mirror of the canvas.

@component
@param currentTool The current drawing tool. Should be bound.
@param rotate The amount of rotation to apply.
@param currentShape The current shape being drawn or manipulated. Should be bound.
@param shapes The array of shapes on the canvas. Should be bound.
-->

<script lang="ts">
  import { Shape } from "../utils/geometry";
  import { Tool } from "../utils/state";
  import SvgShape from "./SVGShape.svelte";

  /**
   * The array of shapes on the canvas.
   */
  export let shapes: Shape[];
  /**
   * The rotation to apply.
   */
  export let rotate: number = 0;
</script>

<svg
  class="canvas-mirror"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 300 300"
>
  {#each shapes as shape}
    <SvgShape bind:shape transform="translate(150 150) rotate({rotate}) translate(-150 -150)" />
  {/each}
</svg>

<style lang="scss">
  @import "../style/variables.scss";

  .canvas-mirror {
    background-color: $canvas-color;
    // border-radius: $corner-radius;
  }
</style>
