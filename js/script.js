const arrow = document.querySelector('.arrow');

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
    this.maxSpeed = 20;
    this.x = 200;
    this.y = 200;
    this.targetX = 0;
    this.targetY = 0;
    this.acceleration = 0.2;
    this.friction = this.acceleration * 2;
    this.isMoving = false;
    this.angle = 0;
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
    this.speed += this.acceleration;
    
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    this.x = this.x + this.speed * cos(this.angle);
    this.y = this.y + this.speed * sin(this.angle);
  }

  slowDown() {
    this.isMoving = false;
    this.speed -= this.friction;

    if (this.speed < 0) {
      this.speed = 0;
    }

    this.x = this.x + this.speed * cos(this.angle);
    this.y = this.y + this.speed * sin(this.angle);
  }

  move() {
    if (Math.hypot(this.targetX - this.x, this.targetY - this.y) > this.speed && this.isMoving) {
      this.speedUp();
    } else {
      this.slowDown();
    }

    this.render();
  }
}

const cat = new Cat();

document.addEventListener('click', (event) => {
  const { clientX, clientY } = event;

  if (cat.isMoving) {
    return
  }

  const angle = getAngle({x: cat.x, y: cat.y}, {x: clientX, y: clientY});
  cat.angle = radToDeg(angle);
  cat.isMoving = true;
  cat.targetX = clientX;
  cat.targetY = clientY;
});

function getAngle(current, target) {
  return Math.atan2(target.y - current.y, target.x - current.x);
}

function sin(deg) {
  return Math.sin(deg * Math.PI / 180);
}

function cos(deg) {
  return Math.cos(deg * Math.PI / 180);
}

function radToDeg(rad) {
  return rad * 180 / Math.PI;
}
