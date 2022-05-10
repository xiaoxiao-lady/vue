let compiler = require("vue-template-compiler");
// 使用插件vue-template-compiler来看指令编译结果
// const ast1 = compiler.compile("<div v-if='false'></div>");
// console.log(ast1.render);
const ast2 = compiler.compile(
  "<div v-for='(item,index) in 3' :key='index' v-if='false'></div>"
);
console.log(ast2.render);
// const ast3 = compiler.compile("<input type='text' v-model='name'");
// console.log(ast3.render());
// const ast3 = compiler.compile("<input type='text' v-model='name'");
// console.log(ast3.render());
