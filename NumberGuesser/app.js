//Game variables.
let minNumber = 1,
  maxNumber = 10,
  maxGuesses = 3,
  winningNumber = getRandomIntInclusive(minNumber,maxNumber),
  wonFlag = false,
  guessCount = 0;
  console.log(winningNumber);

//UI elements.
const minNumberEL = document.querySelector('#minNum'),
  maxNumberEL = document.querySelector('#maxNum'),
  guessNumberEL = document.querySelector('#guessNumber'),
  submitEL = document.querySelector('#guessSubmit'),
  messageEL = document.querySelector('#messageArea');
  replayEL = document.querySelector('#replayButton'),
  replayEL.style.display = 'none';
//Setup UI element values.
minNumberEL.textContent = minNumber;
maxNumberEL.textContent = maxNumber;


// startGame();
submitEL.addEventListener('click', gameLogic);
replayEL.addEventListener('click', resetScreen);


function startGame() {

  if (!(wonFlag) && (guessCount >= maxGuesses)) {
    setMessage(`Sorry... You exausted all chances. Right number was ${winningNumber}`, 'orange');
    guessNumberEL.style.borderColor = 'red';
    replay();    
  }
}


//Logic of the game
function gameLogic(e) {
  //Check if integer value is guessed.
  let guessedNum = parseInt(guessNumberEL.value, 10);
  // check if a number is guessed,
  // if number is withn range and is an SVGAnimatedInteger.
  if (guessedNum < minNumber ||
    guessedNum > maxNumber ||
    isNaN(guessedNum) ||
    !(guessedNum === parseFloat(guessNumberEL.value) | 0)) {
    setMessage(`Guess an integer between ${minNumber} and ${maxNumber}`, 'red');
  } else {
    guessCount++;
    if (guessedNum === winningNumber) {
      wonFlag = true;
      setMessage(`You guessed winning number ${winningNumber} right in ${guessCount} attempts!!`, 'green');
      guessNumberEL.style.borderColor = 'green';
      replay();      
    }
    else {
      setMessage(`Guess again. ${maxGuesses - guessCount} attempts remaining.`, 'blue');
    }
    startGame();
  }
}

function setMessage(message, color) {
  messageEL.style.color = color;
  messageEL.textContent = message;
}

function replay(){
  guessNumberEL.setAttribute('disabled', 'disabled');
  submitEL.style.display = 'none';
  replayEL.style.display = 'inline';
}

function resetScreen(){
  submitEL.style.display = 'inline';
  replayEL.style.display = 'none';
  messageEL.textContent = '';
  guessNumberEL.value='';
  guessNumberEL.removeAttribute('disabled');
  wonFlag = false;
  guessCount = 0;  
  winningNumber = getRandomIntInclusive(minNumber,maxNumber);
  console.log(winningNumber);  
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}