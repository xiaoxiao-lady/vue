import Dep from "./Dep";
import { observe } from "./observe";

export function defineReactive(obj, key, val) {
  let childOb = observe(val); // 子元素继续添加响应式
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.depend(); // 收集依赖
        if (childOb) {
          childOb.dep.depend();
        }
      }

      console.log("get", val);
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        console.log("set", newVal);
        dep.notify(); // 通知依赖更改
        val = newVal;
        childOb = observe(newVal);
      }
    },
  });
}
