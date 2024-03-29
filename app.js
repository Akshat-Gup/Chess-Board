const boardLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var whiteTurn = true;

// Adding a menu for captured pieces

let capturedPieces = document.createElement('div');
capturedPieces.classList.add('capturePiece');
document.body.appendChild(capturedPieces);

// Adding the chessboard to the screen

let table = document.createElement('table');
let title = document.querySelector('h1');
// (9-i) = row & boardLetters(j-1) = column
for (var i = 1; i <= 8; i++) {
	var tableRow = document.createElement('tr');
	for (var j = 1; j <= 8; j++) {
		var columnElement = document.createElement('td');
		let squareName = `${boardLetters[j - 1]} ${9 - i}`;

		// A square is white if both row and column have the same modulus
		if (i % 2 == j % 2) {
			columnElement.className = `white ` + squareName;
		} else {
			columnElement.className = `black ` + squareName;
		}
		// If the rows are in the rangee 7-8 or 1-2, fill the squares with pieces
		columnElement.innerHTML =
			i > 6 || i < 3
				? `<img src="./images/${boardLetters[j - 1]}${9 - i}.png"/>`
				: `<img src="./images/blank.png"/>`;
		tableRow.appendChild(columnElement);
	}
	table.appendChild(tableRow);
}

document.body.appendChild(table);

let blank = '<img src="./images/blank.png"/>';
var squares = ''; // Squares needs to be a var or else the code will break
let whiteRows = ['1','2'];
let blackRows = ['7','8'];

let movedIndicator = document.querySelector("#piece-menu");
const initialSquare = (event) => {
	// Piece validation: Two cases:
	let parentInnerHtml = String(event.target.parentElement.innerHTML);
	let validRow = el => parentInnerHtml.includes(el);
	let isWhite = whiteTurn && whiteRows.some(validRow);
	let isBlack = !whiteTurn && blackRows.some(validRow);

	if (isWhite || isBlack) {
		squares = `${parentInnerHtml}`; // store the currenet piece in a global variable so that it can be accessed later
		movedIndicator.innerHTML = squares;
		whiteTurn = !whiteTurn;
		event.target.parentElement.innerHTML = blank; // remove the image of the square
	}
	table.addEventListener(
		'click',
		(e) => {
			if(String(e.target.tagName) == "IMG") { // preventing the user from clicking the table directly
				isWhite || isBlack ? finalSquare(e) : initialSquare(e);
			}
			
		},
		{ once: true }
	);
};
const finalSquare = (event) => {
	let parentInnerHtml = String(event.target.parentElement.innerHTML);
	if (parentInnerHtml != '<img src="./images/blank.png">'){
		capturedPieces.innerHTML += parentInnerHtml;
	}
	event.target.parentElement.innerHTML = squares;
	squares = [];
	movedIndicator.innerHTML = '<img src="./images/blank.png">';
	table.addEventListener(
		'click',
		(e) => {
			if(String(e.target.tagName) == "IMG") {
				initialSquare(e); // // preventing the user from clicking the table directly
			}
			
		},
		{ once: true }
	);
	title.textContent = whiteTurn ? "White's turn" : "Black's turn";
};
// Initial code: Listen for the initial square
table.addEventListener(
	'click',
	(e) => {
		if(String(e.target.tagName) == "IMG") { // preventing users from clicking on the table directly
			initialSquare(e);
		}
		
	},
	{ once: true }
);
