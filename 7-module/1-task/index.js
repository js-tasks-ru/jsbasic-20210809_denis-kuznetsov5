import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.id = categories.id;
    this.name = categories.name;
    this.string = "";
    for (let i = 0; i < categories.length; i++) {
      this.string += `<a href="#" class="ribbon__item" data-id="${this.categories[i].id}">${this.categories[i].name}</a>`;
    }

    this._ribbon = createElement(`<div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">${this.string}</nav>
  <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`);

    let leftArrow = this._ribbon.querySelector(".ribbon__arrow_left");
    let rightArrow = this._ribbon.querySelector(".ribbon__arrow_right");
    let ribbonInner = this._ribbon.querySelector(".ribbon__inner");

    rightArrow.addEventListener("click", () => {
      ribbonInner.scrollBy(350, 0);
    });

    leftArrow.addEventListener("click", () => {
      ribbonInner.scrollBy(-350, 0);
    });

    rightArrow.classList.add("ribbon__arrow_visible");

    ribbonInner.addEventListener("scroll", () => {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;

      if (scrollLeft == 0) {
        leftArrow.classList.remove("ribbon__arrow_visible");
      } else if (scrollRight > 1) {
        leftArrow.classList.add("ribbon__arrow_visible");
      }
      if (scrollRight < 1) {
        rightArrow.classList.remove("ribbon__arrow_visible");
      } else if (scrollLeft > 0) {
        rightArrow.classList.add("ribbon__arrow_visible");
      }

    });

    let links = this._ribbon.querySelectorAll('.ribbon__item');

    links.forEach(link => link.addEventListener("click", (event) => {
      event.preventDefault();

      if (!event.target.classList.contains("ribbon__item_active")) {
        event.target.classList.add("ribbon__item_active");
        if (event.target.previousSibling !== null) {
          event.target.previousSibling.classList.remove("ribbon__item_active");
        }
        if (event.target.nextSibling !== null) {
          event.target.nextSibling.classList.remove("ribbon__item_active");
        }
      }

      this._ribbon.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: link.dataset.id,
        bubbles: true
      }));
    }));
  }

  get elem() {
    return this._ribbon;
  }
}
