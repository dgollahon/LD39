"use strict";
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
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
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAAwCAYAAAD+WvNWAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xMK0KCsAAAAPaSURBVHhe7dfRjRw3EEXRDUX/TkLROA4DjsL5OAlFYMBJjE0NHsC9erXNYnOHtQA/zkdX19bcwQAC9PZ4PKb8/v23R8PnaK7nKqLOaK7nKqLOaK7n1exwRBQazfVcRdQZzfVcRdQZzfW8mh2O6GP7wOiZ892iruiZ892iruiZ81XscEQUFj1zvlvUFT1zvlvUFT1zvoodZjBwFO/s4tpG8M4urm0E78yywwwXN4J3dnFtI3hnF9c2gndm2eEIF5XBe6/mmjJ479VcUwbvzbLDES4qg/dezTVl8N6ruaYM3ptlhxkM++fvPz+kPd7ZpW9vXHNPe7yzS9/euOae9nhnlh1m9PGNi+5pj3d26dsb19zTHu/s0rc3rrmnPd6ZZYcj+uieQt/+P93wmXd2ce3N6c+xwxEuvnn1F5jl2pvTn2OHGQwfxTu7nP577DDj/AB77e63w4/wn8Kv9gOc/if9/V12+JFqXyDr9D/p7++yQ0fhkT++fXvHRTd6z/ufjb3UtzeuvdF73v9s7KW+vXHtjd7z/iw7dBhMfXzj4hu95/3Pxl7q2xvX3ug973829lLf3rj2Ru95f5YdOgr968e/P0XhWfwc0X3OZ+ne6X+PnyO6zznZoaOD5wd4j58jus/5LN2r1m+Hjg7yC/CfSM1XY0+W7pz+OewRO3R06PwAc9iTpTvV+u3Q0aGrLyB6vwp7snTn9M9hj9iho0PnB5jDnizdqdZvh44O8QuQ+zIN93SX7zVfTfdP/5Pu8r3mo+zQ0QecH+BJd/le89V0v1q/HTr6gKsvIPpvYv8lXGg0X033T//zve5G81F26OgDzg/wfK+70Xw13a/Wb4eOPiD6AtpTeER7xDur6f7p//V2wzuj7NDRB5wf4NfbDe+spvvV+u3Q0QdEsnuvxg7K7r0aOyi7t4odOgyh7N6rsYOye6/GDsrurWKHdzCYuF8Ne4n71bCXuH+XHd7BYOJ+Newl7lfDXuL+XXa4AsOFe1WxW7hXFbuFe3fZ4QoMF+5VxW7hXlXsJu7PssMVGCzcq4rdxP1q2Evcn2WHKzBYuFcVu4n71bCXuD/LDu9gqHCvKnZH+HdVXHVevc+ywzsYKNyrit0R/l0VV51X77Ps8A4GCveqirqjeTVXnVfvs+zwDgYK96qKuqN5NVedV++z7HAGw4j7VUW9mhP3dhntGt0bZYczGEbcryrq1Zy4t8to1+jeKDucwTDifjVfrVey3dn9K3Y4g2HE/Wq+Wq9ku7P7V+xwBYYK96pgp3CvGvYK94R7wr1RdrgCA4V7VbBTuFcNe4V7wj3h3pjH238FsupASuu6XgAAAABJRU5ErkJggg==";
const TILE_SET = new Image();
TILE_SET.src =
    "data:image/png;base64,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";
class Tile {
    constructor(x, y, frame) {
        this.x = x;
        this.y = y;
        this.tileSet = new Sprite(TILE_SET, frame, -1);
    }
    draw(context) {
        this.tileSet.draw(context, this.x, this.y, false);
    }
    isBlocking() {
        return true;
    }
}
class EmptyTile extends Tile {
    constructor(x, y) {
        super(x, y, -1);
    }
    draw(context) { }
    isBlocking() {
        return false;
    }
}
class Sprite {
    constructor(image, frame, animationFactor) {
        this.image = image;
        this.frame = frame;
        this.ticks = 0;
        this.animationFactor = animationFactor;
        this.frames = image.width / TILE_SIZE;
    }
    animate(limit) {
        ++this.ticks;
        this.ticks %= this.animationFactor * (limit || this.frames);
        this.frame = this.ticks / this.animationFactor;
    }
    draw(context, x, y, reverse) {
        const drawX = Math.floor(x - HALF_TILE);
        const drawY = Math.floor(y - HALF_TILE);
        if (reverse) {
            context.save();
            context.translate(drawX, drawY);
            context.scale(-1, 1);
            context.drawImage(this.image, TILE_SIZE * Math.floor(this.frame), 0, TILE_SIZE, TILE_SIZE, -TILE_SIZE, 0, TILE_SIZE, TILE_SIZE);
            context.restore();
        }
        else {
            context.drawImage(this.image, TILE_SIZE * Math.floor(this.frame), 0, TILE_SIZE, TILE_SIZE, drawX, drawY, TILE_SIZE, TILE_SIZE);
        }
    }
}
class Level {
    constructor() {
        let tileY = HALF_TILE;
        this.tiles = Level.data2.map(row => {
            const columns = row.length;
            const columnTiles = [];
            for (let col = 0; col < columns; ++col) {
                let tileX = col * TILE_SIZE + HALF_TILE;
                columnTiles.push(row[col] === " "
                    ? new EmptyTile(tileX, tileY)
                    : new Tile(tileX, tileY, parseInt(row[col])));
            }
            tileY += TILE_SIZE;
            return columnTiles;
        });
    }
    draw(context, player) {
        let y = 0;
        while (y < HEIGHT) {
            const row = this.horizontalTiles(Math.max(player.x - WIDTH / 2, 0), Math.max(player.x + WIDTH / 2 + TILE_SIZE, WIDTH), y);
            row.forEach(col => col.draw(context));
            y += TILE_SIZE;
        }
        // this.tiles.forEach(row => row.forEach(col => col.draw(context)));
    }
    leftCollision(leftX, rightX, y) {
        let blockingTiles = this.horizontalTiles(leftX, rightX, y).filter(tile => tile.isBlocking());
        let block = blockingTiles[blockingTiles.length - 1];
        if (block) {
            return block.x + TILE_SIZE / 2;
        }
        else {
            return null;
        }
    }
    rightCollision(leftX, rightX, y) {
        let block = this.horizontalTiles(leftX, rightX, y).filter(tile => tile.isBlocking())[0];
        if (block) {
            return block.x - TILE_SIZE / 2;
        }
        else {
            return null;
        }
    }
    bottomCollision(topY, bottomY, x) {
        let block = this.verticalTiles(topY, bottomY, x).filter(tile => tile.isBlocking())[0];
        if (block) {
            return block.y - TILE_SIZE / 2;
        }
        else {
            return null;
        }
    }
    topCollision(topY, bottomY, x) {
        let blockingTiles = this.verticalTiles(topY, bottomY, x).filter(tile => tile.isBlocking());
        let block = blockingTiles[blockingTiles.length - 1];
        if (block) {
            return block.y + TILE_SIZE / 2;
        }
        else {
            return null;
        }
    }
    horizontalTiles(leftX, rightX, y) {
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
    verticalTiles(topY, bottomY, x) {
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
    tileFor(x, y) {
        return this.tiles[Math.floor(y / TILE_SIZE)][Math.floor(x / TILE_SIZE)];
    }
}
Level.data = [
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
Level.data2 = [
    "633333333333333333333333333337",
    "2                            2",
    "2            8339            2",
    "2                       833392",
    "2                            2",
    "2 89     833333339           2",
    "2                            2",
    "2    00   89       83333333392",
    "2   0000                     2",
    "433333333333333333333333333335"
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
class Enemy {
    constructor(x, y, range) {
        this.speed = 1.3;
        this.range = 4 * TILE_SIZE;
        this.x = x;
        this.y = y;
        this.leftX = x - range * TILE_SIZE;
        this.rightX = x + range * TILE_SIZE;
        this.right = false;
        this.sprite = new Sprite(ENEMY_IMAGE, 1, 10);
        this.firing = false;
        this.dead = false;
    }
    draw(context, timestamp) {
        this.sprite.draw(context, this.x, this.y, !this.right);
        const laserY = Math.floor(this.y - 2);
        const laserX = Math.floor(this.x + 16 * (this.right ? 1 : -1));
        const tankX = Math.floor(this.x + 11 * (this.right ? -1 : 1));
        if (this.firing) {
            context.save();
            context.beginPath();
            context.strokeStyle = "#00AAFF";
            context.moveTo(laserX, laserY);
            context.lineTo(this.firing, laserY);
            context.stroke();
            context.strokeStyle = "#00FFFF";
            context.moveTo(laserX, laserY);
            context.lineTo(this.firing, laserY);
            context.setLineDash([4, 4]);
            context.lineDashOffset = Math.floor(timestamp) % 16 * 2;
            context.stroke();
            context.restore();
            context.save();
            context.moveTo(tankX, this.y - 6);
            context.lineTo(tankX, this.y + 6);
            const strobe = 32 * (Math.floor(timestamp) % 4);
            context.strokeStyle = `rgb(${strobe + 128},${strobe + 128},${strobe + 128})`;
            context.stroke();
            context.restore();
        }
    }
    update(player) {
        if (Math.abs(this.y - player.y) < HALF_TILE &&
            Math.abs(this.x - player.x) < HALF_TILE) {
            this.dead = true;
        }
        if (this.firing) {
            this.sprite.frame = 2;
            player.health -= 1;
        }
        else {
            this.sprite.animate();
        }
        const yRange = Math.abs(this.y - player.y) < HALF_TILE;
        // right
        if (yRange &&
            this.right &&
            player.x - this.range < this.x &&
            player.x > this.x + TILE_SIZE / 3) {
            this.firing = player.x;
            // left
        }
        else if (yRange &&
            !this.right &&
            player.x + this.range > this.x &&
            player.x < this.x - TILE_SIZE / 3) {
            this.firing = player.x;
        }
        else {
            this.firing = false;
        }
        if (!this.firing) {
            if (this.right) {
                if (this.x < this.rightX) {
                    this.x += this.speed;
                }
                else {
                    this.right = false;
                }
            }
            else {
                if (this.x > this.leftX) {
                    this.x -= this.speed;
                }
                else {
                    this.right = true;
                }
            }
        }
    }
}
// Supporting classes
class Player {
    constructor() {
        this.x = TILE_SIZE + HALF_TILE;
        this.y = HEIGHT - 2 * TILE_SIZE;
        this.ySpeed = 0;
        this.xSpeed = 5;
        this.jumping = false;
        this.faceRight = true;
        this.running = false;
        this.sprite = new Sprite(PLAYER_IMAGE, 16, 4);
        this.health = 100;
    }
    draw() {
        const drawX = this.x < WIDTH / 2 ? this.x : WIDTH / 2;
        this.sprite.draw(context, drawX, this.y, !this.faceRight);
    }
    update(keyState, level) {
        if (keyState.isDown(KeyCode.A)) {
            this.running = true;
            let newX = this.x - this.xSpeed;
            let collision = level.leftCollision(this.x - HALF_TILE, newX - HALF_TILE, this.y);
            if (collision) {
                this.x = collision + HALF_TILE;
            }
            else {
                this.x = newX;
            }
            this.faceRight = false;
        }
        else if (keyState.isDown(KeyCode.D)) {
            this.running = true;
            const newX = this.x + this.xSpeed;
            let collision = level.rightCollision(this.x + HALF_TILE, newX + HALF_TILE, this.y);
            if (collision) {
                this.x = collision - HALF_TILE;
            }
            else {
                this.x = newX;
            }
            this.faceRight = true;
        }
        else {
            this.running = false;
            this.sprite.frame = 16;
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
            }
            else {
                this.jumping = true;
            }
        }
        else if (newY < this.y) {
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
            this.sprite.animate(16);
        }
    }
}
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["W"] = 87] = "W";
    KeyCode[KeyCode["A"] = 65] = "A";
    KeyCode[KeyCode["S"] = 83] = "S";
    KeyCode[KeyCode["D"] = 68] = "D";
})(KeyCode || (KeyCode = {}));
class KeyState {
    constructor() {
        this.isDown = (key) => {
            return this.state[key];
        };
        this.onKeydown = (event) => {
            this.state[event.keyCode] = true;
        };
        this.onKeyup = (event) => {
            this.state[event.keyCode] = false;
        };
        this.state = {};
    }
}
// Global setup
let keyState = new KeyState();
window.addEventListener("keydown", keyState.onKeydown, false);
window.addEventListener("keyup", keyState.onKeyup, false);
let player = new Player();
let level = new Level();
let enemies = [];
setup();
// Game functions
function mainLoop(timestamp) {
    clearScreen();
    update(timestamp);
    level.draw(context, player);
    enemies.forEach(enemy => enemy.draw(context, timestamp));
    player.draw();
    paintHealth();
    if (player.health <= 0) {
        setup();
    }
    requestAnimationFrame(mainLoop);
}
function update(timestamp) {
    player.update(keyState, level);
    enemies.forEach(enemy => enemy.update(player));
    enemies = enemies.filter(enemy => !enemy.dead);
}
function setup() {
    player = new Player();
    level = new Level();
    enemies = [];
    enemies.push(new Enemy(TILE_SIZE * 12, TILE_SIZE * 5 - HALF_TILE, 2));
    enemies.push(new Enemy(TILE_SIZE * 14, TILE_SIZE * 8 + HALF_TILE, 2));
}
function paintHealth() {
    context.save();
    context.fillStyle = "#00A2E8";
    context.fillRect(WIDTH / 2 - 155, 65, 310, 20);
    context.fillStyle = "#004766";
    context.fillRect(WIDTH / 2 - 150, 70, 300, 10);
    context.fillStyle = "#99D9EA";
    context.fillRect(WIDTH / 2 - 150, 70, Math.max(player.health, 0) * 3, 10);
    context.restore();
}
function clearScreen() {
    context.save();
    context.fillStyle = "#448888";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.restore();
}
// Run game
requestAnimationFrame(mainLoop);
