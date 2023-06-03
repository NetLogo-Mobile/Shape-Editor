import { JSONElementType } from "./json";

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
 * Maps the drawing tools to the corresponding JSON element types.
 * @param tool - The drawing tool.
 * @returns The JSON element type corresponding to the drawing tool, or null if no such type exists.
 */
export function toolToType(tool: Tool): JSONElementType | null {
  switch (tool) {
    case Tool.LINE:
      return JSONElementType.LINE;
    case Tool.FILLED_RECTANGLE:
    case Tool.RECTANGLE:
      return JSONElementType.RECTANGLE;
    case Tool.FILLED_CIRCLE:
    case Tool.CIRCLE:
      return JSONElementType.CIRCLE;
    case Tool.FILLED_POLYGON:
    case Tool.POLYGON:
      return JSONElementType.POLYGON;
    default:
      return null;
  }
}

/**
 * Determines if a drawing tool corresponds to a filled shape.
 * @param tool - The drawing tool.
 * @returns If the drawing tool corresponds to a filled shape.
 */
export function toolToFilled(tool: Tool): boolean {
  switch (tool) {
    case Tool.FILLED_RECTANGLE:
    case Tool.FILLED_CIRCLE:
    case Tool.FILLED_POLYGON:
      return true;
    default:
      return false;
  }
}
