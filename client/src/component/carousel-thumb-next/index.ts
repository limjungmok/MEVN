import { Observer } from "../../lib";
import { TYPE_DOM_SELECTOR_ID } from "../../type";
import { getPageIndex } from "../../view-model/CarouselState";

export default class CarouselThumbNext extends Observer{
  _parentSelector: TYPE_DOM_SELECTOR_ID;

  constructor(store: any, parentSelector: TYPE_DOM_SELECTOR_ID) {
    super(store);

    this._parentSelector = parentSelector;

    this.handleNext = this.handleNext.bind(this);
  }

  createTempate() {
    return `
      <button type="button" id="carousel-thumb-next">></button>
    `;
  }

  handleNext() {
    const { updateState } = this.store;
    const { index, list, limit } = this.state;
    
    const nextPageIndex = getPageIndex(index, limit) + 1;
    const nextPageStartIndex = nextPageIndex * limit;

    const nextIndex = nextPageStartIndex < list.length ? nextPageStartIndex : list.length - 1;

    updateState({
      ...this.state,
      index: nextIndex
    });
  }

  render() {
    const parentElement = document.querySelector(this._parentSelector);
    parentElement.innerHTML = this.createTempate();

    this.bindEvents();
  }

  bindEvents() {
    const buttonNext = document.querySelector('#carousel-thumb-next');
    buttonNext.addEventListener('click', this.handleNext);
  }
}