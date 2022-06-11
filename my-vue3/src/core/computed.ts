import { isFunction, isObject } from "../utils";
import { effect, trackEffects, triggerEffects, ReactiveEffect } from "./effect";

export class ComputedRefImpl {
  public effect;
  public dep = new Set();  
  private dirty = true; //默认取值时应该计算，所以默认数据是脏的
  private _value;

  constructor(getter, public setter) {
    this.effect = new ReactiveEffect(getter, () => {
      // 能effect依赖的响应式数据发生变化时，延迟函数scheduler就会执行
      if (!this.dirty) {
        this.dirty = true;//这个阶段只会把dirty置为true，但是不会计算计算属性的值，后续获取computed.value的时候触发get value才会重新计算
        triggerEffects(this.dep); //延迟更新依赖
      }
    });
  }
  // 当访问computed.value的时候会触发get value这个函数
  get value() {
    debugger;
    trackEffects(this.dep); //收集依赖
    if (this.dirty) {
      //说明只是脏的，需要更新
      this.dirty = false;
      this._value = this.effect.run();
    }
    return this._value;
  }
  set value(newValue) {
    // 计算属性的setter一般不用，有的话直接执行setter就可以
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
export function computed(fnOrGetter) {
  let getter = null;
  let setter = null;
  // 计算属性是对象形式
  if (isObject(fnOrGetter)) {
    getter = fnOrGetter.get;
    setter = fnOrGetter.set;
  }
  // 函数形式
  if (isFunction(fnOrGetter)) {
    getter = fnOrGetter;
  }
  return new ComputedRefImpl(getter, setter);
}
