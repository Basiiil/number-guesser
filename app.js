// game value
let min = 1,
  max = 10,
  winningNum = getRandomNum(min,max),
  guessesLeft = 3;

// ui elements 
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');


// assign ui min and max 
minNum.textContent = min;
maxNum.textContent = max;

// play again 
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
    guessInput.value = '';
  }
})

// listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  // validate
  if (isNaN(guess) || guess > max || guess < min) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // check if won
  if (guess === winningNum) {
    // game over -won
    gameOver(true, `${winningNum} is correct, YOU WIN`);
  } else {
    // wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // game over
      gameOver(false, `Game Over,you lost. The correct number was ${winningNum}`);
    } else {
      // game continues
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

// game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);

  // play again
  guessBtn.value = 'Play again';
  guessBtn.classList = 'play-again'
}

// random number

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}