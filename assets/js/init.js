import Circle from './objects/Circle';
import { context, innerWidth, innerHeight } from './base';
import { mouseMove } from './events/mouseMove';
import { mouseClick } from './events/mouseClick';

const circles = [];

for (let i = 0; i < 800; i++) {
  circles.push(
    new Circle(context, { mouseMove, mouseClick }, { innerWidth, innerHeight })
  );
}

function animate() {
  context.clearRect(0, 0, innerWidth, innerHeight);
  requestAnimationFrame(animate);
  circles.forEach((circle) => {
    circle.update();
  });
}

animate();
