/**
 * Subject 들을 쥐하다가, 상태가 업데이트 되었다고 하면 맞는 액션을 행동한다.
 * FE의 경우, 각 컴포넌트들이 될수있다.
 */

export default class Observer {
  store: any;
  state: any;

  constructor(store: any) {
    this.store = store;
    this.state = this.store.getState();
  }

  /**
   * 상태값이 변경되면 각 컴포넌트가 update한다.
   */
  render() {}
  update() {
    this.render();
  }
}
