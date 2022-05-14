import { defineProxy } from "./proxy-demo.js";
import { defineReactive } from "./defineProperty-demo";
const data = {
  a: 1,
  b: {
    c: {
      d:{
        e:1
      }
    },
  },
};
// const data = [1, 2, 3];
const proxyData = defineProxy(data); //想要proxy监听到改变，一定要定义一个变量，操作这个变量proxyData
// Object.keys(data).forEach((key) => defineReactive(data, key, data[key]));
// obj.a = 3; //会触发Object.definePropety
// proxyData.a = 3; //会触发Object.definePropety和proxy
console.log(proxyData.b)
// proxyData.push(4);
