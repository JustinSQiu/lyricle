/* eslint-env browser */

var paragraph = "I could stay awake just to hear you breathing\nWatch you smile while you are sleeping\nWhile you're far away and dreaming\nI could spend my life in this sweet surrender\nI could stay lost in this moment forever\nEvery moment spent with you is a moment I treasure\nDon't want to close my eyes\nI don't want to fall asleep\n'Cause I'd miss you baby\nAnd I don't want to miss a thing\n'Cause even when I dream of you\nThe sweetest dream will never do\nI'd still miss you baby\nAnd I don't want to miss a thing\nLying close to you, feeling your heart beating\nAnd I'm wondering what you're dreaming\nWondering if it's me you're seeing\nThen I kiss your eyes\nAnd thank God we're together\nAnd I just want to stay with you in this moment forever\nForever and ever\nI don't want to close my eyes\nI don't want to fall asleep\n'Cause I'd miss you baby\nAnd I don't want to miss a thing\n'Cause even when I dream of you\nThe sweetest dream will never do\nI'd still miss you baby\nAnd I don't want to miss a thing\nI don't want to miss one smile\nAnd I don't want to miss one kiss\nAnd I just want to be with you\nRight here with you, just like this\nAnd I just want to hold you close\nI feel your heart so close to mine\nAnd just stay here in this moment\nFor all the rest of time\nYeah, yeah, yeah, yeah, yeah\nDon't want to close my eyes\nDon't want to fall asleep\n'Cause I'd miss you baby\nAnd I don't want to miss a thing\n'Cause even when I dream of you (even when I dream)\nThe sweetest dream will never do\nI'd still miss you baby\nAnd I don't want to miss a thing\nI don't want to close my eyes\nI don't want to fall asleep\n'Cause I'd miss you baby\nAnd I don't want to miss a thing\n'Cause even when I dream of you\nThe sweetest dream will never do\nI'd still miss you baby\nAnd I don't want to miss a thing\nDon't want to close my eyes\nI don't want to fall asleep, yeah\nAnd I don't want to miss a thing";

var paragraphlines = paragraph.split("\n");
var paragrapharray = [];
var i = 0;
var display = document.getElementById("lyrics");
var button = document.getElementById("guessButton");
var guessdisplay = document.getElementById("correctness");
var guessbox = document.getElementById("guessBox");
var numguesses = document.getElementById("numGuesses");
var guesslist = document.getElementById("guesses");
var correctness = document.getElementById("correctness");

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
var answer = "I Don't Want to Miss A Thing";
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
	numguesses.innerHTML = "Guesses Used: " + guessarray.length;
	guesslist.innerHTML = "Guesses List: ";
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