import { h, ref, computed, reactive } from "../../lib/mini-vue.esm.js";

const count = ref(0);
const data = reactive({ age: 1212 });
const debounce = computed(() => {
  return count.value * 2;
});
console.log(debounce);
const HelloWorld = {
  name: "HelloWorld",
  setup() {},
  // TODO 第一个小目标
  // 可以在使用 template 只需要有一个插值表达式即
  // 可以解析 tag 标签
  // template: `
  //   <div>hi {{msg}}</div>
  //   需要编译成 render 函数
  // `,
  render() {
    return h(
      "div",
      { tId: "helloWorld" },
      `hello world: count: ${count.value} debounce:${debounce.value}`
    );
  },
};

export default {
  name: "App",
  setup() {},

  render() {
    return h("div", { tId: 1 }, [h("p", {}, "主页"), h(HelloWorld)]);
  },
};
