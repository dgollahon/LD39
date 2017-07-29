"use strict";
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
// Game constants
var WIDTH = 720;
var HEIGHT = 480;
var TILE_SIZE = 32;
// Supporting classes
var Player = (function () {
    function Player() {
    }
    Player.prototype.draw = function () {
        context.save();
        context.fillStyle = "#000000";
        context.fillRect(this.x - TILE_SIZE / 2, this.y - TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);
        context.restore();
    };
    return Player;
}());
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["W"] = 119] = "W";
    KeyCode[KeyCode["A"] = 97] = "A";
    KeyCode[KeyCode["S"] = 115] = "S";
    KeyCode[KeyCode["D"] = 100] = "D";
})(KeyCode || (KeyCode = {}));
var KeyState = (function () {
    function KeyState() {
        this.state = {};
    }
    KeyState.prototype.isDown = function (key) {
        return this.state[key];
    };
    KeyState.prototype.onKeydown = function (event) {
        this.state[event.keyCode] = true;
    };
    KeyState.prototype.onKeyup = function (event) {
        this.state[event.keyCode] = false;
    };
    KeyState.W = 119;
    KeyState.A = 97;
    KeyState.S = 115;
    KeyState.D = 100;
    return KeyState;
}());
// Global setup
var player = new Player();
player.x = WIDTH / 2;
player.y = HEIGHT / 2;
var keyState = new KeyState();
window.addEventListener("keydown", keyState.onKeydown, false);
window.addEventListener("keydup", keyState.onKeyup, false);
// Game functions
function mainLoop(timestamp) {
    clearScreen();
    update(timestamp);
    player.draw();
    requestAnimationFrame(mainLoop);
}
function update(timestamp) {
    if (keyState.isDown(KeyCode.A)) {
        --player.x;
    }
    else if (keyState.isDown(KeyCode.D)) {
        ++player.x;
    }
    else if (keyState.isDown(KeyCode.S)) {
        ++player.y;
    }
    else if (keyState.isDown(KeyCode.W)) {
        --player.y;
    }
}
function handleInput(event) {
    var keyCode = event.keyCode;
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
