class Defender {
  constructor(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.size = 80;
    this.x = x;
    this.y = canvas.height + this.size;
    this.direction = 1;
    this.speed = speed;
  }

  draw() {
    const img = document.createElement("img");
    img.src = "images/defender.svg";
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

class Goalkeeper extends Defender {
  constructor(canvas, x, speed) {
    super(canvas, x, speed);
  }

  draw() {
    const img = document.createElement("img");
    img.src = "images/goalie.svg";
    this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }

  updatePosition() {
    this.y = this.y + this.direction * this.speed;
    const screenTop = 0 + this.canvas.height / 4;
    const screenBottom = this.canvas.height - this.canvas.height / 4;

    const defenderTop = this.y;
    const defenderBottom = this.y + this.size;

    if (defenderBottom > screenBottom) this.direction = -1;
    else if (defenderTop < screenTop) this.direction = 1;
  }
}

class Goal {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.height = 200;
    this.width = 80;
    this.x = this.canvas.width - 10;
    this.y = this.canvas.height / 2 - 100;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.stroke();
  }
}
