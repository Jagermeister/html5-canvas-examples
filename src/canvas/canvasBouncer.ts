import { Canvas, RenderContext } from "./canvasManager";
import { Dimension } from "../entity/entity";
import { Bouncer } from "../entity/bouncer";

export class CanvasBouncer extends Canvas {

  constructor(canvasElement: HTMLCanvasElement, dimensions: Dimension) {
    super(canvasElement, dimensions);
    this.entities.push(new Bouncer("Number One Bouncer!", dimensions));
    const b2 = new Bouncer("222 bouncer 222", dimensions);
    b2.location = { x: 100, y: 300 };
    this.entities.push(b2);
  }

    update(delta: number) {
      super.update(delta);
    }
  
    display() {
      super.display();
      this.context.strokeText("Bouncer Canvas", { x: 200, y: 100 });
    }
}