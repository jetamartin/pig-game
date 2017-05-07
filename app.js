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

var scores, roundScore, activePlayer, gamePlaying;
//var bounceOut = 'bounceOutUp';
//var rotateOut = 'rotateOut';

// Initialize all values of the game
init();

// ******************* ROLL BUTTON *******************************
// User clicks the "Roll" button
// ******************* ROLL BUTTON *******************************

document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {

		// Need to reset animation
		resetAnimation('bounceOutUp');
		resetAnimation('rotateOut');

		// 1. Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		var diceDOM1 = document.querySelector('.dice1');
		var diceDOM2 = document.querySelector('.dice2');

		// Display dice 
		diceDOM1.style.display = 'block';
		diceDOM2.style.display = 'block';

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
		if (scores[activePlayer] >= 100) {
			// Game is over...user must hit New game button which re-initializes game and resets gamePlaying state variable
			gamePlaying = false;

			// Make active player the winner
			document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
			// Style winning player
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			// Once a game is won remove the active player indicator
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

			// Hide dice
			document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';


		} else {

			// Animate
			addAnimation('bounceOutUp');

			// Switch to next player
			switchPlayer();
		}

	}

});

// ******************* NEW GAME BUTTON *******************************
// User clicks the New game button
// ******************* NEW GAME BUTTON *******************************

document.querySelector('.btn-new').addEventListener('click', function () {

	// Re-initialize game values
	init();
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


	// Reset players scores
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// Reset Player Names
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';


	// Remove Winner class
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');


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
			document.querySelector('.dice1').style.display = 'none';
		

			// -> triggering reflow /* The actual magic */
			// without this statement the solution won't work...don't really understand why this 'magic statement is needed. 
			void document.querySelector('.dice1').offsetWidth;

		}, false);
	
	document.querySelector('.dice2').addEventListener("animationend", function (e) {
		e.preventDefault;

		// -> removing the class
		document.querySelector('.dice2').classList.remove(animationType);
		document.querySelector('.dice2').style.display = 'none';

		// -> triggering reflow /* The actual magic */
		// without this statement the solution won't work...don't really understand why this 'magic statement is needed. 
		void document.querySelector('.dice2').offsetWidth;

	}, false);
}


	// Thought I would have to use Regex to remove quotes from animatedType but it wasn't needed
	// Reset animation so it will run again
	//	document.querySelector('.dice1').classList.add(animation.replace(/^"(.+(?="$))"$/, '$1'));
	//	document.querySelector('.dice2').classList.add(animation.replace(/^"(.+(?="$))"$/, '$1'));

	