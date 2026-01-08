document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slider-content");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dots = document.querySelectorAll(".slider-controls .dot");
  const slider = document.querySelector(".slider");



  let currentIndex = 0;
  let interval = null;
  const AUTO_SLIDE_DELAY = 5000;


  /* ---------- CORE FUNCTIONS ---------- */
  function showSlide(index) {
    if (index === currentIndex) return;
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[index];

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("dot-active"));
    currentSlide.classList.add("exit");
    nextSlide.classList.add("active");
    dots[index].classList.add("dot-active");
    setTimeout(() => {
      currentSlide.classList.remove("exit");
    }, 600);


    currentIndex = index;
  }

  function nextSlide() {
    showSlide((currentIndex + 1) % slides.length);
  }

  function prevSlide() {
    showSlide(
      (currentIndex - 1 + slides.length) % slides.length
    );
  }

  /* ---------- BUTTON EVENTS ---------- */
  nextBtn.addEventListener("click", () => {
    nextSlide()
    restartAutoSlide();
  })
  prevBtn.addEventListener("click", () => {
    prevSlide()
    restartAutoSlide();
  })

  /* ---------- DOT EVENTS ---------- */

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index)
      restartAutoSlide();
    })
  })

  /* ---------- AUTOPLAY ---------- */
  function startAutoSlide() {
    interval = setInterval(nextSlide, AUTO_SLIDE_DELAY);
  }
  function stopAutoSlide() {
    clearInterval(interval);
  }
  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  /* ---------- PAUSE ON HOVER ---------- */
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);


  /* ---------- TOUCH / SWIPE SUPPORT ---------- */
  let startX = 0;
   slider.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    console.log("touchstart", startX);
    
    stopAutoSlide();
  });

   slider.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    console.log("touchend", endX);
     console.log("diff", diff);

    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
    startAutoSlide();
  });


  /* ---------- INIT ---------- */
  showSlide(0);
  startAutoSlide();


})