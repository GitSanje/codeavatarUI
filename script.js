const dots = document.querySelectorAll('.dot');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let activeIndex = 0;

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
  });
}

next.addEventListener('click', () => {
  activeIndex = (activeIndex + 1) % dots.length;
  updateDots();
});

prev.addEventListener('click', () => {
  activeIndex = (activeIndex - 1 + dots.length) % dots.length;
  updateDots();
});
