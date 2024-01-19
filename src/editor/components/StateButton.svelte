<!--
This component allows users to apply an operation to the shape stack.

@component
@param shapes An array of shapes that will be transformed when the button is clicked. Should be bound.
@param currentShape The shape that is currently being edited. Should be bound.
@param stateChange A function which changes the figure based on the current shape.
-->
<script lang="ts">
  import type { Shape } from "../utils/geometry";

  /**
   * An operation which changes the figure based on the current shape.
   * @param currentShape The shape that is currently being edited.
   * @param shapes An array of shapes that will be transformed when the button is clicked.
   * @returns The new array of shapes.
   */
  export let stateChange: (
    currentShape: Shape,
    shapes: Shape[]
  ) => [Shape | null, Shape[]];
  /** An array of shapes that will be transformed when the button is clicked. */
  export let shapes: Shape[];
  /** The shape that is currently being edited. */
  export let currentShape: Shape | null = null;
  /** A function to update the state. */
  export let pushState: () => void;

  /**
   * Apply the operation to the figure.
   */
  const transformState = () => {
    pushState();
    if (currentShape !== null) {
      [currentShape, shapes] = stateChange(currentShape, shapes);
    }
  };
</script>

<button on:click={transformState}>
  <slot />
</button>

<style lang="scss">
  @import "../style/variables.scss";
  @import "../style/button.scss";

  button {
    background: $color1;
    border: 1px solid $color2;
    box-shadow: 0px 2px 3px $shadow;
    border-radius: $corner-radius;
    width: 3em;
    height: 3em;
    margin: 0.5em;
  }
</style>
