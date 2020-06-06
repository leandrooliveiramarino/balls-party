export default class Circle {
  constructor(context, events, props) {
    this.context = context;
    this.mouseMove = events.mouseMove;
    this.mouseClick = events.mouseClick;
    this.innerWidth = props.innerWidth;
    this.innerHeight = props.innerHeight;

    this._init();
  }

  _init() {
    this.radius = Math.random() * 4 + 3;
    this.MIN_RADIUS = this.radius;
    this.x = Math.random() * (this.innerWidth - this.radius * 2) + this.radius;
    this.y = Math.random() * (this.innerHeight - this.radius * 2) + this.radius;
    this.clicked = false;

    this.dx = (Math.random() - 0.5) * 1;
    this.dy = (Math.random() - 0.5) * 1;
    this.COLORS_AVAILABLE = [
      '255,170,51',
      '153,255,170',
      '0,255,0',
      '68,17,170',
      '255,17,0',
    ];
    this.MAX_RADIUS = 40;

    this.rgbColor = this.COLORS_AVAILABLE[
      Math.floor(Math.random() * this.COLORS_AVAILABLE.length)
    ];
    this.color = 'rgba(' + this.rgbColor + ', 1)';
    this.speed = 1;
  }

  _draw(x, y) {
    this.context.beginPath();
    this.context.arc(x, y, this.radius, 0, Math.PI * 2, false);
    this.context.lineWidth = 1;
    this.context.strokeStyle = this.color;
    this.context.fillStyle = 'rgba(' + this.rgbColor + ', 0.6)';
    this.context.fill();
    this.context.stroke();
  }

  update() {
    this._draw(this.x, this.y);
    this._setBehavior();
  }

  _actionConditions() {
    const actions = [];
    this.clicked = this.mouseClick.clicked;

    if (this.speed > 1) {
      actions.push('SPEED_DOWN');
    }

    if (this.x + this.radius > this.innerWidth) {
      actions.push('INVERT_X_DIRECTION');
    }

    if (this.x - this.radius < 0) {
      actions.push('INVERT_X_DIRECTION');
    }

    if (this.y + this.radius > this.innerHeight) {
      actions.push('INVERT_Y_DIRECTION');
    }

    if (this.y - this.radius < 0) {
      actions.push('INVERT_Y_DIRECTION');
    }

    if (
      this.mouseMove.x - this.x < 50 &&
      this.mouseMove.x - this.x > -50 &&
      this.mouseMove.y - this.y < 50 &&
      this.mouseMove.y - this.y > -50
    ) {
      actions.push('INCREASE_RADIUS');
      actions.push('SET_COLOR');

      if (this.clicked) {
        actions.push('INVERT_Y_DIRECTION');
        actions.push('INVERT_X_DIRECTION');
        actions.push('SPEED_UP');
        actions.push('MOUSE_CLICK_LISTENER');
      }
    }

    if (!actions.includes('INCREASE_RADIUS')) {
      actions.push('DECREASE_RADIUS');
    }

    actions.push('MOVE');

    return actions;
  }

  _setBehavior() {
    const actions = this._actionConditions();

    actions.forEach((action) => {
      this._actions(action)();
    });
  }

  _actions(action) {
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
        if (this.radius > this.MIN_RADIUS) this.radius -= 1;
      },
      SET_COLOR: () => {
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.strokeStyle = this.color;
        this.context.stroke();
      },
      MOVE: () => {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
      },
      MOUSE_CLICK_LISTENER: () => {
        if (this.clicked) {
          this.clicked = false;
        }
      },
      SPEED_DOWN: () => {
        this.speed--;
      },
      SPEED_UP: () => {
        this.speed = 100;
      },
    };

    if (!_actions[action]) {
      throw new Error('Action not available: ' + action);
    }

    return _actions[action];
  }
}
