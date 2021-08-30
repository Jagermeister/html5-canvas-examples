import { Canvas, RenderContext } from "./canvasManager";
import { Dimension } from "../entity/entity";

export class CanvasBouncer extends Canvas {

  constructor(canvasElement: HTMLCanvasElement, dimensions: Dimension) {
    super(canvasElement, dimensions);
  }

    update(delta: number) {
      super.update(delta);
    }
  
    display() {
      super.display();
      this.context.strokeText("bouncer", { x: 200, y: 100 });
    }
}