<script>
  import { GalapagosShapeSelectorDialog } from './ShapeSelectorDialog.ts';
  import LibraryDialog from './LibraryDialog.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { fade } from 'svelte/transition';

  // dom elements
  let dialog;
  let header;
  let container;

  let ShapeSelectorDialog;
  let searchTerm;
  let currentType;
  let filteredShapes = [];
  let shapes = [];
  let selectedItemId = null;
  let recentlyImportedShapeId = null;
  let dialogOpen = true;
  let importButtonSelected = false;
  let libraryOpen = false;
  let closeLibrary;
  let addNewShape;

  // Create writable stores for shapes, filteredShapes, and selectedItemId
  const shapesStore = writable([]);
  const filteredShapesStore = writable([]);
  const selectedItemIdStore = writable(null);
  const recentlyImportedShapeIdStore = writable(null);
  const dialogOpenStore = writable(true);
  const importButtonSelectedStore = writable(false);
  const libraryOpenStore = writable(false);

  // Initialize ShapeSelectorDialog and set up update functions when the component is mounted
  onMount(() => {
    // Initialize ShapeSelectorDialogConfig
    const ShapeSelectorDialogConfig = {
      onUpdateShapes: (newShapes) => {
        shapesStore.set(newShapes);
      },
      onUpdateFilteredShapes: (newFilteredShapes) => {
        filteredShapesStore.set(newFilteredShapes);
      },
      onUpdateSelectedItemId: (newSelectedItemId) => {
        selectedItemIdStore.set(newSelectedItemId);
      },
      onUpdateDialogOpen: (newDialogOpen) => {
        dialogOpenStore.set(newDialogOpen);
      },
      onUpdateImportButtonSelected: (newImportButtonSelected) => {
        importButtonSelectedStore.set(newImportButtonSelected);
      },
      onUpdateLibraryOpen: (newLibraryOpen) => {
        libraryOpenStore.set(newLibraryOpen);
      },
      onUpdateRecentlyImportedShape: (newRecentlyImportedShapeId) => {
        recentlyImportedShapeIdStore.set(newRecentlyImportedShapeId);
      },
    };

    // Initialize ShapeSelectorDialog
    ShapeSelectorDialog = new GalapagosShapeSelectorDialog(
      document.getElementById('Container'),
      ShapeSelectorDialogConfig,
    );

    let isDown = false;
    let offset = [0, 0];

    closeLibrary = () => {
      ShapeSelectorDialog.closeLibrary();
    };

    addNewShape = (shape) => {
      ShapeSelectorDialog.addNewShape(shape);
    };

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

  // scroll into view function
  function scrollContainerIntoView(node, newlyAdded) {
    if (newlyAdded) {
      let relativeTop = node.offsetTop - container.offsetTop;
      if (
        relativeTop < container.scrollTop ||
        relativeTop > container.scrollTop + container.offsetHeight
      ) {
        container.scrollTop = relativeTop;
      }
    }
  }

  // Subscribe to the stores
  shapesStore.subscribe((value) => {
    shapes = value;
  });

  filteredShapesStore.subscribe((value) => {
    filteredShapes = value;
  });

  selectedItemIdStore.subscribe((value) => {
    selectedItemId = value;
  });

  dialogOpenStore.subscribe((value) => {
    dialogOpen = value;
  });

  importButtonSelectedStore.subscribe((value) => {
    importButtonSelected = value;
  });

  libraryOpenStore.subscribe((value) => {
    libraryOpen = value;
  });

  recentlyImportedShapeIdStore.subscribe((value) => {
    recentlyImportedShapeId = value;
  });

  $: {
    if (ShapeSelectorDialog) {
      searchTerm = ShapeSelectorDialog.searchTerm;
      currentType = ShapeSelectorDialog.currentType;
      filteredShapes = ShapeSelectorDialog.filteredShapes;
      shapes = ShapeSelectorDialog.shapes;
      selectedItemId = ShapeSelectorDialog.selectedItemId;
      recentlyImportedShapeId = ShapeSelectorDialog.recentlyImportedShapeId;
      dialogOpen = ShapeSelectorDialog.dialogOpen;
      importButtonSelected = ShapeSelectorDialog.importButtonSelected;
      libraryOpen = ShapeSelectorDialog.libraryOpen;
    }
  }
</script>

<style>
  .shape-selector-dialog {
    font-family: 'Lato';
    position: absolute;
  }

  .shape-selector-dialog .shape-selector {
    box-sizing: border-box;
    /* position: absolute; */
    width: 31.25rem; /* 500px/16 */
    height: 22.625rem; /* 362px/16 */

    /* left: 12.5rem; 
    top: 7.09375rem;  */

    background: #eeeff0;
    border: 0.0625rem solid #c0c0c0; /* 1px/16 */
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25); /* 4px/16 */
    border-radius: 0.3125rem; /* 5px/16 */
  }
  .shape-selector-dialog .shape-selector-header-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .shape-selector-dialog .close-button {
    margin-right: 12px;
    width: 12px;
    height: 12px;
    padding: 0;
  }

  .shape-selector-dialog .close-button img {
    width: 100% !important;
    height: 100% !important;
    align-items: center;
    margin: 0 !important;
  }

  .shape-selector-dialog .inner-container {
    display: flex;
    flex-direction: column;
    padding: 0 1.5625rem 1.875rem 1.5625rem; /* 25px/16, 30px/16 */
  }

  .shape-selector-dialog .shape-selector-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.625rem; /* 10px/16 */
    width: 100%;
    height: 2.25rem; /* 36px/16 */
    background: #5a648d;
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25); /* 4px/16 */
    border-radius: 0.3125rem 0.3125rem 0 0; /* 5px/16 */
  }

  .shape-selector-dialog .close-button {
    color: white;
    font-size: 0.75rem; /* 12px/16 */
    font-weight: bold;
    border: none;
    background: none;
    cursor: pointer;
  }

  .shape-selector-dialog .shape-selector-header h2 {
    font-weight: 800;
    font-size: 0.75rem; /* 12px/16 */
    color: #ffffff;
    text-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25); /* 4px/16 */
    margin: 0;
  }

  .shape-selector-dialog .selector-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.125rem; /* 2px/16 */
  }

  .shape-selector-dialog .shape-selector-header img {
    width: 1.5rem; /* 24px/16 */
    height: 1.5rem; /* 24px/16 */
    margin: 0.4375rem 0.625rem 0 0.625rem; /* 7px/16, 10px/16 */
  }

  .shape-selector-dialog .mode-selector {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .shape-selector-dialog .turtle-button {
    width: 3.125rem; /* 50px/16 */
    height: 1.25rem; /* 20px/16 */
    box-sizing: border-box;
    border-radius: 0.125rem; /* 2px/16 */
    font-weight: 400;
    font-size: 0.5625rem; /* 9px/16 */
    line-height: 11px;
    font-family: 'Lato';
    display: flex;
    align-items: center;
    padding-left: 0px;
    cursor: pointer;
  }

  .shape-selector-dialog .selected-button {
    color: #ffffff;
    background: #5a648d;
    border: 0.01875rem solid #cecece; /* 0.3px/16 */
    box-shadow: inset 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25); /* 4px/16 */
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
    border: 0.01875rem solid #cecece; /* 0.3px/16 */
  }

  .shape-selector-dialog .link-button {
    box-sizing: border-box;
    width: 2.75rem; /* 44px/16 */
    height: 1.25rem; /* 20px/16 */
    border-radius: 2px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 0.5625rem; /* 9px/16 */
    line-height: 0.6875rem; /* 11px/16 */
    display: flex;
    align-items: center;
    padding-left: 0;
    cursor: pointer;
  }
  .shape-selector-dialog .button-image-left {
    width: 0.625rem; /* 10px/16 */
    height: 0.625rem; /* 10px/16 */
    margin: 0.3125rem 0.25rem 0.3125rem 0.3125rem; /* 5px/16, 4px/16, 5px/16, 5px/16 */
  }

  .shape-selector-dialog .button-image-right {
    width: 0.9375rem; /* 15px/16 */
    height: 0.9375rem; /* 15px/16 */
    margin: 0.5rem 0.25rem 0.3125rem 0.3125rem; /* 8px/16, 4px/16, 5px/16, 5px/16 */
  }

  .shape-selector-dialog .mode-selector h3 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 0.625rem; /* 10px/16 */
    line-height: 0.75rem; /* 12px/16 */
    display: flex;
    align-items: center;
    color: #000000;
    margin: 0;
  }

  .shape-selector-dialog .mode-selector-buttons {
    display: flex;
    margin-left: 0;
    flex-wrap: wrap;
    gap: 0.625rem; /* 10px/16 */
  }

  .shape-selector-dialog .shape-selector-buttons {
    display: flex;
    justify-content: space-between;
  }

  .shape-selector-dialog .shape-selector-buttons button {
    margin-left: 0 !important;
  }
  .shape-selector-dialog .create-new-button {
    box-sizing: border-box;
    width: 5.625rem; /* 90px/16 */
    height: 1.25rem; /* 20px/16 */
    background: #bacff3;
    border: 0.01875rem solid #cecece; /* 0.3px/16 */
    border-radius: 2px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 0.5625rem; /* 9px/16 */
    line-height: 0.6875rem; /* 11px/16 */
    display: flex;
    align-items: center;
    color: #ffffff;
    text-shadow: 0 0.125rem 0.1875rem rgba(0, 0, 0, 0.25); /* 2px/16, 3px/16 */
    cursor: pointer;
  }

  .shape-selector-dialog .import-shapes-button {
    width: 6.125rem; /* 98px/16 */
    height: 1.25rem; /* 20px/16 */
    box-sizing: border-box;
    background: #d9d9d9;
    border: 0.01875rem solid #cecece; /* 0.3px/16 */
    border-radius: 2px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 0.5625rem; /* 9px/16 */
    line-height: 0.6875rem; /* 11px/16 */
    display: flex;
    align-items: center;
    color: #ffffff;
    text-shadow: 0 0.125rem 0.1875rem rgba(0, 0, 0, 0.25); /* 2px/16, 3px/16 */
    cursor: pointer;
  }

  .shape-selector-dialog .import-shapes-button.clicked {
    background: #7d7d7d;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .shape-selector-dialog .dropdown {
    position: relative;
    display: inline-block;
    width: 6.125rem; /* 98px/16 */
    margin-left: 0.625rem; /* 10px/16 */
  }

  .shape-selector-dialog .dropdown-content {
    display: flex; /* Change to flex */
    flex-direction: column; /* Stack content vertically */
    position: absolute;
    left: 3%; /* To center the dropdown menu */
    width: 94%; /* Width of the dropdown menu */
    box-sizing: border-box;
    border: none;
    border-radius: 2px;
    padding: 0; /* Remove padding */
    z-index: 1;
  }

  .shape-selector-dialog .dropdown-content .dropdown-button {
    width: 100%; /* Full width of the parent */
    height: 1.125rem; /* 18px/16 */
    background: #ffffff;
    border-width: 0px 0.7px 1px 0.7px;
    border-style: solid;
    border-color: #cecece;
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margins */
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
    line-height: 10px;
    display: flex;
    align-items: center;
    justify-content: center; /* Center the content group */
    border-radius: 0px 0px 2px 2px;
    cursor: pointer;
  }

  .shape-selector-dialog .dropdown-content .dropdown-button.model-button {
    border-radius: 0px 0px 2px 2px;
  }

  .shape-selector-dialog .dropdown-content .dropdown-button.library-button {
    border-radius: 0;
  }

  .shape-selector-dialog .dropdown-content .dropdown-button img {
    width: 0.5625rem; /*9px*/
    height: 0.5625rem; /*9px*/
    margin-right: 0.5rem; /*8px*/
    margin-left: 0;
  }

  .shape-selector-dialog .dropdown-content .dropdown-button:hover {
    background: #e5e5e5;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.15);
  }

  .shape-selector-dialog .shape-selector-search {
    margin-top: 0.3125rem; /* 5px/16 */
    box-sizing: border-box;
    width: 28.125rem; /* 450px/16 */
    height: 1.75rem; /* 28px/16 */
    background: #ffffff;
    border: 0.0625rem solid #cecece; /* 1px/16 */
    border-radius: 5px;
    position: relative;
    padding-left: 0.625rem; /* 10px/16 */
  }
  .shape-selector-dialog .shape-selector-search input {
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

  .shape-selector-dialog .shape-selector-grid {
    flex: 1;
    overflow: hidden;
    background: #ffffff;
    box-shadow: inset 0.125rem 0.1875rem 0.25rem rgba(0, 0, 0, 0.25); /* 2px/16, 3px/16, 4px/16 */
    border-radius: 5px 2px 2px 5px;
    margin-top: 0.875rem; /* 14px/16 */
    padding: 0.875rem 0.875rem 0 0.875rem; /* 14px/16, 14px/16, 0, 14px/16 */
  }

  .shape-selector-dialog .shape-selector-grid-inner {
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0.3125rem; /* 5px/16 */
    width: 100%;
    height: 11.25rem; /* 180px/16 */
    box-sizing: border-box;
    align-content: start;
  }

  .shape-selector-dialog .shape-selector-item {
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
  .shape-selector-dialog .selected {
    background: #7d7d7d;
    border: 0.04375rem solid #cecece; /* 0.7px/16 */
    box-shadow: inset 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25); /* 0, 4px/16, 4px/16 */
    color: #ffffff;
  }

  .shape-selector-dialog .recently-imported {
    background: #ececec;
    border: 0.04375rem solid #cecece;
    border-radius: 3px;
  }

  .shape-selector-dialog .font-selected {
    color: white !important;
  }

  .shape-selector-dialog .selected img {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg)
      brightness(100%) contrast(100%);
  }

  .shape-selector-dialog .shape-selector-item-buttons {
    position: absolute;
    z-index: 1;
    top: 0.1875rem; /* 3px/16 */
    right: 0.125rem; /* 2px/16 */
    display: flex;
    flex-direction: row;
  }

  .shape-selector-dialog .duplicate-icon {
    width: 1rem; /* 16px/16 */
    height: 1rem; /* 16px/16 */
    padding: 0.15625rem; /* 2.5px/16 */
    box-sizing: border-box;
    background: #ffffff;
    border: 0.04375rem solid #cecece; /* 0.7px/16 */
    border-radius: 2px;
    padding: 0.15625rem; /* 2.5px/16 */
    margin-right: 0.0625rem; /* 1px/16 */
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 0.625rem 0.625rem; /* 10px/16, 10px/16 */
    margin-bottom: 0;
  }

  .shape-selector-dialog .delete-icon {
    z-index: 1;
    width: 1rem; /* 16px/16 */
    height: 1rem; /* 16px/16 */
    box-sizing: border-box;
    background: #ffffff;
    border: 0.04375rem solid #cecece; /* 0.7px/16 */
    border-radius: 2px;
    padding: 0.15625rem; /* 2.5px/16 */
    margin-right: 0.0625rem; /* 1px/16 */
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 0.625rem 0.625rem; /* 10px/16, 10px/16 */
    margin-bottom: 0;
  }

  .shape-selector-dialog .shape-selector-details {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
  }

  .shape-selector-dialog .shape-selector-item-image-div {
    width: 2.54rem; /* 40.64px/16 */
    height: 2.625rem; /* 42px/16 */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shape-selector-dialog .shape-selector-item-image {
    width: 1.875rem; /* 30px/16 */
    height: 1.875rem; /* 30px/16 */
  }

  .shape-selector-dialog .shape-selector-item-name {
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
</style>

<div>
  {#if libraryOpen}
    <LibraryDialog {closeLibrary} {addNewShape} />
  {/if}
  <div
    class="shape-selector-dialog"
    bind:this={dialog}
    style="display: {dialogOpen ? 'block' : 'none'} !important;"
  >
    <div class="shape-selector">
      <div class="shape-selector-header" bind:this={header}>
        <div class="shape-selector-header-logo">
          <img src="icons/header-logo.png" alt="header logo" />
          <h2>Shape Editor</h2>
        </div>
        <button
          class="close-button"
          on:click={() => ShapeSelectorDialog.toggleDialog()}
        >
          <img src="icons/close-button.png" alt="X" />
        </button>
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
                on:click={() => {
                  currentType = 'turtle';
                  ShapeSelectorDialog.filterShapes('turtle');
                }}
                ><img
                  class="button-image-left"
                  src="icons/turtle-icon.png"
                  alt="turtle button"
                />Turtle</button
              >
              <button
                class="link-button {currentType === 'link'
                  ? 'selected-button'
                  : 'unselected-button'}"
                on:click={() => {
                  currentType = 'link';
                  ShapeSelectorDialog.filterShapes('link');
                }}
                ><img
                  class="button-image-left"
                  src="icons/link-icon.png"
                  alt="link button"
                />Link</button
              >
            </div>
            <div class="shape-selector-buttons">
              <button
                class="create-new-button"
                on:click={ShapeSelectorDialog.createShape()}
                ><img
                  class="button-image-right"
                  src="icons/create-new-icon.png"
                  alt="create new"
                />Create New</button
              >
              <div class="dropdown">
                <button
                  class="import-shapes-button {importButtonSelected
                    ? 'clicked'
                    : ''}"
                  on:click={ShapeSelectorDialog.importShapes()}
                  ><img
                    class="button-image-right"
                    src="icons/import-icon.png"
                    alt="import"
                  />Import From...</button
                >
                {#if importButtonSelected}
                  <div
                    class="dropdown-content"
                    transition:fade={{ duration: 500 }}
                  >
                    <button
                      class="dropdown-button library-button"
                      on:click={ShapeSelectorDialog.openLibrary()}
                      ><img
                        class="button-image-left"
                        src="icons/library-icon.png"
                        alt="library"
                      />Library</button
                    >
                    <button
                      class="dropdown-button model-button"
                      on:click={console.log('model')}
                      ><img
                        class="button-image-left"
                        src="icons/model-icon.png"
                        alt="model"
                      />Model</button
                    >
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
        <div class="shape-selector-search">
          <input
            value={searchTerm}
            on:input={(event) =>
              ShapeSelectorDialog.handleSearch(event.target.value)}
            placeholder="Search"
            style="background-image: url('icons/search-icon.png');"
          />
        </div>
        <div class="shape-selector-grid">
          <div class="shape-selector-grid-inner" bind:this={container}>
            {#each filteredShapes as shape (shape.id)}
              <button
                use:scrollContainerIntoView={shape.id ===
                  recentlyImportedShapeId}
                transition:fade={{ duration: 500 }}
                class="shape-selector-item {shape.id === selectedItemId
                  ? 'selected'
                  : ''}
                  {shape.id === recentlyImportedShapeId
                  ? 'recently-imported'
                  : ''}"
                on:mouseenter={() => (shape.hover = true)}
                on:mouseleave={() => (shape.hover = false)}
                on:focus={() => (shape.hover = true)}
                on:blur={() => (shape.hover = false)}
                on:click={() => ShapeSelectorDialog.setSelectedItemId(shape.id)}
              >
                <div class="shape-selector-item-buttons">
                  <button
                    on:click={(event) => {
                      event.stopPropagation();
                      ShapeSelectorDialog.duplicateShape(shape.id);
                    }}
                    on:keydown={(event) => {
                      if (event.key === 'Enter') {
                        event.stopPropagation();
                        ShapeSelectorDialog.duplicateShape(shape.id);
                      }
                    }}
                    aria-label="Duplicate shape"
                    class="duplicate-icon"
                    style="display: {shape.hover
                      ? 'block'
                      : 'none'}; background-image: url('icons/duplicate-icon.png');"
                  />

                  <button
                    on:click={(event) => {
                      event.stopPropagation();
                      ShapeSelectorDialog.deleteShape(shape.id);
                    }}
                    on:keydown={(event) => {
                      if (event.key === 'Enter') {
                        event.stopPropagation();
                        ShapeSelectorDialog.deleteShape(shape.id);
                      }
                    }}
                    aria-label="Delete shape"
                    class="delete-icon {shape.deletable
                      ? ''
                      : 'button-disabled'}"
                    style="display: {shape.hover
                      ? 'block'
                      : 'none'}; background-image: url('icons/delete-icon.png');"
                    disabled={!shape.deletable}
                  />
                </div>
                <div class="shape-selector-details">
                  <div class="shape-selector-item-image-div">
                    <img
                      class="shape-selector-item-image"
                      src={shape.image}
                      alt=""
                    />
                  </div>
                  <div
                    class="shape-selector-item-name {shape.id === selectedItemId
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
  </div>
</div>
