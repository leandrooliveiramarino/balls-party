const canvas = document.querySelector('#app');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function Circle(
  context,
  mouse,
  { radius } = { radius: Math.random() * 4 + 3 }
) {
  this.MAX_RADIUS = 40;
  this.MIN_RADIUS = radius;
  this.colorsAvailable = [
    '255,170,51',
    '153,255,170',
    '0,255,0',
    '68,17,170',
    '255,17,0',
  ];

  this.rgbColor = this.colorsAvailable[
    Math.floor(Math.random() * this.colorsAvailable.length)
  ];
  this.color = 'rgba(' + this.rgbColor + ', 1)';

  this.context = context;
  this.radius = radius;
  this.mouse = mouse;
  this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius;
  this.y = Math.random() * (innerHeight - this.radius * 2) + this.radius;
  this.dx = Math.random() - 0.5;
  this.dy = Math.random() - 0.5;

  this.draw = function (x, y) {
    this.context.beginPath();
    this.context.arc(x, y, this.radius, 0, Math.PI * 2, false);
    this.context.lineWidth = 1;
    this.context.strokeStyle = this.color;
    this.context.fillStyle = 'rgba(' + this.rgbColor + ', 0.6)';
    this.context.fill();
    this.context.stroke();
  };

  this.update = function () {
    this.draw(this.x, this.y);
    this._setBehavior();
    this.x += this.dx;
    this.y += this.dy;
  };

  this.actionConditions = function () {
    const actions = [];

    if (this.x + this.radius > innerWidth) {
      actions.push('INVERT_X_DIRECTION');
    }

    if (this.x - this.radius < 0) {
      actions.push('INVERT_X_DIRECTION');
    }

    if (this.y + this.radius > innerHeight) {
      actions.push('INVERT_Y_DIRECTION');
    }

    if (this.y - this.radius < 0) {
      actions.push('INVERT_Y_DIRECTION');
    }

    if (
      this.mouse.x - this.x < 50 &&
      this.mouse.x - this.x > -50 &&
      this.mouse.y - this.y < 50 &&
      this.mouse.y - this.y > -50
    ) {
      actions.push('INCREASE_RADIUS');
      actions.push('SET_COLOR');
    }

    if (!actions.includes('INCREASE_RADIUS')) {
      actions.push('DECREASE_RADIUS');
    }

    return actions;
  };

  this._setBehavior = function () {
    const actions = this.actionConditions();

    actions.forEach((action) => {
      this.actions(action)();
    });
  };

  this.actions = function (action) {
    const _actions = {
      INVERT_X_DIRECTION: () => {
        this.dx = this.dx * -1;
      },
      INVERT_Y_DIRECTION: () => {
        this.dy = this.dy * -1;
      },
      INCREASE_RADIUS: () => {
        if (this.radius < this.MAX_RADIUS) this.radius += 3;
      },
      DECREASE_RADIUS: () => {
        if (this.radius > this.MIN_RADIUS) this.radius -= 0.1;
      },
      SET_COLOR: () => {
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.strokeStyle = this.color;
        this.context.stroke();
      },
    };

    if (!_actions[action]) {
      throw new Error('Action not available: ' + action);
    }

    return _actions[action];
  };
}

const circles = [];

for (i = 0; i < 800; i++) {
  circles.push(new Circle(context, mouse));
}

function animate() {
  context.clearRect(0, 0, innerWidth, innerHeight);
  requestAnimationFrame(animate);
  circles.forEach((circle) => {
    circle.update();
  });
}

animate();
