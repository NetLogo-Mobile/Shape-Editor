const SCALE = 300;

export interface R2 {
  x: number; // 0 - 300
  y: number; // 0 - 300
}

// mouse position to canvas coordinates
export function posToCoords(canvas: HTMLElement, point: R2): R2 {
  const rect: DOMRect = canvas.getBoundingClientRect();

  return {
    x: SCALE * (point.x - rect.left) / rect.width,
    y: SCALE * (point.y - rect.top) / rect.height,
  };
}

// canvas coordinates to mouse position
function coordsToPos(canvas: HTMLElement, point: R2): R2 {
  const rect: DOMRect = canvas.getBoundingClientRect();

  return {
    x: rect.left + rect.width * point.x / SCALE,
    y: rect.top + rect.height * point.y / SCALE,
  };
}

function flipHorizontal(point: R2): R2 {
  return {
    x: SCALE - point.x,
    y: point.y
  };
}

function flipVertical(point: R2): R2 {
  return {
    x: point.x,
    y: SCALE - point.y
  };
}

function rotateCW(point: R2): R2 {
  return {
    x: SCALE - point.y,
    y: point.x
  };
}

function rotateCCW(point: R2): R2 {
  return {
    x: point.y,
    y: SCALE - point.x
  };
}
