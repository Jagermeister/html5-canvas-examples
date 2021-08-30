import { Dimension, Entity } from '../entity/entity';
import { RenderContext } from './renderContext';

export class Canvas {
  nativeElement: HTMLCanvasElement;
  containerId: string;
  _dimensions: Dimension;

  context: RenderContext;
  isDrawing: boolean = true;

  entities: Entity[] = [];

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

  update(delta: number) {
    for(let i = 0; i < this.entities.length; i++) {
      this.entities[i].update(delta);
    }
  }

  display() {
    this.context.clear();
    for(let i = 0; i < this.entities.length; i++) {
      this.entities[i].display(this.context);
    }
  }
}