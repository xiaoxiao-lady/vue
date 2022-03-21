import Dep from "./Dep.js";
import { defineReactive } from "./defineReactive.js";

import { def } from "../utils/index";
// Observer的作用:将一个正常的obj对象每个属性都添加响应式;
export default class Observer {
  constructor(value) {
    this.dep = new Dep();
    def(value, "_ob_", this); // 添加_ob_属性，
    if (Array.isArray(value)) {
      console.log("array",value);
      // 处理数组的情况
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
}
