'use strict';

class Defender {
  constructor(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.size = 100;
    this.x = x;
    this.y = canvas.height + this.size;
    this.direction = 1;
    this.speed = speed;
  }

  draw() {
    const img = document.createElement('img');
    img.src = '../images/Defender.svg';
    this.ctx.drawImage(img, this.x, this.y, this.size, this.size);

    // fillRect(x, y, width, height)
    // this.ctx.fillStyle = '#FF6F27';
    // this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  updatePosition() {
    this.y = this.y + this.direction * this.speed;
    const screenLeft = 0;
    const screenRight = this.canvas.height;

    const defenderLeft = this.y;
    const defenderRight = this.y + this.size;

    if (defenderRight > screenRight) this.direction = -1;
    else if (defenderLeft < screenLeft) this.direction = 1;
  }

  isInsideScreen() {
    // if x plus half of its size is smaller then 0 return
    return this.y + this.size / 2 > 0;
  }
}
