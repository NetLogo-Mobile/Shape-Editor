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
    { id: 10, name: 'Octagon' },
    { id: 11, name: 'Circle' },
    { id: 12, name: 'Square' },
    { id: 13, name: 'Triangle' },
    { id: 14, name: 'Rectangle' },
    { id: 15, name: 'Star' },
    { id: 16, name: 'Heart' },
    { id: 17, name: 'Diamond' },
    { id: 18, name: 'Pentagon' },
    { id: 19, name: 'Hexagon' },
    { id: 20, name: 'Octagon' },
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
    <img src='header-logo.png' alt="header logo"/>
    <h2>Shape Editor</h2>
  </div>
  <div class="inner-container">
    <div class="mode-selector">
      <h3>Selection Mode</h3>
      <div class="selector-buttons">
        <div class="mode-selector-buttons">
          <button class="turtle-button" on:click={() => console.log('turtle')}><img src="turtle.png" alt="turtle button"/>Turtle</button>
          <button class="link-button" on:click={() => console.log('link')}><img src="link.png" alt="link button"/>Link</button>
        </div>
        <div class="shape-selector-buttons">
          <button class="create-new-button" on:click={createShape}>Create New</button>
          <button class="import-shapes-button" on:click={importShapes}>Import From...</button>
        </div>
      </div>
    </div>
    <div class="shape-selector-search">
      <input bind:value={searchTerm} placeholder="Search" />
    </div>
    <div class="shape-selector-grid">
      <div class="shape-selector-grid-inner">
        {#each shapes.filter((shape) => shape.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) as shape}
          <div
            class="shape-selector-item"
            on:mouseover={() => (shape.hover = true)}
            on:mouseout={() => (shape.hover = false)}
            on:focus={() => (shape.hover = true)}
            on:blur={() => (shape.hover = false)}
          >
            {#if shape.hover}
              <div class="shape-selector-item-buttons">
                <span
                  on:click={() => deleteShape(shape.id)}
                  on:keydown={(event) => {
                    if (event.key === 'Enter') deleteShape(shape.id);
                  }}
                  role="button"
                  tabindex="0"
                  aria-label="Delete shape"
                  class="material-icons"
                >
                  delete
                </span>
                <span
                  on:click={() => duplicateShape(shape.id)}
                  on:keydown={(event) => {
                    if (event.key === 'Enter') duplicateShape(shape.id);
                  }}
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
</div>

<style>
  .shape-selector {
    box-sizing: border-box;
    position: absolute;
    width: 500px;
    height: 362px;
    left: 200px;
    top: 113.5px;
    background: #EEEFF0;
    border: 1px solid #C0C0C0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    /* display: flex;
    flex-direction: column; */
  }

  .inner-container{
    display: flex;
    flex-direction: column;
    padding: 0 25px 30px 25px;
  }
  .shape-selector-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    height: 36px;
    background: #5A648D;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px 5px 0px 0px;
  }

  .shape-selector-header h2{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 800;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 0;
  }
  .selector-buttons{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 2px;
  }
  .shape-selector-header img {
    width: 24px;
    height: 24px;
    margin: 7px 10px 0px 10px;
  }

  .mode-selector {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .turtle-button {
    width: 50px;
    height: 20px;
    box-sizing: border-box;
    background: #5A648D;
    border: 0.3px solid #CECECE;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    padding-left: 0px;
  }

  .turtle-button img {
    width: 20px;
    height: 20px;
    margin: 13px 0px 5px 0px;
  }

  .link-button{
    box-sizing: border-box;
    width: 44px;
    height: 20px;
    background: #E5E5E5;
    border: 0.3px solid #CECECE;
    border-radius: 2px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    display: flex;
    align-items: center;
    color: #000000;
  }
  .link-button img {
    width: 11px;
    height: 11px;
    margin: 6px 4px 5px 0px;
  }

  .mode-selector h3{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: center;
    color: #000000;
    margin: 0;
  }

  .mode-selector-buttons {
    display: flex;
    margin-left: 0px;
    flex-wrap: wrap;
    gap: 10px;
  }

.shape-selector-buttons {
  display: flex;
  justify-content: space-between;
}

  .create-new-button {
    box-sizing: border-box;
    width: 90px;
    height: 20px;
    box-sizing: border-box;
    background: #BACFF3;
    border: 0.3px solid #CECECE;
    border-radius: 2px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    display: flex;
    align-items: center;

    color: #FFFFFF;

    text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  }
  
  .import-shapes-button {
    width: 98px;
    height: 20px;
    box-sizing: border-box;
    background: #D9D9D9;
    border: 0.3px solid #CECECE;
    border-radius: 2px;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    display: flex;
    align-items: center;

    color: #FFFFFF;

  text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  }

  .shape-selector-buttons button {
    margin-left: 10px;
  }

  .shape-selector-search {
    box-sizing: border-box;
    width: 450px;
    height: 28px;
    background: #FFFFFF;
    border: 1px solid #CECECE;
    border-radius: 5px;
  }
  .shape-selector-search input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 10px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
line-height: 11px;
    display: flex;
    align-items: center;
    color: #9E9E9E;
  }

  .shape-selector-grid {
  flex: 1;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: inset 2px 3px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px 2px 2px 5px;
  margin-top: 14px;
  padding: 14px 14px 0px 14px;
}
  .shape-selector-grid-inner {
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  width: 100%;
  height: 180px;
  box-sizing: border-box;
}

  .shape-selector-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;

    width: 75px;
    height: 68px;
    background: #FFFFFF;
    border: 0.7px solid #CECECE;
    border-radius: 3px;
  }
</style>
