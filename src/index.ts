import { CanvasBouncer } from "./canvas/canvasBouncer";
import { CanvasManager } from "./canvas/canvasManager";

const canvasManager = new CanvasManager();

function init() {
  const dimensions = { width: 720, height: 540 };
  canvasManager.add("canvasLayerId", CanvasBouncer.create("canvasContainer", "canvasLayerId", dimensions));
}

window.onload = () => {
  init();
  var mainloop_updateLast = performance.now();
  (function mainLoop(nowTime) {
    canvasManager.update(nowTime - mainloop_updateLast);
    canvasManager.display();
    mainloop_updateLast = nowTime;
    requestAnimationFrame(mainLoop);
  })(performance.now());
}

export {};
