const rollBtn = document.querySelector(".roll-btn");
const die1 = document.querySelector(".die1");
const die2 = document.querySelector(".die2");
const die3 = document.querySelector(".die3");
const die4 = document.querySelector(".die4");
const die5 = document.querySelector(".die5");
const scoreBox = document.querySelector(".scoreBox");
const scoreBoxes = document.querySelectorAll(".scoreBox");

let playerScore = 0;
let player = 1;


const rollDice = () => {
	let diceArray = [];
	for (let i = 0; i < 5; i++) {
		let die = Math.floor(Math.random() * 6 + 1);
		diceArray.push(die);
	}
	die1.src = `dice-${diceArray[0]}.png`;
	die2.src = `dice-${diceArray[1]}.png`;
	die3.src = `dice-${diceArray[2]}.png`;
	die4.src = `dice-${diceArray[3]}.png`;
	die5.src = `dice-${diceArray[4]}.png`;
	console.log(diceArray);
	return diceArray;
}

scoreBoxes.forEach(scoreBox => {
	scoreBox.addEventListener("click", () => evalScore(scoreBox, diceArray))});

const diceArray = rollBtn.addEventListener("click", rollDice);

function evalScore(scoreBox, diceArray) {
	const scoreBoxId = scoreBox.id;
	switch (scoreBoxId) {
		case `p${player}Aces`:
			evalAces();
			console.log(diceArray);
			break;
		case `p${player}Twos`:
			evalTwos();
			break;
		default:
			alert("You cannot add a score here");
	}
	function evalAces(diceArray) {
	console.log(diceArray);
	}
	function evalTwos() {
	console.log("twos");
	}
}


