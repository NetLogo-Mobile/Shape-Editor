import type { JSONElement, JSONCircle, JSONLine, JSONPolygon, JSONRectangle } from "./json";
import { JSONElementType } from "./json";
import type { R2 } from "./coords";

/**
 * Interface representing a shape.
 */
export interface Shape {
  /** An array of points defining the shape. */
  points: R2[];

  /** The color of the shape. */
  color: string;

  /** The type of the shape. */
  type: JSONElementType;

  /** Indicates whether the shape is filled or not. */
  filled: boolean;
}

/**
 * Converts a JSONElement to a Shape.
 * @param shape - The JSONElement to be converted.
 * @returns The corresponding Shape.
 */
export function fromJSON(shape: JSONElement): Shape {
  let points: R2[];

  switch (shape.type) {
    case JSONElementType.LINE:
      const line = shape as JSONLine;
      points = [{ x: line.x1, y: line.y1 }, { x: line.x2, y: line.y2 }];
      break;
    case JSONElementType.CIRCLE:
      const circle = shape as JSONCircle;
      const radius = circle.diam / 2;
      points = [{ x: circle.x + radius, y: circle.y + radius }, { x: circle.x + radius, y: circle.y }];
      break;
    case JSONElementType.RECTANGLE:
      const rect = shape as JSONRectangle;
      points = [{ x: rect.xmin, y: rect.ymin }, { x: rect.xmax, y: rect.ymax }];
      break;
    case JSONElementType.POLYGON:
      const poly = shape as JSONPolygon;
      points = poly.xcors.map((xcor, i) => ({ x: xcor, y: poly.ycors[i] }));
      break;
  }

  return { points, type: shape.type, color: shape.color, filled: shape.filled };
}

/**
 * Converts a Shape to a JSONElement.
 * @param shape - The Shape to be converted.
 * @returns The corresponding JSONElement.
 */
export function toJSON(shape: Shape): JSONElement {
  let json: JSONCircle | JSONLine | JSONPolygon | JSONRectangle;
  switch (shape.type) {
    case JSONElementType.LINE:
      json = {
        type: JSONElementType.LINE,
        x1: shape.points[0].x,
        y1: shape.points[0].y,
        x2: shape.points[1].x,
        y2: shape.points[1].y,
        color: shape.color,
        filled: shape.filled,
        marked: false,
      };
      break;
    case JSONElementType.CIRCLE:
      const radius = shape.points[1].x - shape.points[0].x;
      json = {
        type: JSONElementType.CIRCLE,
        x: shape.points[0].x + radius,
        y: shape.points[0].y + radius,
        diam: radius * 2,
        color: shape.color,
        filled: shape.filled,
        marked: false,
      };
      break;
    case JSONElementType.RECTANGLE:
      json = {
        type: JSONElementType.RECTANGLE,
        xmin: Math.min(shape.points[0].x, shape.points[1].x),
        ymin: Math.min(shape.points[0].y, shape.points[1].y),
        xmax: Math.max(shape.points[0].x, shape.points[1].x),
        ymax: Math.max(shape.points[0].y, shape.points[1].y),
        color: shape.color,
        filled: shape.filled,
        marked: false,
      };
      break;
    case JSONElementType.POLYGON:
      json = {
        type: JSONElementType.POLYGON,
        xcors: shape.points.map(point => point.x),
        ycors: shape.points.map(point => point.y),
        color: shape.color,
        filled: shape.filled,
        marked: false,
      };
      break;
  }

  return json;
}
