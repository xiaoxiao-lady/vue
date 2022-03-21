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

observe(obj);
obj.a = 10;
obj.s.push(40);  //检测出来是数组
console.log(obj);
