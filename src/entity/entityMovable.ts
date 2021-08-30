import { RenderContext } from "../canvas/renderContext";
import { Dimension, Entity, Point } from "./entity";

export interface IVelocity {
  dx: number,
  dy: number
}

export class EntityMovable extends Entity {
  velocity: IVelocity;
  velocityPerSecond: number;
  

  constructor(location: Point, dimensions: Dimension, container: Dimension, velocity: IVelocity) {
    super(location, dimensions, container);
    this.velocity = velocity;
  }

  update(delta: number) {
    const percentageOfSecond = delta / 1_000;
    const velocity = percentageOfSecond * this.velocityPerSecond;

    const xVelocity = velocity % (this.container.width / 2);
    this.location.x += xVelocity * this.velocity.dx;
    if (this.isXOutOfBounds()) {
      this.velocity.dx *= -1;
      this.location.x += this.velocity.dx * (xVelocity * 2);
    }

    const yVelocity = velocity % (this.container.height / 2);
    this.location.y += yVelocity * this.velocity.dy;
    if (this.isYOutOfBounds()) {
      this.velocity.dy *= -1;
      this.location.y += this.velocity.dy * (yVelocity * 2);
    }
  }
}