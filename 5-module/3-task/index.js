function initCarousel() {
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let carouselInner = document.querySelector(".carousel__inner");
  let countSlide = document.querySelectorAll('.carousel__slide').length;
  let slideCount = 0;


  function hideCarouselArrow() {
    
    if (slideCount == countSlide - 1) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }
    if (slideCount == 0 || countSlide == 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }
  }

  function moveSlide() {
    carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * slideCount}px)`;
  }
  
  hideCarouselArrow();

  function clickRightArrow() {
    slideCount++;
    hideCarouselArrow();
    moveSlide();
    
  }

  function clickLeftArrow() {
    slideCount--;
    hideCarouselArrow();
    moveSlide(); 
    
  }

  arrowRight.addEventListener('click', clickRightArrow);

  arrowLeft.addEventListener('click', clickLeftArrow);
}
