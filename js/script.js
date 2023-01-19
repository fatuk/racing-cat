let t = 0;
const a = 1;

function gameLoop() {
  cat.move();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


class Cat {
  constructor() {
    this.el = document.querySelector('.cat');
    this.size = 100;
    this.speed = 1;
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.acceleration = 0.01;
    this.friction = 0.02;
    this.time = 0;
    this.isMoving = false;
    this.vectorX = 1;
  }

  render() {
    this.el.style.left = `${this.x}px`;
    this.el.style.top = `${this.y}px`;
    this.el.style.width = `${this.size}px`;
    this.el.style.height = `${this.size}px`;
    this.el.style['margin-left'] = `-${this.size / 2}px`;

    switch(this.vectorX) {
      case -1:
        this.el.classList.remove('right');
        this.el.classList.add('left');
        break;
      case 1:
        this.el.classList.remove('left');
        this.el.classList.add('right');
        break;
    }
  }

  speedUp() {
    this.speed += this.acceleration * this.time;
    this.x = this.x + this.speed * this.vectorX;
  }

  slowDown() {
    this.isMoving = false;
    this.speed -= this.friction * this.time;

    if (this.speed < 0) {
      this.speed = 0;
    }

    this.x = this.x + this.speed * this.vectorX;
  }

  move() {
    const targetDelta = Math.abs(this.targetX - this.x);
    this.time += 0.1;

    if (targetDelta >= this.speed && this.isMoving) {
      this.speedUp();
    } else {
      this.slowDown();
    }

    this.render();
  }
}

const cat = new Cat();




document.addEventListener('click', (event) => {
  // if (cat.speed) {
  //   cat.slowDown()
  // }

  if (cat.isMoving) {
    return
  }

  cat.isMoving = true;
  cat.time = 0;
  cat.targetX = event.clientX;
  cat.vectorX = Math.sign(cat.targetX - cat.x);
});
