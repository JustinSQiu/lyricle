/* eslint-env browser */

var paragraph = "I'm so glad you made time to see me\nHow's life? Tell me, how's your family?\nI haven't seen them in a while\nYou've been good, busier than ever\nWe small talk, work and the weather\nYour guard is up and I know why\nBecause the last time you saw me\nIs still burned in the back of your mind\nYou gave me roses and I left them there to die\nSo this is me swallowin' my pride\nStandin' in front of you sayin' I'm sorry for that night\nAnd I go back to December all the time\nIt turns out freedom ain't nothin' but missin' you\nWishin' I'd realized what I had when you were mine\nI'd go back to December, turn around and make it alright\nI go back to December all the time\nThese days, I haven't been sleepin'\nStayin' up playin' back myself leavin'\nWhen your birthday passed and I didn't call\nThen I think about summer, all the beautiful times\nI watched you laughin' from the passenger's side\nAnd realized I loved you in the fall\nAnd then the cold came, the dark days\nWhen fear crept into my mind\nYou gave me all your love and all I gave you was goodbye\nSo this is me swallowin' my pride\nStandin' in front of you sayin' I'm sorry for that night\nAnd I go back to December all the time\nIt turns out freedom ain't nothin' but missin' you\nWishin' I'd realized what I had when you were mine\nI'd go back to December, turn around and change my own mind\nI go back to December all the time\nI miss your tan skin, your sweet smile\nSo good to me, so right\nAnd how you held me in your arms that September night\nThe first time you ever saw me cry\nMaybe this is wishful thinkin'\nProbably mindless dreamin'\nBut if we loved again, I swear I'd love you right\nI'd go back in time and change it, but I can't\nSo if the chain is on your door, I understand\nBut this is me swallowin' my pride\nStandin' in front of you sayin' I'm sorry for that night\nAnd I go back to December\nIt turns out freedom ain't nothin' but missin' you\nWishin' I'd realized what I had when you were mine\nI'd go back to December, turn around and make it alright\nI'd go back to December, turn around and change my own mind\nI go back to December all the time\nAll the time";

var paragraphlines = paragraph.split("\n");
var paragrapharray = [];
var i = 0;
var display = document.getElementById("lyrics");
var button = document.getElementById("guessButton");
var guessdisplay = document.getElementById("correctness");
var guessbox = document.getElementById("guessBox");
var numguesses = document.getElementById("numGuesses");
var guesslist = document.getElementById("guesses");

for (i; i < paragraphlines.length; i += 1) {
	paragraphlines[i] = paragraphlines[i].replace(/'/g, "1011001110");
	var j = 0;
	var linewords = paragraphlines[i].split(/\s*\b\s*/);
	for (j; j < linewords.length; j += 1) {
		linewords[j] = linewords[j].replace(/1011001110/g, "'");
		paragrapharray.push(linewords[j]);
	}
	paragrapharray.push("\n");
}

var guessarray = [];
var current = [];
var answer = "Back to December";
var won = false;

function getGuess() {
	"use strict";
	var x = guessbox.value, i = 0, j;
	for (i; i < guessarray.length; i += 1) {
		if (guessarray[i].toLowerCase() === x.toLowerCase()) {
			guessarray.splice(i, 1);
		}
	}
	j = guessarray.length;
	guessarray.unshift(x);
	if (x.toLowerCase() === answer.toLowerCase()) {
		guessdisplay.innerHTML = "";
		correctness.innerHTML = "You have won! The song was " + answer + ".";
		won = true;
	}
	numguesses.innerHTML = "Number of Guesses Used: " + guessarray.length;
	guesslist.innerHTML = "Guesses: ";
	for (j; j >= 0; j -= 1) {
		guesslist.innerHTML = guesslist.innerHTML + guessarray[j] + ", ";
	}
}

function printParagraph(guess) {
	"use strict";
	guess += "";
	var i = 0, div = document.createElement("div"), linebreak, container;
	for (i; i < paragrapharray.length; i += 1) {
		linebreak = document.createElement("br");
		if (paragrapharray[i] === "\n") {
			div.appendChild(linebreak);
		} else if (paragrapharray[i].match(/^[.,:;!?]/)) {
			div.appendChild(document.createTextNode(paragrapharray[i]));
		} else if (guess.toLowerCase() === paragrapharray[i].toLowerCase()) {
			container = document.createElement("span");
			container.appendChild(document.createTextNode(" " + current[i]));
			container.style.color = "red";
			div.appendChild(container);
		} else {
			div.appendChild(document.createTextNode(" " + current[i]));
		}
	}
	display.appendChild(div);
}

function setup() {
	"use strict";
	var i = 0, j;
	for (i; i < paragrapharray.length; i += 1) {
		j = 0;
		current.push("");
		for (j; j < paragrapharray[i].length; j += 1) {
			current[i] += "_";
		}
	}
}

//function displayTest() {
//	var txt = "";
//	var i = 0;
//	for (i; i < paragrapharray.length; i+=1) {
//		txt += " " + paragrapharray[i];
//	}
//	document.getElementById("testparagraph").innerHTML = txt;
//}

function updater(guess) {
	"use strict";
	var i = 0, correct = false;
	for (i; i < paragrapharray.length; i += 1) {
		if (paragrapharray[i].toLowerCase() === guess.toLowerCase()) {
			if (!won) {
				guessdisplay.innerHTML = "Your guess was in the song!";
			}
			correct = true;
			current[i] = paragrapharray[i];
		}
		if (!correct && !won) {
			guessdisplay.innerHTML = "Your guess was not in the song.";
		}
	}
}

button.addEventListener("click", function () {
	"use strict";
	getGuess();
});
button.addEventListener("click", function () {
	"use strict";
	updater(guessarray[0]);
});
button.addEventListener("click", function () {
	"use strict";
	display.removeChild(display.lastElementChild);
});
button.addEventListener("click", function () {
	"use strict";
	printParagraph(guessarray[0]);
});

guessbox.addEventListener("submit", function () {
	"use strict";
	getGuess();
});
guessbox.addEventListener("submit", function () {
	"use strict";
	updater(guessarray[0]);
});
button.addEventListener("submit", function () {
	"use strict";
	display.removeChild(display.lastElementChild);
});
guessbox.addEventListener("submit", function () {
	"use strict";
	printParagraph(guessarray[0]);
});

setup();
printParagraph();
//displayTest();