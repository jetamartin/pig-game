/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* 
Additional code challenges: 
Change game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players cn set the winning score, so that they can change the predeifined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a food opportunity to use google to figure this out :)
3. Add another dice to the game so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice so take a look at the CSS for the first one.)
4. Add animation
a) If either dice roll results in a 1 make both the dice appear but have them quickly fade away rather than just not show up. 
b) When the user clicks hold then animate dice disappearance
5) Add a match score to keep track of number of games each player has won. 
6) A settings modal that allows game options to be changed at any time during the game (except during a player's turn)
7) A choice between a one-dice or two-dice game (which can be changed at any time in the settings menu)
8) A help modal which provides instructions for the game (including my implementation of slightly different game rules for the two-dice mode).
*/

// Global variables
var scores, roundScore, activePlayer, gamePlaying, gamesWonCount, playerNames, winningScore, numOfDice, matchScore, msgs;
var player0, player1, score;
var player0Field = document.getElementById('name-0');
var player1Field = document.getElementById('name-1');
var scoreField = document.getElementById('winScore');

// Get element references
msgs = document.querySelector('.messages');
matchScore = document.querySelectorAll('.matchScore');

/**********************************************************/
/* Initialize Match and Game values
/**********************************************************/

/* Used to track how many games each players have won */
gamesWonCount = [0, 0];
playerNames = ['Player1', 'Player2'];
winningScore = 20;

/* Initialize all values of the game - note this method is also called when you click on "new game" button. Adding the concept of matches (multiple games)...may need to break this method into multiple parts e.g., initGame(), initMatch and initNewGame() as you may no need to initialize different levels of game variables at different concepts. 
 */

init();

// ******************* ROLL BUTTON *******************************
// User clicks the "Roll" button
// ******************* ROLL BUTTON *******************************

document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		// Need to reset animation
		resetAnimation('rubberBand');
		resetAnimation('rotateOut');
		resetAnimation('bounceOutUp');

		// *********** Reset rubberband animation that was added in Hold button when game is won 
		document.querySelector('.player-' + activePlayer + '-gamesWonCount').classList.remove('rubberBand');

		// Resets animation that was set by pressing "New Game" button
		matchScore[0].classList.remove('flipInY');
		matchScore[1].classList.remove('flipInY');

		// 1. Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		var diceDOM1 = document.querySelector('.dice1');
		var diceDOM2 = document.querySelector('.dice2');

		// Display dice 
		diceDOM1.style.display = 'block';
		diceDOM2.style.display = 'block';


		// 3. Add rubber band animation to dice
		addAnimation('rubberBand');

		// Display dice image corresponding to dice number rolled
		diceDOM1.src = 'dice-' + dice1 + '.png';
		diceDOM2.src = 'dice-' + dice2 + '.png';

		// 3. Update the round score IF the rolled number was not a 1
		if (dice1 !== 1 & dice2 !== 1) {
			// Add Score
			roundScore = roundScore + dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;

		} else {

			// Animate fadeout of dice when a 1 is rolled
			addAnimation('rotateOut');

			// Switch to next player
			switchPlayer();
		}
	} else { // Game is over..Remind user to click New Game button to start new game
		msgs.style.display = "block";
		// Create error message that fades out 	
		msgs.textContent = "Click 'New Game' button to continue play";
		msgs.style.backgroundColor = 'pink';
		fadeOut(msgs);
	}

});
// ******************* HOLD BUTTON *******************************
// User clicks the Hold button
// ******************* HOLD BUTTON *******************************


document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {

		// 1. Add current score to global score of player
		scores[activePlayer] += roundScore;

		// 2. Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// 3. Check if player won the game
		if (scores[activePlayer] >= winningScore) {
			// Game is over...user must hit New game button which re-initializes game and resets gamePlaying state variable
			gamePlaying = false;

			// Update Games Won Count
			gamesWonCount[activePlayer] += 1;
			document.querySelector('.player-' + activePlayer + '-gamesWonCount').textContent = gamesWonCount[activePlayer];

			// *********** Test Rubberband on Games won
			document.querySelector('.player-' + activePlayer + '-gamesWonCount').classList.add('rubberBand');

			// Add transition count color from orange to white once you are on the scoreboard
			document.querySelector('.player-' + activePlayer + '-gamesWonCount').classList.add('gameWinner');

			// Make active player the winner
			document.querySelector('#name-' + activePlayer).textContent = playerNames[activePlayer] + ' WINS!';
			// Style winning player
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			// Once a game is won remove the active player indicator
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

			// Hide dice
			document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';

			matchScore[0].classList.remove('flipInY');
			matchScore[1].classList.remove('flipInY');


		} else {

			// Animate
			addAnimation('bounceOutUp');

			// Switch to next player
			switchPlayer();
		}

	} else {
		msgs.style.display = "block";
		// Create error message that fades out 	
		msgs.textContent = "Click 'New Game' button to play";
		msgs.style.backgroundColor = 'pink';
		fadeOut(msgs);
	}

});

// ******************* NEW GAME BUTTON *******************************
// User clicks the New game button
// ******************* NEW GAME BUTTON *******************************

document.querySelector('.btn-new').addEventListener('click', function () {

	// Needed to add 'flipInY' here to ensure that animation anytime you hit 'New Game' button
	matchScore[0].classList.add('flipInY');
	matchScore[1].classList.add('flipInY');

	if (roundScore === 0 && scores[0] === 0 && scores[1] === 0) {
		// Make informational message visible
		msgs.style = 'block';
		// Create message to indicate settings successfully updated 	
		msgs.textContent = "Click 'Roll Button' to start game";
		msgs.style.backgroundColor = 'lightGreen';
		fadeOut(msgs);
	} else {
		// Re-initialize game values
		init();
		// Make informational message visible
		msgs.style = 'block';
		// Create message to indicate settings successfully updated 	
		msgs.textContent = "New game started";
		msgs.style.backgroundColor = 'lightGreen';
		fadeOut(msgs);
	}
});


/********************* Supporting function **********************/

function init() {
	// Initialize Gameplaying state variable
	gamePlaying = true;

	// Initialize score counters
	scores = [0, 0]; // Players' total scores
	roundScore = 0; // Player's current score

	// By default make Player 1 the active player
	activePlayer = 0; /* First player = 0, Second player = 1 */

	// Hide the dice
	document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
	document.getElementById('winScore').textContent = winningScore;


	// Reset players scores
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// Reset Player Names
	document.getElementById('name-0').textContent = playerNames[0];
	document.getElementById('name-1').textContent = playerNames[1];

	// Set number of dice to be played 


	// Remove Winner class
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	// Remove animation
	document.querySelector('.player-0-gamesWonCount').classList.remove('ruberBand');
	document.querySelector('.player-1-gamesWonCount').classList.remove('ruberBand');


	// Ensure that Player 1 is only active player
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}


// Switch who is the active player
function switchPlayer() {

	// Switch to next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	// Reset roundScore
	roundScore = 0;

	// Zero out current score of each player on UI
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// Change UI so it reflects who is now active player by toggling class 'active'
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}

function addAnimation(animationType) {

	document.querySelector('.dice1').classList.add(animationType); //.replace(/^"(.+(?="$))"$/, '$1'));
	document.querySelector('.dice2').classList.add(animationType); //.replace(/^"(.+(?="$))"$/, '$1'));
}

/* When a player rolls a one you want the dice to appear briefly and then automatically exit with animation. To get this to work successfully you must reset the animateion after it runs or it will not re-run again (and hence the dice will not appear) when two players roll "ones" back to back. 
The follow resource is what clued me on how to do this: https://css-tricks.com/restart-css-animation/. I still don't completely understand why this works..but it does. 
*/
function resetAnimation(animationType) {

	// reset the transition by...
	document.querySelector('.dice1').addEventListener("animationend", function (e) {
		e.preventDefault;

		// -> removing the animation class
		document.querySelector('.dice1').classList.remove(animationType);

		// Need to hide dice or will reappear at the end of the animation
		if (e.animationName === 'rotateOut' || e.animationName === 'bounceOutUp') {
			document.querySelector('.dice1').style.display = 'none';
		}
		//			document.querySelector('.dice1').style.display = 'none';


		// -> triggering reflow /* The actual magic */
		// without this statement the solution won't work...don't really understand why this 'magic statement is needed. 
		void document.querySelector('.dice1').offsetWidth;

	}, false);

	document.querySelector('.dice2').addEventListener("animationend", function (e) {
		e.preventDefault;

		// -> removing the class
		document.querySelector('.dice2').classList.remove(animationType);
		if (e.animationName === 'rotateOut' || e.animationName === 'bounceOutUp') {
			document.querySelector('.dice2').style.display = 'none';
		}


		// -> triggering reflow /* The actual magic */
		// without this statement the solution won't work...don't really understand why this 'magic statement is needed. 
		void document.querySelector('.dice2').offsetWidth;

	}, false);
}

/********************************    MODAL WINDOWS        ****************************/

//*********************************************************
// Open Settings Modal Windows 
//*********************************************************
document.querySelector('.btn-settings').addEventListener('click', function () {

	// Settings can't be changed if game is actively underway
	if (!gamePlaying || roundScore === 0) {
		document.querySelector('#modal-settings').style.display = 'block';
	} else {
		// Make error message visible
		msgs.style = 'block';
		// Create message to indicate settings successfully updated 	
		msgs.textContent = "Settings can't be updated during game";
		msgs.style.backgroundColor = 'pink';
		fadeOut(msgs);
	}
});
//*********************************************************
// Close Settings Modal Windows 
//*********************************************************
document.querySelector('.modal-btn-close').addEventListener('click', function () {
	document.querySelector('#modal-settings').style.display = 'none';
});


//*********************************************************
// Save Settings in Settings Modal Windows 
//*********************************************************
//document.querySelector('.btn-save').addEventListener('click', function () {
//	var player1, player2, score;
//	var player0Field = document.getElementById('input-name-0');
//	var player1Field = document.getElementById('input-name-1');
//	var errMsg;
//
//
//	// Reset msgs so it will show each time.
//	msgs.style = 'block';
//
//	player0 = player0Field.value;
//	player1 = player1Field.value;
//
//	// Update player names if player name is provided and player name not blank 
//	if (player0.length > 0) {
//		if (isNotEmptyString(player0)) {
//			errMsg = "";
//			document.querySelector('.errMsg').style.display = 'none';
//			playerNames[0] = player0;
//			document.getElementById('name-0').textContent = playerNames[0];
//		} else {
//			//			player0Field.value = "";
//			errMsg = "Invalid Player name..all blanks!";
//			document.querySelector('.errMsg').innerHTML = errMsg;
//			document.querySelector('.errMsg').style.display = 'inline';
//		}
//	} else {
//		if (errMsg !== "") {
//			errMsg = "";
//			document.querySelector('.errMsg').style.display = 'none';
//		}
//	}
//
//	if (player1.length > 0) {
//		if (isNotEmptyString(player1)) {
//			playerNames[1] = player1;
//			document.getElementById('name-1').textContent = playerNames[1];
//		} else {
//			playerField1.value = "";
//		}
//	}
//
//	// Get element id
//	score = document.getElementById('winning-score').value;
//
//	// Save the new winning score
//	if (score > 0) {
//		winningScore = score;
//		document.getElementById('winScore').textContent = winningScore;
//	}
//	// Create message to indicate settings successfully updated 	
//	msgs.textContent = "Successfully updated settings";
//	msgs.style.backgroundColor = 'lightgreen';
//	fadeOut(msgs);
//
//	numOfDice = document.getElementById('dice-value').value;
//	console.log("Number of dice:" + numOfDice);
//	if (errMsg === "") {
//		document.querySelector('#modal-settings').style.display = 'none';
//	} else {
//		document.querySelector('#modal-settings').style.display = 'display';
//		//		errMsg = "";
//	}
//	//	document.querySelector('#modal-settings').style.display = 'none';
//});


document.querySelector('.btn-cancel').addEventListener('click', function () {
	document.querySelector('#modal-settings').style.display = 'none';

});



/* Pure JS Fade out function === Got it from http://www.chrisbuttery.com/articles/fade-in-fade-out-with-javascript/
Note: This article also provided method to achieve primarily with CSS but the fadeOut only works once and then I can't get it to fire again or figure out how to reset animation.
*/
function fadeOut(el) {
	el.style.opacity = 1;

	(function fade() {
		if ((el.style.opacity -= 0.005) < 0) {
			el.style.display = "none";
		} else {
			requestAnimationFrame(fade);
		}
	})();
}

/* Determine if field is empty or contains just whitespace */
/* http://stackoverflow.com/questions/1172206/how-to-check-if-a-text-is-all-white-space-characters-in-client-side */
function isNotEmptyString(text) {
	return /[a-zA-Z][a-zA-Z0-9\s]*/.test(text);
}

function isNameValid(name) {
	if (text.length > 0 && /^\s*$/.test(name))
		errMsg = " ";

}

function getSettings() {
	var hasValueChanged = false;
	// Alternative call if I want this function to be called via eventListner
	//document.querySelector('.btn-save').addEventListener('click', function () {

	console.log("getSettings method called");

	player0 = document.forms["config-settings"]["input-name-0"].value;
	player1 = document.forms["config-settings"]["input-name-1"].value;
	score = document.forms["config-settings"]["winning-score"].value;

	// Reset msgs so they will be displayed each time
	msgs.style = 'block';

	// Only save player name value if valid input provided
	if (player0 !== "") {
		playerNames[0] = player0;
		player0Field.innerHTML = playerNames[0];
		hasValueChanged = true;
	}

	// Only save player name value if valid input provided
	if (player1 !== "") {
		playerNames[1] = player1;
		player1Field.textContent = playerNames[1];
		hasValueChanged = true;

	}

	// Only save score if valid input is provided
	if (score !== "") {
		// Set Winning score on UI to value on form 
		scoreField.textContent = score;
		// Save new score value
		winningScore = score;
		hasValueChanged = true;

	}


	//	numOfDice = document.getElementById('dice-value').value;

	// Only show "successful update" message if a value was actually changed
	if (hasValueChanged) {
		// Create message to indicate settings successfully updated 	
		msgs.textContent = "Successfully updated settings";
		msgs.style.backgroundColor = 'lightgreen';
		fadeOut(msgs);
	}


	// Hide modal window
	document.querySelector('#modal-settings').style.display = 'none';
	// You must return false or else all changes made to web values will revert to orig values on exit
	return false;
}
//});
