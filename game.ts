const canvas: any = document.getElementById("canvas");
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

// Game constants
const WIDTH = 720;
const HEIGHT = 480;
const TILE_SIZE = 48;
const HALF_TILE = TILE_SIZE / 2;

const PLAYER_IMAGE = new Image();
PLAYER_IMAGE.src =
  "data:image/png;base64,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9t228cx8NdX7z/adnVttVsesexLvS5yrytoD537Frv72d7fi/Vn3z7rnrrPvto1n5qup3n+27+zcarM6Zt1z19337+7RPw9wceJcVdYeOPcrdvW3v7sV78+6f9Y9d519t208M19N9f6zfWfnVpvVMeuexPsS56qy9sC5X7Grv/3drXh/1v2z7rnr7Ltt45n5aqr3n+07O7farI5Z99x19/27e/T3X+BCyrnqrD1w7nNs9e9v1r1t44z7VvmVzp7q/dX7UtVOdhHnq7L2wLnPsdW/v1n3to0z7lvlVzp7qvdX70u/0jnCnyNxrufuHv39F7iQcq46aw+c+xxb/fubdW/bOOO+VX6ls6d6f/W+VLWTXcT5qqw9cO5zbPXvb9a9beOM+1b5lc6e6v3V+9KvdI7w50ic67m7R3//BS5M+f3z72L/LATO7WaNgXO7WWPgXFXWHji326/1Jc69zZoC5z7/DvbPQuDcbtYYOLebNQbOVWXtgXO7/Vpf4lx19jO0OE+2Ezg38vdfyGUhv3/+XeyfhcC53awxcG43awycq8raA+d2+7W+xLm3WVPg3Offwf5ZCJzbzRoD53azxsC5qqw9cG63X+tLnKvOfoYW58l2AueO/fnH/wNBGuk56/Y/AgAAAABJRU5ErkJggg==";
const ENEMY_IMAGE = new Image();
ENEMY_IMAGE.src =
  "data:image/png;base64,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";
// PLAYER_IMAGE.src = "power_scale_transparent.png";
// PLAYER_IMAGE.onload = () => console.log(PLAYER_IMAGE.toDataURL());

class Tile {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.save();
    context.fillStyle = "#0000FF";
    context.fillRect(this.x - HALF_TILE, this.y - HALF_TILE, TILE_SIZE, TILE_SIZE);
    // context.drawImage(
    //   ENEMY_IMAGE,
    //   0,
    //   0,
    //   TILE_SIZE,
    //   TILE_SIZE,
    //   this.x - HALF_TILE,
    //   this.y - HALF_TILE,
    //   TILE_SIZE,
    //   TILE_SIZE
    // );
    context.restore();
  }

  public isBlocking(): boolean {
    return true;
  }
}

class EmptyTile extends Tile {
  public draw(context: CanvasRenderingContext2D) {}

  public isBlocking(): boolean {
    return false;
  }
}

class Level {
  static readonly data = [
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "X         XXXXXXXXXX         X",
    "X            XXXX            X",
    "X                       XXXXXX",
    "X                            X",
    "XXX      XXXXXXXXX           X",
    "X                            X",
    "X    XX            XXXXXXXXXXX",
    "X   XXXX                     X",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    // "X                            X",
    // "X                            X",
    // "X                            X",
    // "X      XXXXX      XXXXXX     X",
    // "X                            X",
    // "X                            X",
    // "X   XXXXX                   XX",
    // "X           XXXX  XXXX     XXX",
    // "X           X  X  X  X    XXXX",
    // "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  ];

  readonly tiles: Tile[][];

  constructor() {
    let tileY = HALF_TILE;

    this.tiles = Level.data.map(row => {
      const columns = row.length;
      const columnTiles = [];

      for (let col = 0; col < columns; ++col) {
        let tileX = col * TILE_SIZE + HALF_TILE;
        columnTiles.push(
          row[col] === "X" ? new Tile(tileX, tileY) : new EmptyTile(tileX, tileY)
        );
      }

      tileY += TILE_SIZE;

      return columnTiles;
    });
  }

  public draw(context: CanvasRenderingContext2D) {
    this.tiles.forEach(row => row.forEach(col => col.draw(context)));
  }

  public leftCollision(leftX: number, rightX: number, y: number): number | null {
    let blockingTiles = this.horizontalTiles(leftX, rightX, y).filter(tile =>
      tile.isBlocking()
    );

    let block = blockingTiles[blockingTiles.length - 1];

    if (block) {
      return block.x + TILE_SIZE / 2;
    } else {
      return null;
    }
  }

  public rightCollision(leftX: number, rightX: number, y: number): number | null {
    let block = this.horizontalTiles(leftX, rightX, y).filter(tile =>
      tile.isBlocking()
    )[0];

    if (block) {
      return block.x - TILE_SIZE / 2;
    } else {
      return null;
    }
  }

  public bottomCollision(topY: number, bottomY: number, x: number): number | null {
    let block = this.verticalTiles(topY, bottomY, x).filter(tile => tile.isBlocking())[0];

    if (block) {
      return block.y - TILE_SIZE / 2;
    } else {
      return null;
    }
  }

  public topCollision(topY: number, bottomY: number, x: number): number | null {
    let blockingTiles = this.verticalTiles(topY, bottomY, x).filter(tile =>
      tile.isBlocking()
    );

    let block = blockingTiles[blockingTiles.length - 1];

    if (block) {
      return block.y + TILE_SIZE / 2;
    } else {
      return null;
    }
  }

  private horizontalTiles(leftX: number, rightX: number, y: number): Tile[] {
    const tiles = [];

    let x = leftX;
    let remainingChecks = true;

    while (true) {
      let tile = this.tileFor(x, y);
      tile && tiles.push(tile);

      if (x === rightX) {
        break;
      }

      x += TILE_SIZE;

      if (x > rightX) {
        x = rightX;
      }
    }

    return tiles;
  }

  private verticalTiles(topY: number, bottomY: number, x: number): Tile[] {
    const tiles = [];

    let y = topY;
    let remainingChecks = true;

    while (true) {
      let tile = this.tileFor(x, y);
      tile && tiles.push(tile);

      if (y === bottomY) {
        break;
      }

      y += TILE_SIZE;

      if (y > bottomY) {
        y = bottomY;
      }
    }

    return tiles;
  }

  private tileFor(x: number, y: number): Tile {
    return this.tiles[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)];
  }
}

// Supporting classes
class Player {
  x: number;
  y: number;
  ySpeed: number;
  xSpeed: number;
  jumping: boolean;
  frame: number;
  faceRight: boolean;
  running: boolean;

  constructor() {
    this.x = WIDTH / 2;
    this.y = HEIGHT - 7 * TILE_SIZE / 2;
    this.ySpeed = 0;
    this.xSpeed = 5;
    this.jumping = false;
    this.frame = 0;
    this.faceRight = true;
    this.running = false;
  }

  public draw() {
    context.save();
    if (this.faceRight) {
      // context.scale(-1, 1);

      context.drawImage(
        PLAYER_IMAGE,
        TILE_SIZE * Math.floor(this.frame / 4),
        0,
        TILE_SIZE,
        TILE_SIZE,
        this.x - HALF_TILE,
        this.y - HALF_TILE,
        TILE_SIZE,
        TILE_SIZE
      );
    } else {
      context.translate(this.x - HALF_TILE, this.y - HALF_TILE);
      context.scale(-1, 1);
      context.drawImage(
        PLAYER_IMAGE,
        TILE_SIZE * Math.floor(this.frame / 4),
        0,
        TILE_SIZE,
        TILE_SIZE,
        -TILE_SIZE,
        0,
        TILE_SIZE,
        TILE_SIZE
      );
    }
    context.restore();
  }

  public update(keyState: KeyState, level: Level): void {
    if (keyState.isDown(KeyCode.A)) {
      this.running = true;
      let newX = this.x - this.xSpeed;

      let collision = level.leftCollision(this.x - HALF_TILE, newX - HALF_TILE, this.y);

      if (collision) {
        this.x = collision + HALF_TILE;
      } else {
        this.x = newX;
      }
      this.faceRight = false;
    } else if (keyState.isDown(KeyCode.D)) {
      this.running = true;
      const newX = this.x + this.xSpeed;

      let collision = level.rightCollision(this.x + HALF_TILE, newX + HALF_TILE, this.y);

      if (collision) {
        this.x = collision - HALF_TILE;
      } else {
        this.x = newX;
      }
      this.faceRight = true;
    } else {
      this.running = false;
      this.frame = 4 * 17 - 1;
    }

    if (keyState.isDown(KeyCode.W) && !this.jumping) {
      this.ySpeed = -12;
      this.jumping = true;
    }

    // TODO figure out if independent y and x checks do crazy things when ordered differently.
    let newY = this.y + this.ySpeed;
    let collision = null;

    if (newY >= this.y) {
      collision = level.bottomCollision(this.y + HALF_TILE, newY + HALF_TILE, this.x);
      if (collision) {
        this.y = collision - HALF_TILE;
        this.ySpeed = 0;
        this.jumping = false;
      } else {
        this.jumping = true;
      }
    } else if (newY < this.y) {
      this.jumping = true;
      collision = level.topCollision(this.y - HALF_TILE, newY - HALF_TILE, this.x);
      if (collision) {
        this.y = collision + HALF_TILE;
        this.ySpeed = 0;
      }
    }

    if (!collision) {
      this.y = newY;
      this.ySpeed += 0.75;
    }

    if (this.running) {
      this.frame += 1;
      this.frame %= 16 * 4;
    }
  }
}

enum KeyCode {
  W = 87,
  A = 65,
  S = 83,
  D = 68
}

class KeyState {
  state: { [keyCode: number]: boolean };

  constructor() {
    this.state = {};
  }

  public isDown = (key: KeyCode): boolean => {
    return this.state[key];
  };

  public onKeydown = (event: KeyboardEvent): void => {
    this.state[event.keyCode] = true;
  };

  public onKeyup = (event: KeyboardEvent): void => {
    this.state[event.keyCode] = false;
  };
}

// Global setup
const player = new Player();
const level = new Level();
const keyState = new KeyState();

window.addEventListener("keydown", keyState.onKeydown, false);
window.addEventListener("keyup", keyState.onKeyup, false);

// Game functions

function mainLoop(timestamp: number): void {
  clearScreen();

  update(timestamp);

  level.draw(context);
  player.draw();

  requestAnimationFrame(mainLoop);
}

function update(timestamp: number): void {
  player.update(keyState, level);
}

function clearScreen() {
  context.save();
  context.fillStyle = "#00ffff";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  context.restore();
}

// Run game
requestAnimationFrame(mainLoop);
