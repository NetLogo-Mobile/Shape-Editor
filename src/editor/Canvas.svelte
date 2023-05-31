<script lang="ts">
    import type { JSONShape } from "./json_shape";
    import type { Shape } from "./shape";
    import { Tool } from "./tool";
    import { posToCoords } from "./transform";
    import { JSONElementtoSVG } from "./translation";

    export let name: string = "default";
    export let current_tool: Tool = Tool.Select;
    export let current_color: Color = "#FFFFFF";
    export let editable_color_index: number = 0;
    export let rotate: boolean = true;

    let current_shape: Shape = undefined;
    let shapes: Shape[] = [];

    function handleMove(event: MouseEvent) {
        if (!current_shape) {
            return;
        }

        const canvas: HTMLElement = document.querySelector("#canvas");
        let coords = posToCoords(canvas, {
            x: event.clientX,
            y: event.clientY,
        });

        switch (current_tool) {
            case Tool.Select:
            case Tool.Delete:
                break;
            case Tool.DrawLine:
                if (current_shape.coords.length == 1) {
                    current_shape.svg.setAttribute(
                        "x1",
                        current_shape.coords[0].x.toString()
                    );
                    current_shape.svg.setAttribute(
                        "y1",
                        current_shape.coords[0].y.toString()
                    );
                }
                current_shape.svg.setAttribute("x2", coords.x.toString());
                current_shape.svg.setAttribute("y2", coords.y.toString());
                break;
            case Tool.DrawRectangle:
            case Tool.DrawFilledRectangle:
                if (current_shape.coords.length == 1) {
                    current_shape.svg.setAttribute(
                        "x",
                        Math.min(current_shape.coords[0].x, coords.x).toString()
                    );
                    current_shape.svg.setAttribute(
                        "y",
                        Math.min(current_shape.coords[0].y, coords.y).toString()
                    );
                }

                current_shape.svg.setAttribute(
                    "width",
                    Math.abs(coords.x - current_shape.coords[0].x).toString()
                );
                current_shape.svg.setAttribute(
                    "height",
                    Math.abs(coords.y - current_shape.coords[0].y).toString()
                );

                break;
            case Tool.DrawCircle:
            case Tool.DrawFilledCircle:
                if (current_shape.coords.length == 1) {
                    current_shape.svg.setAttribute(
                        "cx",
                        current_shape.coords[0].x.toString()
                    );
                    current_shape.svg.setAttribute(
                        "cy",
                        current_shape.coords[0].y.toString()
                    );
                }

                current_shape.svg.setAttribute(
                    "r",
                    Math.sqrt(
                        Math.pow(coords.x - current_shape.coords[0].x, 2) +
                            Math.pow(coords.y - current_shape.coords[0].y, 2)
                    ).toString()
                );
                break;
            case Tool.DrawFilledPolygon:
            case Tool.DrawPolygon:
                if (current_shape.coords.length == 0) {
                    current_shape.svg.setAttribute(
                        "points",
                        `${coords.x},${coords.y}`
                    );
                } else {
                    current_shape.svg.setAttribute(
                        "points",
                        current_shape.coords
                            .map((coord) => `${coord.x},${coord.y}`)
                            .join(" ") +
                            ` ${coords.x},${coords.y}`
                    );
                }
                break;
        }

        current_shape.svg.setAttribute("stroke-width", "1");
        switch (current_tool) {
            case Tool.Select:
            case Tool.Delete:
                break;
            case Tool.DrawLine:
                current_shape.svg.setAttribute(
                    "stroke",
                    current_color.toString()
                );
                break;
            case Tool.DrawRectangle:
            case Tool.DrawCircle:
            case Tool.DrawPolygon:
                current_shape.svg.setAttribute(
                    "stroke",
                    current_color.toString()
                );
                current_shape.svg.setAttribute("fill", "none");
                break;
            case Tool.DrawFilledRectangle:
            case Tool.DrawFilledCircle:
            case Tool.DrawFilledPolygon:
                current_shape.svg.setAttribute("stroke", "none");
                current_shape.svg.setAttribute(
                    "fill",
                    current_color.toString()
                );
                break;
        }
    }

    function handleClick(event: MouseEvent) {
        const canvas: HTMLElement = document.querySelector("#canvas");
        let coords = posToCoords(canvas, {
            x: event.clientX,
            y: event.clientY,
        });

        switch (current_tool) {
            case Tool.Select:
            case Tool.Delete:
                break;
            case Tool.DrawLine:
                if (!current_shape) {
                    current_shape = {
                        coords: [coords],
                        svg: document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "line"
                        ),
                    };
                    canvas.appendChild(current_shape.svg);
                } else {
                    current_shape.coords.push(coords);
                    if (current_shape.coords.length == 2) {
                        canvas.appendChild(current_shape.svg);
                        shapes.push(current_shape);
                        current_shape = undefined;
                    }
                }
                break;
            case Tool.DrawRectangle:
            case Tool.DrawFilledRectangle:
                if (!current_shape) {
                    current_shape = {
                        coords: [coords],
                        svg: document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "rect"
                        ),
                    };
                    canvas.appendChild(current_shape.svg);
                } else {
                    current_shape.coords.push(coords);
                    if (current_shape.coords.length == 2) {
                        canvas.appendChild(current_shape.svg);
                        shapes.push(current_shape);
                        current_shape = undefined;
                    }
                }
                break;
            case Tool.DrawCircle:
            case Tool.DrawFilledCircle:
                if (!current_shape) {
                    current_shape = {
                        coords: [coords],
                        svg: document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "circle"
                        ),
                    };
                    canvas.appendChild(current_shape.svg);
                } else {
                    current_shape.coords.push(coords);
                    if (current_shape.coords.length == 2) {
                        canvas.appendChild(current_shape.svg);
                        shapes.push(current_shape);
                        current_shape = undefined;
                    }
                }
                break;
            case Tool.DrawPolygon:
            case Tool.DrawFilledPolygon:
                if (!current_shape) {
                    current_shape = {
                        coords: [coords],
                        svg: document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "polygon"
                        ),
                    };
                    canvas.appendChild(current_shape.svg);
                } else {
                    current_shape.coords.push(coords);
                    const lastLastCoord = current_shape.coords[current_shape.coords.length - 2];
					const lastCoord = current_shape.coords[current_shape.coords.length - 1];

                    if (lastCoord.x == lastLastCoord.x && lastCoord.y == lastLastCoord.y) {
                        current_shape.coords.pop();
                        canvas.appendChild(current_shape.svg);
                        shapes.push(current_shape);
                        current_shape = undefined;
                    }
                }
                break;
        }
    }

    export function importShape(shape: JSONShape) {
        const canvas = document.querySelector("#canvas");
        name = shape.name;
        editable_color_index = shape.editableColorIndex;
        rotate = shape.rotate;

        const elements = shape.elements;
        for (var element of elements) {
            canvas.appendChild(JSONElementtoSVG(element));
        }
    }

    export function reset() {
        const canvas = document.querySelector("#canvas");
        name = "default";
        current_tool = Tool.Select;
        current_color = "#000000";
        editable_color_index = 0;
        rotate = true;

        while (canvas.childElementCount > 1) {
            canvas.removeChild(canvas.lastChild);
        }
    }
</script>

<svg
    on:mousemove={handleMove}
    on:mousedown={handleClick}
    id="canvas"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 300"
>
    <g id="grid" stroke="rgba(255, 255, 255, 0.1)" stroke-width="0.5">
        {#each { length: 11 } as _, i}
            <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
        {/each}

        {#each { length: 11 } as _, i}
            <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
        {/each}
    </g>
    <slot />
</svg>
