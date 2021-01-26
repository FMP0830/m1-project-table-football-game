class Ball {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.lives = lives;
    this.size = 30;
    this.x = 50;
    this.y = canvas.height / 2;
    this.direction = 0;
    this.effect = 0;
    this.speed = 5;
  }

  setDirection(direction) {
    // +1 down  -1 up
    if (direction === "left") this.direction = -1;
    else if (direction === "right") this.direction = 1;
    else if (direction === "up") this.effect = -1;
    else if (direction === "down") this.effect = 1;
  }

  handleScreenCollision() {
    //CURVED SHOT UPWARD
    if (this.effect === -1) {
      this.x = this.x + this.direction * this.speed;
      if (this.x < this.canvas.width / 2) {
        this.y = this.y - this.direction * 2;
      } else if (this.x >= this.canvas.width / 2) {
        this.y = this.y + this.direction * 2;
      }
    } else if (this.effect === 1) {
      //CURVED SHOT DOWNWARD
      this.x = this.x + this.direction * this.speed;
      if (this.x < this.canvas.width / 2) {
        this.y = this.y + this.direction * 2;
      } else if (this.x >= this.canvas.width / 2) {
        this.y = this.y - this.direction * 2;
      }
    } else {
      //STRAIGHT SHOT
      this.x = this.x + this.direction * this.speed;
    }

    const screenLeft = 0;
    const screenRight = this.canvas.width;
    const screenTop = 0;
    const screenBottom = this.canvas.height;

    const ballLeft = this.x;
    const ballRight = this.x + this.size;
    const ballTop = this.y;
    const ballBottom = this.y + this.size;

    if (ballRight > screenRight) this.direction = -1;
    else if (ballLeft < screenLeft) this.direction = 1;
    else if (ballTop < screenTop) this.y = screenTop;
    else if (ballBottom > screenBottom) this.y = ballBottom;
  }

  removeLife() {
    this.lives -= 1;
  }

  draw() {
    const img = document.createElement("img");
    img.src = "images/ball.svg";
    this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }

  didCollide(enemy) {
    const ballLeft = this.x;
    const ballRight = this.x + this.size;
    const ballTop = this.y;
    const ballBottom = this.y + this.size;

    const enemyLeft = enemy.x;
    const enemyRight = enemy.x + enemy.size;
    const enemyTop = enemy.y;
    const enemyBottom = enemy.y + enemy.size;

    const screenRight = this.canvas.width;

    // Check if the enemy sides intersect with any of the ball's sides
    const crossLeft = enemyLeft <= ballRight && enemyLeft >= ballLeft;
    const crossRight = enemyRight >= ballLeft && enemyRight <= ballRight;
    const crossBottom = enemyBottom >= ballTop && enemyBottom <= ballBottom;
    const crossTop = enemyTop <= ballBottom && enemyTop >= ballTop;
    const shotOutOfScreen = ballRight >= screenRight;

    if (
      (crossLeft || crossRight || shotOutOfScreen) &&
      (crossTop || crossBottom || shotOutOfScreen)
    ) {
      return true;
    } else {
      return false;
    }
  }

  didAttach(player) {
    const ballLeft = this.x;
    const ballRight = this.x + this.size;
    const ballTop = this.y;
    const ballBottom = this.y + this.size;

    const playerLeft = player.x;
    const playerRight = player.x + player.size;
    const playerTop = player.y;
    const playerBottom = player.y + player.size;

    // Check if the player sides intersect with any of the ball's sides
    const didTouchTop = playerBottom === ballTop;
    const withinPlayer = playerLeft <= ballLeft && playerRight >= ballRight;

    const crossBottom = didTouchTop && withinPlayer;

    if (crossBottom) {
      console.log(didTouchTop);
      console.log(withinPlayer);
      this.x = player.x + player.size;
      this.y = player.y + player.size / 2;
    }
  }

  didScore() {
    const screenRight = this.canvas.width;
    const screenTop = 0;
    const missedUp = this.canvas.height / 2 - 100;
    const screenBottom = this.canvas.height;
    const missedDown = this.canvas.height / 2 + 100;

    const ballRight = this.x + this.size;
    const ballTop = this.y;
    const ballBottom = this.y + this.size;

    const shotOutOfScreen = ballRight >= screenRight;

    if (shotOutOfScreen && ballTop >= screenTop && ballBottom <= missedUp) {
      console.log(
        "ballTop",
        ballTop,
        "missedUp",
        missedUp,
        "ballBottom",
        ballBottom,
        "missedDown",
        missedDown,
        "screenTop",
        screenTop,
        "screenBottom",
        screenBottom
      );
      console.log("out above");
      return false;
    } else if (
      shotOutOfScreen &&
      ballBottom <= screenBottom &&
      ballTop >= missedDown
    ) {
      console.log(
        "ballTop",
        ballTop,
        "missedUp",
        missedUp,
        "ballBottom",
        ballBottom,
        "missedDown",
        missedDown,
        "screenTop",
        screenTop,
        "screenBottom",
        screenBottom
      );
      console.log("out below");
      return false;
    } else if (
      shotOutOfScreen &&
      ballTop >= missedUp &&
      ballBottom <= missedDown
    ) {
      console.log(
        "ballTop",
        ballTop,
        "missedUp",
        missedUp,
        "ballBottom",
        ballBottom,
        "missedDown",
        missedDown,
        "screenTop",
        screenTop,
        "screenBottom",
        screenBottom
      );
      console.log("Goal!");
      return true;
    }
  }
}
