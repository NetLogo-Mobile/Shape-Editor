<script>
  let shapes = [
    { id: 1, name: 'Circle' },
    { id: 2, name: 'Square' },
    { id: 3, name: 'Triangle' },
    { id: 4, name: 'Rectangle' },
    { id: 5, name: 'Star' },
    { id: 6, name: 'Heart' },
    { id: 7, name: 'Diamond' },
    { id: 8, name: 'Pentagon' },
    { id: 9, name: 'Hexagon' },
    { id: 10, name: 'Octagon' }
  ];

  let searchTerm = '';

  function createShape() {
    // Code to create a new shape
  }

  function importShapes() {
    // Code to import shapes from a file
  }

  function duplicateShape(id) {
    // Code to duplicate a shape with given id
  }

  function deleteShape(id) {
    // Code to delete a shape with given id
  }
</script>

<div class="shape-selector">
  <div class="shape-selector-header">
    <h2>Shape Editor</h2>
    <div class="shape-selector-buttons">
      <button on:click={createShape}>Create New</button>
      <button on:click={importShapes}>Import From</button>
    </div>
  </div>
  <div class="shape-selector-search">
    <input bind:value={searchTerm} placeholder="Search by name" />
  </div>
  <div class="shape-selector-grid">
    <div class="shape-selector-grid-inner">
      {#each shapes.filter(shape => shape.name.toLowerCase().includes(searchTerm.toLowerCase())) as shape}
        <div class="shape-selector-item" on:mouseover={() => shape.hover = true} on:mouseout={() => shape.hover = false} on:focus={() => shape.hover = true} on:blur={() => shape.hover = false}>
          {#if shape.hover}
          <div class="shape-selector-item-buttons">
            <span 
              on:click={() => deleteShape(shape.id)}
              on:keydown={(event) => {if(event.key === 'Enter') deleteShape(shape.id);}}
              role="button" 
              tabindex="0"
              aria-label="Delete shape"
              class="material-icons"
            >
              delete
            </span>
            <span 
              on:click={() => duplicateShape(shape.id)}
              on:keydown={(event) => {if(event.key === 'Enter') duplicateShape(shape.id);}}
              role="button" 
              tabindex="0"
              aria-label="Duplicate shape"
              class="material-icons"
            >
              file_copy
            </span>
          </div>

          {/if}
          <div class="shape-selector-item-name">{shape.name}</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .shape-selector {
    width: 500px;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  
  .shape-selector-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .shape-selector-buttons button {
    margin-left: 10px;
  }
  
  .shape-selector-search {
    margin-bottom: 10px;
  }
  
  .shape-selector-grid {
    flex: 1;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
  }
  
  .shape-selector-item {
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-weight: bold
  }
  </style>