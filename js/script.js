let t = 0;
const a = 1;

function gameLoop() {
  cat.move();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// s= v0*t + a * t^2 / 2

class Cat {
  constructor() {
    this.el = document.querySelector('.cat');
    this.direction = 'right';
    this.size = 100;
    this.speed = 3;
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
  }

  render() {
    this.el.style.left = `${this.x}px`;
    this.el.style.top = `${this.y}px`;
    this.el.style.width = `${this.size}px`;
    this.el.style.height = `${this.size}px`;
    this.el.style['margin-left'] = `-${this.size / 2}px`;

    switch(this.direction) {
      case 'left':
        this.el.classList.remove('right');
        this.el.classList.add('left');
        break;
      case 'right':
        this.el.classList.remove('left');
        this.el.classList.add('right');
        break;
    }
  }

  move() {
    const direction = Math.sign(this.targetX - this.x);
    const targetDelta = Math.abs(this.targetX - this.x);

    if (direction === -1) {
      this.direction = 'left';
    } else if (direction === 1) {
      this.direction = 'right';
    }

    if (targetDelta >= this.speed) {
      this.x = this.x + this.speed * direction;
    } else {
      this.x = this.x + targetDelta * direction;
    }

    this.render();
  }
}

const cat = new Cat();




document.addEventListener('click', (event) => {
  cat.targetX = event.clientX;
})
