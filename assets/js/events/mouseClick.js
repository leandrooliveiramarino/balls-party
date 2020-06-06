export const mouseClick = {
  x: undefined,
  y: undefined,
  clicked: false,
};

window.addEventListener('click', function (ev) {
  mouseClick.x = ev.x;
  mouseClick.y = ev.y;
  mouseClick.clicked = true;

  this.setTimeout(() => {
    mouseClick.x = undefined;
    mouseClick.y = undefined;
    mouseClick.clicked = false;
  }, 10);
});
