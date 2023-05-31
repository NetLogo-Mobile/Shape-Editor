<script lang="ts">
  import { Tool } from './tool';

  export let current_tool: Tool = Tool.Select;
  export let button_tool: Tool = Tool.Select;

  const mutate_tool = () => {
    console.log(current_tool);
    current_tool = button_tool;
    console.log(current_tool);
  };
</script>

<button on:click={mutate_tool}>
  <slot />
</button>
