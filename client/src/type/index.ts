export type TYPE_DOM_SELECTOR_ID = string;
export type TYPE_CAROUSEL_ID = string;
export type TYPE_CAROUSEL_IMAGE = string;

export interface ICarousel {
  id?: TYPE_CAROUSEL_ID;
  thumbURL: TYPE_CAROUSEL_IMAGE;
  viewURL: TYPE_DOM_SELECTOR_ID;
  originURL: TYPE_DOM_SELECTOR_ID;
}
