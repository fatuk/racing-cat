let t = 0;
const a = 1;
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
    this.x = 200;
    this.y = 200;
    this.targetX = 0;
    this.targetY = 0;
    this.acceleration = 0.01;
    this.friction = 0.02;
    this.time = 0;
    this.isMoving = false;
    this.vectorX = 1;
    this.vectorY = 1;
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
    this.speed += this.acceleration * this.time;
    this.x = this.x + this.speed * this.vectorX * cos(this.angle);
    this.y = this.y + this.speed * this.vectorY * sin(this.angle);
  }

  slowDown() {
    this.isMoving = false;
    this.speed -= this.friction * this.time;

    if (this.speed < 0) {
      this.speed = 0;
    }

    this.x = this.x + this.speed * this.vectorX * cos(this.angle);
    this.y = this.y + this.speed * this.vectorY * sin(this.angle);
  }

  move() {
    const targetDeltaX = Math.abs(this.targetX - this.x);
    const targetDeltaY = Math.abs(this.targetY - this.y);
    this.time += 0.1;

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
  // test
  const { clientX, clientY } = event;

  console.log(clientX, clientY);
  console.log(radToDeg(getAngle({x: cat.x, y: cat.y}, {x: clientX, y: clientY})));




  if (cat.isMoving) {
    return
  }

  // console.log(arrow.style.left);
  // console.dir(arrow);

  const angle = getAngle({x: cat.x, y: cat.y}, {x: clientX, y: clientY});
  // console.log(radToDeg(angle));
  // const angle = Math.atan2(0, 0);

  // arrow.style.transform = `rotate(${angle}rad)`
  // cat.angle = getAngle({x: cat.x, y: cat.y}, {x: clientX, y: clientY});
  cat.angle = radToDeg(angle);
  cat.isMoving = true;
  cat.time = 0;
  cat.targetX = clientX;
  cat.targetY = clientY;
  // cat.vectorX = Math.sign(cat.targetX - cat.x);
  // cat.vectorY = Math.sign(cat.targetY - cat.y);
});


// console.log(radToDeg(Math.atan2(1, 1)));



function getAngle(current, target) {
  // return Math.atan((target.y - current.y) / (target.x - current.x));
  // console.log(target.y - current.y, target.x - current.x));
  // Math.atan2(p2.y - p1.y, p2.x - p1.x);

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
