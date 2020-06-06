export const mouseMove = {
  x: undefined,
  y: undefined,
};

window.addEventListener('mousemove', function (event) {
  mouseMove.x = event.x;
  mouseMove.y = event.y;
});
