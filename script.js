var ctx;
var tileSize = 15;
var cornerRadius = 5;
var gridWidth;
var gridHeight;
var grid;

$(document).ready(function () {
	var canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	ctx.canvas.width  = window.innerWidth - 50;
  	ctx.canvas.height = window.innerHeight - 400;
	gridWidth = canvas.width/tileSize - 1;
	gridHeight = canvas.height/tileSize - 1;
	shuffleGrid();

	var reset = document.getElementById('reset');
    reset.onclick = function(evt){
    	shuffleGrid();
    };

	drawGrid(grid);
	loop();
});

function shuffleGrid() {
	grid = [];
	for (var i = 0; i < gridWidth; i++) {
		grid.push([]);
		for (var j = 0; j < gridHeight; j++) {
			if(Math.random() < 0.2)
				grid[i][j] = true;
			else
				grid[i][j] = false;
		}
	}
}

function darwLine(x1,y1,x2,y2) {
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function drawGrid(grid) {
	clearCanvas();

	/*
	ctx.strokeStyle = "#d3d3d3";
	for(var i = 1; i<gridWidth; i++) {
		darwLine(i*tileSize,0,i*tileSize,tileSize*gridHeight);
	}
	for(var i = 1; i<gridHeight; i++) {
		darwLine(0,i*tileSize,tileSize*gridWidth,i*tileSize);
	}*/

	for (var i = 0; i < gridWidth; i++) {
		for (var j = 0; j < gridHeight; j++) {
			drawTile(grid,i,j);
		}
	}
}

function drawTile(grid,i,j) {
	if(grid[i][j]) {
		ctx.fillStyle = "#000000";
		ctx.fillRect(i*tileSize, j*tileSize+cornerRadius, tileSize, tileSize-2*cornerRadius);
		ctx.fillRect(i*tileSize+cornerRadius, j*tileSize, tileSize-2*cornerRadius, tileSize);
		ctx.beginPath();
	    ctx.arc(i*tileSize+cornerRadius,j*tileSize+cornerRadius,cornerRadius, 0, 2 * Math.PI);
	    ctx.fill();
	    ctx.beginPath();
	    ctx.arc(i*tileSize + tileSize-cornerRadius,j*tileSize+cornerRadius,cornerRadius, 0, 2 * Math.PI);
	    ctx.fill();
	    ctx.beginPath();
	    ctx.arc(i*tileSize + tileSize-cornerRadius,j*tileSize + tileSize-cornerRadius,cornerRadius, 0, 2 * Math.PI);
	    ctx.fill();
	    ctx.beginPath();
	    ctx.arc(i*tileSize+cornerRadius,j*tileSize + tileSize-cornerRadius,cornerRadius, 0, 2 * Math.PI);
	    ctx.fill();
	    if(i < gridWidth - 1 && grid[i+1][j]) {
	    	ctx.fillRect(i*tileSize+tileSize/2, j*tileSize, tileSize/2, tileSize);
	    }
	    if(i > 0 && grid[i-1][j]) {
	    	ctx.fillRect(i*tileSize, j*tileSize, tileSize/2, tileSize);
	    }
	    if(j < gridHeight - 1 && grid[i][j+1]) {
	    	ctx.fillRect(i*tileSize, j*tileSize+tileSize/2, tileSize, tileSize/2);
	    }
	    if(j > 0 && grid[i][j-1]) {
	    	ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize/2);
	    }
	    if(i < gridWidth - 1 && j < gridHeight - 1 && grid[i+1][j+1]) {
	    	ctx.fillRect(i*tileSize+tileSize/2, j*tileSize+tileSize/2, tileSize/2, tileSize/2);
	    }
	    if(i < gridWidth - 1 && j > 0 && grid[i+1][j-1]) {
	    	ctx.fillRect(i*tileSize+tileSize/2, j*tileSize, tileSize/2, tileSize/2);
	    }
	    if(i > 0 && j > 0 && grid[i-1][j-1]) {
	    	ctx.fillRect(i*tileSize, j*tileSize, tileSize/2, tileSize/2);
	    }
	    if(i > 0 && j < gridHeight - 1 && grid[i-1][j+1]) {
	    	ctx.fillRect(i*tileSize, j*tileSize+tileSize/2, tileSize/2, tileSize/2);
	    }
	} else {
		ctx.fillStyle = "#000000";
		if(i < gridWidth - 1 && j < gridHeight - 1 && grid[i+1][j] && grid[i][j+1]) {
	    	ctx.fillRect(i*tileSize+tileSize/2, j*tileSize+tileSize/2, tileSize/2, tileSize/2);
	    }
	    if(i < gridWidth - 1 && j > 0 && grid[i+1][j] && grid[i][j-1]) {
	    	ctx.fillRect(i*tileSize+tileSize/2, j*tileSize, tileSize/2, tileSize/2);
	    }
	    if(i > 0 && j > 0 && grid[i-1][j] && grid[i][j-1]) {
	    	ctx.fillRect(i*tileSize, j*tileSize, tileSize/2, tileSize/2);
	    }
	    if(i > 0 && j < gridHeight - 1 && grid[i-1][j] && grid[i][j+1]) {
	    	ctx.fillRect(i*tileSize, j*tileSize+tileSize/2, tileSize/2, tileSize/2);
	    }
	    ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(i*tileSize, j*tileSize+cornerRadius, tileSize, tileSize-2*cornerRadius);
		ctx.fillRect(i*tileSize+cornerRadius, j*tileSize, tileSize-2*cornerRadius, tileSize);
		ctx.beginPath();
	    ctx.arc(i*tileSize+cornerRadius,j*tileSize+cornerRadius,cornerRadius, 0, 2 * Math.PI);
	    ctx.fill();
	    ctx.beginPath();
	    ctx.arc(i*tileSize + tileSize-cornerRadius,j*tileSize+cornerRadius,cornerRadius, 0, 2 * Math.PI);
	    ctx.fill();
	    ctx.beginPath();
	    ctx.arc(i*tileSize + tileSize-cornerRadius,j*tileSize + tileSize-cornerRadius,cornerRadius, 0, 2 * Math.PI);
	    ctx.fill();
	    ctx.beginPath();
	    ctx.arc(i*tileSize+cornerRadius,j*tileSize + tileSize-cornerRadius,cornerRadius, 0, 2 * Math.PI);
	    ctx.fill();
	}
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getNeighbours(grid,i,j) {
	var sum = 0;
	for (var ii = i-1; ii <= i+1; ii++) {
		for (var jj = j-1; jj <= j+1; jj++) {
			if(!(ii == i && jj == j) && ii >= 0 && jj >= 0 && ii < gridWidth && jj < gridHeight) {
				if(grid[ii][jj]) {
					sum += 1;
				}
			}
		}
	}
	return sum;
}

function loop() {
	var neighbours = [];
	for (var i = 0; i < gridWidth; i++) {
		neighbours.push([]);
		for (var j = 0; j < gridHeight; j++) {
			var n = getNeighbours(grid,i,j);
			neighbours[i][j] = n;
		}
	}
	for (var i = 0; i < gridWidth; i++) {
		for (var j = 0; j < gridHeight; j++) {
			if(grid[i][j]) {
				switch(neighbours[i][j]) {
					case 2:
						grid[i][j] = true;
						break;
					case 3:
						grid[i][j] = true;
						break;
					default:
						grid[i][j] = false;
				}
			} else {
				if(neighbours[i][j]==3) {
					grid[i][j] = true;
				} else {
					grid[i][j] = false;
				}
			}
		}
	}
	drawGrid(grid);
	setTimeout(loop,100);
}
