let ctx;

// VVV units in px
let tileW = 40, 
    tileH =40;

// VVV units in tiles
let mapW = 10, 
    mapH = 10;

// keep track of frame rate
let currentSecond = 0, 
    frameCount = 0, 
    framesLastSecond = 0;

// keep track when last frame drawn in ms
let lastFrameTime = 0;

let keysDown = {
    37 : false,
    38 : false,
    39 : false,
    40 : false
};

// VVV needs work, map arranged
var mainChar = new Character();


// stores all tiles that make game map
// 0 impassable, 1 passable
let gameMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

// class will keep track of character's current composition
function Character() {
    this.tileFrom = [1, 1];
    this.tileTo = [1, 1];  // <<< destination
    this.timeMoved = 0;  // <<< time movement began to destination

    // dimensions of character
    this.dimensions = [30, 30];
    this.position = [45, 45];
    
    // time to move char exactly 1 tile
    this.delayMove = 700;
}

// Character class has a place at method
Character.prototype.placeAt = function(x, y) {
    this.tileFrom = [x, y];
    this.tileTo = [x, y];

    // calc x & y pixel position
    this.position = [
        ((tileW * x) + ((tileW - this.dimensions[0]) / 2)),
        ((tileH * y) + ((tileH - this.dimensions[1]) / 2))
    ];
};

// Character process Movement method
Character.prototype.processMovement = function(t) {
    if (this.tileFrom[0] === this.tileTo[0] // <<< if tiles are diff, char is moving
        && this.tileFrom[1] === this.tileTo[1]) 
    {
        return false;  // tiles are diff, char is moving
    }
    // VVV check if time elapsed since char move is >= time move 1 tile
    if ((t - this.timeMoved) >= this.delayMove) {  
        this.placeAt(this.tileTo[0], this.tileTo[1]);  // <<< char has had long enough reach dest
    } else {

        // calc pixel position of char
        this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0])/2);
        this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1])/2);

        // check if char moving horizontally/vertically
        if (this.tileTo[0] !== this.tileFrom[0]) {  // <<< check x
            var diff = (tileW / this.delayMove) * (t - this.timeMoved);
            this.position[0] += (this.tileTo[0] < this.tileFrom[0] ?
                0 - diff : diff);
        }
        if (this.tileTo[1] !== this.tileFrom[1]) { // <<< check y
            var diff = (tileH / this.delayMove) * (t = this.timeMoved);
            this.position[1] += (this.tileTo[1] < this.tileFrom[1] 
                ? 0 - diff : diff);
        }

        // set new position
        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
    }

    return true;
};

function toIndex(x, y) { // <<< x,y position on map
    return ((y * mapW) + x);
}

window.onload = function() {
    ctx = document.getElementById('main-canvas').getContext('2d');
    this.requestAnimationFrame(drawGame);
    ctx.font = "bold 10px sans-serif";

    window.addEventListener("keydown", function(e) {
        if (e.keyCode > 37 && e.keyCode <= 40) {
            keysDown[e.keyCode] = true;
        }
    });
    window.addEventListener("keyup", function(e) {
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            keysDown[e.keyCode] = false;
        }
    });
};

function drawGame() {
    if (ctx === null) { return; }

    var currentFrameTime = Date.now();
    var timeElapsed = currentFrameTime - lastFrameTime;

    let sec = Math.floor(Date.now()/1000);
    if(sec!==currentSecond) {
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 1;
    } else { frameCount++; }

    

    if (!mainChar.processMovement(currentFrameTime)) {
        // check if arrow key pressed, if invalid params, don't allow movement

        if (keysDown[38]  // if down key, check if tile down from current pos is valid
            && mainChar.tileFrom[1] > 0
            && gameMap[toIndex(mainChar.tileFrom[0], mainChar.tileFrom[1] - 1)] === 1)
        {
            console.warn("UP");
            mainChar.tileTo[1] -= 1;
        }
        else if (keysDown[40]
            && mainChar.tileFrom[1] < (mapH - 1)
            && gameMap[toIndex(mainChar.tileFrom[0], mainChar.tileFrom[1] + 1)] === 1)
        {
            console.warn("Down");
            mainChar.tileTo[1] += 1;
        }
        else if (keysDown[37]
            && mainChar.tileFrom[0] > 0
            && gameMap[toIndex(mainChar.tileFrom[0] - 1, mainChar.tileFrom[1])] === 1)
        {
            console.warn("Left");
            mainChar.tileTo[0] -= 1;
        }
        else if (keysDown[39]
            && mainChar.tileFrom[0] < (mapW - 1)
            && gameMap[toIndex(mainChar.tileFrom[0] + 1, mainChar.tileFrom[1])] === 1) 
        {
            console.warn("Right");
            mainChar.tileTo[0] += 1;
        }
        if (mainChar.tileFrom[0] !== mainChar.tileTo[0]
            || mainChar.tileFrom[1] !== mainChar.tileTo[1])
        {
            mainChar.timeMoved = currentFrameTime;
        }
    }

    // Loop through tiles
    for (let y = 0; y < mapH; y ++) {
        for (let x = 0; x < mapH; x++) {
            switch (gameMap[((y * mapW) + x)]) {
                case 0:
                    ctx.fillStyle = "#999999";
                    break;
                default:
                    ctx.fillStyle = "#eeeeee"
            }

            // Draw rectangle @ tile position (x times tileW, y times tileH)
            ctx.fillRect(x * tileW, y * tileH, tileW, tileH)
        }
    }

    // Draw char(blue)
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(mainChar.position[0], mainChar.position[1], mainChar.dimensions[0], mainChar.dimensions[1]);

    // Set fill style & draw current frame rate
    ctx.fillStyle = "#ff0000";
    ctx.fillText("FPS: " + framesLastSecond, 10, 20);

    // Tell window draw again
    lastFrameTime = currentFrameTime;
    requestAnimationFrame(drawGame);
}




















//bottom