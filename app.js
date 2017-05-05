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

*/

var scores, roundScore, activePlayer, gamePlaying;

// Initialize all values of the game
init();


// User clicks the "Roll" button
document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		// 1. Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		var diceDOM1 = document.querySelector('.dice1');
		var diceDOM2 = document.querySelector('.dice2');
		diceDOM1.style.display = 'block';
		diceDOM2.style.display = 'block';
		diceDOM1.src = 'dice-' + dice1 + '.png';
		diceDOM2.src = 'dice-' + dice2 + '.png';

		// 3. Update the round score IF the rolled number was not a 1
		if (dice1 !== 1 & dice2 !== 1) {
			// Add Score
			roundScore = roundScore + dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			// Switch to next player
			switchPlayer();
		}
	}

});

// User clicks the HOld button
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


			// Disable roll dice  and hold buttons
//			document.querySelector('.btn-roll').disabled = true;
//			document.querySelector('.btn-hold').disabled = true;


		} else {
			// Switch to next player
			switchPlayer();
		}

	}

});

// User clicks the New game button
document.querySelector('.btn-new').addEventListener('click', function () {

	// Re-Enable roll and hold buttons
//	document.querySelector('.btn-roll').disabled = false;
//	document.querySelector('.btn-hold').disabled = false;

	// Re-initialize game values
	init();

	// Reset scores to Zero


});

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

	// Hide he dice so that next player has a place to roll his dice.
	document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';


}



//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).textContent = dice;
