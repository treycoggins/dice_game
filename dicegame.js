const rollBtn = document.querySelector(".roll-btn");
const die1 = document.querySelector(".die1");
const die2 = document.querySelector(".die2");
const die3 = document.querySelector(".die3");
const die4 = document.querySelector(".die4");
const die5 = document.querySelector(".die5");
const gameDice = document.querySelectorAll(".game-dice");
const diceBoxes = document.querySelectorAll(".dice-box");
const diceBoxContainer = document.querySelector(".dice-box-container");
const scoreBox = document.querySelector(".scoreBox");
const scoreBoxes = document.querySelectorAll(".scoreBox");

const p1UpperScoreBox = document.querySelector("#p1UpperScore");
const p1UpperBonusBox = document.querySelector("#p1UpperBonus");
const p1LowerSubScoreBox = document.querySelector("#p1LowerSubScore");
const p1UpperSubScoreBox = document.querySelector("#p1UpperSubScore");
const p1GrandTotalBox = document.querySelector("#p1GrandTotal");

const p2UpperScoreBox = document.querySelector("#p2UpperScore");
const p2UpperBonusBox = document.querySelector("#p2UpperBonus");
const p2LowerSubScoreBox = document.querySelector("#p2LowerSubScore");
const p2UpperSubScoreBox = document.querySelector("#p2UpperSubScore");
const p2GrandTotalBox = document.querySelector("#p2GrandTotal");

const winnerBox = document.querySelector("#winner-box");

let p1LowerScore = 0;
let p1UpperScore = 0;
let p1TotalScore = 0;
let p2LowerScore = 0;
let p2UpperScore = 0;
let p2TotalScore = 0;
let player = 1;
let diceRoll = [];
let rollsOfTurn = 0;
let hasRolled = false;

/* ROLL THE DICE */

rollBtn.addEventListener("click", () => {
	if (rollsOfTurn === 3) {
		rollBtn.removeEventListener("click", rollDice);
		alert("You must record your score now.");
	}
	if (!hasRolled || rollsOfTurn < 3) {
		diceRoll = rollDice(diceRoll);
		rollsOfTurn++;
		hasRolled = true;
	}
});
const rollDice = (diceArray) => {
	let i = 0;
	for (box of diceBoxes) {
		if (!box.classList.contains("locked")) {
			let die = Math.floor(Math.random() * 6 + 1);
			diceArray.splice(i, 1, die);
		}
		i++;
	}
	die1.src = `dice-${diceArray[0]}.png`;
	die2.src = `dice-${diceArray[1]}.png`;
	die3.src = `dice-${diceArray[2]}.png`;
	die4.src = `dice-${diceArray[3]}.png`;
	die5.src = `dice-${diceArray[4]}.png`;
	return diceArray;
};

/* UPDATE THE SCORES */

scoreBoxes.forEach((scoreBox) => {
	scoreBox.addEventListener("click", () => {
		if (hasRolled) {
			scoreBox.removeEventListener("click", evalScore);
			scoreBox.removeEventListener("click", generateTotalScores);
			rollBtn.classList.remove("pulse");
			if (scoreBox.id.split("").includes(String(player))) {
				evalScore(scoreBox);
				generateTotalScores(scoreBox);
			} else {
				alert("You can't add to your opponent's score.");
			}
		} else {
			alert("Please roll before adding a score.");
		}
		if (scoreBox.innerText != "") {
			calcGrandTotal();
			checkForWin(scoreBoxes);
			changePlayer();
			resetDiceBoxes();
			rollsOfTurn = 0;
			rollBtn.classList.add("pulse");
		}
	});
});

diceBoxes.forEach((diceBox) => {
	diceBox.addEventListener("click", () => {
		if (!hasRolled) {
			alert("You must roll before holding dice.");
		} else {
			diceBox.classList.toggle("locked");
		}
	});
});

const generateTotalScores = (scoreBox) => {
	if (scoreBox.dataset.section === "lower") {
		if (scoreBox.id.split("").includes("1")) {
			p1LowerScore += Number(scoreBox.innerHTML);
			p1LowerSubScoreBox.innerHTML = p1LowerScore;
		} else {
			p2LowerScore += Number(scoreBox.innerHTML);
			p2LowerSubScoreBox.innerHTML = p2LowerScore;
		}
	} else {
		// If Totalling the Upper Section
		if (scoreBox.id.split("").includes("1")) {
			p1UpperScore += Number(scoreBox.innerHTML);
			p1UpperSubScoreBox.innerHTML = p1UpperScore;
			p1UpperScoreBox.innerHTML = p1UpperScore;
		} else {
			p2UpperScore += Number(scoreBox.innerHTML);
			p2UpperSubScoreBox.innerHTML = p2UpperScore;
			p2UpperScoreBox.innerHTML = p2UpperScore;
		}
	}
};

const calcGrandTotal = () => {
	if (player === 1) {
		p1GrandTotalBox.innerHTML =
			Number(p1UpperSubScoreBox.innerHTML) +
			Number(p1UpperBonusBox.innerHTML) +
			Number(p1LowerSubScoreBox.innerHTML);
	} else {
		p2GrandTotalBox.innerHTML =
			Number(p2UpperSubScoreBox.innerHTML) +
			Number(p2UpperBonusBox.innerHTML) +
			Number(p2LowerSubScoreBox.innerHTML);
	}
};

/* CLEAN UP, CHECK FOR WIN, AND CHANGE PLAYER */

const changePlayer = () => {
	player === 1 ? (player = 2) : (player = 1);
	rollBtn.innerHTML = `PLAYER ${player} ROLL!`;
	hasRolled = false;
	rollsOfTurn = 0;
};

const resetDiceBoxes = () => {
	diceBoxes.forEach((diceBox) => {
		diceBox.classList.remove("locked");
	});
};

const checkForWin = (scoreBoxes) => {
	let i = 0;
	scoreBoxes.forEach((scoreBox) => {
		if (scoreBox.innerHTML != "") {
			i++;
		}
		if (i === scoreBoxes.length) {
			rollBtn.remove();
			diceBoxContainer.remove();
			winnerBox.innerHTML = decideWinner();
		}
	});
};

const decideWinner = () => {
	if (Number(p1GrandTotalBox.innerHTML) > Number(p2GrandTotalBox.innerHTML)) {
		return "Player 1 WINS!!";
	} else return "Player 2 WINS!!";
};

/* EVALUATE THE SCORE */

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
function evalTrips(scoreBox) {
	const pipsArray = [];
	let temp = [];
	let diceCount = 0;
	for (let i = 1; i <= 6; i++) {
		temp = diceRoll.filter((die) => die === i);
		diceCount = temp.length;
		pipsArray.push(diceCount);
	}

	if (pipsArray.includes(3)) {
		const score = diceRoll.reduce((acc, curr) => acc + curr, 0);
		scoreBox.innerHTML = score;
	} else {
		if (confirm("You don't have 3 of a kind. Score 0 for this turn?")) {
			scoreBox.innerHTML = 0;
		}
	}
}
function evalQuads(scoreBox) {
	const pipsArray = [];
	let temp = [];
	for (let i = 1; i <= 6; i++) {
		temp = diceRoll.filter((die) => die === i);
		temp = temp.length;
		pipsArray.push(temp);
	}

	if (pipsArray.includes(4)) {
		const score = diceRoll.reduce((acc, curr) => acc + curr, 0);
		scoreBox.innerHTML = score;
	} else {
		if (confirm("You don't have 4 of a kind. Score 0 for this turn?")) {
			scoreBox.innerHTML = 0;
		}
	}
}

function evalFullHouse(scoreBox) {
	const pipsArray = [];
	let temp = [];
	for (let i = 1; i <= 6; i++) {
		temp = diceRoll.filter((die) => die === i);
		temp = temp.length;
		pipsArray.push(temp);
	}

	if (pipsArray.includes(3) && pipsArray.includes(2)) {
		scoreBox.innerHTML = 25;
	} else {
		if (confirm("You don't have a full house. Record 0 for this turn?")) {
			scoreBox.innerHTML = 0;
		}
	}
}
function evalSmStraight(scoreBox) {
	let diceArray = diceRoll.sort();
	diceArray = [...new Set(diceArray)];
	for (let i = 0; i < diceArray.length; i++) {
		if (
			diceArray[i] === diceArray[i + 1] - 1 &&
			diceArray[i] === diceArray[i + 2] - 2 &&
			diceArray[i] === diceArray[i + 3] - 3
		) {
			scoreBox.innerHTML = 30;
		} else {
			if (
				confirm("You do not have a proper straight. Score 0 for this turn?")
			) {
				continue;
			} else {
				scoreBox.innerHTML = 0;
				break;
			}
		}
	}
}
function evalLgStraight(scoreBox) {
	const diceArray = diceRoll.sort();
	for (let i = 0; i < diceArray.length; i++) {
		if (
			diceArray[i] === diceArray[i + 1] - 1 &&
			diceArray[i] === diceArray[i + 2] - 2 &&
			diceArray[i] === diceArray[i + 3] - 3 &&
			diceArray[i] === diceArray[i + 4] - 4
		) {
			scoreBox.innerHTML = 40;
		} else {
			if (
				confirm("You do not have a proper straight. Score 0 for this turn?")
			) {
				scoreBox.innerHTML = 0;
				break;
			}
		}
	}
}
function evalYahtzee(scoreBox) {
	const diceSet = new Set(diceRoll);
	if (diceSet.size === 1) {
		scoreBox.innerHTML = 50;
	} else {
		if (confirm("You do not have Yahtzee. Score 0 for this turn?")) {
			scoreBox.innerHTML = 0;
		}
	}
}
function evalChance(scoreBox) {
	const score = diceRoll.reduce((acc, curr) => acc + curr, 0);
	scoreBox.innerHTML = score;
}
