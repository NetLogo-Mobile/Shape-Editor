<!--
This component provides the functionality of a drawable canvas where shapes can be added, moved, and manipulated. 
Different drawing tools can be selected, including the selection tool, which allows selecting and manipulating existing shapes. 

@component
@param name The name of the shape. Should be bound.
@param currentTool The current drawing tool. Should be bound.
@param currentColor The current drawing color. Should be bound.
@param editableColorIndex The editable color index. Should be bound.
@param rotate A flag indicating whether shapes should be rotatable. Should be bound.
@param currentShape The current shape being drawn or manipulated. Should be bound.
@param shapes The array of shapes on the canvas. Should be bound.

@remarks
The `importShape` and `reset` functions should be bound to the editor.
-->

<script lang="ts">
  import EditHandle from './EditHandle.svelte';
  import SvgShape from './SVGShape.svelte';
  import { JSONElementType, type JSONShape } from './json';
  import { fromJSON, type Shape } from './shape';
  import { Tool, toolToFilled, toolToType } from './tool';
  import { posToCoords, type R2 } from './coords';

  const DEFAULT_COLOR = '#FFFFFF';

  /** The name of the shape. */
  export let name: string = 'default';
  /** The current tool being used. */
  export let currentTool: Tool = Tool.SELECT;
  /** The current drawing color. */
  export let currentColor: string = DEFAULT_COLOR;
  /** The editable color index. */
  export let editableColorIndex: number = 0;
  /** Whether shapes should be rotatable. */
  export let rotate: boolean = true;
  /** The current shape being drawn or manipulated. */
  export let currentShape: Shape | null = null;
  /** The array of shapes on the canvas. */
  export let shapes: Shape[] = [];

  /** The canvas element. */
  let canvas: Element;

  /** The edit handles. */
  let handles: EditHandle[] = [];
  /** Whether the edit handles are grabbed. */
  let handlesGrabbed: boolean[] = [];
  /** Whether the shape is grabbed. */
  let grabbingShape: boolean = false;
  /** The grabbed position. */
  let grabPos: R2;
  /** Whether the handle is grabbed. */
  $: grabbingHandle = handlesGrabbed.includes(true);
  /** The current cursor. */
  $: cursor =
    currentTool !== Tool.SELECT
      ? 'crosshair'
      : grabbingHandle
      ? 'grabbed'
      : grabbingShape
      ? 'move'
      : 'default';

  /**
   * Handles a mouse movement event.
   * @param event The mouse movement event.
   *
   * @remarks
   * Since the mouse movement is often fast enough that it will move outside of certain elements, we must handle mouse movements in the canvas.
   * This includes the edit handles and the shapes themselves.
   */
  function handleMove(event: MouseEvent) {
    if (!currentShape) {
      return;
    }

    const coords = posToCoords(canvas, {
      x: event.clientX,
      y: event.clientY,
    });

    if (currentTool !== Tool.SELECT) {
      currentShape.points[currentShape.points.length - 1] = coords;
    } else {
      // we need to handle movement in the canvas because the mouse is too fast
      if (grabbingShape && !grabbingHandle) {
        currentShape.points = currentShape.points.map((coord) => {
          return {
            x: coord.x + coords.x - grabPos.x,
            y: coord.y + coords.y - grabPos.y,
          };
        });

        grabPos = coords;
      }

      for (let i = 0; i < handles.length; i++) {
        if (handlesGrabbed[i]) {
          currentShape.points[i] = coords;
        }
      }
    }

    shapes = shapes;
  }

  /**
   * Handles a mouse release event.
   * @param event The mouse release event.
   */
  function handleRelease(event: MouseEvent) {
    let coords = posToCoords(canvas, {
      x: event.clientX,
      y: event.clientY,
    });
    grabbingShape = false;

    if (!currentShape) {
      return;
    }

    if (
      coords.x == currentShape.points[0].x &&
      coords.y == currentShape.points[0].y
    ) {
      return;
    }

    if (toolToType(currentTool) == JSONElementType.POLYGON) {
      return;
    }

    if (currentTool === Tool.SELECT) {
      return;
    }

    handleClick(event);
  }

  /**
   * Handles a mouse click event.
   * @param event The mouse click event.
   */
  function handleClick(event: MouseEvent) {
    if (currentTool === Tool.SELECT && event.target === canvas) {
      currentShape = null;
    }

    let coords = posToCoords(canvas, {
      x: event.clientX,
      y: event.clientY,
    });

    if (currentTool !== Tool.SELECT) {
      if (!currentShape) {
        currentShape = {
          points: [coords, coords],
          color: currentColor,
          type: toolToType(currentTool)!,
          filled: toolToFilled(currentTool),
        };
      } else {
        currentShape.points[currentShape.points.length - 1] = coords;
        if (
          currentShape.points.length == 2 &&
          toolToType(currentTool) != JSONElementType.POLYGON
        ) {
          shapes.push(currentShape);
          currentShape = null;
        } else {
          const lastLastCoord = currentShape.points.at(-2)!;
          const lastCoord = coords;

          if (
            lastCoord.x == lastLastCoord.x &&
            lastCoord.y == lastLastCoord.y
          ) {
            currentShape.points.pop();
            shapes.push(currentShape);
            currentShape = null;
          } else {
            currentShape.points.push(coords);
          }
        }
      }
    } else {
      grabbingShape = true;
      grabPos = coords;
    }
  }

  /**
   * Imports a shape into the canvas.
   * @param shape The shape to import.
   */
  export function importShape(shape: JSONShape) {
    name = shape.name;
    editableColorIndex = shape.editableColorIndex;
    rotate = shape.rotate;

    const elements = shape.elements;
    for (var element of elements) {
      const shape = fromJSON(element);
      shapes.push(shape);
    }

    shapes = shapes;
  }

  /**
   * Resets the canvas.
   */
  export function reset() {
    name = 'default';
    currentTool = Tool.SELECT;
    currentColor = DEFAULT_COLOR;
    editableColorIndex = 0;
    rotate = true;

    shapes = [];
    currentShape = null;
  }
</script>

<style>
  #canvas {
    background-color: darkslategray;
  }
</style>

<svg
  on:mousemove={handleMove}
  on:mousedown={handleClick}
  on:mouseup={handleRelease}
  bind:this={canvas}
  id="canvas"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 300 300"
  {cursor}
>
  <g id="grid" stroke="rgba(255, 255, 255, 0.1)" stroke-width="0.5">
    {#each { length: 11 } as _, i}
      <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
    {/each}

    {#each { length: 11 } as _, i}
      <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
    {/each}
  </g>
  <g id="shape">
    {#each shapes as shape}
      <SvgShape bind:shape bind:currentShape bind:currentTool />
    {/each}
    <!-- if the current shape isn't in the shape stack -->
    {#if currentShape != null && currentTool != Tool.SELECT}
      <SvgShape bind:shape={currentShape} bind:currentShape bind:currentTool />
    {/if}
  </g>
  <g id="handles" fill="white" stroke="black" stroke-width="1">
    {#if currentShape != null && currentTool === Tool.SELECT}
      {#each currentShape.points as _, i}
        <EditHandle
          bind:this={handles[i]}
          bind:grabbed={handlesGrabbed[i]}
          bind:canvas
          bind:shape={currentShape}
          index={i}
        />
      {/each}
    {/if}
  </g>
  <slot />
</svg>
