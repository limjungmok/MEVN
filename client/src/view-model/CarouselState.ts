import { ICarousel } from "../type";

export function getPageIndex(currentIndex: number, limit: number): number {
  return Math.floor(currentIndex / limit);
}

export function getPageStartIndex(currentPageIndex: number, limit: number): number {
  return currentPageIndex * limit;
}

export function getPageEndIndex(currentPageIndex: number, limit: number): number {
  return (limit * currentPageIndex) + limit;
}


export interface ICarouselState{
  index: number;
  // pageIndex: number;
  limit: number;
  list: ICarousel[];
}

export default class CarouselState {
  _index: number;
  _list: ICarousel[];
  _length: number;

  constructor({ index, list }: ICarouselState) {
    this._index = index;
    this._list = list;
    this._length = this._list.length;
  }

  get prev() {
    return this._index === 0 ? this._index - 1 : this._length - 1;
  }

  get next() {
    return this._index === this._length - 1 ? 0 : this._length + 1;
  }

  get index() {
    return this._index;
  }

  get list() {
    return this._list;
  }
}

