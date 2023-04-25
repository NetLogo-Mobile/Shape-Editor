export interface Shape {
  id: number;
  name: string;
  image: string;
  type: string;
  hover?: boolean;
}

export class GalapagosShapeSelectorDialog {
  parent: HTMLElement;
  shapes: Shape[] = [];
  searchTerm: string;
  filteredShapes: Shape[] = [];
  currentType: string;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.shapes = [
      { id: 1, name: 'default', image: 'down-arrow.png', type: 'turtle', hover: false},
      { id: 2, name: 'apple', image: 'down-arrow.png', type: 'turtle', hover: false },
      { id: 3, name: 'banana', image: 'down-arrow.png', type: 'turtle', hover: false },
      { id: 4, name: 'peach', image: 'down-arrow.png', type: 'turtle' , hover: false},
      { id: 5, name: 'down-arrow', image: 'down-arrow.png', type: 'link' , hover: false},
      { id: 6, name: 'down-arrow', image: 'down-arrow.png', type: 'link', hover: false },
    ];
    this.searchTerm = '';
    this.filteredShapes = this.shapes;
    this.currentType = 'turtle';
  }

  createShape() {
    console.log('create shape');
    const newShape: Shape = {
      id: Math.max(...this.shapes.map((shape) => shape.id)) + 1,
      name: 'new default',
      image: 'down-arrow.png',
      type: 'turtle',
    };
    this.shapes.unshift(newShape);
    this.shapes = [...this.shapes];
  }

  importShapes() {
    console.log('import shape')
    // Code to import shapes from a file
  }

  duplicateShape(id: number) {
    console.log('duplicate shape')
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
        };
        const newId = Math.max(...this.shapes.map((shape) => shape.id)) + 1;
        duplicatedShape.id = newId;
        this.shapes.splice(newInsertIndex + 1, 0, duplicatedShape);
        this.shapes = [...this.shapes];
      }
    }
  }
  

  deleteShape(id: number) {
    console.log('delete shape')
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
    }
  }
  
  filterShapes(type: string) {
    console.log('filter shape')
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
  }
  
}
