<script>
  import { GalapagosShapeSelectorDialog } from './GalapagosShapeSelectorDialog.ts';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let ShapeSelectorDialog;
  let searchTerm;
  let currentType;
  let filteredShapes = [];
  let shapes = [];

  const shapesStore = writable([]);
  const filteredShapesStore = writable([]);

  onMount(() => {
    const updateShapes = (newShapes) => {
      shapesStore.set(newShapes);
    };

    const updateFilteredShapes = (newFilteredShapes) => {
      filteredShapesStore.set(newFilteredShapes);
    };

    ShapeSelectorDialog = new GalapagosShapeSelectorDialog(
      document.getElementById('Container'),
      updateShapes,
      updateFilteredShapes,
    );
  });

  shapesStore.subscribe((value) => {
    shapes = value;
  });

  filteredShapesStore.subscribe((value) => {
    filteredShapes = value;
  });

  // Update searchTerm, currentType, and filteredShapes when ShapeSelectorDialog changes
  $: {
    if (ShapeSelectorDialog) {
      searchTerm = ShapeSelectorDialog.searchTerm;
      currentType = ShapeSelectorDialog.currentType;
      filteredShapes = ShapeSelectorDialog.filteredShapes;
      shapes = ShapeSelectorDialog.shapes;
    }
  }
  const handleCreateShape = () => {
    // Call the createShape function on the shapeDialog instance
    ShapeSelectorDialog.createShape();
  };


  const handleDuplicateShape = (id) => {
    ShapeSelectorDialog.duplicateShape(id);
  };
</script>

<style>
  .shape-selector-dialog .shape-selector {
    box-sizing: border-box;
    position: absolute;
    width: 500px;
    height: 362px;
    left: 200px;
    top: 113.5px;
    background: #eeeff0;
    border: 1px solid #c0c0c0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }

  .shape-selector-dialog .inner-container {
    display: flex;
    flex-direction: column;
    padding: 0 25px 30px 25px;
  }
  .shape-selector-dialog .shape-selector-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    height: 36px;
    background: #5a648d;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px 5px 0px 0px;
  }

  .shape-selector-dialog .shape-selector-header h2 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 800;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 0;
  }
  .shape-selector-dialog .selector-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 2px;
  }
  .shape-selector-dialog .shape-selector-header img {
    width: 24px;
    height: 24px;
    margin: 7px 10px 0px 10px;
  }

  .shape-selector-dialog .mode-selector {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .shape-selector-dialog .turtle-button {
    width: 50px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 2px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    display: flex;
    align-items: center;
    padding-left: 0px;
    cursor: pointer;
  }
  .shape-selector-dialog .selected-button {
    color: #ffffff;
    background: #5a648d;
    border: 0.3px solid #cecece;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .shape-selector-dialog .selected-button img {
    filter: invert(100%);
  }

  .shape-selector-dialog .button-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .shape-selector-dialog .unselected-button {
    color: #000000;
    background: #e5e5e5;
    border: 0.3px solid #cecece;
  }

  .shape-selector-dialog .link-button {
    box-sizing: border-box;
    width: 44px;
    height: 20px;
    border-radius: 2px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    display: flex;
    align-items: center;
    padding-left: 0px;
    cursor: pointer;
  }
  .shape-selector-dialog .button-image-left {
    width: 10px;
    height: 10px;
    margin: 5px 4px 5px 5px;
  }

  .shape-selector-dialog .button-image-right {
    width: 15px;
    height: 15px;
    margin: 8px 4px 5px 5px;
  }

  .shape-selector-dialog .mode-selector h3 {
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

  .shape-selector-dialog .mode-selector-buttons {
    display: flex;
    margin-left: 0px;
    flex-wrap: wrap;
    gap: 10px;
  }

  .shape-selector-dialog .shape-selector-buttons {
    display: flex;
    justify-content: space-between;
  }

  .shape-selector-dialog .create-new-button {
    box-sizing: border-box;
    width: 90px;
    height: 20px;
    box-sizing: border-box;
    background: #bacff3;
    border: 0.3px solid #cecece;
    border-radius: 2px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    display: flex;
    align-items: center;
    color: #ffffff;
    text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  .shape-selector-dialog .import-shapes-button {
    width: 98px;
    height: 20px;
    box-sizing: border-box;
    background: #d9d9d9;
    border: 0.3px solid #cecece;
    border-radius: 2px;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    display: flex;
    align-items: center;

    color: #ffffff;
    text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  .shape-selector-dialog .shape-selector-buttons button {
    margin-left: 10px;
  }

  .shape-selector-dialog .shape-selector-search {
    margin-top: 5px;
    box-sizing: border-box;
    width: 450px;
    height: 28px;
    background: #ffffff;
    border: 1px solid #cecece;
    border-radius: 5px;
    position: relative;
    padding-left: 10px;
  }
  .shape-selector-dialog .shape-selector-search input {
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
    color: #9e9e9e;
    border-radius: 5px;
    background-image: url('/search-icon.png');
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 10px;
    padding-left: 20px;
  }

  .shape-selector-dialog .shape-selector-grid {
    flex: 1;
    overflow: hidden;
    background: #ffffff;
    box-shadow: inset 2px 3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px 2px 2px 5px;
    margin-top: 14px;
    padding: 14px 14px 0px 14px;
  }
  .shape-selector-dialog .shape-selector-grid-inner {
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5px;
    width: 100%;
    height: 180px;
    box-sizing: border-box;
  }

  .shape-selector-dialog .shape-selector-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
    width: 79px;
    height: 71px;
    margin: 0px;
    background: #ffffff;
    border: 0.7px solid #cecece;
    border-radius: 3px;
  }

  .shape-selector-dialog .shape-selector-item-buttons {
    position: absolute;
    z-index: 1;
    top: 3px;
    right: 2px;
    display: flex;
    flex-direction: row;
  }

  .shape-selector-dialog .duplicate-icon {
    width: 16px;
    height: 16px;
    padding: 3px;
    box-sizing: border-box;
    background: #ffffff;
    border: 0.7px solid #cecece;
    border-radius: 2px;
    padding: 2.5px;
    margin-right: 1px;
    display: inline-block;
    background-image: url('/duplicate-icon.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    background-size: 10px 10px;
    margin-bottom: 0px;
  }

  .shape-selector-dialog .delete-icon {
    z-index: 1;
    width: 16px;
    height: 16px;
    box-sizing: border-box;
    background: #ffffff;
    border: 0.7px solid #cecece;
    border-radius: 2px;
    padding: 2.5px;
    margin-right: 1px;
    display: inline-block;
    background-image: url('/delete-icon.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    background-size: 10px 10px;
    margin-bottom: 0px;
  }

  .shape-selector-dialog .shape-selector-details {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px;
  }
  .shape-selector-dialog .shape-selector-item-image-div {
    width: 40.64px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shape-selector-dialog .shape-selector-item-image {
    width: 30px;
    height: 30px;
  }

  .shape-selector-dialog .shape-selector-item-name {
    width: 64px;
    height: 9px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #7d7d7d;
    margin-top: 4px;
  }
</style>

<div class="shape-selector-dialog">
  <div class="shape-selector">
    <div class="shape-selector-header">
      <img src="header-logo.png" alt="header logo" />
      <h2>Shape Editor</h2>
    </div>
    <div class="inner-container">
      <div class="mode-selector">
        <h3>Selection Mode</h3>
        <div class="selector-buttons">
          <div class="mode-selector-buttons">
            <button
              class="turtle-button {currentType === 'turtle'
                ? 'selected-button'
                : 'unselected-button'}"
              on:click={() => ShapeSelectorDialog.filterShapes('turtle')}
              ><img
                class="button-image-left"
                src="turtle-icon.png"
                alt="turtle button"
              />Turtle</button
            >
            <button
              class="link-button {currentType === 'link'
                ? 'selected-button'
                : 'unselected-button'}"
              on:click={() => ShapeSelectorDialog.filterShapes('link')}
              ><img
                class="button-image-left"
                src="link-icon.png"
                alt="link button"
              />Link</button
            >
          </div>
          <div class="shape-selector-buttons">
            <button class="create-new-button" on:click={handleCreateShape}
              ><img
                class="button-image-right"
                src="create-new-icon.png"
                alt="create new"
              />Create New</button
            >
            <button
              class="import-shapes-button"
              on:click={ShapeSelectorDialog.importShapes}
              ><img
                class="button-image-right"
                src="import-icon.png"
                alt="import"
              />Import From...</button
            >
          </div>
        </div>
      </div>
      <div class="shape-selector-search">
        <input
          value={searchTerm}
          on:input={(event) =>
            ShapeSelectorDialog.handleSearch(event.target.value)}
          placeholder="Search"
        />
      </div>
      <div class="shape-selector-grid">
        <div class="shape-selector-grid-inner">
          {#each filteredShapes as shape (shape.id)}
            <div
              class="shape-selector-item"
              on:mouseenter={() => (shape.hover = true)}
              on:mouseleave={() => (shape.hover = false)}
              on:focus={() => (shape.hover = true)}
              on:blur={() => (shape.hover = false)}
            >
              <div class="shape-selector-item-buttons">
                <button
                  on:click={() => handleDuplicateShape(shape.id)}
                  on:keydown={(event) => {
                    if (event.key === 'Enter') handleDuplicateShape(shape.id);
                  }}
                  aria-label="Duplicate shape"
                  class="duplicate-icon"
                  style="display: {shape.hover ? 'block' : 'none'};"
                />
                <!-- Add closing tag for the button -->
                <button
                  on:click={() => ShapeSelectorDialog.deleteShape(shape.id)}
                  on:keydown={(event) => {
                    if (event.key === 'Enter')
                      ShapeSelectorDialog.deleteShape(shape.id);
                  }}
                  aria-label="Delete shape"
                  class="delete-icon {shape.deletable ? '' : 'button-disabled'}"
                  style="display: {shape.hover ? 'block' : 'none'};"
                  disabled={!shape.deletable}
                />
                <!-- Add closing tag for the button -->
              </div>
              <div class="shape-selector-details">
                <div class="shape-selector-item-image-div">
                  <img
                    class="shape-selector-item-image"
                    src={shape.image}
                    alt=""
                  />
                </div>
                <div class="shape-selector-item-name">{shape.name}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
