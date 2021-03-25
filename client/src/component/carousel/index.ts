import { Observer } from "../../lib";
import { TYPE_DOM_SELECTOR_ID } from "../../type";

export default class Carousel extends Observer {
  _parentSelector: TYPE_DOM_SELECTOR_ID;

  constructor(store: any, parentSelector: TYPE_DOM_SELECTOR_ID) {
    super(store);

    this._parentSelector = parentSelector;
  }
  
  createTemplate() {
    const { index, list } = this.state;

    return `
      <img id="c${list[index].id}" class="image" src="${list[index].originURL}" />
    `
  }

  render() {
    const parentElement = document.querySelector(this._parentSelector);
    parentElement.innerHTML = this.createTemplate();
  }
}