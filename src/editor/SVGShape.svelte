<!--
This component is a Svelte component that allows for the dynamic rendering of various shapes, such as a circle, line, polygon, and rectangle.
It uses SVG elements to draw these shapes.
It also changes the cursor style based on the current selected tool and shape.

@component
@param shape The shape to be drawn.
@param currentShape The current shape being drawn or manipulated.
@param currentTool The current drawing tool being used.
-->
<script lang="ts">
  import { R2, Shape } from './geometry';
  import { Tool } from './state';

  /** The shape to be drawn. */
  export let shape: Shape;
  /** The SVG element that represents the shape. */
  let svg: SVGElement;

  /** The current shape being drawn or manipulated. */
  export let currentShape: Shape | null = null;
  /** The current drawing tool being used. */
  export let currentTool: Tool = Tool.SELECT;

  /** The stroke width of the SVG */
  $: strokeWidth = shape.filled ? 0 : 2;
  /** The fill color of the SVG */
  $: fill = shape.filled ? shape.color : 'none';
  /** The stroke color of the SVG */
  $: strokeColor = shape.filled ? 'none' : shape.color;
  /** The cursor style of the SVG */
  $: cursor =
    currentTool !== Tool.SELECT
      ? 'crosshair'
      : currentShape === shape
      ? 'move'
      : 'pointer';

  /**
   * If the current tool is the selection tool, the current shape is set to this shape.
   * @param event The click event.
   */
  function handleClick(event: MouseEvent) {
    if (currentTool !== Tool.SELECT) {
      return;
    }
    currentShape = shape;
  }
</script>

<!-- repetitive because TypeScript doesn't like stuff like this :( -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if shape.type === Shape.Type.CIRCLE}
  <circle
    bind:this={svg}
    on:mousedown={handleClick}
    stroke-width={strokeWidth}
    stroke={strokeColor}
    {fill}
    cx={shape.points[0].x}
    cy={shape.points[0].y}
    r={R2.l2(shape.points[0], shape.points[1])}
    {cursor}
  />
{:else if shape.type === Shape.Type.LINE}
  <line
    bind:this={svg}
    on:mousedown={handleClick}
    stroke-width={strokeWidth}
    stroke={strokeColor}
    {fill}
    x1={shape.points[0].x}
    y1={shape.points[0].y}
    x2={shape.points[1].x}
    y2={shape.points[1].y}
    {cursor}
  />
{:else if shape.type === Shape.Type.POLYGON}
  <polygon
    bind:this={svg}
    on:mousedown={handleClick}
    stroke-width={strokeWidth}
    stroke={strokeColor}
    {fill}
    points={shape.points.map((coord) => `${coord.x},${coord.y}`).join(' ')}
    {cursor}
  />
{:else if shape.type === Shape.Type.RECTANGLE}
  <rect
    bind:this={svg}
    on:mousedown={handleClick}
    stroke-width={strokeWidth}
    stroke={strokeColor}
    {fill}
    x={Math.min(shape.points[0].x, shape.points[1].x)}
    y={Math.min(shape.points[0].y, shape.points[1].y)}
    width={Math.abs(shape.points[1].x - shape.points[0].x)}
    height={Math.abs(shape.points[1].y - shape.points[0].y)}
    {cursor}
  />
{/if}
