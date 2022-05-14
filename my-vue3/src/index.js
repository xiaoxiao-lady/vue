import { defineProxy } from "./proxy-demo.js";
import { defineReactive } from "./defineProperty-demo";
const obj = {
  a: 1,
};
defineProxy(obj);
Object.keys().forEach((key) => defineReactive(obj, key, obj[key]));
obj.a = 3;
// const arr = [1, 2, 3];
