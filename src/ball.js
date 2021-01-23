'use strict';

class Ball {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.lives = lives;
    this.size = 100;
    this.x = 50;
    this.y = canvas.height / 2;
    this.direction = 0;
    this.effect = 0;
    this.speed = 5;
  }

  setDirection(direction) {
    // +1 down  -1 up
    if (direction === 'left') this.direction = -1;
    else if (direction === 'right') this.direction = 1;
    else if (direction === 'up') this.effect = -1;
    else if (direction === 'down') this.effect = 1;
  }

  handleScreenCollision() {
    
    //CURVED SHOT UPWNWARD
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

    const ballLeft = this.x;
    const ballRight = this.x + this.size;

    if (ballRight > screenRight) this.direction = -1;
    else if (ballLeft < screenLeft) this.direction = 1;
  }

  removeLife() {
    this.lives -= 1;
  }

  draw() {
    const img = document.createElement('img');
    img.src = '../images/Ball.svg';
    this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
    // fillRect(x, y, width, height)
    // this.ctx.fillStyle = '#66D3FA';
    // this.ctx.fillRect(this.x, this.y, this.size, this.size);
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

    // Check if the enemy sides intersect with any of the ball's sides
    const crossLeft = enemyLeft <= ballRight && enemyLeft >= ballLeft;

    const crossRight = enemyRight >= ballLeft && enemyRight <= ballRight;

    const crossBottom = enemyBottom >= ballTop && enemyBottom <= ballBottom;

    const crossTop = enemyTop <= ballBottom && enemyTop >= ballTop;

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true;
    } else {
      return false;
    }
  }
}
