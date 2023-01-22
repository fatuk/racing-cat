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
    this.speed = 0;
    this.maxSpeed = 10;
    this.x = 200;
    this.y = 200;
    this.targetX = 0;
    this.targetY = 0;
    this.acceleration = 0.05;
    this.friction = this.acceleration * 3;
    this.isMoving = false;
    this.angle = 0;
    this.maxAngleTweak = 3;
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
    // Mouse is caught
    mouse.style.display = 'none';

    this.speed -= this.friction;

    if (this.speed < 0) {
      this.speed = 0;
    }

    this.x = this.x + this.speed * cos(this.angle);
    this.y = this.y + this.speed * sin(this.angle);
  }

  move() {  
    const angle = getAngle({x: this.x, y: this.y}, {x: this.targetX, y: this.targetY});
    const newAngleDeg = radToDeg(angle);
    
    if (this.isMoving) {
      if (this.speed == 0) {
        this.angle = newAngleDeg;
      } 
      else {
        // update angle
        this.angle = getNewAngle(this.angle, newAngleDeg, this.maxAngleTweak);
      }
    }

    if (Math.hypot(this.targetX - this.x, this.targetY - this.y) > this.speed && this.isMoving) {
      this.speedUp();
    } else {
      this.slowDown();
    }

    this.render();
  }
}

const cat = new Cat();
const mouse = document.getElementsByClassName('mouse')[0];

document.addEventListener('keyup', (event) => {
  if (event.key == " " ||
      event.code == "Space") {
        cat.speed = 0;
        cat.isMoving = false;
  }
});

document.addEventListener('click', (event) => {
  const { clientX, clientY } = event;

  // if (cat.isMoving) {
  //   return
  // }

  mouse.style.display = 'block';
  mouse.style.left = `${clientX}px`;
  mouse.style.top = `${clientY}px`;

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

function getNewAngle(current, target, step) {
  let inversion = 1;
  let result = current;
  let delta = Math.abs(target - current);
  if (delta > 180) {
    delta = 360 - delta;
    inversion = -1;
  }

  if (delta <= step) {
    result = target;
  }
  else {
    result += target > current ? 
      step * inversion : - step * inversion;   
  }

  // We operate with angle in range -180 : 180.
  if (result < -180) {
    result += 360;
  }
  else if (result > 180) {
    result -= 360;
  }

  return result;
}