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
};

observe(obj);
obj.a = 10;
console.log(obj.b.j.k);
