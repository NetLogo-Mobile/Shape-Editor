import { Shape } from './ShapeSelectorShape';

export class GalapagosShapeSelectorDialog {

  parent: HTMLElement;
  shapes: Shape[] = [];
  searchTerm: string;
  filteredShapes: Shape[] = [];
  currentType: string;
  onUpdate: (shapes: any[]) => void;
  onUpdateFilteredShapes: (filteredShapes: any[]) => void;
  

  constructor(parent: HTMLElement, onUpdate: (shapes: any[]) => void, onUpdateFilteredShapes: (filteredShapes: any[]) => void) {
    this.parent = parent;
    this.shapes = [
      { id: 1, name: 'default', image: 'down-arrow.png', type: 'turtle', hover: false, deletable: false},
      { id: 2, name: 'apple', image: 'down-arrow.png', type: 'turtle', hover: false, deletable: true },
      { id: 3, name: 'banana', image: 'down-arrow.png', type: 'turtle', hover: false, deletable: true },
      { id: 4, name: 'peach', image: 'down-arrow.png', type: 'turtle' , hover: false, deletable: true},
      { id: 5, name: 'down-arrow', image: 'down-arrow.png', type: 'link' , hover: false, deletable: true},
      { id: 6, name: 'down-arrow', image: 'down-arrow.png', type: 'link', hover: false , deletable: true},
    ];
    this.searchTerm = '';
    this.filteredShapes = this.shapes;
    this.currentType = 'turtle';
    this.onUpdate = onUpdate;
    this.onUpdateFilteredShapes = onUpdateFilteredShapes;

    this.filterShapes(this.currentType);
  }

  createShape() {
    const newShape: Shape = {
      id: Math.max(...this.shapes.map((shape) => shape.id)) + 1,
      name: 'new default',
      image: 'down-arrow.png',
      type: 'turtle',
      hover: false,
      deletable: true,
    };
    this.shapes.unshift(newShape);
    this.shapes = [...this.shapes];
    this.onUpdate(this.shapes);
    this.filterShapes(this.currentType);
    this.onUpdateFilteredShapes(this.filteredShapes);
  }

  importShapes() {
    console.log('import shape')
    // Code to import shapes from a file
  }

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
          let maxIndex = Math.max(...existingIndices);
          for (let i = 0; i < this.shapes.length; i++) {
            if (
              this.shapes[i].name ===
              `${baseName} ${maxIndex}`
            ) {
              newInsertIndex = i;
              break;
            }
          }
        }
        const newIndex = existingIndices.length ? Math.max(...existingIndices) + 1 : 1;
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
        this.onUpdate(this.shapes);
        this.onUpdateFilteredShapes(this.filteredShapes);
      }
    }
  }
  
  deleteShape(id: number) {
    let shapeIndexToDelete = -1;
    for (let i = 0; i < this.shapes.length; i++) {
      if (this.shapes[i].id === id) {
        shapeIndexToDelete = i;
        break;
      }
    }
  
    if (shapeIndexToDelete !== -1) {
      this.shapes.splice(shapeIndexToDelete, 1);
      this.shapes = [...this.shapes];
      this.handleSearch(this.searchTerm);
      this.onUpdate(this.shapes);
      this.onUpdateFilteredShapes(this.filteredShapes);
    }
  }
  
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
    this.onUpdateFilteredShapes(this.filteredShapes);
  }

  handleSearch(term: string) {
    this.searchTerm = term;
    this.filterShapes(this.currentType);
    this.onUpdateFilteredShapes(this.filteredShapes);
  }
  
}

