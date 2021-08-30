import { Dimension, Point } from '../entity/entity';

export class RenderContext {
  context: CanvasRenderingContext2D;
  dimensions: Dimension;
  fontSize: number = 20;

  constructor(context: CanvasRenderingContext2D, dimensions: Dimension) {
    this.context = context;
    this.dimensions = dimensions;
    this.context.font = this.fontSize + 'px Courier New';
  }

  clear() {
    this.context.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  measureText(text: string): TextMetrics {
    return this.context.measureText(text);
  }

  strokeText(text: string, point: Point, isAlignedRight: boolean = false) {
    if (isAlignedRight) {
      point.x -= this.context.measureText(text).width;
    }

    this.context.strokeText(text, point.x, point.y);
  }

  strokeLines(data: Point[]) {
    let point: Point = data.shift();
    this.context.moveTo(point.x, point.y);
    for (let i = 0, l = data.length; i < l; i++) {
      point = data[i];
      this.context.moveTo(point.x, point.y);
    }

    this.context.stroke();
  }
}