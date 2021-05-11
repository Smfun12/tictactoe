let rows = [];
let columns = [];
let gameField = [];
let numberOfCellsToWin = 0;
let player1 = {
	turn: true,
	wins: 0,
	losses: 0,
	color: 'lightblue'
};
let player2 = {
	turn: false,
	wins: 0,
	losses: 0,
	color: 'yellow'
};
let firstPlayer = document.createElement("span");
firstPlayer.textContent = 'X';
let secondPlayer = document.createElement("span");
secondPlayer.textContent = 'O';
let endGame = false;
function setGameBoard(){
	endGame = false;
	player1.turn = true;
	player2.turn = false;
	let numberOfRows = document.getElementById("rows").value;
	let numberOfColumns = document.getElementById("columns").value;
	numberOfCellsToWin = +document.getElementById("winCells").value;
	if (numbersAreValid(numberOfRows,numberOfColumns,numberOfCellsToWin)){
		player1.color = document.getElementById("player1Color").value;
		player2.color = document.getElementById("player2Color").value;
		clearBoard();
		initBoard(+numberOfRows, +numberOfColumns);
	}
	else{
		alert("Check your data");
		document.getElementById("rows").value = 3;
		document.getElementById("columns").value = 3;
		document.getElementById("winCells").value = 3;
	}
}

function numbersAreValid(rows, columns, cellsToWin){
		if (rows <= 0 || columns <=0 || cellsToWin <=0){
			return false;
		}
		if (cellsToWin > rows && cellsToWin > columns){
			return false;
		}

		if (rows*columns === cellsToWin){
			return false;
		}
		return true;
}


function fillBoarsdWithZeros(){
	
	for (let i = 0; i < gameField.length; i++){
		for (let j = 0; j < gameField[i].length;j++){
			gameField[i][j] = 0;
		}
	}
	for (let i = 0; i < rows.length;i++){
		rows[i] = 0;
	}
	for (let i = 0; i < columns.length;i++){
		columns[i] = 0;
	}
}

function createBoards(row, column){
	for (let i = 0; i < row;i++){
		
		gameField[i] = new Array(column);
	}
	for (let i = 0; i < row;i++){
		rows[i] = 0;
	}
	for (let i = 0; i < column;i++){
		columns[i] = 0;
	}
}

function initBoard(row, column){
	createBoards(row, column);
	fillBoarsdWithZeros();
	let board = document.getElementById("field");
	for (let i = 0; i < row; i++){
		let row = document.createElement("div");
		row.className = 'row';
		for (let j = 0; j < column;j++){
			let newDiv = document.createElement("div");
			newDiv.className ='cell';
			let cellId = i+j;
			newDiv.setAttribute("id",i+'-'+j);
			newDiv.onclick = function(){
				if (!endGame){
				let id = this.getAttribute("id").split('-');
				if (gameField[id[0]][id[1]]!== 0){
				console.log("WHAT");
					
					return;
				}
				if (player1.turn){
				// this.appendChild(firstPlayer);
				// this.innerHTML = 'X';
				this.style.background = player1.color;
				gameField[id[0]][id[1]] = 1;
				rows[id[0]] = 1;
				columns[id[1]] = 1;
				player1.turn = false;
				player2.turn = true;
				checkWinner(1,id[0],id[1]);
				}
				else if (player2.turn){
				// this.appendChild(secondPlayer);
				this.style.background = player2.color;
				gameField[id[0]][id[1]] = 2;
				rows[id[0]] = 2;
				columns[id[1]] = 2;
				player1.turn = true;
				player2.turn = false;
				checkWinner(2,id[0],id[1]);
				}

			}
		}
			row.appendChild(newDiv);
			board.appendChild(row);
		}

	}
}

function clearBoard(){
	let cell = document.getElementsByClassName('cell');
	for (let i = cell.length - 1; i >= 0; i--) {
		cell[i].remove();
	}
}

function checkWinner(player, x, y){
	x = +x;
	y = +y;
	console.log(x,y);
	let startRowCell = y-numberOfCellsToWin;
	let startColumnCell = x - numberOfCellsToWin;
	let finishRowCell = y + numberOfCellsToWin;
	let finishColumnCell = x + numberOfCellsToWin;
	if (startRowCell < 0){
		startRowCell = 0;
	}
	if (startColumnCell < 0){
		startColumnCell = 0;
	}
	if (finishRowCell > rows.length-1){
		finishRowCell = rows.length;
	}
	if (finishColumnCell > columns.length-1){
		finishColumnCell = columns.length;
	}
	
	// console.log(startRowCell,startColumnCell,finishRowCell,finishColumnCell);
	
	checkRow(player, startRowCell, finishRowCell,x);
	if (!endGame){
	checkColumn(player, startColumnCell, finishColumnCell, y);
	}
	if (!endGame){
	checkLeftToRightDiagonal(player, x,y);
	}
	if (!endGame){
	checkRightToLeftDiagonal(player, x,y);
	}
	if (endGame){
		alert('Total score: \n' + player1.wins + " : " + player2.wins);
		resetBoard();
	}
	localStorage.setItem("1",JSON.stringify(player1));
	localStorage.setItem("2",JSON.stringify(player2));

}

function resetBoard(){
	setGameBoard();
	endGame = false;
	player1.turn = true;
	player2.turn = false;

}

function resetScore(){
	setGameBoard();
	endGame = false;
	player1.turn = true;
	player2.turn = false;
	player1.wins = 0;
	player1.losses = 0;
	player2.wins = 0;
	player2.losses = 0;
	localStorage.setItem("1",JSON.stringify(player1));
	localStorage.setItem("2",JSON.stringify(player2));
	alert('Successful!\n' +
		'Total score: \n' + player1.wins + " : " + player2.wins);

}

function seeStats(){
	alert('Total score: \n' + player1.wins + " : " + player2.wins);
}

function checkRow(player, startCell, finishCell, x){
	let countX  = 0;
	//Check row
	for (let i = startCell; i < finishCell; i++) {
		if (gameField[x][i]=== player){
			countX++;
		}
		if (gameField[x][i]!== player){
			countX--;
			if (countX <= 0){
				countX = 0;
			}
		}
		if (countX === numberOfCellsToWin){
			if (player === 1){
				console.log("Player1 won");
				alert("Player1 won");
				endGame = true;
				player1.wins++;
				player2.losses++;
				break;
			}
			else {
				console.log("Player2 won");
				alert("Player2 won");
				endGame = true;
				player2.wins++;
				player1.losses++;
				break;
			}
		}
	}
}

function checkColumn(player, startCell, finishCell, y){
	let countY = 0;
	//Check columns
	for (let i = startCell; i < finishCell; i++) {
		if (gameField[i][y]=== player){
			countY++;
		}
		if (gameField[i][y]!== player){
			countY--;
			if (countY <= 0){
				countY = 0;
			}
		}
		if (countY === numberOfCellsToWin){
			if (player === 1){
				console.log("Player1 won");
				alert("Player1 won");
				endGame = true;
				player1.wins++;
				player2.losses++;
				break;
			}
			else {
				console.log("Player2 won");
				alert("Player2 won");
				endGame = true;
				player2.wins++;
				player1.losses++;
				break;
			}
		}
	}
}
function checkLeftToRightDiagonal(player, x, y){
	let countZ = 0;
	for (let i = x, j = y; i > x- numberOfCellsToWin,
	 j > y - numberOfCellsToWin;i--,j--){
			if (i < 0 || j < 0){
				break;
			}
			if (gameField[i][j]=== player){
				countZ++;
			}
		if (gameField[i][j]!== player){
			countZ--;
			if (countZ <= 0){
				countZ = 0;
			}
		}
		if (countZ === numberOfCellsToWin){
			if (player === 1){
				console.log("Player1 won");
				alert("Player1 won");
				endGame = true;
				player1.wins++;
				player2.losses++;
				break;
			}
			else {
				console.log("Player2 won");
				alert("Player2 won");
				endGame = true;
				player2.wins++;
				player1.losses++;
				break;
			}
		}
	}
	countZ = 0;
	for (let i = x, j = y; i < x + numberOfCellsToWin,
	 j < y + numberOfCellsToWin;i++,j++){
			if (i > rows.length-1 || j > rows.length-1){
				break;
			}
			if (gameField[i][j]=== player){
				countZ++;
			}
		if (gameField[i][j]!== player){
			countZ--;
			if (countZ <= 0){
				countZ = 0;
			}
		}
		if (countZ === numberOfCellsToWin){
			if (player === 1){
				console.log("Player1 won");
				alert("Player1 won");
				endGame = true;
				player1.wins++;
				player2.losses++;
				break;
			}
			else {
				console.log("Player2 won");
				alert("Player2 won");
				endGame = true;
				player2.wins++;
				player1.losses++;
				break;
			}
		}
	}
}

function checkRightToLeftDiagonal(player, x, y){
	let countZ = 0;
	for (let i = x, j = y; i > x - numberOfCellsToWin,
	 j < y + numberOfCellsToWin;i--,j++){
			if (i <0 || j > columns.length-1){
				break;
			}
			if (gameField[i][j]=== player){
				countZ++;
			}
		if (gameField[i][j]!== player){
			countZ--;
			if (countZ <= 0){
				countZ = 0;
			}
		}
		if (countZ === numberOfCellsToWin){
			if (player === 1){
				console.log("Player1 won");
				alert("Player1 won");
				endGame = true;
				player1.wins++;
				player2.losses++;
				break;
			}
			else {
				console.log("Player2 won");
				alert("Player2 won");
				endGame = true;
				player2.wins++;
				player1.losses++;
				break;
			}
		}
	}
	countZ = 0;
	for (let i = x, j = y; i < x + numberOfCellsToWin,
	 j > y - numberOfCellsToWin;i++,j--){
			if (i > rows.length-1 || j < 0){
				break;
			}
			if (gameField[i][j]=== player){
				countZ++;
			}
		if (gameField[i][j]!== player){
			countZ--;
			if (countZ <= 0){
				countZ = 0;
			}
		}
		if (countZ === numberOfCellsToWin){
			if (player === 1){
				console.log("Player1 won");
				alert("Player1 won");
				endGame = true;
				player1.wins++;
				player2.losses++;
				break;
			}
			else {
				console.log("Player2 won");
				alert("Player2 won");
				endGame = true;
				player2.wins++;
				player1.losses++;
				break;
			}
		}
	}
}