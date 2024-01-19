import { Shape } from "./geometry";

/**
 * Type representing a shape in JSON format.
 */
export type JSONShape = {
  /** Name of the shape. */
  name: string;

  /** ???? */
  editableColorIndex: number;

  /** Whether the shape is rotatable or not. */
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

export namespace Validation {
  /**
   * Validates a JSON shape object.
   *
   * @param shape - The JSON shape object to validate.
   * @returns If the object is valid
   */
  export function validateJSONShape(shape: JSONShape): boolean {
    if (
      !shape.name ||
      typeof shape.name !== "string" ||
      typeof shape.editableColorIndex !== "number" ||
      typeof shape.rotate !== "boolean" ||
      !Array.isArray(shape.elements)
    ) {
      return false;
    }

    for (const element of shape.elements) {
      if (!validateJSONElement(element)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Validates a JSON element object.
   *
   * @param element - The JSON element object to validate.
   * @returns If the object is valid.
   */
  function validateJSONElement(element: JSONElement): boolean {
    switch (element.type) {
      case Shape.Type.LINE:
        return validateJSONLine(element as JSONLine);
      case Shape.Type.CIRCLE:
        return validateJSONCircle(element as JSONCircle);
      case Shape.Type.RECTANGLE:
        return validateJSONRectangle(element as JSONRectangle);
      case Shape.Type.POLYGON:
        return validateJSONPolygon(element as JSONPolygon);
      default:
        return false;
    }
  }

  /**
   * Validates a JSON line object.
   *
   * @param line - The JSON line object to validate.
   * @returns If the object is valid.
   */
  function validateJSONLine(line: JSONLine): boolean {
    return (
      typeof line.x1 === "number" &&
      typeof line.y1 === "number" &&
      typeof line.x2 === "number" &&
      typeof line.y2 === "number" &&
      typeof line.color === "string" &&
      typeof line.filled === "boolean" &&
      typeof line.marked === "boolean"
    );
  }

  /**
   * Validates a JSON circle object.
   *
   * @param circle - The JSON circle object to validate.
   * @returns If the object is valid.
   */
  function validateJSONCircle(circle: JSONCircle): boolean {
    return (
      typeof circle.x === "number" &&
      typeof circle.y === "number" &&
      typeof circle.diam === "number" &&
      typeof circle.color === "string" &&
      typeof circle.filled === "boolean" &&
      typeof circle.marked === "boolean"
    );
  }

  /**
   * Validates a JSON rectangle object.
   *
   * @param rectangle - The JSON rectangle object to validate.
   * @returns If the object is valid.
   */
  function validateJSONRectangle(rectangle: JSONRectangle): boolean {
    return (
      typeof rectangle.xmin === "number" &&
      typeof rectangle.ymin === "number" &&
      typeof rectangle.xmax === "number" &&
      typeof rectangle.ymax === "number" &&
      typeof rectangle.color === "string" &&
      typeof rectangle.filled === "boolean" &&
      typeof rectangle.marked === "boolean"
    );
  }

  /**
   * Validates a JSON polygon object.
   *
   * @param polygon - The JSON polygon object to validate.
   * @returns If the object is valid.
   */
  function validateJSONPolygon(polygon: JSONPolygon): boolean {
    return (
      Array.isArray(polygon.xcors) &&
      Array.isArray(polygon.ycors) &&
      polygon.xcors.length === polygon.ycors.length &&
      polygon.xcors.every((x: any) => typeof x === "number") &&
      polygon.ycors.every((y: any) => typeof y === "number") &&
      typeof polygon.color === "string" &&
      typeof polygon.filled === "boolean" &&
      typeof polygon.marked === "boolean"
    );
  }
}

/**
 * Type representing a JSON element.
 */
export type JSONElement = JSONLine | JSONCircle | JSONRectangle | JSONPolygon;

export namespace Conversion {
  /**
   * Converts a JSON line object to an SVG line element.
   *
   * @param line - The JSON line object to convert.
   * @returns The SVG line element.
   */
  function toSVGLine(line: JSONLine): string {
    return `<line x1="${line.x1}" y1="${line.y1}" x2="${line.x2}" y2="${line.y2}" stroke="${line.color}" stroke-width="2" />`;
  }

  /**
   * Converts a JSON circle object to an SVG circle element.
   *
   * @param circle - The JSON circle object to convert.
   * @returns The SVG circle element.
   */
  function toSVGCircle(circle: JSONCircle): string {
    return `<circle cx="${circle.x + circle.diam / 2}" cy="${circle.y + circle.diam / 2}" r="${circle.diam / 2}" stroke="${circle.color}" stroke-width="2" fill="${circle.filled ? circle.color : "none"}" />`;
  }

  /**
   * Converts a JSON rectangle object to an SVG rectangle element.
   *
   * @param rectangle - The JSON rectangle object to convert.
   * @returns The SVG rectangle element.
   */
  function toSVGRectangle(rectangle: JSONRectangle): string {
    return `<rect x="${rectangle.xmin}" y="${rectangle.ymin}" width="${rectangle.xmax - rectangle.xmin}" height="${rectangle.ymax - rectangle.ymin}" stroke="${rectangle.color}" stroke-width="2" fill="${rectangle.filled ? rectangle.color : "none"}" />`;
  }

  /**
   * Converts a JSON polygon object to an SVG polygon element.
   *
   * @param polygon - The JSON polygon object to convert.
   * @returns The SVG polygon element.
   */
  function toSVGPolygon(polygon: JSONPolygon): string {
    const points = polygon.xcors.map((xcor, i) => `${xcor},${polygon.ycors[i]}`).join(" ");
    return `<polygon points="${points}" stroke="${polygon.color}" stroke-width="2" fill="${polygon.filled ? polygon.color : "none"}" />`;
  }

  export function toSVG(shape: JSONShape): string {
    const elements = shape.elements.map((element) => {
      switch (element.type) {
        case Shape.Type.LINE:
          return toSVGLine(element as JSONLine);
        case Shape.Type.CIRCLE:
          return toSVGCircle(element as JSONCircle);
        case Shape.Type.RECTANGLE:
          return toSVGRectangle(element as JSONRectangle);
        case Shape.Type.POLYGON:
          return toSVGPolygon(element as JSONPolygon);
      }
    });

    return elements.join("\n");
  }
}
