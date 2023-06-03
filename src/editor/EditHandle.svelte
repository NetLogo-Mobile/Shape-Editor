<!--
A Svelte component representing a draggable handle for an object.
It listens to mouse events for user interaction and adjusts the position of a point in the `Shape` as the user drags the handle around.

@component
@param shape - The shape that the handle is part of.
@param index - The index of the point in the shape's points array that this handle corresponds to.
@param canvas - The canvas element that the handle is being drawn on.
@param grabbed - Indicates whether the handle is currently being dragged by the user. Should be bound.
-->
<script lang="ts">
  import { R2, Shape } from "./geometry";

  /**
   * The shape that the handle is part of.
   */
  export let shape: Shape;

  /**
   * The index of the point in the shape's points array that this handle corresponds to.
   */
  export let index: number;

  /**
   * The canvas element that the handle is being drawn on.
   */
  export let canvas: Element;

  /**
   * Indicates whether the handle is currently being dragged by the user.
   */
  export let grabbed = false;

  const WIDTH = 6;

  $: x = shape.points[index].x;
  $: y = shape.points[index].y;
  $: cursor = grabbed ? "grabbing" : "grab";

  /**
   * Handles the mouse down event. Sets grabbed to true.
   * @param event - The mouse event.
   */
  function handleClick(event: MouseEvent) {
    grabbed = true;
  }

  /**
   * Handles the mouse move event. Updates the position of the shape point if the handle is being dragged.
   * @param event - The mouse event.
   */
  function handleMove(event: MouseEvent) {
    if (!grabbed) {
      return;
    }

    shape.points[index] = R2.fromMouse(canvas, event);
  }

  /**
   * Handles the mouse up event. Sets grabbed to false.
   * @param event - The mouse event.
   */
  function handleRelease(event: MouseEvent) {
    grabbed = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<rect
  on:mousedown={handleClick}
  on:mousemove={handleMove}
  on:mouseup={handleRelease}
  x={x - WIDTH / 2}
  y={y - WIDTH / 2}
  width={WIDTH}
  height={WIDTH}
  {cursor}
/>
