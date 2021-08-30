import { Canvas } from "./canvas";

export class CanvasManager {
  canvases: Canvas[] = [];
  canvasById: { [id: string]: Canvas } = {};

  constructor() {

  }

  add(id: string, canvas: Canvas) {
    if (id in this.canvasById) {
      throw new Error(`Canvas with id '${id}' already exists.`);
    }

    this.canvases.push(canvas);
    this.canvasById[id] = canvas;
  }

  update(delta: number) {
    for (let i = 0; i < this.canvases.length; i++) {
      this.canvases[i].update(delta);
    }
  }

  display() {
    for (let i = 0; i < this.canvases.length; i++) {
      const c = this.canvases[i];
      c.isDrawing && c.display();
    }
  }
}
