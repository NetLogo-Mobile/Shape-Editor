<!--
This component allows users to apply a transformation to a set of shapes.
The transformation is provided as a function from R2 to R2.
Shapes are transformed by applying the transformation to each of their defining points.
Rectangular shapes are handled as a special case, ensuring that the rectangle's orientation
is maintained after the transformation (top-left corner remains at top-left). 

@component
@param shapes An array of shapes that will be transformed when the button is clicked. Should be bound.
@param currentShape The shape that is currently being edited. Should be bound.
@param transformation A transformation function from R2 to R2.
-->
<script lang="ts">
  import type { R2, Shape } from '../utils/geometry';

  /**
   * A transformation function from R2 to R2.
   * @param point A point in R2.
   * @returns The transformed point.
   */
  export let transformation: (point: R2) => R2;
  /** An array of shapes that will be transformed when the button is clicked. */
  export let shapes: Shape[];
  /** The shape that is currently being edited. */
  export let currentShape: Shape | null = null;
  /** A function to update the state. */
  export let pushState: () => void;

  /**
   * Apply the transformation to a single shape.
   * @param shape The shape to transform.
   */
  const transformShape = (shape: Shape) => {
    shape.points = shape.points.map(transformation);
  };

  /**
   * Apply the transformation to all shapes.
   */
  const transformShapes = () => {
    pushState();
    if (currentShape !== null) {
      transformShape(currentShape);
      currentShape = currentShape;
    } else {
      shapes.forEach(transformShape);
    }

    shapes = shapes;
  };
</script>

<style lang="scss">
  @import '../style/variables.scss';
  @import '../style/button.scss';

  button {
    border-left: $color2 1px solid;

    &:last-child {
      border-radius: 0 $corner-radius $corner-radius 0;
    }
  }
</style>

<button on:click={transformShapes}>
  <slot />
</button>
