class Player {
  constructor(canvas, x, speed, sprite) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.size = 80;
    this.x = x;
    this.y = canvas.height / 2;
    this.direction = undefined;
    this.speed = speed;
    this.sprite = sprite;
  }

  draw() {
    const img = document.createElement("img");
    img.src = `images/player${this.sprite}.svg`;
    this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }

  setDirection(direction) {
    if (direction === "up") {
      this.y -= this.speed;
    } else if (direction === "down") {
      this.y += this.speed;
    } else if (direction === "right") {
      this.x += this.speed;
    } else if (direction === "left") {
      this.x -= this.speed;
    }
  }

  updatePosition(ball) {
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

    ball.didAttach(this);
  }
}
