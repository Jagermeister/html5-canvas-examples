import { RenderContext } from "../canvas/renderContext";

export interface Point {
  x: number,
  y: number
}

export interface Dimension {
  width: number,
  height: number
}

export class Entity {
  location: Point;
  dimensions: Dimension;
  container: Dimension;

  constructor(location: Point, dimensions: Dimension, container: Dimension) {
    this.location = location
    this.dimensions = dimensions;
    this.container = container;
  }

  isXOutOfBounds() {
    return this.location.x < 0 || (this.location.x + this.dimensions.width) > this.container.width;
  }

  isYOutOfBounds() {
    return (this.location.y - this.dimensions.height) < 0 || this.location.y > this.container.height;
  }

  update(delta: number) {

  }

  display(ctx: RenderContext) {

  }
}