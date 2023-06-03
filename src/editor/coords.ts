/** A constant used to scale the canvas size. */
export const SCALE = 300;

/**
 * Represents a 2D point in the Cartesian coordinate system.
 * x and y values are expected to be in the range 0 - 300.
 */
export interface R2 {
  /** X-coordinate of the point. */
  x: number;

  /** Y-coordinate of the point. */
  y: number;
}

/**
 * Converts mouse position to canvas coordinates.
 * @param canvas - The HTML element representing the canvas.
 * @param point - The point in R2 representing the mouse position.
 * @returns A point in R2 representing the coordinates on the canvas.
 */
export function posToCoords(canvas: Element, point: R2): R2 {
  const rect: DOMRect = canvas.getBoundingClientRect();

  return {
    x: SCALE * (point.x - rect.left) / rect.width,
    y: SCALE * (point.y - rect.top) / rect.height,
  };
}

/**
 * Converts canvas coordinates to mouse position.
 * @param canvas - The HTML element representing the canvas.
 * @param point - The point in R2 representing the canvas coordinates.
 * @returns A point in R2 representing the mouse position.
 */
export function coordsToPos(canvas: Element, point: R2): R2 {
  const rect: DOMRect = canvas.getBoundingClientRect();

  return {
    x: rect.left + rect.width * point.x / SCALE,
    y: rect.top + rect.height * point.y / SCALE,
  };
}
