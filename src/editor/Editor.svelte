<script lang="ts">
  import ToolButton from './ToolButton.svelte';
  import { Tool } from './tool';
  import Canvas from './Canvas.svelte';
  import { JSONShape } from './json_shape';

  let name: string = 'default';
  let current_tool: Tool = Tool.Select;
  let current_color: Color = '#FFFFFF';
  let editable_color_index: number = 0;
  let rotate: boolean = true;

  let canvasImport: (shape: JSONShape) => void;
  let canvasReset: () => void;

  export const open = () => {
    const dialog: HTMLDialogElement = document.querySelector('#editor')!;
    dialog.showModal();
  };

  export const openWithJSON = (input: string) => {
    canvasImport(JSON.parse(input));
    const dialog: HTMLDialogElement = document.querySelector('#editor')!;
    dialog.showModal();
  };

  const close = () => {
    canvasReset();
    const dialog: HTMLDialogElement = document.querySelector('#editor')!;
    dialog.close();
  };
</script>

<dialog id="editor">
  <h1 contenteditable="true" bind:textContent={name}>{name}</h1>
  <button on:click={close}>Close</button>
  <ToolButton bind:current_tool button_tool={Tool.Select}>Select</ToolButton>
  <ToolButton bind:current_tool button_tool={Tool.DrawRectangle}
    >Rectangle</ToolButton
  >
  <ToolButton bind:current_tool button_tool={Tool.DrawCircle}>Circle</ToolButton
  >
  <ToolButton bind:current_tool button_tool={Tool.DrawPolygon}
    >Polygon</ToolButton
  >
  <ToolButton bind:current_tool button_tool={Tool.DrawLine}>Line</ToolButton>
  <ToolButton bind:current_tool button_tool={Tool.DrawFilledRectangle}
    >Filled Rectangle</ToolButton
  >
  <ToolButton bind:current_tool button_tool={Tool.DrawFilledCircle}
    >Filled Circle</ToolButton
  >
  <ToolButton bind:current_tool button_tool={Tool.DrawFilledPolygon}
    >Filled Polygon</ToolButton
  >
  <Canvas
    bind:current_tool
    bind:current_color
    bind:editable_color_index
    bind:name
    bind:rotate
    bind:importShape={canvasImport}
    bind:reset={canvasReset}
  />
</dialog>
