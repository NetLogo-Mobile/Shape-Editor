import { JSONElementType } from './json_shape';
import type { JSONElement, JSONLine, JSONCircle, JSONRectangle, JSONPolygon } from './json_shape';

export function JSONElementtoSVG(shape: JSONElement): SVGElement {
    let svg: SVGElement;
    
    function setStyle(svg: SVGElement): void {
        svg.setAttribute('stroke', shape.color.toString());
        if (shape.filled) {
            svg.setAttribute('stroke-width', '0');
            svg.setAttribute('fill', shape.color.toString());
        } else {
            svg.setAttribute('stroke-width', '1');
            svg.setAttribute('fill', 'none');
        }
    }
 
    switch (shape.type) {
        case JSONElementType.Line:
            const line = shape as JSONLine;
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            svg.setAttribute('x1', line.x1.toString());
            svg.setAttribute('y1', line.y1.toString());
            svg.setAttribute('x2', line.x2.toString());
            svg.setAttribute('y2', line.y2.toString());
            setStyle(svg);
            break;
        case JSONElementType.Circle:
            const circle = shape as JSONCircle;
            const radius = circle.diam / 2;
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            svg.setAttribute('cx', (circle.x + radius).toString());
            svg.setAttribute('cy', (circle.y + radius).toString());
            svg.setAttribute('r', radius.toString());
            setStyle(svg);
            break;
        case JSONElementType.Rectangle:
            const rect = shape as JSONRectangle;
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            svg.setAttribute('x', rect.xmin.toString());
            svg.setAttribute('y', rect.ymin.toString());
            svg.setAttribute('width', (rect.xmax - rect.xmin).toString());
            svg.setAttribute('height', (rect.ymax - rect.ymin).toString());
            setStyle(svg);
            break;
        case JSONElementType.Polygon:
            const poly = shape as JSONPolygon;
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            svg.setAttribute('points', poly.xcors.map((x, i) => `${x},${poly.ycors[i]}`).join(' '));
    }

    return svg;
}

export function SVGtoJSONElement(svg: SVGElement): JSONElement {
    let json: Object;

    function getStyle(svg: SVGElement): Object {
        return {
            color: svg.getAttribute('stroke'),
            filled: svg.getAttribute('stroke-width') === '0',
            marked: false,
        };
    }

    switch (svg.tagName) {
        case 'line':
            const line = svg as SVGLineElement;
            json = {
                type: JSONElementType.Line,
                x1: Number(line.getAttribute('x1')),
                y1: Number(line.getAttribute('y1')),
                x2: Number(line.getAttribute('x2')),
                y2: Number(line.getAttribute('y2')),
                ...getStyle(svg),
            };
            break;
        case 'circle':
            const circle = svg as SVGCircleElement;
            const radius = Number(circle.getAttribute('r'));
            json = {
                type: JSONElementType.Circle,
                x: Number(circle.getAttribute('cx')) - radius,
                y: Number(circle.getAttribute('cy')) - radius,
                diam: radius * 2,
                ...getStyle(svg),
            };
            break;
        case 'rect':
            const rect = svg as SVGRectElement;
            json = {
                type: JSONElementType.Rectangle,
                xmin: Number(rect.getAttribute('x')),
                ymin: Number(rect.getAttribute('y')),
                xmax: Number(rect.getAttribute('x')) + Number(rect.getAttribute('width')),
                ymax: Number(rect.getAttribute('y')) + Number(rect.getAttribute('height')),
                ...getStyle(svg),
            };
            break;
        case 'polygon':
            const poly = svg as SVGPolygonElement;
            const points = poly.getAttribute('points').split(' ');
            json = {
                type: JSONElementType.Polygon,
                xcors: points.map(point => Number(point.split(',')[0])),
                ycors: points.map(point => Number(point.split(',')[1])),
                ...getStyle(svg),
            };
    }

    return json as JSONElement;
}
