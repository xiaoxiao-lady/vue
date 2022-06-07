// import  './exemples/index';  //理解proxy和defineProperty
// console.log('index')

/**
 * 【源码的core的测试】
 */
let app = document.getElementById("app");
import { reactive } from "./core/reactive";
import { effect } from "./core/effect";
import { ref } from "./core/ref";
// let data = reactive({
//   name: "王金玉",
//   age: 24,
// });
// effect(() => {
//   app.innerHTML = `${data.name}今年${data.age}岁了`;
// }); //effect非常重要，不只是暴露出来的这个函数API,整个响应式的都是通过他，相当于vue2的Watcher
// setTimeout(() => {
//   data.age = 25;
// }, 1000);
const count = ref(0)
effect(() => {
  app.innerHTML = `今年挣了${count.value}`;
}); //effect非常重要，不只是暴露出来的这个函数API,整个响应式的都是通过他，相当于vue2的Watcher
console.log(count)
setTimeout(() => {
  count.value = 25;
}, 1000);

