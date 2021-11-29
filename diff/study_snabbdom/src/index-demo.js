import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 创建patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);
// 测试用例
/**
 * 【验证最小量更新】
 */
// 创建虚拟节点;
const myVnode1 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
]);

const myVnode2 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "E" }, "E"),
]);
// 让虚拟节点上树
let container = document.getElementById("container");
patch(container, myVnode1);
// 点击按钮，变换 DOM
let btn = document.getElementById("btn");
btn.onclick = function () {
  patch(myVnode1, myVnode2);
};

/**
 * 【验证key值能够提高diff效率】
 */

// // 创建虚拟节点;
// const myVnode1 = h("ul", {}, [
//   h("li", {}, "A"),
//   h("li", {}, "B"),
//   h("li", {}, "C"),
//   h("li", {}, "D"),
// ]);
// const myVnode2 = h("ul", {}, [
//   h("li", {}, "E"),
//   h("li", {}, "A"),
//   h("li", {}, "B"),
//   h("li", {}, "C"),
//   h("li", {}, "D"),
// ]);
// // const myVnode1 = h("ul", {}, [
// //   h("li", { key: "A" }, "A"),
// //   h("li", { key: "B" }, "B"),
// //   h("li", { key: "C" }, "C"),
// //   h("li", { key: "D" }, "D"),
// // ]);
// // const myVnode2 = h("ul", {}, [
// //   h("li", { key: "E" }, "E"),
// //   h("li", { key: "A" }, "A"),
// //   h("li", { key: "B" }, "B"),
// //   h("li", { key: "C" }, "C"),
// //   h("li", { key: "D" }, "D"),
// // ]);
// // 让虚拟节点上树
// let container = document.getElementById("container");
// patch(container, myVnode1);
// // 点击按钮，变换 DOM
// let btn = document.getElementById("btn");
// btn.onclick = function () {
//   patch(myVnode1, myVnode2);
// };
// console.log(myVnode2);

/**
 * 【同级vnode节点，diff能精细化对比，不同级就是暴力删除旧的，插入新的】
 */

// // 创建虚拟节点;
// const myVnode1 = h("ol", {}, [
//   h("li", {key: "A"}, "A"),
//   h("li", {key: "B"}, "B"),
//   h("li", {key: "C"}, "C"),
//   h("li", {key: "D"}, "D"),
// ]);
// const myVnode2 = h("ul", {}, [
//   h("li", {key: "A"}, "A"),
//   h("li", {key: "B"}, "B"),
//   h("li", {key: "C"}, "C"),
//   h("li", {key: "D"}, "D"),
// ]);
// // 让虚拟节点上树
// let container = document.getElementById("container");
// patch(container, myVnode1);
// // 点击按钮，变换 DOM
// let btn = document.getElementById("btn");
// btn.onclick = function () {
//   patch(myVnode1, myVnode2);
// };

/**
 * 【只进行同级比较，不会进行跨级比较（真实操作也很少这么修改dom）】
 */

// 创建虚拟节点;
// const myVnode1 = h("ul", {}, [
//   h("li", { key: "A" }, "A"),
//   h("li", { key: "B" }, "B"),
//   h("li", { key: "C" }, "C"),
//   h("li", { key: "D" }, "D"),
// ]);
// const myVnode2 = h("ul", {}, [
//   h("div", {}, [
//     h("li", { key: "A" }, "A"),
//     h("li", { key: "B" }, "B"),
//     h("li", { key: "C" }, "C"),
//     h("li", { key: "D" }, "D"),
//   ]),
// ]);
// // 让虚拟节点上树
// let container = document.getElementById("container");
// patch(container, myVnode1);
// // 点击按钮，变换 DOM
// let btn = document.getElementById("btn");
// btn.onclick = function () {
//   patch(myVnode1, myVnode2);
// };
