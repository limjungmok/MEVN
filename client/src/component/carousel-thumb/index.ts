import { Observer } from "../../lib";
import { TYPE_DOM_SELECTOR_ID, ICarousel } from "../../type";
import { getPageIndex, getPageStartIndex, getPageEndIndex } from "../../view-model/CarouselState";

export default class CarouselThumb extends Observer{
  _parentSelector: TYPE_DOM_SELECTOR_ID;

  constructor(store: any, parentSelector: TYPE_DOM_SELECTOR_ID) {
    super(store);

    this._parentSelector = parentSelector;

    this.handleClick = this.handleClick.bind(this);
  }

  createTempate() {
    const { index, limit, list } = this.state;
    const pageIndex = getPageIndex(index, limit);
    const pageStartIndex = getPageStartIndex(pageIndex, limit);
    const pageEndIndex = getPageEndIndex(pageIndex, limit);

    return `
      ${[...list].slice(pageStartIndex, pageEndIndex).map((c: ICarousel) => (
        `
          <img src=${c.thumbURL} id="c${c.id}" class="thumb" />
        `
      )).join('')}
    `;
  }

  updateSelected(index: number) {
    const selectedElement = document.querySelector(`#c${index + 1}`);

    selectedElement.classList.add('is-selected');
  }

  handleClick(e: any) {
    const target = e.target;
    const { id, tagName } = target;
    if (tagName !== 'IMG') return;
    const targetID = id;
    const index = Number(targetID.split('c')[1]) - 1;

    const { updateState } = this.store;

    updateState({
      ...this.state,
      index
    });

    this.updateSelected(index);
  }

  render() {
    const parentElement = document.querySelector(this._parentSelector);
    parentElement.innerHTML = this.createTempate();

    this.updateSelected(this.state.index);
    this.bindEvents();
  }

  bindEvents() {
    const carouselThumb = document.querySelector(this._parentSelector);
    carouselThumb.addEventListener('click', this.handleClick);
  }
}