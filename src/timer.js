class Timer {
  constructor() {
    this.currentTime = 1000;
    this.intervalId = 0;
  }

  startCount(callback) {
    this.intervalId = setInterval(() => {
      this.currentTime--;
    }, 1000);
  }

  getMinutes() {
    return Math.floor(this.currentTime / 60);
  }

  getSeconds() {
    return this.currentTime % 60;
  }

  twoDigitsNumber(number) {
    return ("0" + number).slice(-2);
  }

  stopCount() {
    if (this.currentTime >= 3600) {
      clearInterval(this.intervalId);
    }
  }

  resetCount() {
    this.currentTime = 0;
  }

  splitCount() {
    return `${this.twoDigitsNumber(this.getMinutes())}:${this.twoDigitsNumber(
      this.getSeconds()
    )}`;
  }
}

//Loading Screen Timer animation
const ready = document.querySelector("#countdown-start");
const go = document.querySelector("#countdown-final");

function loadingAnimation() {
  setTimeout(function () {
    console.log(ready);
    console.log(go);
    ready.classList.remove("in");
    ready.classList.add("out");
  }, 1000);
  setTimeout(function () {
    go.classList.remove("out");
    go.classList.add("in");
  }, 3000);
  setTimeout(function () {
    go.classList.remove("in");
  }, 5000);
}
