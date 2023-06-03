import { SCALE, type R2 } from "./coords";

/**
 * Flips a point in R2 horizontally.
 * @param point - The point in R2 to be flipped.
 * @returns A new point in R2, which is the horizontal flip of the input point.
 */
export function flipHorizontal(point: R2): R2 {
  return {
    x: SCALE - point.x,
    y: point.y
  };
}

/**
 * Flips a point in R2 vertically.
 * @param point - The point in R2 to be flipped.
 * @returns A new point in R2, which is the vertical flip of the input point.
 */
export function flipVertical(point: R2): R2 {
  return {
    x: point.x,
    y: SCALE - point.y
  };
}

/**
 * Rotates a point in R2 clockwise.
 * @param point - The point in R2 to be rotated.
 * @returns A new point in R2, which is the clockwise rotation of the input point.
 */
export function rotateCW(point: R2): R2 {
  return {
    x: SCALE - point.y,
    y: point.x
  };
}

/**
 * Rotates a point in R2 counterclockwise.
 * @param point - The point in R2 to be rotated.
 * @returns A new point in R2, which is the counterclockwise rotation of the input point.
 */
export function rotateCCW(point: R2): R2 {
  return {
    x: point.y,
    y: SCALE - point.x
  };
}

/**
 * Translates a point in R2 by a given delta.
 * @param point - The point in R2 to be translated.
 * @param delta - The point in R2 representing the translation vector.
 * @returns A new point in R2, which is the translation of the input point by the given delta.
 */
export function translate(point: R2, delta: R2): R2 {
  return {
    x: point.x + delta.x,
    y: point.y + delta.y
  };
}
