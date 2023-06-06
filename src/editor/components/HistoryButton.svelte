<!--
This component allows users to apply an operation to the editor history.

@component
@param shapes The current state. Should be bound.
@param undoStack The undo stack. Should be bound.
@param redoStack The redo stack. Should be bound.
@param currentShape The shape that is currently being edited. Should be bound.
@param historyChange A function which changes the history.
-->
<script lang="ts">
  import type { Shape } from '../utils/geometry';

  /**
   * An operation which changes the figure based on the current shape.
   * @param currentShape The shape that is currently being edited.
   * @param shapes An array of shapes that will be transformed when the button is clicked.
   * @returns The new array of shapes.
   */
  export let historyChange: (
    undoStack: Shape[][],
    redoStack: Shape[][],
    shapes: Shape[],
  ) => [Shape[][], Shape[][], Shape[]];

  /** An array of current shapes. */
  export let shapes: Shape[];
  /** The undo stack. */
  export let undoStack: Shape[][] = [];
  /** The redo stack. */
  export let redoStack: Shape[][] = [];
  /** The current shape. */
  export let currentShape: Shape | null = null;

  /**
   * Apply the operation to the history.
   */
  const changeHistory = () => {
    [undoStack, redoStack, shapes] = historyChange(
      undoStack,
      redoStack,
      shapes,
    );
    currentShape = null;
  };
</script>

<style lang="scss">
  @import '../style/variables.scss';
  @import '../style/button.scss';

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

<button on:click={changeHistory}>
  <slot />
</button>
