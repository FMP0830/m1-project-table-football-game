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
    this.player = new Player(this.canvas, 50, 5);

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
      if (event.key === "f") {
        this.ball.setDirection("left");
      } else if (event.key === " ") {
        this.ball.setDirection("right");
      } else if (event.key === "c") {
        this.ball.setDirection("right");
        this.ball.setDirection("up");
      } else if (event.key === "b") {
        this.ball.setDirection("right");
        this.ball.setDirection("down");
      } else if (event.key === "ArrowUp") {
        this.player.setDirection("up");
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
      this.ball.didScore();

      // // 2. Check if ball had hit any defender (check all defenders)
      this.ball.didAttach(this.player);
      this.checkCollisions();

      // // 3. Update the ball and check if ball is going off the screen
      this.ball.handleScreenCollision();
      this.player.updatePosition(this.ball);

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
        // this.ball.removeLife();
        // console.log("lives", this.ball.lives);

        // Respawn the ball into the screen
        this.ball.x = Math.random() * (this.canvas.width / 2);
        this.ball.y = Math.random() * this.canvas.height;
        this.ball.direction = 0;
        crowdBooAudio.volume = 1;
        crowdBooAudio.currentTime = 0;
        crowdBooAudio.play();
        setTimeout(function () {
          crowdBooAudio.pause();
          crowdBooAudio.currentTime = 0;
        }, 2000);

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

    this.shotsLeft = document.querySelector(".shots-left");
    this.shotsLeft.textContent = this.ball.lives;
  }

  updateGameStats() {
    if (this.ball.didScore()) {
      crowdBooAudio.volume = 0;
      crowdBooAudio.pause();
      crowdGoalAudio.volume = 1;
      crowdGoalAudio.currentTime = 0;
      crowdGoalAudio.play();
      this.score++;
    }

    this.currentScore = document.querySelector("#current-score");
    this.currentScore.textContent = this.score;
  }
}
