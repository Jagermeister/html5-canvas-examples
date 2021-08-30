import { Dimension } from './entity';
import { EntityMovable } from './entityMovable';
import { RenderContext } from '../canvas/renderContext';

export class Bouncer extends EntityMovable {
  text: string;
  velocityPerSecond: number = 240;

  constructor(text: string, container: Dimension) {
    super({ x: 5, y: 20}, { width: null, height: 20 }, container, { dx: 1, dy: 1 });
  
    this.text = text;
  }

  display(ctx: RenderContext) {
    if (this.dimensions.width == null) {
      this.dimensions.width = ctx.measureText(this.text).width;
    }

    ctx.strokeText(this.text, this.location);
  }
};
