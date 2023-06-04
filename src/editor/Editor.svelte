<!--
This component represents an editor for shapes drawn on the canvas.

@component
@param open - The function to open the editor. Should be bound to a button. Takes an optional argument, the shape to edit.
@param closeHook - The hook to call when the editor is closed. Takes the JSON representation of the shape as an argument.
-->

<script lang="ts">
  import DrawButton from "./DrawButton.svelte";
  import { State, Tool } from "./tool";
  import Canvas from "./Canvas.svelte";
  import type { JSONShape } from "./json";
  import TransformButton from "./TransformButton.svelte";
  import { Shape, Transforms } from "./geometry";
  import StateButton from "./StateButton.svelte";

  /** The name of the shape. */
  let name: string = "default";
  /** The current tool being used. */
  let currentTool: Tool = Tool.SELECT;
  /** The current drawing color. */
  let currentColor: string = "#FFFFFF";
  /** The editable color index. */
  let editableColorIndex: number = 0;
  /** Whether shapes should be rotatable. */
  let rotate: boolean = true;

  /** The array of shapes on the canvas. */
  let shapes: Shape[] = [];
  /** The current shape being drawn or manipulated. */
  let currentShape: Shape | null = null;

  /**
   * Imports a shape from a JSON representation.
   * @param shape The shape to import.
   */
  let canvasImport: (shape: JSONShape) => void;
  /** Resets the canvas. */
  let canvasReset: () => void;
  /**
   * Hook for closing the editor.
   * @param shape The JSON representation of the shape on the canvas.
   */
  export let closeHook: (shape: JSONShape) => void;

  /**
   * Opens the editor dialog.
   * @param input The object to import.
   */
  export const open = (input?: JSONShape) => {
    if (input) {
      canvasImport(input as JSONShape);
    }
    const dialog: HTMLDialogElement = document.querySelector("#editor")!;
    dialog.showModal();
  };

  /**
   * Saves the shapes.
   */
  const toJSONShape: () => JSONShape = () => {
    return {
      name: name,
      elements: shapes.map((shape) => shape.toJSON()),
      editableColorIndex: editableColorIndex,
      rotate: rotate,
    };
  };

  /**
   * Closes the editor dialog.
   */
  const close = () => {
    closeHook(toJSONShape());
    canvasReset();
    const dialog: HTMLDialogElement = document.querySelector("#editor")!;
    dialog.close();
  };
</script>

<dialog id="editor">
  <h1 contenteditable="true" bind:textContent={name}>{name}</h1>
  <button on:click={close}>Close</button>
  Color <input type="color" bind:value={currentColor} />
  Color that changes <input type="color" />
  Rotatable <input type="checkbox" bind:checked={rotate} />
  <br />
  <StateButton bind:currentShape bind:shapes stateChange={State.remove}
    >Delete</StateButton
  >
  <StateButton bind:currentShape bind:shapes stateChange={State.moveToTop}
    >Move to Top</StateButton
  >
  <StateButton bind:currentShape bind:shapes stateChange={State.duplicate}
    >Duplicate</StateButton
  >
  <br />
  <DrawButton bind:currentShape bind:currentTool tool={Tool.SELECT}
  >Select</DrawButton
>
  <DrawButton bind:currentShape bind:currentTool tool={Tool.LINE}
    >Line</DrawButton
  >
  <DrawButton bind:currentShape bind:currentTool tool={Tool.RECTANGLE}
    >Rectangle</DrawButton
  >
  <DrawButton bind:currentShape bind:currentTool tool={Tool.CIRCLE}
    >Circle</DrawButton
  >
  <DrawButton bind:currentShape bind:currentTool tool={Tool.POLYGON}
    >Polygon</DrawButton
  >
  <br />
  <DrawButton bind:currentShape bind:currentTool tool={Tool.FILLED_RECTANGLE}
    >Filled Rectangle</DrawButton
  >
  <DrawButton bind:currentShape bind:currentTool tool={Tool.FILLED_CIRCLE}
    >Filled Circle</DrawButton
  >
  <DrawButton bind:currentShape bind:currentTool tool={Tool.FILLED_POLYGON}
    >Filled Polygon</DrawButton
  >
  <br />
  <TransformButton
    bind:currentShape
    bind:shapes
    transformation={Transforms.rotateCCW}
    >Rotate Counterclockwise</TransformButton
  >
  <TransformButton
    bind:currentShape
    bind:shapes
    transformation={Transforms.rotateCW}>Rotate Clockwise</TransformButton
  >
  <TransformButton
    bind:currentShape
    bind:shapes
    transformation={Transforms.flipHorizontal}>Flip Horizontal</TransformButton
  >
  <TransformButton
    bind:currentShape
    bind:shapes
    transformation={Transforms.flipVertical}>Flip Vertical</TransformButton
  >
  <br />
  <Canvas
    bind:currentTool
    bind:currentColor
    bind:editableColorIndex
    bind:name
    bind:rotate
    bind:shapes
    bind:currentShape
    bind:importShape={canvasImport}
    bind:reset={canvasReset}
  />
</dialog>
