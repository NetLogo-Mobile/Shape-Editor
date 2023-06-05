import { R2, Shape } from './geometry';

/**
 * Enum representing the set of available tools.
 */
export enum Tool {
  /** Tool to select an object. */
  SELECT,

  /** Tool to draw a line. */
  LINE,

  /** Tool to draw a filled rectangle. */
  FILLED_RECTANGLE,

  /** Tool to draw a rectangle. */
  RECTANGLE,

  /** Tool to draw a filled circle. */
  FILLED_CIRCLE,

  /** Tool to draw a circle. */
  CIRCLE,

  /** Tool to draw a filled polygon. */
  FILLED_POLYGON,

  /** Tool to draw a polygon. */
  POLYGON,
}

/**
 * Namespace for tools.
 */
export namespace Tool {
  /**
   * Maps the drawing tools to the corresponding JSON element types.
   * @param tool - The drawing tool.
   * @returns The JSON element type corresponding to the drawing tool, or null if no such type exists.
   */
  export function shapeType(tool: Tool): Shape.Type | null {
    switch (tool) {
      case Tool.LINE:
        return Shape.Type.LINE;
      case Tool.FILLED_RECTANGLE:
      case Tool.RECTANGLE:
        return Shape.Type.RECTANGLE;
      case Tool.FILLED_CIRCLE:
      case Tool.CIRCLE:
        return Shape.Type.CIRCLE;
      case Tool.FILLED_POLYGON:
      case Tool.POLYGON:
        return Shape.Type.POLYGON;
      default:
        return null;
    }
  }

  /**
   * Determines if a drawing tool corresponds to a filled shape.
   * @param tool - The drawing tool.
   * @returns If the drawing tool corresponds to a filled shape.
   */
  export function isFilled(tool: Tool): boolean {
    switch (tool) {
      case Tool.FILLED_RECTANGLE:
      case Tool.FILLED_CIRCLE:
      case Tool.FILLED_POLYGON:
        return true;
      default:
        return false;
    }
  }
}

export namespace State {
  /**
   * Deletes the selected shape from the list of shapes.
   * @param currentShape The shape to delete.
   * @param shapes The list of shapes.
   * @returns The list of shapes with the selected shape removed.
   */
  export function remove(
    currentShape: Shape,
    shapes: Shape[],
  ): [Shape | null, Shape[]] {
    return [null, shapes.filter((shape) => shape !== currentShape)];
  }

  /**
   * Moves the selected shape to the top of the list of shapes.
   * @param currentShape The shape to move to the top.
   * @param shapes The list of shapes.
   * @returns The list of shapes with the selected shape moved to the top.
   */
  export function moveToTop(
    currentShape: Shape,
    shapes: Shape[],
  ): [Shape | null, Shape[]] {
    return [
      currentShape,
      shapes.filter((shape) => shape !== currentShape).concat(currentShape),
    ];
  }

  /**
   * Moves the selected shape to the bottom of the list of shapes.
   * @param currentShape The shape to move to the top.
   * @param shapes The list of shapes.
   * @returns The list of shapes with the selected shape moved to the top.
   */
  export function moveToBottom(
    currentShape: Shape,
    shapes: Shape[],
  ): [Shape | null, Shape[]] {
    return [
      currentShape,
      [currentShape].concat(shapes.filter((shape) => shape !== currentShape)),
    ];
  }

  /**
   * Duplicates the selected shape.
   * @param currentShape The shape to duplicate.
   * @param shapes The list of shapes.
   * @returns The list of shapes with the selected shape duplicated.
   */
  export function duplicate(
    currentShape: Shape,
    shapes: Shape[],
  ): [Shape | null, Shape[]] {
    const newShape = new Shape(
      currentShape.points,
      currentShape.color,
      currentShape.type,
      currentShape.filled,
    );
    return [newShape, shapes.concat(newShape)];
  }
}

export namespace History {
  /**
   * Undo the last action.
   * @param undoStack The list of previous states.
   * @param redoStack The list of undone states.
   * @returns The updated undo stack, the updated redo stack, and the new current state.
   */
  export function undo(undoStack: Shape[][], redoStack: Shape[][], shapes: Shape[]): [Shape[][], Shape[][], Shape[]] {
    if (undoStack.length === 0) {
      return [undoStack, redoStack, shapes];
    }

    redoStack.push(shapes);
    return [undoStack, redoStack, undoStack.pop()!];
  }

  /**
   * Redo the last undo.
   * @param undoStack The list of previous states.
   * @param redoStack The list of undone states.
   * @returns The updated undo stack, the updated redo stack, and the new current state.
   */
  export function redo(undoStack: Shape[][], redoStack: Shape[][], shapes: Shape[]): [Shape[][], Shape[][], Shape[]] {
    if (redoStack.length === 0) {
      return [undoStack, redoStack, shapes];
    }

    undoStack.push(shapes);
    return [undoStack, redoStack, redoStack.pop()!];
  }
}
