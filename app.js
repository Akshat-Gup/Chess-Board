const letters = ["a","b","c","d","e","f","g","h"];
// Creating a table of squares for the chess pieces
var table = document.createElement("table");
// 9-i = the row number of the chessboard
//letters[j] = the letter no. of the chessboard
for (var i = 1; i < 9; i++) {
    var tr = document.createElement('tr');
    for (var j = 1; j < 9; j++) {
		var td = document.createElement('td'); //creating eight letter squares in each chess row
		// if the row number or column number are both either even or odd, color the square white else color it blue
        if (i%2 == j%2) {
            td.className = `white ${letters[j-1]} ${9-i}`;
        } else {
            td.className = `black ${letters[j-1]} ${9-i}`;
		}
		if ((9-i)<3) {
			td.innerHTML= `<img src="./images/${letters[j-1]}${9-i}.png"/>`
		} else if ((9-i)>6){
			td.innerHTML= `<img src="./images/${letters[j-1]}${9-i}.png"/>`
		} else {
			td.innerHTML=`<img src="./images/blank.png"/>`
		}

        tr.appendChild(td);
    }
    table.appendChild(tr);
}
document.body.appendChild(table);

//Capturing piece display
var captureDisplay = document.createElement("div");
captureDisplay.classList.add("capturePiece");
document.body.appendChild(captureDisplay);

//Querying the table
let actualTable = document.querySelector("table");

//Stores the value of the initial square
var squares = [];
var capturedPieces = [];
var whiteTurn = true;

const initialSquare = event => {
	console.log(event.target);
	if (event.target.parentElement.innerHTML!="<img src=\"./images/blank.png\">"){
		//
		if (whiteTurn) {
			if ((String(event.target.parentElement.innerHTML)).includes('2') || (String(event.target.parentElement.innerHTML)).includes('1')) {
				squares = `${event.target.parentElement.innerHTML}`;
				whiteTurn = false;
				event.target.parentElement.innerHTML = '<img src="./images/blank.png"/>';
			}
		} else {
			if (String(event.target.parentElement.innerHTML).includes('7') || String(event.target.parentElement.innerHTML).includes('8')) {
				squares = `${event.target.parentElement.innerHTML}`;
				whiteTurn = true;
				event.target.parentElement.innerHTML = '<img src="./images/blank.png"/>';
			}
		}
		
	}
	console.log("firstSquare",squares);
	
	if (squares.length==0) {
		actualTable.addEventListener("click", e => {initialSquare(e)}, {once : true});
	} else {
		actualTable.addEventListener("click", e => { finalSquare(e)}, {once : true});
	}
}
const finalSquare = event => {
	console.log("secondSquare",squares);
	if (event.target.parentElement.innerHTML!="<img src=\"./images/blank.png\">"){
		capturedPieces.push(`${event.target.parentElement.innerHTML}`);
		captureDisplay.innerHTML='<h5>Captured Pieces</h5><br>';
		capturedPieces.forEach(piece => {
			captureDisplay.innerHTML += piece
		})
	}
	event.target.parentElement.innerHTML = squares;
	squares = [];
	if (squares.length==0) {
		actualTable.addEventListener("click", e => {initialSquare(e)}, {once : true});
	} else {
		actualTable.addEventListener("click", e => { finalSquare(e)}, {once : true});
	}
}
// Initial code: if there is no square currently clicked on, then listen once for a click event and run code
// else if there is already a square that is clicked
if (squares.length==0) {
	actualTable.addEventListener("click", e => {initialSquare(e)}, {once : true});
} else {
	actualTable.addEventListener("click", e => { finalSquare(e)}, {once : true});
}



