import { Observer } from "../../lib";
import { TYPE_DOM_SELECTOR_ID, ICarousel } from "../../type";

export default class CarouselNext extends Observer{
  _parentSelector: TYPE_DOM_SELECTOR_ID;

  constructor(store: any, parentSelector: TYPE_DOM_SELECTOR_ID) {
    super(store);
    
    this._parentSelector = parentSelector;

    // bind 풀면, this가 window 다르다.
    this.handleNext = this.handleNext.bind(this);
  }

  createTemplate() {
    return `
      <button type="button" id="carousel-next">></button>
    `;
  }

  render() {
    const parentElement = document.querySelector(this._parentSelector);
    parentElement.innerHTML = this.createTemplate();

    this.bindEvents();
  }

  handleNext() {
    const { updateState } = this.store;
    const { index, list } = this.state;

    const nextIndex = index === list.length - 1 ? 0 : index + 1;

    updateState({
      ...this.state,
      index: nextIndex
    });
  }

  bindEvents() {
    const buttonNext = document.querySelector('#carousel-next');
    buttonNext.addEventListener('click', this.handleNext);
  }
}