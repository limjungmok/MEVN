import { Observer } from "../../lib";
import { TYPE_DOM_SELECTOR_ID } from "../../type";

export default class CarouselPrev extends Observer{
  _parentSelector: TYPE_DOM_SELECTOR_ID;

  constructor(store: any, parentSelector: TYPE_DOM_SELECTOR_ID) {
    super(store);

    this._parentSelector = parentSelector;

    this.handlePrev = this.handlePrev.bind(this);
  }

  createTemplate() { 
    return `
      <button type="button" id="carousel-prev"><</button>
    `
  }

  handlePrev() {
    const { updateState } = this.store;
    const { index, list } = this.state;
    const prevIndex = index === 0 ? list.length - 1 : index - 1;

    updateState({
      ...this.state,
      index: prevIndex
    });
  }

  render() {
    const parentElement = document.querySelector(this._parentSelector);
    parentElement.innerHTML = this.createTemplate();

    this.bindEvents();
  }

  bindEvents() {
    const buttonPrev = document.querySelector('#carousel-prev');
    buttonPrev.addEventListener('click', this.handlePrev);
  }
}
