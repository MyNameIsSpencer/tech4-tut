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

window.onload = function() {
    ctx = document.getElementById('main-canvas').getContext('2d');
    this.requestAnimationFrame(drawGame);
    ctx.font = "bold 10px sans-serif";
};

function drawGame() {
    if (ctx === null) { return; }

    let sec = Math.floor(Date.now()/1000);
    if(sec!=currentSecond) {
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 1;
    } else { frameCount++; }

    // Loop through tiles
    for (let x = 0; x < mapH; x ++) {
        for (let y = 0; y < mapH; y++) {
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

    // Set fill style & draw current frame rate
    ctx.fillStyle = "#ff0000";
    ctx.fillText("FPS: " + framesLastSecond, 10, 20);

    // Tell window draw again
    requestAnimationFrame(drawGame);
}




















//bottom