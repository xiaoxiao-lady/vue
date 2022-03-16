import Dep from "./Dep";
import observe from "./observe";
export default function defineReactive(obj, key, val) {
  let childOb = observe(val); //子元素继续添加响应式
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      Dep.target && dep.addDep(Dep.target); //收集依赖
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        dep.notify(); //通知依赖更改
        val = newVal;
        childOb = observe(newVal);
      }
    },
  });
}
