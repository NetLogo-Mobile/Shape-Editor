<script>
  import { GalapagosShapeSelectorLibrary } from './ShapeSelectorLibrary.ts';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { fade } from 'svelte/transition';

  let dialog;
  let header;
  let ShapeSelectorLibrary;
  let searchTerm;
  let currentType;
  let filteredShapes = [];
  let shapes = [];
  let selectedItemIds = [];

  export let closeLibrary;
  export let addNewShapes;

  // Create writable stores for shapes, filteredShapes, and selectedItemIds
  const shapesStore = writable([]);
  const filteredShapesStore = writable([]);
  const selectedItemIdsStore = writable([]);
  const importButtonSelectedStore = writable(false);

  // Initialize ShapeSelectorLibrary and set up update functions when the component is mounted
  onMount(() => {
    // Initialize ShapeSelectorLibraryConfig
    const ShapeSelectorLibraryConfig = {
      onUpdateShapes: (newShapes) => {
        shapesStore.set(newShapes);
      },
      onUpdateFilteredShapes: (newFilteredShapes) => {
        filteredShapesStore.set(newFilteredShapes);
      },
      onUpdateSelectedItemIds: (newSelectedItemIds) => {
        selectedItemIdsStore.set(newSelectedItemIds);
      },
      onUpdateImportButtonSelected: (newImportButtonSelected) => {
        importButtonSelectedStore.set(newImportButtonSelected);
      },
    };

    // Initialize ShapeSelectorLibrary
    ShapeSelectorLibrary = new GalapagosShapeSelectorLibrary(
      document.getElementById('Container'),
      ShapeSelectorLibraryConfig,
    );

    let isDown = false;
    let offset = [0, 0];

    header.addEventListener(
      'mousedown',
      (event) => {
        isDown = true;
        offset = [
          dialog.offsetLeft - event.clientX,
          dialog.offsetTop - event.clientY,
        ];
      },
      true,
    );

    document.addEventListener(
      'mouseup',
      () => {
        isDown = false;
      },
      true,
    );

    document.addEventListener(
      'mousemove',
      (event) => {
        event.preventDefault();
        if (isDown) {
          dialog.style.left = event.clientX + offset[0] + 'px';
          dialog.style.top = event.clientY + offset[1] + 'px';
        }
      },
      true,
    );
  });

  // Subscribe to the stores
  shapesStore.subscribe((value) => {
    shapes = value;
  });

  filteredShapesStore.subscribe((value) => {
    filteredShapes = value;
  });

  selectedItemIdsStore.subscribe((value) => {
    selectedItemIds = value;
  });

  $: {
    if (ShapeSelectorLibrary) {
      searchTerm = ShapeSelectorLibrary.searchTerm;
      currentType = ShapeSelectorLibrary.currentType;
      filteredShapes = ShapeSelectorLibrary.filteredShapes;
      shapes = ShapeSelectorLibrary.shapes;
      selectedItemIds = ShapeSelectorLibrary.selectedItemIds;
    }
  }
</script>

<style>
  .shape-selector-library-dialog {
    font-family: 'Lato';
    position: absolute;
    z-index: 3;
  }

  .shape-selector-library-dialog .shape-selector-library {
    box-sizing: border-box;
    width: 20.625rem; /* 330px / 16 */
    height: 21.03125rem; /* 336.5px / 16 */
    background: #eeeff0;
    border: 0.0625rem solid #c0c0c0; /* 1px/16 */
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25); /* 4px/16 */
    border-radius: 0.3125rem; /* 5px/16 */
  }

  .shape-selector-library-dialog .close-button {
    margin-right: 12px;
    width: 12px;
    height: 12px;
    padding: 0;
  }

  .shape-selector-library-dialog .close-button img {
    width: 100% !important;
    height: 100% !important;
    align-items: center;
    margin: 0 !important;
  }

  .shape-selector-library-dialog .shape-selector-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.625rem; /* 10px/16 */
    max-width: 100%;
    height: 2.25rem; /* 36px/16 */
    background: #7d7d7d;
    padding-left: 1.6875rem; /* 27px/16 */
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25); /* 4px/16 */
    border-radius: 0.3125rem 0.3125rem 0 0; /* 5px/16 */
  }

  .shape-selector-library-dialog .close-button {
    color: white;
    font-size: 0.75rem; /* 12px/16 */
    font-weight: bold;
    border: none;
    background: none;
    cursor: pointer;
  }

  .shape-selector-library-dialog .shape-selector-header h2 {
    font-weight: 800;
    font-size: 0.75rem; /* 12px/16 */
    color: #ffffff;
    text-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25); /* 4px/16 */
    margin: 0;
  }

  .shape-selector-library-dialog .inner-container {
    display: flex;
    flex-direction: column;
    padding: 0 1.5625rem 0 1.5625rem; /* 0 25px/16 13.5px/16 25px/16*/
  }

  .shape-selector-library-dialog .selected-button img {
    filter: invert(100%);
  }

  .shape-selector-library-dialog .shape-selector-buttons button {
    margin-left: 0 !important;
  }

  .shape-selector-library-dialog .shape-selector-search {
    margin-top: 0.3125rem; /* 5px/16 */
    box-sizing: border-box;
    width: 100%;
    height: 1.75rem; /* 28px/16 */
    background: #ffffff;
    border: 0.0625rem solid #cecece; /* 1px/16 */
    border-radius: 5px;
    position: relative;
    padding-left: 0.625rem; /* 10px/16 */
  }
  .shape-selector-library-dialog .shape-selector-search input {
    width: 80%;
    border: none;
    outline: none;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 0.5625rem; /* 9px/16 */
    line-height: 0.6875rem; /* 11px/16 */
    color: #9e9e9e;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 0.625rem; /* 10px/16 */
    padding-left: 1.25rem; /* 20px/16 */
  }

  .shape-selector-library-dialog .scrollbar-wrapper {
    width: 100%;
    height: 11.25rem; /* 180px/16 */
    overflow-x: hidden; /* Hide horizontal scroll */
    overflow-y: auto;
    padding-right: 0.875rem;
  }

  .shape-selector-library-dialog .shape-selector-grid {
    flex: 1;
    overflow: hidden;
    background: #ffffff;
    box-shadow: inset 0.125rem 0.1875rem 0.25rem rgba(0, 0, 0, 0.25); /* 2px/16, 3px/16, 4px/16 */
    border-radius: 5px 2px 2px 5px;
    margin-top: 0.875rem; /* 14px/16 */
    padding: 0.875rem 0.875rem 0 0.875rem; /* 14px/16, 14px/16, 0, 14px/16 */
  }

  .shape-selector-library-dialog .shape-selector-grid-inner {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.3125rem; /* 5px/16 */
    width: 100%;
    height: 11.25rem; /* 180px/16 */
    box-sizing: border-box;
    align-content: start;
  }

  .shape-selector-library-dialog .shape-selector-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
    width: 4.9375rem; /* 79px/16 */
    height: 4.4375rem; /* 71px/16 */
    margin: 0;
    background: #ffffff;
    border: 0.04375rem solid #cecece; /* 0.7px/16 */
    border-radius: 3px;
  }
  .shape-selector-library-dialog .selected {
    background: #7d7d7d;
    border: 0.04375rem solid #cecece; /* 0.7px/16 */
    box-shadow: inset 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25); /* 0, 4px/16, 4px/16 */
    color: #ffffff;
  }

  .shape-selector-library-dialog .font-selected {
    color: white !important;
  }

  .shape-selector-library-dialog .selected img {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg)
      brightness(100%) contrast(100%);
  }

  .shape-selector-library-dialog .shape-selector-details {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
  }

  .shape-selector-library-dialog .shape-selector-item-image-div {
    width: 2.54rem; /* 40.64px/16 */
    height: 2.625rem; /* 42px/16 */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shape-selector-library-dialog .shape-selector-item-image {
    width: 1.875rem; /* 30px/16 */
    height: 1.875rem; /* 30px/16 */
  }

  .shape-selector-library-dialog .shape-selector-item-name {
    max-width: 4rem; /* 64px/16 */
    height: 0.5625rem; /* 9px/16 */
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 0.625rem; /* 10px/16 */
    line-height: 0.75rem; /* 12px/16 */
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #7d7d7d;
    margin-top: 0.25rem; /* 4px/16 */
  }

  .shape-selector-library-dialog .import-cancel-buttons-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: /*13.5 px/16 9px/16 13.5px/16 9px/16*/ 0.84375rem 0.5625rem
      0.84375rem 0.5625rem;
  }

  .shape-selector-library-dialog .import-cancel-buttons {
    display: flex;
    flex-direction: row;
  }

  .shape-selector-library-dialog .import-cancel-buttons .import-button {
    margin-right: 0.3125rem; /* 5px/16 */
  }

  .shape-selector-library-dialog .import-cancel-buttons button {
    box-sizing: border-box;
    width: 2.75rem; /* 44px/16 */
    height: 1.3125rem; /* 21px/16 */
    background: #e5e5e5;
    border: 0.7px solid #d9d9d9;
    border-radius: 1px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 600;
    font-size: /* 9px/16 */ 0.5625rem;
    line-height: /* 11px/16 */ 0.6875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
    padding: 0;
    cursor: pointer;
  }
</style>

<div
  class="shape-selector-library-dialog"
  bind:this={dialog}
  transition:fade={{ duration: 500 }}
>
  <div class="shape-selector-library">
    <div class="shape-selector-header" bind:this={header}>
      <h2>Library</h2>
      <button class="close-button" on:click={closeLibrary}>
        <img src="icons/close-button.png" alt="X" />
      </button>
    </div>
    <div class="inner-container">
      <div class="shape-selector-search">
        <input
          value={searchTerm}
          on:input={(event) =>
            ShapeSelectorLibrary.handleSearch(event.target.value)}
          placeholder="Search"
          style="background-image: url('icons/search-icon.png');"
        />
      </div>
      <div class="shape-selector-grid">
        <div class="scrollbar-wrapper">
          <div class="shape-selector-grid-inner">
            {#each filteredShapes as shape (shape.id)}
              <button
                class="shape-selector-item {selectedItemIds.includes(shape.id)
                  ? 'selected'
                  : ''}"
                on:mouseenter={() => (shape.hover = true)}
                on:mouseleave={() => (shape.hover = false)}
                on:focus={() => (shape.hover = true)}
                on:blur={() => (shape.hover = false)}
                on:click={() =>
                  ShapeSelectorLibrary.setSelectedItemId(shape.id)}
              >
                <div class="shape-selector-details">
                  <div class="shape-selector-item-image-div">
                    <img
                      class="shape-selector-item-image"
                      src={shape.image}
                      alt=""
                    />
                  </div>
                  <div
                    class="shape-selector-item-name {selectedItemIds.includes(
                      shape.id,
                    )
                      ? 'font-selected'
                      : ''}"
                  >
                    {shape.name}
                  </div>
                </div>
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="import-cancel-buttons-container">
      <div class="import-cancel-buttons">
        <button
          class="import-button"
          on:click={() => {
            if (selectedItemIds.length > 0) {
              addNewShapes(
                shapes.filter((shape) => selectedItemIds.includes(shape.id)),
              );
              closeLibrary();
            }
          }}
        >
          Import
        </button>
        <button class="cancel-button" on:click={closeLibrary}> Cancel </button>
      </div>
    </div>
  </div>
</div>
