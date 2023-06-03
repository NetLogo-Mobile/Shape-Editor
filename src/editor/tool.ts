import { Shape } from "./geometry";

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
