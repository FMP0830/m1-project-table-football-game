class Player {
  constructor(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.size = 80;
    this.x = x;
    this.y = canvas.height / 2;
    this.direction = 1;
    this.speed = speed;
  }

  draw() {
    const img = document.createElement('img');
    img.src = '../images/Player.svg';
    this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }

  setDirection(direction) {
    if (direction === 'up') {
      this.y -= 5;
    } else if (direction === 'down') {
      this.y += 5;
    } else if (direction === 'right') {
      this.x += 5;
    } else if (direction === 'left') {
      this.x -= 5;
    }
  }

  updatePosition() {
    const screenLeft = 0;
    const screenRight = this.canvas.width / 2;
    const screenTop = 0;
    const screenBottom = this.canvas.height;

    const playerLeft = this.x;
    const playerRight = this.x + this.size;
    const playerTop = this.y;
    const playerBottom = this.y + this.size;

    if (playerRight > screenRight) this.x = screenRight - 100;
    else if (playerLeft < screenLeft) this.x = screenLeft;
    else if (playerTop < screenTop) this.y = 0;
    if (playerBottom > screenBottom) this.y = screenBottom - 100;
  }
}
