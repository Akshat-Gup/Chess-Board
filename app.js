const letters = ["a","b","c","d","e","f","g","h"];
var table = document.createElement("table");
for (var i = 1; i < 9; i++) {
    var tr = document.createElement('tr');
    for (var j = 1; j < 9; j++) {
        var td = document.createElement('td');
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
