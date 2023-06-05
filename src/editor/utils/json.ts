import { Shape } from './geometry';

/**
 * Type representing a shape in JSON format.
 */
export type JSONShape = {
  /** Name of the shape. */
  name: string;

  /** ???? */
  editableColorIndex: number;

  /** ???? */
  rotate: boolean;

  /** An array of elements making up the shape. */
  elements: JSONElement[];
};

/**
 * Interface representing a JSON element.
 */
export type JSONBaseElement = {
  /** The type of the JSON element. */
  type: Shape.Type;

  /** The color of the JSON element. */
  color: string;

  /** Indicates whether the element is filled or not. */
  filled: boolean;

  /** ???? */
  marked: boolean;
};

/**
 * Interface representing a line in JSON format.
 */
export type JSONLine = JSONBaseElement & {
  /** X-coordinate of the starting point of the line. */
  x1: number;

  /** Y-coordinate of the starting point of the line. */
  y1: number;

  /** X-coordinate of the ending point of the line. */
  x2: number;

  /** Y-coordinate of the ending point of the line. */
  y2: number;
};

/**
 * Interface representing a circle in JSON format.
 *
 * @remarks
 * The center of the circle is at `x + diam / 2`, `y + diam / 2`.
 */
export type JSONCircle = JSONBaseElement & {
  /** X-coordinate of the top-left point of the bounding box of the circle. */
  x: number;

  /** Y-coordinate of the top-left point of the bounding box of the circle. */
  y: number;

  /** Diameter of the circle. */
  diam: number;
};

/**
 * Interface representing a rectangle in JSON format.
 */
export type JSONRectangle = JSONBaseElement & {
  /** X-coordinate of the left edge of the rectangle. */
  xmin: number;

  /** Y-coordinate of the top edge of the rectangle. */
  ymin: number;

  /** X-coordinate of the right edge of the rectangle. */
  xmax: number;

  /** Y-coordinate of the bottom edge of the rectangle. */
  ymax: number;
};

/**
 * Interface representing a polygon in JSON format.
 */
export type JSONPolygon = JSONBaseElement & {
  /** An array of x-coordinates of the vertices of the polygon. */
  xcors: number[];

  /** An array of y-coordinates of the vertices of the polygon. */
  ycors: number[];
};

/**
 * Type representing a JSON element.
 */
export type JSONElement = JSONLine | JSONCircle | JSONRectangle | JSONPolygon;
