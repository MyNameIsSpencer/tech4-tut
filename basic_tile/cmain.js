// let lastFrameTime;

// var keysDown = {
// 	37 : false,
// 	38 : false,
// 	39 : false,
// 	40 : false
// };

// var mainChar = new Character();

// function Character()
// {
// 	this.tileFrom	= [1,1];
// 	this.tileTo		= [1,1];
// 	this.timeMoved	= 0;
// 	this.dimensions	= [30,30];
// 	this.position	= [45,45];
// 	this.delayMove	= 700;
// }

// Character.prototype.placeAt = function(x, y)
// {
// 	this.tileFrom	= [x,y];
// 	this.tileTo		= [x,y];
// 	this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
// 		((tileH*y)+((tileH-this.dimensions[1])/2))];
// };

// Character.prototype.processMovement = function(t)
// {
// 	if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }
// 	if((t-this.timeMoved)>=this.delayMove)
// 	{
// 		this.placeAt(this.tileTo[0], this.tileTo[1]);
// 	}

// 	else
// 	{
// 		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
// 		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);



// 		if(this.tileTo[0] != this.tileFrom[0])
// 		{
// 			var diff = (tileW / this.delayMove) * (t-this.timeMoved);
// 			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
// 		}
// 		if(this.tileTo[1] != this.tileFrom[1])
// 		{
// 			var diff = (tileH / this.delayMove) * (t-this.timeMoved);
// 			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
// 		}

 
//         this.position[0] = Math.round(this.position[0]);
// 		this.position[1] = Math.round(this.position[1]);


// 	}

// 	return true;
// }



// function toIndex(x, y)
// {
// 	return((y * mapW) + x);
// }






// window.onload = function() {
//     ctx = document.getElementById('main-canvas').getContext('2d');
//     this.requestAnimationFrame(drawGame);
//     ctx.font = "bold 10px sans-serif";



// 	window.addEventListener("keydown", function(e) {
// 		if(e.keyCode>=37 && e.keyCode<=40) { keysDown[e.keyCode] = true; }
// 	});
// 	window.addEventListener("keyup", function(e) {
// 		if(e.keyCode>=37 && e.keyCode<=40) { keysDown[e.keyCode] = false; }
// 	});
// }



// function drawGame() {
//     if (ctx === null) { return  }

//     var currentFrameTime = Date.now();
// 	var timeElapsed = currentFrameTime - lastFrameTime;


//     var sec = Math.floor(Date.now()/1000);
// 	if(sec!=currentSecond)
// 	{
// 		currentSecond = sec;
// 		framesLastSecond = frameCount;
// 		frameCount = 1;
// 	}
// 	else { frameCount++; }



//     if(!mainChar.processMovement(currentFrameTime)) {

// 		if(keysDown[38] && mainChar.tileFrom[1]>0 && gameMap[toIndex(mainChar.tileFrom[0], mainChar.tileFrom[1]-1)]==1) { mainChar.tileTo[1]-= 1; }
// 		else if(keysDown[40] && mainChar.tileFrom[1]<(mapH-1) && gameMap[toIndex(mainChar.tileFrom[0], mainChar.tileFrom[1]+1)]==1) { mainChar.tileTo[1]+= 1; }
// 		else if(keysDown[37] && mainChar.tileFrom[0]>0 && gameMap[toIndex(mainChar.tileFrom[0]-1, mainChar.tileFrom[1])]==1) { mainChar.tileTo[0]-= 1; }
// 		else if(keysDown[39] && mainChar.tileFrom[0]<(mapW-1) && gameMap[toIndex(mainChar.tileFrom[0]+1, mainChar.tileFrom[1])]==1) { mainChar.tileTo[0]+= 1; }

//         if(mainChar.tileFrom[0]!=mainChar.tileTo[0] || mainChar.tileFrom[1]!=mainChar.tileTo[1])
// 		{ mainChar.timeMoved = currentFrameTime; }
// 	}

//     for(var y = 0; y < mapH; ++y)
// 	{
// 		for(var x = 0; x < mapW; ++x)
// 		{
// 			switch(gameMap[((y*mapW)+x)])
// 			{
// 				case 0:
// 					ctx.fillStyle = "#000000";
// 					break;
// 				default:
// 					ctx.fillStyle = "#ccffcc";
// 			}

// 			ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
// 		}
// 	}


//     ctx.fillStyle = "#0000ff";
// 	ctx.fillRect(mainChar.position[0], mainChar.position[1],
// 		mainChar.dimensions[0], mainChar.dimensions[1]);

//     ctx.fillStyle = "#ff0000";
//     ctx.fillText("FPS: " + framesLastSecond, 10, 20);

//     lastFrameTime = currentFrameTime;
//     requestAnimationFrame(drawGame);
// }



var ctx = null;
var gameMap = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
	0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
	0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
	0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var tileW = 40, tileH = 40;
var mapW = 10, mapH = 10;
var currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;

var keysDown = {
	37 : false,
	38 : false,
	39 : false,
	40 : false
};

var mainChar = new Character();

function Character()
{
	this.tileFrom	= [1,1];
	this.tileTo		= [1,1];
	this.timeMoved	= 0;
	this.dimensions	= [30,30];
	this.position	= [45,45];
	this.delayMove	= 700;
}
Character.prototype.placeAt = function(x, y)
{
	this.tileFrom	= [x,y];
	this.tileTo		= [x,y];
	this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
		((tileH*y)+((tileH-this.dimensions[1])/2))];
};
Character.prototype.processMovement = function(t)
{
	if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

	if((t-this.timeMoved)>=this.delayMove)
	{
		this.placeAt(this.tileTo[0], this.tileTo[1]);
	}
	else
	{
		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);

		if(this.tileTo[0] != this.tileFrom[0])
		{
			var diff = (tileW / this.delayMove) * (t-this.timeMoved);
			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
		}
		if(this.tileTo[1] != this.tileFrom[1])
		{
			var diff = (tileH / this.delayMove) * (t-this.timeMoved);
			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}

	return true;
}

function toIndex(x, y)
{
	return((y * mapW) + x);
}

window.onload = function()
{
	ctx = document.getElementById('main-canvas').getContext("2d");
	requestAnimationFrame(drawGame);
	ctx.font = "bold 10pt sans-serif";

	window.addEventListener("keydown", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { keysDown[e.keyCode] = true; }
	});
	window.addEventListener("keyup", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { keysDown[e.keyCode] = false; }
	});
};

function drawGame()
{
	if(ctx==null) { return; }

	var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;

	var sec = Math.floor(Date.now()/1000);
	if(sec!=currentSecond)
	{
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }

	if(!mainChar.processMovement(currentFrameTime))
	{
		if(keysDown[38] && mainChar.tileFrom[1]>0 && gameMap[toIndex(mainChar.tileFrom[0], mainChar.tileFrom[1]-1)]==1) { mainChar.tileTo[1]-= 1; }
		else if(keysDown[40] && mainChar.tileFrom[1]<(mapH-1) && gameMap[toIndex(mainChar.tileFrom[0], mainChar.tileFrom[1]+1)]==1) { mainChar.tileTo[1]+= 1; }
		else if(keysDown[37] && mainChar.tileFrom[0]>0 && gameMap[toIndex(mainChar.tileFrom[0]-1, mainChar.tileFrom[1])]==1) { mainChar.tileTo[0]-= 1; }
		else if(keysDown[39] && mainChar.tileFrom[0]<(mapW-1) && gameMap[toIndex(mainChar.tileFrom[0]+1, mainChar.tileFrom[1])]==1) { mainChar.tileTo[0]+= 1; }

		if(mainChar.tileFrom[0]!=mainChar.tileTo[0] || mainChar.tileFrom[1]!=mainChar.tileTo[1])
		{ mainChar.timeMoved = currentFrameTime; }
	}

	for(var y = 0; y < mapH; ++y)
	{
		for(var x = 0; x < mapW; ++x)
		{
			switch(gameMap[((y*mapW)+x)])
			{
				case 0:
					ctx.fillStyle = "#685b48";
					break;
				default:
					ctx.fillStyle = "#5aa457";
			}

			ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
		}
	}

	ctx.fillStyle = "#0000ff";
	ctx.fillRect(mainChar.position[0], mainChar.position[1],
		mainChar.dimensions[0], mainChar.dimensions[1]);

	ctx.fillStyle = "#ff0000";
	ctx.fillText("FPS: " + framesLastSecond, 10, 20);

	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}
