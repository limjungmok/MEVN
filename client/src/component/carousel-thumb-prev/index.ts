import { Observer } from "../../lib";
import { TYPE_DOM_SELECTOR_ID } from "../../type";
import { getPageIndex } from "../../view-model/CarouselState";

export default class CarouselThumbPrev extends Observer{
  _parentSelector: TYPE_DOM_SELECTOR_ID;

  constructor(store: any, parentSelector: TYPE_DOM_SELECTOR_ID) {
    super(store);

    this._parentSelector = parentSelector;

    this.handlePrev = this.handlePrev.bind(this);
  }

  handlePrev() {
    const { updateState } = this.store;
    const { index, limit } = this.state;
    
    const prevPageIndex = getPageIndex(index, limit) - 1;
    const prevPageStartIndex = prevPageIndex * limit;

    const prevIndex = prevPageStartIndex < 0 ? 0 : prevPageStartIndex;

    updateState({
      ...this.state,
      index: prevIndex
    });
  }

  createTempate() {
    return `
      <button type="button" id="carousel-thumb-prev"><</button>
    `;
  }

  render() {
    const parentElement = document.querySelector(this._parentSelector);
    parentElement.innerHTML = this.createTempate();

    this.bindEvents();
  }

  bindEvents() {
    const buttonPrev = document.querySelector('#carousel-thumb-prev');
    buttonPrev.addEventListener('click', this.handlePrev);
  }
}