const boardLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var whiteTurn = true;

// Adding a menu for captured pieces

let capturedPieces = document.createElement('div');
capturedPieces.classList.add('capturePiece');
document.body.appendChild(capturedPieces);

// Adding the chessboard to the screen

let table = document.createElement('table');

// (9-i) = row & boardLetters(j-1) = column
for (var i = 1; i <= 8; i++) {
	var tableRow = document.createElement('tr');
	for (var j = 1; j <= 8; j++) {
		var tableColumn = document.createElement('td');
		let squareName = `${boardLetters[j - 1]} ${9 - i}`;

		// A square is white if both row and column are even
		if (i % 2 == j % 2) {
			tableColumn.className = `white ` + squareName;
		} else {
			tableColumn.className = `black ` + squareName;
		}
		tableColumn.innerHTML =
			i > 6 || i < 3
				? `<img src="./images/${boardLetters[j - 1]}${9 - i}.png"/>`
				: `<img src="./images/blank.png"/>`;
		tableRow.appendChild(tableColumn);
	}
	table.appendChild(tableRow);
}

document.body.appendChild(table);

let blank = '<img src="./images/blank.png"/>';
var squares = [];
let whiteRows = ['1','2'];
let blackRows = ['7','8'];

const initialSquare = (event) => {
	// Piece validation: Two cases:
	let parentInnerHtml = String(event.target.parentElement.innerHTML);
	let validRow = el => parentInnerHtml.includes(el);
	let isWhite = whiteTurn && whiteRows.some(validRow);
	let isBlack = !whiteTurn && blackRows.some(validRow);

	if (isWhite || isBlack) {
		squares = `${parentInnerHtml}`; //tell code that a piece is being moved
		whiteTurn = !whiteTurn;
		event.target.parentElement.innerHTML = blank; // remove the image of the square
	}
	table.addEventListener(
		'click',
		(e) => {
			isWhite || isBlack ? finalSquare(e) : initialSquare(e);
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
	table.addEventListener(
		'click',
		(e) => {
			initialSquare(e);
		},
		{ once: true }
	);
};
// Initial code: Listen for the initial square
table.addEventListener(
	'click',
	(e) => {
		initialSquare(e);
	},
	{ once: true }
);
