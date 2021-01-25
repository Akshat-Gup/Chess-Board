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
//Stores the values of the captured pieces
var capturedPieces = [];
// Stores whether it's white's turn
var whiteTurn = true;
const initialSquare = event => { //Run this code if no piece has been clicked on before (no piece is in the middle of being moved)
	console.log(event.target);
	if (event.target.parentElement.innerHTML!="<img src=\"./images/blank.png\">" && (String(event.target.parentElement.innerHTML)).includes('img')){ //tell the code that a piece has been clicked only if it is not blank (is a piece)
		//
		if (whiteTurn) { //tell the code that a piece has been clicked and remove the image only if it is white's turn
			if ((String(event.target.parentElement.innerHTML)).includes('2') || (String(event.target.parentElement.innerHTML)).includes('1')) {
				squares = `${event.target.parentElement.innerHTML}`; //tell code that a piece is being moved
				whiteTurn = false; // Make it black's turn
				event.target.parentElement.innerHTML = '<img src="./images/blank.png"/>'; // remove the image of the square
				if (squares.length==0) {
					actualTable.addEventListener("click", e => { initialSquare(e)}, {once : true});
				} else {
					actualTable.addEventListener("click", e => { finalSquare(e)}, {once : true});
				}
				 //listen for more squares
			} else {
				actualTable.addEventListener("click", e => { initialSquare(e)}, {once : true});
			}
		} else { // Run this code if it is black's turn
			if (String(event.target.parentElement.innerHTML).includes('7') || String(event.target.parentElement.innerHTML).includes('8')) {
				squares = `${event.target.parentElement.innerHTML}`; //tell the code that a piece is being moved
				whiteTurn = true; //Make it white's turn
				event.target.parentElement.innerHTML = '<img src="./images/blank.png"/>';
				if (squares.length==0) {
					actualTable.addEventListener("click", e => { initialSquare(e)}, {once : true});
				} else {
					actualTable.addEventListener("click", e => { finalSquare(e)}, {once : true});
				} //listen for the location of the moved square
			} else {
				actualTable.addEventListener("click", e => { initialSquare(e)}, {once : true});
			}
		}
		
	} else {
		actualTable.addEventListener("click", e => { initialSquare(e)}, {once : true});
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
	

actualTable.addEventListener("click", e => { initialSquare(e)}, {once : true});


}
// Initial code: Listen for the initial square

actualTable.addEventListener("click", e => {initialSquare(e)}, {once : true});



