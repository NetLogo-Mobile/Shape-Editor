<!--
This component represents an editor for shapes drawn on the canvas.

@component
@param open - The function to open the editor. Should be bound to a button. Takes an optional argument, the shape to edit.
@param closeHook - The hook to call when the editor is closed. Takes the JSON representation of the shape as an argument.
-->

<script lang="ts">
  import DrawButton from './DrawButton.svelte';
  import { State, Tool } from './state';
  import Canvas from './Canvas.svelte';
  import type { JSONShape } from './json';
  import TransformButton from './TransformButton.svelte';
  import { Shape, Transforms } from './geometry';
  import StateButton from './StateButton.svelte';

  /** The name of the shape. */
  let name: string = 'default';
  /** The current tool being used. */
  let currentTool: Tool = Tool.SELECT;
  /** The current drawing color. */
  let currentColor: string = '#FFFFFF';
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
    const dialog: HTMLDialogElement = document.querySelector('#editor')!;
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
    const dialog: HTMLDialogElement = document.querySelector('#editor')!;
    dialog.close();
  };
</script>

<style lang="scss">
  @import './_variables.scss';

  #editor {
    font-family: 'Lato';
    border-radius: $corner-radius;
    background: $color3;
    border: 1px solid $color5;
    box-shadow: 0px $corner-radius $corner-radius $shadow;
    font-size: 12px;
    padding: 0;
  }

  .title-bar {
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    background: $color4;
    color: $color1;
    box-shadow: 0px $corner-radius $corner-radius $shadow;
    border-radius: $corner-radius $corner-radius 0px 0px;

    * {
      display: flex;
      align-items: center;
      display: inline;
      margin: 1em;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      margin: 1em;
      padding: 0;
      width: 1em;
      height: 1em;

      svg {
        width: 100%;
        height: 100%;
        margin: 0;
      }
    }
  }

  .middle {
    display: flex;
    justify-content: space-between;
  }

  .tool {
    background: $color1;
    border: 1px solid $color2;
  }

  .tool-bar {
    @extend .tool;
    box-shadow: 0px $corner-radius $corner-radius $shadow;
    border-radius: $corner-radius;
    height: 3em;
    margin-left: 2em;
    margin-right: 2em;
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
    }
  }

  .tool-tray {
    @extend .tool;
    height: $canvas-size;
    width: 10em;
    margin: 2em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .tool-tray-left {
    @extend .tool-tray;
    border-width: 1px 1px 1px 0px;
    box-shadow: inset -2px $corner-radius $corner-radius $shadow;
    border-radius: 0px $corner-radius $corner-radius 0px;
  }

  .tool-tray-right {
    @extend .tool-tray;
    border-width: 1px 0px 1px 1px;
    box-shadow: inset 2px $corner-radius $corner-radius $shadow;
    border-radius: $corner-radius 0px 0px $corner-radius;
  }
</style>

<dialog id="editor">
  <div class="title-bar">
    <b>Shape</b>
    <div>
      <p style="margin-right: 0.25em;">Name/</p>
      <b contenteditable="true" style="margin-left: 0;" bind:textContent={name}
        >{name}</b
      >
    </div>
    <button on:click={close}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 8 8"
        width="100%"
        height="100%"
      >
        <line x1="0" y1="0" x2="8" y2="8" stroke="white" />
        <line x1="0" y1="8" x2="8" y2="0" stroke="white" />
      </svg>
    </button>
  </div>

  <br />

  <div class="tool-bar">
    <div>
      <DrawButton bind:currentShape bind:currentTool tool={Tool.SELECT}
        >S</DrawButton
      >
      <DrawButton bind:currentShape bind:currentTool tool={Tool.LINE}
        >L</DrawButton
      >
      <DrawButton bind:currentShape bind:currentTool tool={Tool.RECTANGLE}
        >R</DrawButton
      >
      <DrawButton
        bind:currentShape
        bind:currentTool
        tool={Tool.FILLED_RECTANGLE}>FR</DrawButton
      >
      <DrawButton bind:currentShape bind:currentTool tool={Tool.CIRCLE}
        >C</DrawButton
      >
      <DrawButton bind:currentShape bind:currentTool tool={Tool.FILLED_CIRCLE}
        >FC</DrawButton
      >
      <DrawButton bind:currentShape bind:currentTool tool={Tool.POLYGON}
        >P</DrawButton
      >
      <DrawButton bind:currentShape bind:currentTool tool={Tool.FILLED_POLYGON}
        >FP</DrawButton
      >
    </div>
    <div style="align-items: center;">
      <input type="color" bind:value={currentColor} />
    </div>
    <div>
      <TransformButton
        bind:currentShape
        bind:shapes
        transformation={Transforms.rotateCCW}>CCW</TransformButton
      >
      <TransformButton
        bind:currentShape
        bind:shapes
        transformation={Transforms.rotateCW}>CW</TransformButton
      >
      <TransformButton
        bind:currentShape
        bind:shapes
        transformation={Transforms.flipHorizontal}>H</TransformButton
      >
      <TransformButton
        bind:currentShape
        bind:shapes
        transformation={Transforms.flipVertical}>V</TransformButton
      >
    </div>
  </div>
  <div class="middle">
    <div class="tool-tray-left" />
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
    <div class="tool-tray-right">
      <div>
        <StateButton
          bind:currentShape
          bind:shapes
          stateChange={(a, b) => [a, b]}>Undo</StateButton
        >
        <StateButton
          bind:currentShape
          bind:shapes
          stateChange={(a, b) => [a, b]}>Redo</StateButton
        >
      </div>
      <div style="height: 3em;" />
      {#if currentShape && currentTool === Tool.SELECT}
        <StateButton bind:currentShape bind:shapes stateChange={State.remove}
          >X</StateButton
        >
        <StateButton bind:currentShape bind:shapes stateChange={State.duplicate}
          >C</StateButton
        >
        <div>
          <StateButton
            bind:currentShape
            bind:shapes
            stateChange={State.moveToTop}>^</StateButton
          >
          <StateButton
            bind:currentShape
            bind:shapes
            stateChange={State.moveToBottom}>v</StateButton
          >
        </div>
      {:else}
        <div style="height: 4.75em;" />
        Color that changes<input type="color" style="height: 3em;" disabled />
        <br />
        Rotatable <input type="checkbox" bind:checked={rotate} />
      {/if}
    </div>
  </div>
</dialog>
