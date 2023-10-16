const rollBtn = document.querySelector(".roll-btn");
const die1 = document.querySelector(".die1");
const die2 = document.querySelector(".die2");
const die3 = document.querySelector(".die3");
const die4 = document.querySelector(".die4");
const die5 = document.querySelector(".die5");
const gameDice = document.querySelectorAll(".game-dice");
const diceBoxes = document.querySelectorAll(".dice-box");
const scoreBox = document.querySelector(".scoreBox");
const scoreBoxes = document.querySelectorAll(".scoreBox");

let playerScore = 0;
let player = 1;
let diceRoll = [];
let rollsOfTurn = 1;

scoreBoxes.forEach((scoreBox) => {
	scoreBox.addEventListener("click", () => {
		evalScore(scoreBox);
		resetDiceBoxes();
		changePlayer();
		rollsOfTurn = 1;
	});
});

diceBoxes.forEach((diceBox) => {
	diceBox.addEventListener("click", () => {
		diceBox.classList.toggle("locked");
	});
});

rollBtn.addEventListener("click", () => {
	if (rollsOfTurn > 3) {
		rollBtn.removeEventListener("click", rollDice);
	} else {
		diceRoll = rollDice(diceRoll);
		rollsOfTurn++;
	}
});

const rollDice = (diceArray) => {
	let i = 0;
	for (element of diceBoxes) {
		if (!element.classList.contains("locked")) {
			let die = Math.floor(Math.random() * 6 + 1);
			diceArray.splice(i, 1, die);
		}
		i++;
	}

	displayDice(diceArray);

	return diceArray;
};

const evalScore = (scoreBox) => {
	const scoreBoxId = scoreBox.id;
	switch (scoreBoxId) {
		case `p${player}Aces`:
			evalAces(scoreBox);
			break;
		case `p${player}Twos`:
			evalTwos(scoreBox);
			break;
		case `p${player}Threes`:
			evalThrees(scoreBox);
			break;
		case `p${player}Fours`:
			evalFours(scoreBox);
			break;
		case `p${player}Fives`:
			evalFives(scoreBox);
			break;
		case `p${player}Sixes`:
			evalSixes(scoreBox);
			break;
		case `p${player}Trips`:
			evalTrips(scoreBox);
			break;
		case `p${player}Quads`:
			evalQuads(scoreBox);
			break;
		case `p${player}FullHouse`:
			evalFullHouse(scoreBox);
			break;
		case `p${player}SmStraight`:
			evalSmStraight(scoreBox);
			break;
		case `p${player}LgStraight`:
			evalLgStraight(scoreBox);
			break;
		case `p${player}Yahtzee`:
			evalYahtzee(scoreBox);
			break;
		case `p${player}Chance`:
			evalChance(scoreBox);
			break;
		default:
			alert("You cannot add a score here");
			evalScore();
	}
};

function evalAces(scoreBox) {
	const score = diceRoll.filter((die) => die === 1);
	scoreBox.innerHTML = score.length;
}
function evalTwos(scoreBox) {
	const score = diceRoll.filter((die) => die === 2);
	scoreBox.innerHTML = score.length * 2;
}
function evalThrees(scoreBox) {
	const score = diceRoll.filter((die) => die === 3);
	scoreBox.innerHTML = score.length * 3;
}
function evalFours(scoreBox) {
	const score = diceRoll.filter((die) => die === 4);
	scoreBox.innerHTML = score.length * 4;
}
function evalFives(scoreBox) {
	const score = diceRoll.filter((die) => die === 5);
	scoreBox.innerHTML = score.length * 5;
}
function evalSixes(scoreBox) {
	const score = diceRoll.filter((die) => die === 6);
	scoreBox.innerHTML = score.length * 6;
}
function evalTrips(scoreBox) {}
function evalQuads(scoreBox) {}
function evalFullHouse(scoreBox) {}
function evalSmStraight(scoreBox) {}
function evalLgStraight(scoreBox) {}
function evalYahtzee(scoreBox) {
	const diceSet = new Set(diceRoll);
	if (diceSet.size === 1) {
		scoreBox.innerHTML = 50;
	} else alert("You do not have Yahtzee");
}
function evalChance(scoreBox) {
	const score = diceRoll.reduce((acc, curr) => acc + curr, 0);
	scoreBox.innerHTML = score;
}

const changePlayer = () => {
	player === 1 ? (player = 2) : (player = 1);
	rollBtn.classList.remove("pulse");
	rollBtn.innerHTML = `PLAYER ${player} ROLL!`;
};

const displayDice = (diceArray) => {
	die1.src = `dice-${diceArray[0]}.png`;
	die2.src = `dice-${diceArray[1]}.png`;
	die3.src = `dice-${diceArray[2]}.png`;
	die4.src = `dice-${diceArray[3]}.png`;
	die5.src = `dice-${diceArray[4]}.png`;
};

const resetDiceBoxes = () => {
	diceBoxes.forEach((diceBox) => {
		diceBox.classList.remove("locked");
	});
	displayDice([1, 1, 1, 1, 1]);
};
