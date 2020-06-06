export let canvas = document.querySelector('#app');
export let context = canvas.getContext('2d');

export let innerWidth = window.innerWidth;
export let innerHeight = window.innerHeight;

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
