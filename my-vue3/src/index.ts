// import  './exemples/index';  //理解proxy和defineProperty
// console.log('index')

/**
 * 【源码的core的测试】
 */
let app = document.getElementById("app");
let my = document.getElementById("my");

import { reactive as myReactive } from "./core/reactive";
import { effect as myEffect } from "./core/effect";
import { ref as myRef } from "./core/ref";
import { computed as myComputed } from "./core/computed";
import { computed, ref, effect, reactive } from "vue";

let data = reactive({
  name: "王金玉",
  age: 24,
});
// effect(() => {
//   app.innerHTML = `${data.name}今年${data.age}岁了`;
// }); //effect非常重要，不只是暴露出来的这个函数API,整个响应式的都是通过他，相当于vue2的Watcher
// setTimeout(() => {
//   data.age = 25;
// }, 1000);
// const count = ref(1);
// const dounce = computed(() => {
//   return count.value * 2;
// });
// effect(() => {
//   app.innerHTML = `今年挣了${dounce.value}`;
//   console.log("vue", count);
//   console.log("vue", dounce);
// }); //effect非常重要，不只是暴露出来的这个函数API,整个响应式的都是通过他，相当于vue2的Watcher

// setTimeout(() => {
//   count.value = 25;
// }, 1000);

const myCount = myRef(2);
const myDounce = myComputed(() => {
  return myCount.value * 2;
});

myEffect(() => {
  my.innerHTML = `my今年挣了${myDounce.value}`;
  console.log("my", myDounce);
}); //effect非常重要，不只是暴露出来的这个函数API,整个响应式的都是通过他，相当于vue2的Watcher
setTimeout(() => {
  myCount.value = 25;
  debugger
  console.log("my", myDounce);
}, 2000);
