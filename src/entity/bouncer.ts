import { Dimension, Entity } from './entity';
import { utility } from '../utility';

export class Bouncer extends Entity {
  text: string;
  velocityPerSecond: number = 240;
  container: Dimension;

  constructor(text: string, container: Dimension) {
    super({ x: 5, y: 20}, { width: null, height: 20 }, { dx: 1, dy: 1 });
  
    this.text = text;
    this.container = container;
  }
  
  isXOutOfBounds() {
    return this.location.x < 0 || (this.location.x + this.dimensions.width) > this.container.width;
  }

  isYOutOfBounds() {
    return (this.location.y - this.dimensions.height) < 0 || this.location.y > this.container.height;
  }

  update(delta) {
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

  display(ctx) {
    if (this.dimensions.width == null) {
      this.dimensions.width = ctx.measureText(this.text).width
    }

    //utility.strokeText(ctx, this.text, this.location);
  }
};
