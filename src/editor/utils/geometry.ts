import {
  JSONElement,
  JSONLine,
  JSONCircle,
  JSONRectangle,
  JSONPolygon,
  JSONBaseElement,
} from './json';

/** A constant used to scale the canvas size. */
export const SCALE = 300;
/** A constant used to round coordinates. */
export const PRECISION = 100;

/**
 * Represents a 2D point in the Cartesian coordinate system.
 * x and y values are expected to be in the range 0 - 300.
 */
export type R2 = {
  /** X-coordinate of the point. */
  x: number;

  /** Y-coordinate of the point. */
  y: number;
};

/**
 * Namespace containing functions for working with 2D points.
 */
export namespace R2 {
  /**
   * Converts mouse position to canvas coordinates.
   * @param canvas - The HTML element representing the canvas.
   * @param event - The mouse event.
   * @returns A point representing the coordinates on the canvas.
   */
  export function fromMouse(canvas: Element, event: MouseEvent): R2 {
    const rect: DOMRect = canvas.getBoundingClientRect();

    return {
      x: Math.round(PRECISION * SCALE * (event.clientX - rect.left) / rect.width) / PRECISION,
      y: Math.round(PRECISION * SCALE * (event.clientY - rect.top) / rect.height) / PRECISION,
    };
  }

  /**
   * Gets the Euclidean distance between two points.
   * @param p1 - The first point.
   * @param p2 - The second point.
   * @returns The distance between the two points.
   */
  export function l2(p1: R2, p2: R2): number {
    return Math.round(PRECISION * Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)) / PRECISION;
  }
}

export type Shape = {
  /** An array of points defining the shape. */
  points: R2[];
  /** The color of the shape. */
  color: string;
  /** The type of the shape. */
  type: Shape.Type;
  /** Indicates whether the shape is filled or not. */
  filled: boolean;
}

/**
 * Class representing a shape.
 */
export namespace Shape {
  /**
   * Converts a JSONElement to a Shape.
   * @param shape - The JSONElement to be converted.
   * @returns The corresponding Shape.
   */
  export function fromJSON(shape: JSONElement): Shape {
    let points: R2[];

    switch (shape.type) {
      case Shape.Type.LINE:
        const line = shape as JSONLine;
        points = [
          { x: line.x1, y: line.y1 },
          { x: line.x2, y: line.y2 },
        ];
        break;
      case Shape.Type.CIRCLE:
        const circle = shape as JSONCircle;
        const radius = circle.diam / 2;
        points = [
          { x: circle.x + radius, y: circle.y + radius },
          { x: circle.x + radius, y: circle.y },
        ];
        break;
      case Shape.Type.RECTANGLE:
        const rect = shape as JSONRectangle;
        points = [
          { x: rect.xmin, y: rect.ymin },
          { x: rect.xmax, y: rect.ymax },
        ];
        break;
      case Shape.Type.POLYGON:
        const poly = shape as JSONPolygon;
        points = poly.xcors.map((xcor, i) => ({ x: xcor, y: poly.ycors[i] }));
        break;
    }

    return { points, color: shape.color, type: shape.type, filled: shape.filled };
  }

  /**
   * Converts a Shape to a JSONElement.
   * @param this - The Shape to be converted.
   * @returns The corresponding JSONElement.
   */
  export function toJSON(shape: Shape): JSONElement {
    let common: JSONBaseElement = {
      type: shape.type,
      color: shape.color,
      filled: shape.filled,
      marked: false,
    };

    shape.points = shape.points.map((point) => {
      return {
        x: Math.round(PRECISION * point.x) / PRECISION,
        y: Math.round(PRECISION * point.y) / PRECISION,
      }
    });

    switch (shape.type) {
      case Shape.Type.LINE:
        return {
          ...common,
          x1: shape.points[0].x,
          y1: shape.points[0].y,
          x2: shape.points[1].x,
          y2: shape.points[1].y,
        };
      case Shape.Type.CIRCLE:
        const radius = R2.l2(shape.points[0], shape.points[1]);
        return {
          ...common,
          x: shape.points[0].x + radius,
          y: shape.points[0].y + radius,
          diam: radius * 2,
        };
      case Shape.Type.RECTANGLE:
        return {
          ...common,
          xmin: Math.min(shape.points[0].x, shape.points[1].x),
          ymin: Math.min(shape.points[0].y, shape.points[1].y),
          xmax: Math.max(shape.points[0].x, shape.points[1].x),
          ymax: Math.max(shape.points[0].y, shape.points[1].y),
        };
      case Shape.Type.POLYGON:
        return {
          ...common,
          xcors: shape.points.map((point) => point.x),
          ycors: shape.points.map((point) => point.y),
        };
    }
  }
}

/**
 * Namespace for shapes.
 */
export namespace Shape {
  /**
   * Enum representing the types of shapes.
   */
  export enum Type {
    /** Represents a line. */
    LINE = 'line',

    /** Represents a circle. */
    CIRCLE = 'circle',

    /** Represents a rectangle. */
    RECTANGLE = 'rectangle',

    /** Represents a polygon. */
    POLYGON = 'polygon',
  }
}

/**
 * Namespace for transforms.
 */
export namespace Transforms {
  /**
   * Flips a point in R2 horizontally.
   * @param point - The point in R2 to be flipped.
   * @returns A new point in R2, which is the horizontal flip of the input point.
   */
  export function flipHorizontal(point: R2): R2 {
    return {
      x: SCALE - point.x,
      y: point.y,
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
      y: SCALE - point.y,
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
      y: point.x,
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
      y: SCALE - point.x,
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
      y: point.y + delta.y,
    };
  }
}
