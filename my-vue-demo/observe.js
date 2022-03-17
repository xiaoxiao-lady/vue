import { isObject, hasOwn } from "/my-vue-demo/utils/index";
import Observer from "/my-vue-demo/Observer";
// observe的作用实例化Observer;
export function observe(value) {
  if (!isObject()) return;
  let ob; //标识是否已经存在Observer实例
  if (hasOwn(value, "_ob_")) {
    ob = value._ob_;
  } else {
    ob = new Observer(value);
  }
  return ob;
}
