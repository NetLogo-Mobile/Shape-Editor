<!--
This component represents an editor for shapes drawn on the canvas.

@component
@param open - The function to open the editor. Should be bound to a button. Takes an optional argument, the shape to edit.
@param closeHook - The hook to call when the editor is closed. Takes the JSON representation of the shape as an argument.
-->

<script lang="ts">
  import DrawButton from './components/DrawButton.svelte';
  import { History, State, Tool } from './utils/state';
  import Canvas from './components/Canvas.svelte';
  import type { JSONShape } from './utils/json';
  import TransformButton from './components/TransformButton.svelte';
  import { R2, Shape, Transforms } from './utils/geometry';
  import StateButton from './components/StateButton.svelte';
  import HistoryButton from './components/HistoryButton.svelte';


  const DEFAULT_COLOR = '#ffffff';

  /** The name of the shape. */
  let name: string = 'default';
  /** The current tool being used. */
  let currentTool: Tool = Tool.SELECT;
  /** The current drawing color. */
  let currentColor: string = DEFAULT_COLOR;
  /** The editable color index. */
  let editableColorIndex: number = 0;
  /** Whether shapes should be rotatable. */
  let rotate: boolean = true;

  /** The array of shapes on the canvas. */
  let shapes: Shape[] = [];
  /** The current shape being drawn or manipulated. */
  let currentShape: Shape | null = null;
  /** The list of previous states. */
  let undoStack: Shape[][] = [];
  /** The list of undone states. */
  let redoStack: Shape[][] = [];

  /** Whether the window is being moved. */
  let moving: boolean = false;
  /** Editor window. */
  let editor: HTMLDialogElement;
  /** Grabbed location. */
  let grabPos: R2;
  /** Title bar element. */
  let titleBar: HTMLElement;

  /**
   * Pushes the current state to the undo stack.
   * 
   * @remarks
   * Could be handled more efficiently by only pushing the difference.
   */
  const pushState = () => {
    const state = structuredClone(shapes);
    if (JSON.stringify(state) != JSON.stringify(undoStack.at(-1))) {
      undoStack.push(state);
      redoStack = [];
    }
  };

  /**
   * Resets the editor.
   */
  const resetShape = () => {
    name = 'default';
    currentTool = Tool.SELECT;
    currentColor = DEFAULT_COLOR;
    editableColorIndex = 0;
    rotate = true;

    shapes = [];
    currentShape = null;
    undoStack = [];
    redoStack = [];
  }

  /**
   * Imports a shape into the editor.
   * @param shape The shape to import.
   */
  const importShape = (shape: JSONShape) => {
    name = shape.name;
    editableColorIndex = shape.editableColorIndex;
    rotate = shape.rotate;

    for (var element of shape.elements) {
      shapes.push(Shape.fromJSON(element));
    }

    shapes = shapes;
  }

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
      importShape(input as JSONShape);
    }
    editor.showModal();
  };

  /**
   * Saves the shapes.
   */
  const toJSONShape: () => JSONShape = () => {
    return {
      name: name,
      elements: shapes.map((shape) => Shape.toJSON(shape)),
      editableColorIndex: editableColorIndex,
      rotate: rotate,
    };
  };

  /**
   * Closes the editor dialog.
   */
  const close = () => {
    closeHook(toJSONShape());
    resetShape();
    editor.close();
  };

  /**
   * Handles clicking the title bar.
   * @param event The mouse event.
   */
  function handleTitleBarClick(event: MouseEvent) {
    if (event.target === titleBar) {
      moving = true;
      grabPos = { x: event.clientX, y: event.clientY };
    }
  }

  /**
   * Handles releasing the title bar.
   * @param event The mouse event.
   */
  function handleTitleBarRelease(event: MouseEvent) {
    moving = false;
  }

  /**
   * Handles moving the title bar.
   * @param event The mouse event.
   */
  function handleMouseMove(event: MouseEvent) {
    if (moving) {
      editor.style.left = `${editor.offsetLeft + event.clientX - grabPos.x}px`;
      editor.style.top = `${editor.offsetTop + event.clientY - grabPos.y}px`;
      grabPos = { x: event.clientX, y: event.clientY };
    }
  }
</script>

<style lang="scss">
  @import './style/variables.scss';

  .editor {
    font-family: 'Lato';
    border-radius: $corner-radius;
    background: $color3;
    border: 1px solid $color5;
    box-shadow: 0px $corner-radius $corner-radius $shadow;
    font-size: 12px;
    padding: 0;
    margin: 0;
    position: absolute;
    left: 3em;
    top: 3em;
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

  .icon {
    width: 1.5em;
    height: 1.5em;
    margin: 0;
    align-self: center;

    * {
      stroke: $color6;
      fill: $color6;
      stroke-linejoin: round;
      stroke-linecap: round;
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

    div {
      display: flex;
      flex-direction: row;
    }
  }
</style>

<dialog bind:this={editor} on:mousemove={handleMouseMove} class="editor">
  <div
    bind:this={titleBar}
    on:mousedown={handleTitleBarClick}
    on:mouseup={handleTitleBarRelease}
    class="title-bar"
  >
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
        viewBox="0 0 16 16"
        width="100%"
        height="100%"
      >
        <line
          x1="1"
          y1="1"
          x2="15"
          y2="15"
          stroke="white"
          stroke-linecap="round"
          stroke-width="2"
        />
        <line
          x1="1"
          y1="15"
          x2="15"
          y2="1"
          stroke="white"
          stroke-linecap="round"
          stroke-width="2"
        />
      </svg>
    </button>
  </div>

  <br />

  <div class="tool-bar">
    <div>
      <DrawButton bind:currentShape bind:currentTool tool={Tool.SELECT}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="icon"
        >
          <polygon points="4,15 8,10 14,10 4,1" />
        </svg>
      </DrawButton>
      <DrawButton bind:currentShape bind:currentTool tool={Tool.LINE}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="icon"
        >
          <line x1="1" y1="1" x2="15" y2="15" />
        </svg>
      </DrawButton>
      <DrawButton bind:currentShape bind:currentTool tool={Tool.RECTANGLE}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="icon"
        >
          <rect
            x="1"
            y="1"
            rx="1"
            ry="1"
            width="14"
            height="14"
            fill-opacity="0"
          />
        </svg>
      </DrawButton>
      <DrawButton
        bind:currentShape
        bind:currentTool
        tool={Tool.FILLED_RECTANGLE}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="icon"
        >
          <rect x="1" y="1" rx="1" ry="1" width="14" height="14" />
        </svg>
      </DrawButton>
      <DrawButton bind:currentShape bind:currentTool tool={Tool.CIRCLE}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="icon"
        >
          <circle cx="8" cy="8" r="7" fill-opacity="0" />
        </svg>
      </DrawButton>
      <DrawButton bind:currentShape bind:currentTool tool={Tool.FILLED_CIRCLE}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="icon"
        >
          <circle cx="8" cy="8" r="7" />
        </svg></DrawButton
      >
      <DrawButton bind:currentShape bind:currentTool tool={Tool.POLYGON}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="icon"
        >
          <polygon
            points="1,8 4.5,14.0622 11.5,14.0622 15,8 11.5,1.9378 4.5,1.9378"
            fill-opacity="0"
          />
        </svg>
      </DrawButton>
      <DrawButton bind:currentShape bind:currentTool tool={Tool.FILLED_POLYGON}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="icon"
        >
          <polygon
            points="1,8 4.5,14.0622 11.5,14.0622 15,8 11.5,1.9378 4.5,1.9378"
          />
        </svg>
      </DrawButton>
    </div>
    <div style="align-items: center;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon"
        ><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
          d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
        /></svg
      >
      <div style="width: 0.5em;" />
      <input type="color" bind:value={currentColor} />
    </div>
    <div>
      <TransformButton
        bind:currentShape
        bind:shapes
        transformation={Transforms.rotateCCW}
        {pushState}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="icon"
        >
          <defs>
            <mask id="ccw-mask">
              <rect
                x="0"
                y="0"
                width="16"
                height="16"
                style="fill:white;"
                stroke-opacity="0"
              />
              <polygon
                points="0,0 0,16 8,8"
                style="fill: black;"
                stroke-opacity="0"
              />
            </mask>
          </defs>

          <circle cx="8" cy="8" r="7" fill-opacity="0" mask="url(#ccw-mask)" />
          <polygon points="5,5 1,5 1,1" />
        </svg>
      </TransformButton>
      <TransformButton
        bind:currentShape
        bind:shapes
        transformation={Transforms.rotateCW}
        {pushState}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="icon"
        >
          <defs>
            <mask id="cw-mask">
              <rect
                x="0"
                y="0"
                width="16"
                height="16"
                style="fill:white;"
                stroke-opacity="0"
              />
              <polygon
                points="16,0 16,16 8,8"
                style="fill: black;"
                stroke-opacity="0"
              />
            </mask>
          </defs>

          <circle cx="8" cy="8" r="7" fill-opacity="0" mask="url(#cw-mask)" />
          <polygon points="11,5 15,5 15,1" />
        </svg>
      </TransformButton>
      <TransformButton
        bind:currentShape
        bind:shapes
        transformation={Transforms.flipHorizontal}
        {pushState}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="icon"
        >
          <rect y="3" x="1" width="5" height="10" rx="1" ry="1" />
          <line y1="1" x1="8" y2="15" x2="8" />
          <rect
            y="3"
            x="10"
            width="5"
            height="10"
            rx="1"
            ry="1"
            fill-opacity="0"
          />
        </svg></TransformButton
      >
      <TransformButton
        bind:currentShape
        bind:shapes
        transformation={Transforms.flipVertical}
        {pushState}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="icon"
        >
          <rect x="3" y="1" width="10" height="5" rx="1" ry="1" />
          <line x1="1" y1="8" x2="15" y2="8" />
          <rect
            x="3"
            y="10"
            width="10"
            height="5"
            rx="1"
            ry="1"
            fill-opacity="0"
          />
        </svg>
      </TransformButton>
    </div>
  </div>
  <div class="middle">
    <div class="tool-tray-left" />
    <Canvas
      bind:currentTool
      bind:currentColor
      bind:shapes
      bind:currentShape
      {pushState}
    />
    <div class="tool-tray-right">
      <div>
        <HistoryButton
          bind:undoStack
          bind:redoStack
          bind:shapes
          bind:currentShape
          historyChange={History.undo}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            class="icon"
          >
            <defs>
              <mask id="undo-mask">
                <rect
                  x="1"
                  y="1"
                  width="15"
                  height="15"
                  style="fill: white;"
                  stroke-opacity="0"
                />
              </mask>
            </defs>

            <rect
              x="-8"
              y="8"
              width="23"
              height="23"
              rx="2"
              ry="2"
              fill-opacity="0"
              mask="url(#undo-mask)"
            />
            <polygon points="4,5 1,8 4,11" />
          </svg>
        </HistoryButton>
        <HistoryButton
          bind:undoStack
          bind:redoStack
          bind:shapes
          bind:currentShape
          historyChange={History.redo}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            class="icon"
          >
            <defs>
              <mask id="redo-mask">
                <rect
                  x="0"
                  y="1"
                  width="15"
                  height="15"
                  style="fill: white;"
                  stroke-opacity="0"
                />
              </mask>
            </defs>

            <rect
              x="1"
              y="8"
              width="23"
              height="23"
              rx="2"
              ry="2"
              fill-opacity="0"
              mask="url(#redo-mask)"
            />
            <polygon points="12,5 15,8 12,11" />
          </svg></HistoryButton
        >
      </div>
      <div style="height: 3em;" />
      {#if currentShape && currentTool === Tool.SELECT}
        <StateButton bind:currentShape bind:shapes stateChange={State.remove} {pushState}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            class="icon"
          >
            <polyline points="3,5 3,15 13,15 13,5" fill-opacity="0" />
            <line x1="6" x2="6" y1="5" y2="13" />
            <line x1="10" x2="10" y1="5" y2="13" />
            <line x1="2" x2="14" y1="3" y2="3" />
            <polyline points="5,3 5,1 11,1 11,3" fill-opacity="0" />
          </svg>
        </StateButton>
        <StateButton bind:currentShape bind:shapes stateChange={State.duplicate} {pushState}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            class="icon"
          >
            <defs>
              <mask id="copy-mask">
                <rect
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                  style="fill: white;"
                  stroke-opacity="0"
                />
                <rect
                  x="1"
                  y="1"
                  width="11"
                  height="11"
                  rx="2"
                  ry="2"
                  style="fill: black;"
                  stroke-opacity="0"
                />
              </mask>
            </defs>
            <rect
              x="4"
              y="4"
              width="11"
              height="11"
              rx="2"
              ry="2"
              fill-opacity="0"
              mask="url(#copy-mask)"
            />
            <rect
              x="1"
              y="1"
              width="11"
              height="11"
              rx="2"
              ry="2"
              fill-opacity="0"
            />
          </svg>
        </StateButton>
        <div>
          <StateButton
            bind:currentShape
            bind:shapes
            stateChange={State.moveToTop}
            {pushState}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              class="icon"
            >
              <defs>
                <mask id="top-mask">
                  <rect
                    x="0"
                    y="0"
                    width="16"
                    height="16"
                    style="fill: white;"
                    stroke-opacity="0"
                  />
                  <rect
                    x="4"
                    y="4"
                    width="8"
                    height="8"
                    rx="2"
                    ry="2"
                    style="fill: black;"
                    stroke-opacity="0"
                  />
                </mask>
              </defs>

              <rect
                x="1"
                y="1"
                width="7"
                height="7"
                rx="2"
                ry="2"
                mask="url(#top-mask)"
              />
              <rect
                x="8"
                y="8"
                width="7"
                height="7"
                rx="2"
                ry="2"
                mask="url(#top-mask)"
              />
              <rect
                x="4"
                y="4"
                width="8"
                height="8"
                rx="2"
                ry="2"
                fill-opacity="0"
              />
            </svg>
          </StateButton>
          <StateButton
            bind:currentShape
            bind:shapes
            stateChange={State.moveToBottom}
            {pushState}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              class="icon"
            >
              <rect
                x="4"
                y="4"
                width="8"
                height="8"
                rx="2"
                ry="2"
                fill-opacity="0"
              />
              <rect x="1" y="1" width="7" height="7" rx="2" ry="2" />
              <rect x="8" y="8" width="7" height="7" rx="2" ry="2" />
            </svg>
          </StateButton>
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
