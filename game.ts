const canvas: any = document.getElementById("canvas");
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

// Game constants
const WIDTH = 720;
const HEIGHT = 480;
const TILE_SIZE = 32;

// Supporting classes
class Player {
  x: number;
  y: number;

  public draw() {
    context.save();
    context.fillStyle = "#000000";
    context.fillRect(
      this.x - TILE_SIZE / 2,
      this.y - TILE_SIZE / 2,
      TILE_SIZE,
      TILE_SIZE
    );
    context.restore();
  }
}

enum KeyCode {
  W = 119,
  A = 97,
  S = 115,
  D = 100
}

class KeyState {
  static readonly W = 119;
  static readonly A = 97;
  static readonly S = 115;
  static readonly D = 100;

  private state: { [keyCode: number]: boolean } = {};

  public isDown(key: KeyCode): boolean {
    return this.state[key];
  }

  public onKeydown(event: KeyboardEvent) {
    this.state[event.keyCode] = true;
  }

  public onKeyup(event: KeyboardEvent) {
    this.state[event.keyCode] = false;
  }
}

// Global setup
const player = new Player();

player.x = WIDTH / 2;
player.y = HEIGHT / 2;

const keyState = new KeyState();

window.addEventListener("keydown", keyState.onKeydown, false);
window.addEventListener("keydup", keyState.onKeyup, false);

// Game functions

function mainLoop(timestamp: number): void {
  clearScreen();

  update(timestamp);

  player.draw();

  requestAnimationFrame(mainLoop);
}

function update(timestamp: number): void {
  if (keyState.isDown(KeyCode.A)) {
    --player.x;
  } else if (keyState.isDown(KeyCode.D)) {
    ++player.x;
  } else if (keyState.isDown(KeyCode.S)) {
    ++player.y;
  } else if (keyState.isDown(KeyCode.W)) {
    --player.y;
  }
}

function handleInput(event: any) {
  const keyCode: number = event.keyCode;

  alert(keyCode);
}

function clearScreen() {
  context.save();
  context.fillStyle = "#00ffff";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  context.restore();
}

// Run game
requestAnimationFrame(mainLoop);
