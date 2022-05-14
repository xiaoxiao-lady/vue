import Dep from "./Dep.js";
import { defineReactive } from "./defineReactive.js";
import {observe} from './observe';
import { def, hasProto } from "../utils/index";
import { arrayMethods } from "./array.js";
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
// Observer的作用:将一个正常的obj对象每个属性都添加响应式;
export default class Observer {
  constructor(value) {
    this.dep = new Dep();
    def(value, "_ob_", this); // 添加_ob_属性，
    if (Array.isArray(value)) {
      // 处理数组的情况
      /*
          如果是数组，将修改后可以截获响应的数组方法替换掉该数组的原型中的原生方法，达到监听数组数据变化响应的效果。
          这里如果当前浏览器支持__proto__属性，则直接覆盖当前数组对象原型上的原生数组方法，如果不支持该属性，则直接覆盖数组对象的原型。
      */
      const augment = hasProto
        ? protoAugment /*直接覆盖原型的方法来修改目标对象*/
        : copyAugment; /*定义（覆盖）目标对象或数组的某一个方法*/

      augment(value, arrayMethods, arrayKeys);

      /*如果是数组则需要遍历数组的每一个成员进行observe*/
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
  /*对一个数组的每一个成员进行observe*/
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      /*数组需要遍历每一个成员进行observe*/
      observe(items[i]);
    }
  }
}
/*直接覆盖原型的方法来修改目标对象或数组*/
function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/*定义（覆盖）目标对象或数组的某一个方法*/
function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}
