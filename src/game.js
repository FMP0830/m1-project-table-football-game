class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.defenders = [];
    this.player = null;
    this.ball = null;
    this.goal = null;
    this.gameIsOver = false;
    this.gameScreen = null;
    this.score = 0;
    this.timer = null;
  }

  // Create `ctx`, a `ball` and start the Canvas loop

  start() {
    this.canvasContainer = document.querySelector('.canvas-container');
    this.canvas = this.gameScreen.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    // Save reference to the score and live elements
    this.livesElement = this.gameScreen.querySelector('.lives .value');
    this.scoreElement = this.gameScreen.querySelector('.score .value');

    // Set the canvas dimesions to match the parent
    this.containerWidth = this.canvasContainer.offsetWidth;
    this.containerHeight = this.canvasContainer.offsetHeight;
    this.canvas.setAttribute('width', this.containerWidth);
    this.canvas.setAttribute('height', this.containerHeight);

    // Create and place the ball on screen
    this.ball = new Ball(this.canvas, 30);
    this.player = new Player(this.canvas, 50, 1);

    // create 4 defenders and place them on screen
    const slot = this.canvas.width / 10;
    for (let i = 0; i <= 3; i++) {
      let randomX =
        Math.floor(Math.random() * slot) -
        slot / 2 +
        this.canvas.width / 2 +
        slot * i +
        50;
      let randomSpeed = Math.random() * 3 + 2;
      let newDefender = new Defender(this.canvas, randomX, randomSpeed);
      this.defenders.push(newDefender);
    }

    let newGoalie = new Goalkeeper(
      this.canvas,
      this.canvas.width - slot / 2,
      3
    );
    this.defenders.push(newGoalie);

    this.goal = new Goal(this.canvas);
    //Create and start the timer
    this.timer = new Timer();
    this.timer.startCount();

    // Add event listener for shooting the ball
    function handleKeyDown(event) {
      if (event.key === 'f') {
        this.ball.setDirection('left');
      } else if (event.key === 'v') {
        this.ball.setDirection('right');
      } else if (event.key === 'c') {
        this.ball.setDirection('up');
        this.ball.setDirection('right');
      } else if (event.key === 'b') {
        this.ball.setDirection('down');
        this.ball.setDirection('right');
      } else if (event.key === 'ArrowUp') {
        this.player.setDirection('up');
        console.log(this.canvas.height);
      } else if (event.key === 'ArrowDown') {
        this.player.setDirection('down');
      } else if (event.key === 'ArrowRight') {
        this.player.setDirection('right');
      } else if (event.key === 'ArrowLeft') {
        this.player.setDirection('left');
      }
    }

    // Any function provided to eventListener is always invoked by the `window` global object
    // Therefore, we need to bind `this` to the `game` object,
    // to prevent `this` from referencing the `window` object
    const boundHandleKeyDown = handleKeyDown.bind(this);
    document.body.addEventListener('keydown', boundHandleKeyDown);

    this.startLoop();
  }

  startLoop() {
    const loop = function () {
      // 1. UPDATE THE STATE OF player, ball, defenders, timer AND score
      this.updateTimer();
      this.ball.didScore();

      // // 2. Check if ball had hit any defender (check all defenders)
      this.checkCollisions();

      // // 3. Update the ball and check if ball is going off the screen
      this.ball.handleScreenCollision();
      this.player.updatePosition();
      this.didAttach();

      // // 4. Move the existing defenders
      // // 5. Check if any defender is going of the screen
      this.defenders.forEach(function (defender) {
        defender.updatePosition();
      });

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 3. UPDATE THE CANVAS
      // // Draw the ball
      this.goal.draw();
      this.ball.draw();
      this.player.draw();
      // // Draw the defenders
      this.defenders.forEach(function (defender) {
        defender.draw();
      });

      // 4. TERMINATE LOOP IF THE GAME IS OVER
      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      }

      // 5. UPDATE GAME STATUS
      this.updateGameStats();
    }.bind(this);

    // As loop function will be continuously invoked by
    // the `window` object- `window.requestAnimationFrame(loop)`
    // we have to bind the function so that value of `this` is
    // pointing to the `game` object, like this:
    // var loop = (function(){}).bind(this);

    window.requestAnimationFrame(loop);
  }

  checkCollisions() {
    this.defenders.forEach(function (defender) {
      // We will implement didCollide() in the next step
      if (this.ball.didCollide(defender)) {
        this.ball.removeLife();
        console.log('lives', this.ball.lives);

        // Move the defender off screen to the left
        this.ball.x = 381;
        console.log('ball.x', this.ball.x);
        console.log('player.x', this.player.x);
        this.ball.y = 592;
        console.log('ball.y', this.ball.y);
        console.log('player.y', this.player.y);
        this.ball.direction = 0;

        if (this.ball.lives === 0) {
          this.gameOver();
        }
      }
    }, this);
    // We have to bind `this`
    // as array method callbacks `this` value defaults to undefined.
  }

  didAttach(player) {
    //define ball & player position
    let ballLeft = this.ball.x;
    let ballRight = this.ball.x + this.ball.size;
    let ballTop = this.ball.y;
    let ballBottom = this.ball.y + this.ball.size;

    let playerLeft = this.player.x;
    let playerRight = this.player.x + this.player.size;
    let playerTop = this.player.y;
    let playerBottom = this.player.y + this.player.size;

    // Check if the player sides intersect with any of the ball's sides
    let didTouchTop = playerBottom === ballTop;
    let didTouchBottom = playerTop === ballBottom;
    let didTouchLeft = playerRight === ballLeft;
    let didTouchRight = playerLeft === ballRight;
    let withinPlayerWidth = playerLeft <= ballLeft && playerRight >= ballRight;
    let withinPlayerHeight = playerTop <= ballTop && playerBottom >= ballBottom;

    let crossBottom = didTouchTop && withinPlayerWidth;
    let crossTop = didTouchBottom && withinPlayerWidth;
    let crossLeft = didTouchRight && withinPlayerHeight;
    let crossRight = didTouchLeft && withinPlayerHeight;

    if (crossBottom || crossTop || crossLeft || crossRight) {
      console.log('ball', this.ball.x, this.ball.y);
      console.log('player', this.player.x, this.player.y);
      this.ball.x = this.player.x + this.player.size;
      this.ball.y = this.player.y + this.player.size / 2;
    }
  }

  gameOver() {
    // flag `gameIsOver = true` stops the loop
    this.gameIsOver = true;

    // Call the `endGame` function from `main` to remove the Game screen
    // and show the Game Over Screen
    endGame(this.score);
  }

  updateTimer() {
    this.timerElement = document.querySelector('.countdown-timer');
    this.timerElement.textContent = this.timer.splitCount();
    if (this.timer.currentTime < 30) {
      this.timerElement.style.color = 'red';
    }
    if (this.timer.currentTime <= 0) {
      this.gameOver();
    }

    this.shotsLeft = document.querySelector('.shots-left');
    this.shotsLeft.textContent = this.ball.lives;
  }

  updateGameStats() {
    if (this.ball.didScore()) {
      this.score++;
    }

    this.currentScore = document.querySelector('#current-score');
    this.currentScore.textContent = this.score;
  }
}
