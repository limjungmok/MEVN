import './scss/index.scss';

import { State } from './lib';
import { 
  Carousel, 
  CarouselInfo, 
  CarouselNext, 
  CarouselPrev,
  CarouselThumb,
} from './component';

import { ICarouselState } from './view-model/CarouselState';
import CarouselThumbNext from './component/carousel-thumb-next';
import CarouselThumbPrev from './component/carousel-thumb-prev';
import { getCarouselsApi } from './api/carousels';

const initialState: ICarouselState = {
  index: 0,
  // pageIndex: 0,
  limit: 5,
  list: []
};

(async function() {
  'use strict';
  const store: any = new State(initialState);

  const carouselInfo = new CarouselInfo(store, "#carousel-info");
  const carousel = new Carousel(store, "#carousel");
  const carouselNext = new CarouselNext(store, "#carousel-buttons-next");
  const carousePrev = new CarouselPrev(store, "#carousel-buttons-prev");
  const carouselThumb = new CarouselThumb(store, "#carousel-thumb");
  const carouselThumbNext = new CarouselThumbNext(store, "#carousel-thumb-buttons-next");
  const carouselThumbPrev = new CarouselThumbPrev(store, "#carousel-thumb-buttons-prev");

  const list = await getCarouselsApi('http://localhost:3999/api/carousels');
  store.updateState({
    ...store.getState(),
    list
  });

  console.log('store', store.getState());
  store.addObservers([
    carouselInfo,
    carousel,
    carouselNext,
    carousePrev,
    carouselThumb,
    carouselThumbNext,
    carouselThumbPrev,
  ])

  carouselInfo.render();
  carousel.render();
  carouselNext.render();
  carousePrev.render();
  carouselThumb.render();
  carouselThumbNext.render();
  carouselThumbPrev.render();
})();
