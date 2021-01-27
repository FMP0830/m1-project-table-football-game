//Initialising instances
let game;
let splashScreen;
let gameScreen;
let endGameScreen;
let infoScreen;

//Audios
const whistleAudio = document.querySelector('#referee');
const crowdBooAudio = document.querySelector('#crowd-boo');
const crowdGoalAudio = document.querySelector('#crowd-goal');
const splashNoise = document.querySelector('#splash-noise');
const gameNoise = document.querySelector('#game-noise');
const clockTick = document.querySelector('#clock-tick');

//Create DOM Elements from a string representation
function buildDom(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.children[0];
}

//Splash screen
function createSplashScreen() {
  splashScreen = buildDom(`
  <main id="game-container">
  <div class="splash-content">
    <img class="logo-img" src="./images/logo.svg" alt="..." />
    <div class="btn-container">
      <button id="start-game" class="btn">Kick Off!</button>
      <button id="info-page" class="btn">More info</button>
    </div>
  </div>
</main>
    `);

  document.body.appendChild(splashScreen);
  splashNoise.loop = true;
  splashNoise.volume = 1;
  splashNoise.currentTime = 0;
  splashNoise.play();

  const startGameButton = splashScreen.querySelector('#start-game');
  startGameButton.addEventListener('click', createLoadingScreen);

  const infoButton = splashScreen.querySelector('#info-page');
  infoButton.addEventListener('click', goToInfo);
}

function removeSplashScreen() {
  splashScreen.remove();
}

//Loading page
function createLoadingScreen() {
  if (splashScreen) {
    removeSplashScreen();
  }

  if (endGameScreen) {
    removeEndGameScreen();
  }

  loadingScreen = buildDom(`
  <main>
  <div class="loading-screen">
    <div id="countdown-start" class="in">Ready?</div>
    <div id="countdown-1" class="out">3</div>
    <div id="countdown-2" class="out">2</div>
    <div id="countdown-3" class="out">1</div>
    <div id="countdown-final" class="out">Go!</div>
</div>
</main>
    `);

  document.body.appendChild(loadingScreen);

  const ready = document.querySelector('#countdown-start');
  const three = document.querySelector('#countdown-1');
  const two = document.querySelector('#countdown-2');
  const one = document.querySelector('#countdown-3');
  const go = document.querySelector('#countdown-final');

  function loadingAnimation() {
    setTimeout(function () {
      ready.classList.remove('in');
      ready.classList.add('out');
    }, 1000);

    setTimeout(function () {
      clockTick.currentTime = 0;
      clockTick.play();
      three.classList.remove('out');
      three.classList.add('in');
    }, 2000);

    setTimeout(function () {
      clockTick.currentTime = 0;
      clockTick.play();
      three.classList.remove('in');
      three.classList.add('out');
      two.classList.remove('out');
      two.classList.add('in');
    }, 3000);

    setTimeout(function () {
      clockTick.currentTime = 0;
      clockTick.play();
      two.classList.remove('in');
      two.classList.add('out');
      one.classList.remove('out');
      one.classList.add('in');
    }, 4000);

    setTimeout(function () {
      whistleAudio.currentTime = 0;
      whistleAudio.play();
      one.classList.remove('in');
      one.classList.add('out');
      go.classList.remove('out');
      go.classList.add('in');
    }, 5000);

    setTimeout(function () {
      go.classList.remove('in');
    }, 6000);

    setTimeout(startGame, 6000);
  }

  loadingAnimation();
}

function removeLoadingScreen() {
  loadingScreen.remove();
}

//Game Screen
function createGameScreen() {
  removeLoadingScreen();
  gameScreen = buildDom(`
    <main id="game-container">
      <div class="timer">
        <span class="countdown-timer">0</span>
      </div>

      <div class="score">
        <span class="label">Score:</span>
        <span id="current-score">0</span>
      </div>

      <div class="canvas-container">
        <canvas></canvas>
      </div>
    </main>
        `);

  document.body.appendChild(gameScreen);
  splashNoise.volume = 0;
  splashNoise.pause();
  gameNoise.loop = true;
  gameNoise.volume = 1;
  gameNoise.currentTume = 0;
  gameNoise.play();

  return gameScreen;
}

function removeGameScreen() {
  gameScreen.remove();
}

//Time Up Screen

function createTimeUpScreen() {
  timeUpScreen = buildDom(`
  <main>
    <div class="loading-screen">
    <div id="countdown-start" class="in">Time's Up!</div>
  </main>
  `);

  document.body.appendChild(timeUpScreen);
}

function removeTimeUpScreen() {
  timeUpScreen.remove();
}

//End Game Screen
function createEndGameScreen(score, topScore) {
  saveScore(score);
  const maxScore = localStorage.getItem('score');
  endGameScreen = buildDom(`
  <main>
    <div class="info-content">
    <p class="final-score">Your score: <span> ${score} </span></p>
    <p class="final-score">Top scorer: <span> ${maxScore} </span></p>
      <button class="btn" id="retry">Try Again!</button>
    </div>
  </main>
  `);

  const button = endGameScreen.querySelector('button');
  button.addEventListener('click', createLoadingScreen);

  document.body.appendChild(endGameScreen);
  gameNoise.volume = 0;
  gameNoise.pause();
  splashNoise.volume = 1;
  splashNoise.currentTume = 0;
  splashNoise.play();
}

function removeEndGameScreen() {
  endGameScreen.remove();
}

//Info Screen
function createInfoScreen() {
  infoScreen = buildDom(`
    <main>
      <div class="info-content">
        <ul>
          <li>Score as many goals as you can in <b>5 minutes</b></li>
          <br>
          <li>Use keyboard arrows to move your player</li>
          <li>
            <i class="fas fa-long-arrow-alt-left"></i>
            <i class="fas fa-long-arrow-alt-up"></i>
            <i class="fas fa-long-arrow-alt-down"></i>
            <i class="fas fa-long-arrow-alt-right"></i>
          </li>
          <br>
          <li>Shoot the ball with the space bar for a straight shot </li>
          <li><i class="fas fa-keyboard"></i></li>
          <br>
          <li>Shoot in a straight diagonal up or down <i class="fas fa-long-arrow-alt-right diagonal-up"></i>
          <i class="fas fa-long-arrow-alt-right diagonal-down"></i></li>
          <li>with Control Left and Control Right</li>
          <br>
          <li>If you hit a defender, try again!</li>
        </ul>
        <div class="btn-container">
          <button class="btn info-btn" id="main">Back</button>
        </div>
      </div>
    </main>
    `);

  const button = infoScreen.querySelector('button');
  button.addEventListener('click', backToSplash);

  document.body.appendChild(infoScreen);
}

function removeInfoScreen() {
  infoScreen.remove();
}

//Game State
function startGame() {
  //Rebuild DOM
  if (splashScreen) {
    removeSplashScreen();
  }

  if (endGameScreen) {
    removeEndGameScreen();
  }

  createGameScreen();

  //Initialise game instance
  game = new Game();
  game.gameScreen = gameScreen;

  //Start Game Logic and Animation
  game.start();
}

function endGame(score) {
  whistleAudio.currentTime = 0;
  whistleAudio.play();
  removeGameScreen();
  createTimeUpScreen();
  setTimeout(function () {
    removeTimeUpScreen();
    createEndGameScreen(score);
  }, 2000);
}

function goToInfo() {
  removeSplashScreen();
  createInfoScreen();
}

function backToSplash() {
  removeInfoScreen();
  //removeGameScreen();
  //removeEndGameScreen(); // If  there is a go to main page button in EndGame screen, still undecided
  createSplashScreen();
}

function saveScore(score) {
  const scoreStr = localStorage.getItem('score');
  let topScore;
  const newScore = score;

  //Add new score
  if (!scoreStr) {
    topScore = score;
  } else {
    if (newScore > scoreStr) {
      topScore = newScore;
    } else {
      topScore = scoreStr;
    }
  }

  //Store Back the updated score
  localStorage.setItem('score', topScore);
}

//On Load
window.addEventListener('load', createSplashScreen);
