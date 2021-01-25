class Defender {
  constructor(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.size = 100;
    this.x = x;
    this.y = canvas.height + this.size;
    this.direction = 1;
    this.speed = speed;
  }

  draw() {
    const img = document.createElement("img");
    img.src = "../images/Defender.svg";
    this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }

  updatePosition() {
    this.y = this.y + this.direction * this.speed;
    const screenTop = 0;
    const screenBottom = this.canvas.height;

    const defenderTop = this.y;
    const defenderBottom = this.y + this.size;

    if (defenderBottom > screenBottom) this.direction = -1;
    else if (defenderTop < screenTop) this.direction = 1;
  }
}
