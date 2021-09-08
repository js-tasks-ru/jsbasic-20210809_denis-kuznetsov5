import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.slideCount = 0;
    this.elem = this.render(slides);
  }

  render(slides) { 
    let carousel = createElement(`
      <div class='carousel'>
        <div class='carousel__arrow carousel__arrow_right'>
          <img src='/assets/images/icons/angle-icon.svg' alt='icon'>
        </div>
        <div class='carousel__arrow carousel__arrow_left' style='display: none'>
          <img src='/assets/images/icons/angle-left-icon.svg' alt='icon'>
        </div>
        <div class='carousel__inner'>
          ${this.slidesList(slides)}
        </div>
      </div>
    `);

    let arrowRight = carousel.querySelector('.carousel__arrow_right');
    let arrowLeft = carousel.querySelector('.carousel__arrow_left');

    this.hideArrow(this.slideCount, arrowRight, arrowLeft, this.slides.lenght);

    arrowRight.addEventListener('click', () => {
      let carouselInner = carousel.querySelector('.carousel__inner');
      this.slideCount++;
      carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * this.slideCount}px)`;
      this.hideArrow(this.slideCount, arrowRight, arrowLeft, this.slides.lenght);
    });

    arrowLeft.addEventListener('click', () => {
      let carouselInner = carousel.querySelector('.carousel__inner');
      this.slideCount--;
      carouselInner.style.transform = `translateX(-${carouselInner.offsetWidth * this.slideCount}px)`;
      this.hideArrow(this.slideCount, arrowRight, arrowLeft, this.slides.lenght);
    });

    let buttonAdd = carousel.querySelectorAll('.carousel__button');

    for (let button of buttonAdd) {
      button.addEventListener('click', () => {
        carousel.dispatchEvent(new CustomEvent('product-add', {
          detail: button.closest('.carousel__slide').dataset.id,
          bubbles: true
        }));
      });
    }

    return carousel;
  }

  slidesList(slides) {
    return slides.reduce((resultList, item) => {
      return resultList + `
        <div class='carousel__slide' data-id=${item.id}>
          <img src='/assets/images/carousel/${item.image}' class='carousel__img' alt='slide'>
          <div class='carousel__caption'>
            <span class='carousel__price'>€${item.price.toFixed(2)}</span>
            <div class='carousel__title'>${item.name}</div>
            <button type='button' class='carousel__button'>
              <img src='/assets/images/icons/plus-icon.svg' alt='icon'>
            </button>
          </div>
        </div>`;
    }, '');
  }



  hideArrow(slideCount, arrowRight, arrowLeft, countSlide) {
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
}
