class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.defenders = [];
    this.ball = null;
    this.gameIsOver = false;
    this.gameScreen = null;
    this.score = 0;
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

    this.ball = new Ball(this.canvas, 30);

    for (let i = 0; i <= 3; i++) {
      let randomX = Math.floor(
        Math.random() *
          (this.canvas.width - (this.canvas.width / 2 - 300) + 1) +
          (this.canvas.width / 2 - 300)
      );
      let newdefender = new Defender(this.canvas, randomX, Math.random() * 10);
      this.defenders.push(newdefender);
    }

    // Add event listener for moving the ball
    function handleKeyDown(event) {
      if (event.key === 'ArrowLeft') {
        this.ball.setDirection('left');
      } else if (event.key === 'ArrowRight') {
        this.ball.setDirection('right');
      } else if (event.key === 'ArrowUp') {
        this.ball.setDirection('up');
        this.ball.setDirection('right');
      } else if (event.key === 'ArrowDown') {
        this.ball.setDirection('down');
        this.ball.setDirection('right');
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
      // 1. UPDATE THE STATE OF ball AND defenders
      // // 2. Check if ball had hit any defender (check all defenders)
      this.checkCollisions();

      // // 3. Update the ball and check if ball is going off the screen
      this.ball.handleScreenCollision();

      // this.defenders = this.defenders.filter(function (defender) {
      //   defender.updatePosition();
      //   return defender.isInsideScreen();
      // });

      // // 4. Move the existing defenders
      // // 5. Check if any defender is going of the screen
      this.defenders.forEach(function (defender) {
        defender.updatePosition();
      });

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 3. UPDATE THE CANVAS
      // // Draw the ball
      this.ball.draw();

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
        defender.x = 0 - defender.size;

        if (this.ball.lives === 0) {
          this.gameOver();
        }
      }
    }, this);
    // We have to bind `this`
    // as array method callbacks `this` value defaults to undefined.
  }

  gameOver() {
    // flag `gameIsOver = true` stops the loop
    this.gameIsOver = true;

    // Call the `endGame` function from `main` to remove the Game screen
    // and show the Game Over Screen
    endGame(this.score);
  }

  updateGameStats() {}
}
