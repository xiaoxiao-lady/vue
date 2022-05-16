import { observe } from "./core/observe.js";

const obj = {
  a: {
    m: {
      n: 5,
    },
  },
  b: {
    j: {
      k: {
        l: 10,
      },
    },
  },
  s: [10, 20, 30],
};
console.log(obj);
observe(obj);
obj.a = 10;
class Vue {
  constructor() {}
}

window.Vue = Vue; //因为这里不能使用export暴露出去Vue,所以就挂载在全局
