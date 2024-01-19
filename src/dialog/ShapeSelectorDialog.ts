import { Shape } from './ShapeSelectorShape';
import { GalapagosShapeSelectorDialogConfig } from './ShapeSelectorDialogConfig';
import { JSONShape } from '../editor/utils/json';

export class GalapagosShapeSelectorDialog {
  // Parent element where the dialog will be rendered
  parent: HTMLElement;

  // dialog open state
  dialogOpen: boolean;

  // Array of all shapes to display
  shapes: Shape[] = [];

  // The search term entered by the user
  searchTerm: string;

  // Array of shapes that match the current search term and type filter
  filteredShapes: Shape[] = [];

  // The current type filter applied to the shape list
  currentType: string;

  // The ID of the currently selected shape
  selectedItemId: number | null = null;

  // The IDs of the recently imported shapes
  recentlyImportedShapeIds: number[] = [];

  // Config object containing callback functions to update the main app state
  config: GalapagosShapeSelectorDialogConfig;

  // Boolean to track if the import button has been selected
  importButtonSelected: boolean;

  // Boolean to track if the library has been opened
  libraryOpen: boolean;

  // Constructor function
  constructor(parent: HTMLElement, config: GalapagosShapeSelectorDialogConfig) {
    // Initialize all fields
    this.parent = parent;
    // shapes array is initialized with default shapes, should be imported from json in the future
    this.shapes = [
      {
        id: 1,
        name: 'default',
        image: 'shapes/down-arrow.png',
        type: 'turtle',
        hover: false,
        deletable: false,
        isDeleting: false,
      },
      {
        id: 2,
        name: 'default',
        image: 'shapes/down-arrow.png',
        type: 'link',
        hover: false,
        deletable: false,
        isDeleting: false,
      },
    ];
    this.searchTerm = '';
    this.filteredShapes = this.shapes;
    this.currentType = 'turtle';
    this.config = config;
    this.filterShapes(this.currentType);
    this.dialogOpen = true;
    this.importButtonSelected = false;
    this.libraryOpen = false;
  }

  // function to open and close the dialog
  toggleDialog() {
    this.dialogOpen = !this.dialogOpen;
    this.config.onUpdateDialogOpen(this.dialogOpen);
  }

  // function to open the library
  openLibrary() {
    this.libraryOpen = true;
    this.importButtonSelected = false;
    this.config.onUpdateLibraryOpen(this.libraryOpen);
    this.config.onUpdateImportButtonSelected(this.importButtonSelected);
  }

  // function to close the library
  closeLibrary() {
    console.log('close library');
    this.libraryOpen = false;
    this.config.onUpdateLibraryOpen(this.libraryOpen);
  }

  // Create a new default shape object
  createShape() {
    // set imported shapes to empty
    this.recentlyImportedShapeIds = [];
    this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds);
    const newShape: Shape = {
      id: Math.max(...this.shapes.map((shape) => shape.id)) + 1,
      name: 'new default',
      image: 'shapes/down-arrow.png',
      type: this.currentType,
      hover: false,
      deletable: true,
      isDeleting: false,
    };
    // Add the new shape to the beginning of the shape array and update the filtered shape list
    this.shapes.unshift(newShape);
    this.shapes = [...this.shapes];
    this.config.onUpdateShapes(this.shapes);
    this.filterShapes(this.currentType);
    this.config.onUpdateFilteredShapes(this.filteredShapes);
  }

  // Create shape from SVG
  createSVGShape(name: string, svg: string) {
    // convert svg to url encoding
    const svgUrl = 'data:image/svg+xml;base64,' + btoa(`<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`);

    // set imported shapes to empty
    this.recentlyImportedShapeIds = [];
    this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds);
    const newShape: Shape = {
      id: Math.max(...this.shapes.map((shape) => shape.id)) + 1,
      name: name,
      image: svgUrl,
      type: this.currentType,
      hover: false,
      deletable: true,
      isDeleting: false,
    };
    // Add the new shape to the beginning of the shape array and update the filtered shape list
    this.shapes.unshift(newShape);
    this.shapes = [...this.shapes];
    this.config.onUpdateShapes(this.shapes);
    this.filterShapes(this.currentType);
    this.config.onUpdateFilteredShapes(this.filteredShapes);
  }

  // functino to handle import shape button
  importShapes() {
    this.importButtonSelected = !this.importButtonSelected;
    this.config.onUpdateImportButtonSelected(this.importButtonSelected);
  }

  // function to handle duplicate button click
  duplicateShape(id: number) {
    const shapeToDuplicate = this.shapes.find((shape) => shape.id === id);
    if (shapeToDuplicate) {
      const { name } = shapeToDuplicate;
      const nameMatch = name.match(/^(.*?)(\s(\d+))?$/);
      if (nameMatch) {
        const baseName = nameMatch[1];
        const existingIndices: number[] = [];
        for (const shape of this.shapes) {
          if (shape.name.indexOf(baseName) === 0) {
            const indexMatch = shape.name.match(/^.*\s(\d+)$/);
            if (indexMatch) {
              existingIndices.push(Number(indexMatch[1]));
            }
          }
        }
        let insertIndex = -1;
        for (let i = 0; i < this.shapes.length; i++) {
          if (this.shapes[i].id === id) {
            insertIndex = i;
            break;
          }
        }
        let newInsertIndex = insertIndex;
        if (existingIndices.length >= 1) {
          const maxIndex = Math.max(...existingIndices);
          for (let i = 0; i < this.shapes.length; i++) {
            if (this.shapes[i].name === `${baseName} ${maxIndex}`) {
              newInsertIndex = i;
              break;
            }
          }
        }
        const newIndex = existingIndices.length
          ? Math.max(...existingIndices) + 1
          : 1;
        const newName = `${baseName} ${newIndex}`;
        const duplicatedShape = {
          ...shapeToDuplicate,
          name: newName,
          hover: false,
          deletable: true,
        };
        const newId = Math.max(...this.shapes.map((shape) => shape.id)) + 1;
        duplicatedShape.id = newId;
        this.shapes.splice(newInsertIndex + 1, 0, duplicatedShape);
        this.shapes = [...this.shapes];
        this.handleSearch(this.searchTerm);
        this.config.onUpdateShapes(this.shapes);
        this.config.onUpdateFilteredShapes(this.filteredShapes);
      }
    }
  }

  // function to handle adding shapes
  addNewShapes(newShapes: Shape[]) {
    // set recently imported to empty
    this.recentlyImportedShapeIds = [];
    this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds);

    newShapes.forEach((shape) => {
      // make the shape the next available id and set the type to the current type
      shape.id = Math.max(...this.shapes.map((shape) => shape.id)) + 1;
      shape.type = this.currentType;
      shape.hover = false;
      shape.deletable = true;

      if (shape.name === 'default') {
        shape.deletable = false;
      }

      // add shape to the shapes array
      this.shapes.push(shape);

      // add to recently imported
      this.recentlyImportedShapeIds.push(shape.id);
    });

    // sort shapes by alphabetical order keeping defaults at the start
    this.shapes.sort((a, b) => {
      if (a.name === 'default') return -1;
      if (b.name === 'default') return 1;
      return a.name.localeCompare(b.name);
    });

    this.shapes = [...this.shapes];
    this.config.onUpdateShapes(this.shapes);
    this.filterShapes(this.currentType);

    this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds);
  }

  // function to handle delete button click
  deleteShape(id: number) {
    console.log('delete shape');
    let shapeIndexToDelete = -1;
    let filteredShapeIndexToDelete = -1;
    for (let i = 0; i < this.shapes.length; i++) {
      if (this.shapes[i].id === id) {
        shapeIndexToDelete = i;
      }
    }

    for (let i = 0; i < this.filteredShapes.length; i++) {
      if (this.filteredShapes[i].id === id) {
        filteredShapeIndexToDelete = i;
      }
    }

    if (shapeIndexToDelete !== -1 && filteredShapeIndexToDelete !== -1) {
      this.shapes[shapeIndexToDelete].isDeleting = true;
      this.filteredShapes[filteredShapeIndexToDelete].isDeleting = true;
      this.shapes = [...this.shapes];
      this.filteredShapes = [...this.filteredShapes];
      this.config.onUpdateShapes(this.shapes);
      this.config.onUpdateFilteredShapes(this.filteredShapes);

      setTimeout(() => {
        this.shapes.splice(shapeIndexToDelete, 1);
        this.shapes = [...this.shapes];
        this.handleSearch(this.searchTerm);
        this.config.onUpdateShapes(this.shapes);
        this.config.onUpdateFilteredShapes(this.filteredShapes);
      }, 500);
    }
  }

  // function to filter shapes when type filter changes
  filterShapes(type: string) {
    this.currentType = type;
    this.filteredShapes = [];
    for (let i = 0; i < this.shapes.length; i++) {
      const shape = this.shapes[i];
      if (
        shape.type === this.currentType &&
        shape.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1
      ) {
        this.filteredShapes.push(shape);
      }
    }
    this.config.onUpdateFilteredShapes(this.filteredShapes);
  }

  // function update shapes when search term changes
  handleSearch(term: string) {
    this.searchTerm = term;
    this.filterShapes(this.currentType);
    this.config.onUpdateFilteredShapes(this.filteredShapes);
  }

  // function to handle shape selection
  setSelectedItemId(id: number | null) {
    if (this.selectedItemId === id) {
      this.selectedItemId = null;
    } else {
      this.selectedItemId = id;
    }
    // console log this information in selected shape
    console.log(this.shapes.find((shape) => shape.id === this.selectedItemId));
    this.recentlyImportedShapeIds = [];
    this.config.onUpdateRecentlyImportedShapes(this.recentlyImportedShapeIds);
    this.config.onUpdateSelectedItemId(this.selectedItemId);
  }
}
