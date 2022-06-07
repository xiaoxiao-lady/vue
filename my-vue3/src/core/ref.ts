import { isObject } from "../utils";
import { trackEffects,  triggerEffects } from "./effect";
import { reactive } from "./reactive";

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}
export class RefImpl {
  public _value;
  public dep = new Set()
  constructor(public rawValue) {
    this._value = convert(rawValue);
  }
  get value() {
    debugger
    //get value 这个是es6中的class的自带方法，可以通过get和set监听对象的某个属性,当获取对象的.value的时候就会走这里
    trackEffects(this.dep) //收集依赖
    
    return this._value;
  }
  set value(newValue) {
    if (this.rawValue != newValue) {
      this._value = newValue; //收集新的值
      this.rawValue = newValue; //更新旧的值
      triggerEffects(this.dep)  //更新依赖
    }
  }
}
export function ref(value) {
  return new RefImpl(value);
}
