import { parsePath } from "../../../vue-src/core/util";

var uid = 0;
// 订阅者的类
export default class Watcher {
  // this.$watcher(val,()=>{

  // })这种语法
  constructor(target, expression, callback) {
    this.id = uid++;
    this.target = target;
    // 把表达式expression解析成getter
    this.getter = parsePath(expression);
  }
  addDep(dep) {
    // 将当前的 Watcher 添加到 Dep 收集池中
    dep.addSub(this);
  }
  update() {
    // 开启异步队列，批量更新 Watcher
    queueWatcher(this);
  }
}
