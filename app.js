const boardLetters = ["a","b","c","d","e","f","g","h"];
var table, captureDisplay, squares, capturedPieces, whiteTurn;
squares = []; capturedPieces = []; whiteTurn = true;
table = document.createElement("table");
captureDisplay = document.createElement("div");

// (9-i) = row & boardLetters(j) = column
for (var i = 1; i < 9; i++) {
    var tr = document.createElement('tr');
    for (var j = 1; j < 9; j++) {
		var td = document.createElement('td'); //8 letters / row
		// if (row number &&columnNumber = (both odd or both even)) {white square} else {blue square}
        if (i%2 == j%2) {
            td.className = `white ${boardLetters[j-1]} ${9-i}`;
        } else {
            td.className = `black ${boardLetters[j-1]} ${9-i}`;
		}
		if ((9-i)<3) {
			td.innerHTML= `<img src="./images/${boardLetters[j-1]}${9-i}.png"/>`
		} else if ((9-i)>6){
			td.innerHTML= `<img src="./images/${boardLetters[j-1]}${9-i}.png"/>`
		} else {
			td.innerHTML=`<img src="./images/blank.png"/>`
		}
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
//Actually creating elements in the main body
document.body.appendChild(table);
captureDisplay.classList.add("capturePiece");
document.body.appendChild(captureDisplay);


const recordInitialSquareAndListen = (event,firstFile, secondFile) => {
	if ((String(event.target.parentElement.innerHTML)).includes(secondFile) || (String(event.target.parentElement.innerHTML)).includes(firstFile)) {
		squares = `${event.target.parentElement.innerHTML}`; //tell code that a piece is being moved
		whiteTurn = !whiteTurn; // Make it swap turn
		event.target.parentElement.innerHTML = '<img src="./images/blank.png"/>'; // remove the image of the square
		if (squares.length==0) {
			table.addEventListener("click", e => { initialSquare(e)}, {once : true});
		} else {
			table.addEventListener("click", e => { finalSquare(e)}, {once : true});
		}
	} else {
		table.addEventListener("click", e => { initialSquare(e)}, {once : true});
	}
}

const initialSquare = event => { //Run this code if no piece has been clicked on before (no piece is in the middle of being moved)
	if (whiteTurn) { //tell the code that a piece has been clicked and remove the image only if it is white's turn
		recordInitialSquareAndListen(event,'2','1');
	} else { // Run this code if it is black's turn
		recordInitialSquareAndListen(event,'7','8');
	}	
			
}
const finalSquare = event => {
	if (event.target.parentElement.innerHTML!="<img src=\"./images/blank.png\">"){
		capturedPieces.push(`${event.target.parentElement.innerHTML}`);
		capturedPieces.forEach(piece => {
			captureDisplay.innerHTML += piece
		})
	}
	event.target.parentElement.innerHTML = squares;
	squares = [];
	table.addEventListener("click", e => {initialSquare(e)}, {once : true});
}
// Initial code: Listen for the initial square
table.addEventListener("click", e => {initialSquare(e)}, {once : true});



