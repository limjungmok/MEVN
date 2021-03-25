/**
 * 상태가 변경될 때, 자신을 구독중인 옵저버들에게 상태를 notify 해준다.
 * FE의 경우, State 객체가 될수있다.
 */
export default class Subject { 
  observers: any[];

  constructor() {
    this.observers = []; // 상태를 갱신해 줄 옵저버들을 배열형태로 받아준다.
  }

  /**
   * 상태값이 변경되면 알려 줄 옵저버를 추가한다.
   * @param o 옵저버
   */
  addObserver(o: any): void {
    this.observers.push(o);
  }

  addObservers(observerList: any[]): void {
    observerList.forEach(o => this.observers.push(o));
  }

  /**
   * 상태값이 변경되면 알려 줄 옵저버를 제거한다.
   * @param o 옵저버
   */
  removeObserver(o: any): void {
    const index: number = this.observers.findIndex(observer => o);

    if (index != -1) this.observers.splice(index, 1);
  }

  /**
   * 데이터와 함께 상태값이 변경됨을 공지한다.
   * @param data 데이터
   */
  notify(data: any) {
    // 변경이 발생할때 실행되는 함수
    if (this.observers.length) this.observers.forEach(o => o.update(data));
  }
}
