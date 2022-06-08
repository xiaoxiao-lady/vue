import { isFunction, isObject } from "../utils";
import { effect, trackEffects, triggerEffects } from "./effect";

export class ComputedRefImpl {
  public _effect;
  public dep = new Set();
  private dirty = true; //默认取值时应该计算，所以默认数据是脏的
  private _value;

  constructor(getter, public setter) {
    this._effect = effect(getter, {
      lazy: true,
      scheduler: () => {
        if (!this.dirty) {
          this.dirty = true;
          triggerEffects(this.dep);  //延迟更新依赖
        }
      },
    });
  }
  get value() {
    trackEffects(this.dep); //收集依赖
    if (this.dirty) {
      //说明只是脏的，需要更新
      this._value = this._effect();
    }
    return this._value;
  }
  set value(newValue) {
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
