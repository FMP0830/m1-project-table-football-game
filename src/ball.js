class Ball {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

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
    switch (direction) {
      case 'left':
        this.direction = 0;
        break;
      case 'right':
        this.direction = 1;
        this.effect = 0;
        break;
      case 'up':
        this.effect = -1;
        break;
      case 'down':
        this.effect = 1;
        break;
    }
  }

  handleScreenCollision() {
    //CURVED SHOT UPWARD
    if (this.effect === -1) {
      this.x = this.x + this.direction * this.speed;
      this.y = this.y - this.direction * 1.75;
    } else if (this.effect === 1) {
      //CURVED SHOT DOWNWARD
      this.x = this.x + this.direction * this.speed;
      this.y = this.y + this.direction * 1.75;
    } else if (this.effect === 0) {
      //STRAIGHT SHOT
      this.x = this.x + this.direction * this.speed;
      this.y = this.y + this.direction * this.effect;
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
    else if (ballBottom > screenBottom) this.y = screenBottom - this.size;
  }

  removeLife() {
    this.lives -= 1;
  }

  draw() {
    //create ball on screen
    const img = document.createElement('img');
    img.src = 'images/ball2.svg';
    this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }

  didCollide(enemy) {
    //check ball and defender position
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

    const withinPlayerWidth =
      playerLeft <= ballLeft && playerRight >= ballRight;
    const withinPlayerHeight =
      playerBottom >= ballBottom && playerTop <= ballTop;

    const crossRight = withinPlayerHeight && playerRight >= ballLeft;

    if (crossRight) {
      this.x = player.x + player.size;
      this.y = player.y + player.size / 2 - 20;
      return true;
    }
  }

  didScore() {
    //check the positions of ball, screen margin and goal
    const screenRight = this.canvas.width;
    const screenTop = 0;
    const missedUp = this.canvas.height / 2 - 100;
    const screenBottom = this.canvas.height;
    const missedDown = this.canvas.height / 2 + 100;

    const ballRight = this.x + this.size;
    const ballTop = this.y;
    const ballBottom = this.y + this.size;

    const shotOutOfScreen = ballRight >= screenRight;

    //Check if ball leaves the right side of the screen above and below the goal posts
    if (shotOutOfScreen && ballTop >= screenTop && ballBottom <= missedUp) {
      return false;
    } else if (
      shotOutOfScreen &&
      ballBottom <= screenBottom &&
      ballTop >= missedDown
    ) {
      return false;
    } else if (
      shotOutOfScreen &&
      ballTop >= missedUp &&
      ballBottom <= missedDown
    ) {
      return true;
    }
  }
}
