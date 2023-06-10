import { Shape } from './ShapeSelectorShape';
import { GalapagosShapeSelectorLibraryConfig } from './ShapeSelectorLibraryConfig';

export class GalapagosShapeSelectorLibrary {
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

  // The IDs of the currently selected shapes
  selectedItemIds: number[] = [];

  // Config object containing callback functions to update the main app state
  config: GalapagosShapeSelectorLibraryConfig;

  constructor(
    parent: HTMLElement,
    config: GalapagosShapeSelectorLibraryConfig,
  ) {
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
      },
      {
        id: 2,
        name: 'apple',
        image: 'shapes/down-arrow.png',
        type: 'turtle',
        hover: false,
        deletable: true,
      },
      {
        id: 3,
        name: 'banana',
        image: 'shapes/down-arrow.png',
        type: 'turtle',
        hover: false,
        deletable: true,
      },
      {
        id: 4,
        name: 'peach',
        image: 'shapes/down-arrow.png',
        type: 'turtle',
        hover: false,
        deletable: true,
      },
      {
        id: 5,
        name: 'down-arrow',
        image: 'shapes/down-arrow.png',
        type: 'link',
        hover: false,
        deletable: true,
      },
    ];
    this.searchTerm = '';
    this.filteredShapes = this.shapes;
    this.currentType = 'turtle';
    this.config = config;
    this.filterShapes(this.currentType);
    this.dialogOpen = true;
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
  setSelectedItemId(id: number) {
    // find the index of the id in the array
    const index = this.selectedItemIds.indexOf(id);

    // if id is in the array, remove it
    if (index > -1) {
      this.selectedItemIds.splice(index, 1);
    } else {
      // if id is not in the array, add it
      this.selectedItemIds.push(id);
    }

    console.log(this.selectedItemIds.map(id => this.shapes.find((shape) => shape.id === id)));
    this.config.onUpdateSelectedItemIds([...this.selectedItemIds]);
  }
}
