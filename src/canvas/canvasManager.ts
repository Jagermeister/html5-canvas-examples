import { Dimension, Point } from '../entity/entity';``

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

export class Canvas {
  nativeElement: HTMLCanvasElement;
  containerId: string;
  _dimensions: Dimension;

  context: RenderContext;
  isDrawing: boolean = true;

  constructor(canvasElement: HTMLCanvasElement, dimensions: Dimension) {
    this.nativeElement = canvasElement;
    this.dimensions = dimensions;
    this.context = new RenderContext(this.nativeElement.getContext("2d"), dimensions);
  }

  static create(containerId: string, id: string, dimensions: Dimension): Canvas {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Parent container with id '${containerId}' was not found.`);
    }
  
    const c = document.createElement('CANVAS');
    c.id = id;
    c.oncontextmenu = () => { return false; };
    container.appendChild(c);

    const canvas = new this(c as HTMLCanvasElement, dimensions);
    canvas.containerId = containerId;

    return canvas;
  }

  get id(): string {
    return this.nativeElement?.id;
  }

  set dimensions(dimensions: Dimension) {
    this._dimensions = dimensions;
    this.nativeElement.setAttribute('width', dimensions.width.toString());
    this.nativeElement.setAttribute('height', dimensions.height.toString());
  }

  update(delta: number) { }

  display() {
    this.context.clear()
    this.context.strokeText("asdf", { x: 100, y: 100 });
  }
}

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
