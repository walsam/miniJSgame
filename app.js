/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice1, previousDice2, maxScore;


inti();


document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {
        //1. random number
        var dice1 = Math.floor(Math.random()*6)+1;
        var dice2 = Math.floor(Math.random()*6)+1;
        //2. display the result
        var dice1DOM = document.querySelector('.dice1');
        var dice2DOM = document.querySelector('.dice2');

        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        //if one of the dices equals 6 and one of the previous dices was already 6
        if ((previousDice1===6 && (previousDice1 === dice1 || previousDice1 === dice2)) || (previousDice2===6 && (previousDice2 === dice1 || previousDice2 === dice2))){
            lostAll();
            nextPlayer();
        } else {
            //3. update the round score if the rolled number was not a 1
            if (dice2 !== 1 && dice1 !== 1) {
                //add score
                roundScore += dice1+dice2;
                document.querySelector('#current-'+activePlayer).textContent = roundScore;
                previousDice1=dice1;
                previousDice2=dice2;
            } else {
                //next player
                nextPlayer();
            }
        }

    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //add current score to the player's global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        //check if the player won the game
        if (scores[activePlayer]>=maxScore) {
            //the player has won
            document.querySelector('#name-'+activePlayer).textContent = 'WINNER !';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying=false;
        } else {
            //next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer=1 : activePlayer=0;
    roundScore =0;
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    previousDice1=0;
    previousDice2=0;
}

function lostAll() {
    scores[activePlayer]=0;
    roundScore=0;
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
}

document.querySelector('.btn-new').addEventListener('click',inti);

function inti() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    maxScore = document.getElementById('maxScore').value;
    if(maxScore<=0) {
        maxScore=100;
    }
    document.getElementById('maxScoreIs').textContent= 'Max score is : '+maxScore;

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying=true;
}
