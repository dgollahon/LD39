"use strict";
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
// Game constants
const WIDTH = 720;
const HEIGHT = 480;
const TILE_SIZE = 24;
class Level {
    constructor() {
        this.data = [
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                            X",
            "X                           XX",
            "X           XXXX  XXXX     XXX",
            "X           X  X  X  X    XXXX",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        ];
    }
    draw(context) {
        context.save();
        context.fillStyle = "#0000FF";
        context.strokeStyle = "#FFFFFF";
        let y = 0 * TILE_SIZE;
        this.data.forEach(rowData => {
            for (let col = 0; col < 30; ++col) {
                if (rowData[col] === "X") {
                    context.fillRect(col * TILE_SIZE, y, TILE_SIZE, TILE_SIZE);
                }
            }
            y += TILE_SIZE;
        });
        context.restore();
    }
}
// Supporting classes
class Player {
    constructor() {
        this.x = WIDTH / 2;
        this.y = HEIGHT - TILE_SIZE / 2;
        this.ySpeed = 0;
        this.xSpeed = 3.5;
        this.jumping = false;
    }
    draw() {
        context.save();
        context.fillStyle = "#000000";
        context.fillRect(this.x - TILE_SIZE / 2, this.y - TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);
        context.restore();
    }
    update(keyState) {
        if (keyState.isDown(KeyCode.A)) {
            this.x -= this.xSpeed;
        }
        else if (keyState.isDown(KeyCode.D)) {
            this.x += this.xSpeed;
        }
        else if (keyState.isDown(KeyCode.W)) {
            if (this.ySpeed === 0 && !this.jumping) {
                this.ySpeed = -15;
                this.jumping = true;
            }
        }
        this.y += this.ySpeed;
        if (this.y > HEIGHT - TILE_SIZE / 2) {
            this.y = HEIGHT - TILE_SIZE / 2;
            this.ySpeed = 0;
            this.jumping = false;
        }
        else {
            this.ySpeed += 1;
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
const player = new Player();
const level = new Level();
const keyState = new KeyState();
window.addEventListener("keydown", keyState.onKeydown, false);
window.addEventListener("keyup", keyState.onKeyup, false);
// Game functions
function mainLoop(timestamp) {
    clearScreen();
    update(timestamp);
    level.draw(context);
    player.draw();
    requestAnimationFrame(mainLoop);
}
function update(timestamp) {
    player.update(keyState);
}
function clearScreen() {
    context.save();
    context.fillStyle = "#00ffff";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.restore();
}
// Run game
requestAnimationFrame(mainLoop);
