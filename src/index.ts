import { utility } from "./canvas";
import { Bouncer } from "./entity/bouncer";

const canvas_width = 720,
  canvas_height = 540,
  dimensions = { width: canvas_width, height: canvas_height };

var canvas = utility.canvasCreate("canvasContainer", "canvasLayerId", dimensions);
var ctx = canvas.getContext("2d");

let fontSize = 20,
  framesPerSecond = null;

var keyDownEvents = {};
function init() {
  keyDownEvents = {
    32: () => { console.log("you pressed SPACEBAR!")},
    77: () => { console.log("you pressed the letter M!")},
  };

  ctx.font = fontSize + 'px Courier New';
}

canvas.addEventListener("mousedown", (event) => {
  const [x, y] = utility.xyFromMouse(canvas, event);
  console.log(`you clicked at (${x}, ${y})`);
});

window.addEventListener("keydown", (event) => {
  const f = keyDownEvents[event.keyCode.toString()];
  f && f();
});

const helloWorld = new Bouncer("Hello World!", dimensions);

function update(delta: number) {
  const fps = Math.floor(1_000 / delta);
  if (framesPerSecond != fps) {
    framesPerSecond = fps;
  }

  helloWorld.update(delta);
}

function display() {
  ctx.clearRect(0, 0, dimensions.width, dimensions.height);
  ctx.strokeStyle = '#F0F8FF';
  utility.strokeText(ctx, "Hello World!", { x: 200, y: 150 });

  const rightAligned = true;
  utility.strokeText(ctx, `FPS: ${framesPerSecond}`, { x: dimensions.width, y: fontSize }, rightAligned);

  helloWorld.display(ctx);
}

window.onload = () => {
  init();
  var mainloop_updateLast = performance.now();
  (function mainLoop(nowTime) {
    update(nowTime - mainloop_updateLast);
    display();
    mainloop_updateLast = nowTime;
    requestAnimationFrame(mainLoop);
  })(performance.now());
}

export {};
