import Subject from './Subject';
import CarouselState from '../view-model/CarouselState';

export default class State extends Subject {
  state: {};

  constructor(initialState = {}) {
    super();
    this.state = initialState;

    this.updateState = this.updateState.bind(this);
    this.getState = this.getState.bind(this);
  }

  updateState(data = {}) {

    this.state = Object.assign(this.state, data);
    // this.state = {...this.state, data};
    // 스프레드와 차이점은, 스프레드는 항상 '새로운 객체를 생성하지만 assign은 기존 객체를 변경합니다.
    this.notify(this.state);
  }

  getState() {
    return this.state;
  }
}
