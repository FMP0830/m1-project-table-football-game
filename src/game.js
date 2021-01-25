class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.defenders = [];
    this.player = null;
    this.ball = null;
    this.gameIsOver = false;
    this.gameScreen = null;
    this.score = 0;
    this.timer = null;
  }

  // Create `ctx`, a `ball` and start the Canvas loop

  start() {
    this.canvasContainer = document.querySelector(".canvas-container");
    this.canvas = this.gameScreen.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Save reference to the score and live elements
    this.livesElement = this.gameScreen.querySelector(".lives .value");
    this.scoreElement = this.gameScreen.querySelector(".score .value");

    // Set the canvas dimesions to match the parent
    this.containerWidth = this.canvasContainer.offsetWidth;
    this.containerHeight = this.canvasContainer.offsetHeight;
    this.canvas.setAttribute("width", this.containerWidth);
    this.canvas.setAttribute("height", this.containerHeight);

    // Create and place the ball on screen
    this.ball = new Ball(this.canvas, 30);
    this.player = new Player(this.canvas, 50, 1);

    // create 4 defenders and place them on screen
    for (let i = 0; i <= 3; i++) {
      let randomX = Math.floor(
        Math.random() *
          (this.canvas.width - (this.canvas.width / 2 - 300) + 1) +
          (this.canvas.width / 2 - 300)
      );
      let randomSpeed = Math.random() * 10;
      let newDefender = new Defender(this.canvas, randomX, randomSpeed);
      this.defenders.push(newDefender);
    }

    //Create and start the timer
    this.timer = new Timer();
    this.timer.startCount();

    // Add event listener for shooting the ball
    function handleKeyDown(event) {
      if (event.key === "f") {
        this.ball.setDirection("left");
      } else if (event.key === "v") {
        this.ball.setDirection("right");
      } else if (event.key === "c") {
        this.ball.setDirection("up");
        this.ball.setDirection("right");
      } else if (event.key === "b") {
        this.ball.setDirection("down");
        this.ball.setDirection("right");
      } else if (event.key === "ArrowUp") {
        this.player.setDirection("up");
        console.log(this.canvas.height);
      } else if (event.key === "ArrowDown") {
        this.player.setDirection("down");
      } else if (event.key === "ArrowRight") {
        this.player.setDirection("right");
      } else if (event.key === "ArrowLeft") {
        this.player.setDirection("left");
      }
    }

    // Any function provided to eventListener is always invoked by the `window` global object
    // Therefore, we need to bind `this` to the `game` object,
    // to prevent `this` from referencing the `window` object
    const boundHandleKeyDown = handleKeyDown.bind(this);
    document.body.addEventListener("keydown", boundHandleKeyDown);

    this.startLoop();
  }

  startLoop() {
    const loop = function () {
      // 1. UPDATE THE STATE OF player, ball, defenders, timer AND score
      this.updateTimer();

      // // 2. Check if ball had hit any defender (check all defenders)
      this.checkCollisions();

      // // 3. Update the ball and check if ball is going off the screen
      this.ball.handleScreenCollision();
      this.player.updatePosition();

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
        console.log("lives", this.ball.lives);

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

  updateTimer() {
    this.timerElement = document.querySelector(".countdown-timer");
    this.timerElement.textContent = this.timer.splitCount();
    if (this.timer.currentTime < 30) {
      this.timerElement.style.color = "red";
    }
    if (this.timer.currentTime <= 0) {
      this.gameOver();
    }
  }

  updateGameStats() {}
}
