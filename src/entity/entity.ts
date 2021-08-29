export interface Point {
  x: number,
  y: number
}

export interface Dimension {
  width: number,
  height: number
}

export interface Velocity {
  dx: number,
  dy: number
}

export class Entity {
  location: Point;
  dimensions: Dimension;

  velocity: Velocity;

  constructor(location: Point, dimensions: Dimension, velocity: Velocity) {
    this.location = location
    this.velocity = velocity;
    this.dimensions = dimensions;
  }

  update(delta) {

  }

  display(ctx) {

  }
}