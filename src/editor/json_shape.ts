export interface JSONShape {
    name: string;
    editableColorIndex: number;
    rotate: boolean;
    elements: JSONElement[];
}

export enum JSONElementType {
    Line = 'line',
    Circle = 'circle',
    Rectangle = 'rectangle',
    Polygon = 'polygon',
}

export interface JSONElement {
    type: JSONElementType;
    color: Color;
    filled: boolean;
    marked: boolean;
}

export interface JSONLine extends JSONElement {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface JSONCircle extends JSONElement {
    x: number;
    y: number;
    diam: number;
}

export interface JSONRectangle extends JSONElement {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
}

export interface JSONPolygon extends JSONElement {
    xcors: number[];
    ycors: number[];
}
