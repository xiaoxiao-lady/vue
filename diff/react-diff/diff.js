// 对比react的diff算法的简单版本
// 参考文章：https://juejin.cn/post/6919376064833667080#heading-2
const preChildren = ["a", "b", "c", "d"];
const nextChildren = ["a", "b", "d", "c"];
function diff(preChildren, nextChildren, parent) {
  let lastIndex = 0;
  for (let i = 0; i < nextChildren.length; i++) {
    let nextChild = nextChildren[i];
    let find = false;
    for (let j = 0; j < preChildren.length; j++) {
      let preChild = preChildren[j];

      if (nextChild == preChild) {
        find = true;
        if (j < lastIndex) {
          // 当前preChild作为要移动节点，先找到要移动节点在新列表中位置的上一个节点在真实节点中的位置，把移动节点移动到该位置
          // 需要移动节点，下标不用更新
        } else {
          // 不需要移动节点，下标更新一下
          lastIndex = j;
        }
      }
    }
    if (!find) {
      // 新增节点
      // 找到目标位置前一个阶段
      // i<=0?
      // preChildren[0]
      // :nextChild[i-1]
    }
    for (let i = 0; i < preChildren.length; i++) {
      let preChild = preChildren[i];
      const has = nextChildren.find((ele) => (ele = preChild));
      if (!has) {
        //删除节点
      }
    }
  }
  return preChildren;
}
const res = diff(preChildren, nextChildren);
console.log(res);
