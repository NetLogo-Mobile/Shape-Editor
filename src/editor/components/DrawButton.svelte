<!--
This component manages the current drawing tool.
It defines a button that, when clicked, updates the current tool to a specified tool.
If the selected tool is the selection tool, the current shape is also cleared.

@component
@param tool The tool that will be selected when the button is clicked.
@param currentShape The current shape being drawn. Should be bound.
@param currentTool The current drawing tool. Should be bound.
-->
<script lang="ts">
  import type { Shape } from '../utils/geometry';
  import { Tool } from '../utils/state';

  /** The current shape being manipulated. It is cleared when the selection tool is chosen. */
  export let currentShape: Shape | null = null;
  /** The current tool being used. */
  export let currentTool: Tool = Tool.SELECT;
  /** The tool that this button represents. When the button is clicked, the current tool becomes this tool. */
  export let tool: Tool = Tool.SELECT;

  /**
   * Updates the current tool to the tool represented by this button.
   */
  const changeTool = () => {
    if (currentTool === Tool.SELECT) {
      currentShape = null;
    }
    currentTool = tool;
  };
</script>

<style lang="scss">
  @import '../style/variables.scss';
  @import '../style/button.scss';

  button {
    border-right: $color2 1px solid;

    &:first-child {
      border-radius: $corner-radius 0 0 $corner-radius;
    }
  }
</style>

<button on:click={changeTool} class:selected={currentTool === tool}>
  <slot />
</button>
