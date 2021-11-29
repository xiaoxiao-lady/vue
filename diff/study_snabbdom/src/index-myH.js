import h from "./my_snabbdom/h";

const myVnode1 = h("div", {}, [
  h("ul", {}, [h("li", {}, "11"), h("li", {}, "22")]),
]);
console.log(myVnode1);
