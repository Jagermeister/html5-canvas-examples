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

  static xyFromMouse = (canvas: HTMLCanvasElement, event: MouseEvent) => {
    const canvas_bounds = canvas.getBoundingClientRect();
    const y = (event.clientY - canvas_bounds.top),
      x = (event.clientX - canvas_bounds.left);
    return [x, y];
  }
}
