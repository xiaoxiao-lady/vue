// import  './exemples/index';  //理解proxy和defineProperty
// console.log('index')

/**
 * 【源码的core的测试】
 */
let app = document.getElementById("app");
import { reactive } from "./core/reactive";
import { effect } from "./core/effect";
let data = reactive({
  name: "王金玉",
  age: 24,
});
effect(() => {
  app.innerHTML = `${data.name}今年${data.age}岁了`;
}); //effect非常重要，不只是暴露出来的这个函数API,整个响应式的都是通过他，相当于vue2的Watcher
setTimeout(() => {
  data.age = 25;
}, 1000);
