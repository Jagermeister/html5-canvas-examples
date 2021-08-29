import { Dimension, Point } from "./entity/entity";

export class utility {

  static getParameterByName = (name) => {
    const url = window.location.href,
      paramName =  name.replace(/[\[\]]/g, "\\$&"),
      regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  static canvasCreate = (containerId: string, id: string, dimensions: Dimension): HTMLCanvasElement => {
    const container = document.getElementById(containerId);
    if (container) {
      const canvas = document.createElement('CANVAS');
      canvas.id = id;
      canvas.setAttribute('width', dimensions.width.toString());
      canvas.setAttribute('height', dimensions.height.toString());
      canvas.oncontextmenu = () => { return false; };
      container.appendChild(canvas);
      return canvas as HTMLCanvasElement;
    }
  }

  static xyFromMouse = (canvas: HTMLCanvasElement, event: MouseEvent) => {
    const canvas_bounds = canvas.getBoundingClientRect();
    const y = (event.clientY - canvas_bounds.top),
      x = (event.clientX - canvas_bounds.left);
    return [x, y];
  }

  static strokeText = (ctx: CanvasRenderingContext2D, text: string, point: Point, isAlignedRight: boolean = false) => {
    if (isAlignedRight) {
      point.x -= ctx.measureText(text).width;
    }

    ctx.strokeText(text, point.x, point.y);
  }

  static strokeLines = (ctx: CanvasRenderingContext2D, data: Point[]) => {
    let point: Point = data.shift();
    ctx.moveTo(point.x, point.y);
    for (let i = 0, l = data.length; i < l; i++) {
      point = data[i];
      ctx.moveTo(point.x, point.y);
    }

    ctx.stroke();
  }
}
