//Initialising instances
let game;
let splashScreen;
let gameScreen;
let endGameScreen;
let infoScreen;

//Create DOM Elements from a string representation
function buildDom(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.children[0];
}

//Splash screen
function createSplashScreen() {
  splashScreen = buildDom(`
    <main>
        <section id="splash-screen">
            <img src="./images/..." alt="..." />
            <button id="start-game" class="btn">Kick Off!</button>
            <button id="info-page" class="btn">More info</button>
        </section>
    </main>
    `);

  document.body.appendChild(splashScreen);

  const startGameButton = splashScreen.querySelector('#start-game');
  startGameButton.addEventListener('click', startGame);

  const infoButton = splashScreen.querySelector('#info-page');
  infoButton.addEventListener('click', goToInfo);
}

function removeSplashScreen() {
  splashScreen.remove();
}

//Game Screen
function createGameScreen() {
  gameScreen = buildDom(`
        <main class="game container">
          <header>
            <div class="timer">
              <span class="minDec">0</span>
              <span class="minUni">0</span>
              <span>:</span>
              <span class="secDec">0</span>
              <span class="secUni">0</span>
            </div>

            <div class="score">
              <span class="label">Score:</span>
              <span class="value"></span>
            </div>
          </header>

          <div class="canvas-container">
            <canvas></canvas>
          </div>
          <button class="btn" id="main">Back to main page</button>
          <button class="btn" id="end">Go to End Game Page</button>
        </main>
      <div>hello</div>
        `);

  console.log(gameScreen);
  const mainButton = gameScreen.querySelector('#main');
  mainButton.addEventListener('click', backToSplash);
  const endButton = gameScreen.querySelector('#end');
  endButton.addEventListener('click', endgame);

  document.body.appendChild(gameScreen);
  return gameScreen;
}

function removeGameScreen() {
  gameScreen.remove();
}

//End Game Screen
function createEndGameScreen(score) {
  endGameScreen = buildDom(`
    <main>
      <h1>Time's Up!</h1>
      <p>Your score: <span> ${score} </span></p>
      <button class="btn" id="retry">Try Again!</button>
    </main>
  `);

  const button = endGameScreen.querySelector('button');
  button.addEventListener('click', startGame);

  document.body.appendChild(endGameScreen);
}

function removeEndGameScreen() {
  endGameScreen.remove();
}

//Info Screen
function createInfoScreen() {
  infoScreen = buildDom(`
    <main>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sunt et molestiae harum! Reprehenderit possimus repellendus rerum blanditiis quam minus ut quidem tenetur enim amet quasi et quo fuga, iusto facere omnis expedita eius repellat? Qui nisi consectetur consequatur blanditiis eum modi at porro quae earum. Totam pariatur quos error, corporis rerum cum ipsam ratione eligendi nulla blanditiis inventore consectetur deleniti similique sed quisquam molestias nisi aliquid aspernatur velit porro! Hic maiores praesentium atque maxime sunt, omnis eos rerum ea reprehenderit, laudantium veritatis exercitationem aspernatur perspiciatis. Voluptatem repellendus est rerum. Doloribus delectus vitae iure, inventore rem odio omnis deserunt modi.</p>
    <button class="btn" id="main">Back to main page</button>
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
  removeSplashScreen();
  createGameScreen();

  //Initialise game instance
  //game = new Game();
  //game.gameScreen = gameScreen;

  //Start Game Logic and Animation
  //game.start();
}

function endGame() {
  removeGameScreen();
  createEndGameScreen();
}

function goToInfo() {
  removeSplashScreen();
  createInfoScreen();
}

function backToSplash() {
  if (infoScreen) {
    removeInfoScreen();
  }
  removeGameScreen();
  //removeEndGameScreen(); // If  there is a go to main page button in EndGame screen, still undecided
  createSplashScreen();
}

//On Load
window.addEventListener('load', createSplashScreen);
