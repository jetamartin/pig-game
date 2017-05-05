/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

// Initialize all values of the game
init();


// User clicks the "Roll" button
document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		// 1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		// 3. Update the round score IF the rolled number was not a 1
		if (dice !== 1) {
			// Add Score
			roundScore += dice;
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
			// Change Player name to Winner
			document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.dice').style.display = 'none';

			// Disable roll dice  and hold buttons
			document.querySelector('.btn-roll').disabled = true;
			document.querySelector('.btn-hold').disabled = true;


		} else {
			// Switch to next player
			switchPlayer();
		}

	}

});

// User clicks the New game button
document.querySelector('.btn-new').addEventListener('click', function () {

	// Re-Enable roll and hold buttons
	document.querySelector('.btn-roll').disabled = false;
	document.querySelector('.btn-hold').disabled = false;

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
	document.querySelector('.dice').style.display = 'none';

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
	document.querySelector('.dice').style.display = 'none';

}



//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).textContent = dice;
