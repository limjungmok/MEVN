import { Observer } from "../../lib";
import { TYPE_DOM_SELECTOR_ID } from "../../type";

export default class CarouselInfo extends Observer{
  _parentSelector: TYPE_DOM_SELECTOR_ID;

  constructor(store: any, parentSelector: TYPE_DOM_SELECTOR_ID) {
    super(store);

    this._parentSelector = parentSelector;
  }

  createTemplate() {
    return `
      <div>현재 인덱스 ${this.state.index}</div>
      <div>전체 갯수 ${this.state.list.length}</div>
    `;
  }

  render() {
    const parentElement = document.querySelector(this._parentSelector);
    parentElement.innerHTML = this.createTemplate();
  }
}
