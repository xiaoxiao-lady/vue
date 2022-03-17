// 依赖收集和通知
export default class Dep {
  constructor() {
    this.subs = [];
  }
  // 添加观察者对象，sub是Watcher实例
  addSub(sub) {
    this.subs.push(sub);
  }
  /*依赖收集，当存在Dep.target的时候添加观察者对象*/
  depend() {
    if (Dep.target) {
      // Watcher实例
      Dep.target.addDep(this);
    }
  }
  /*通知所有订阅者*/
  notify() {
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      subs[i].update(); //调用Watcher的update方法
    }
  }
}
