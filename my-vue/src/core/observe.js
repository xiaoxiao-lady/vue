import { isObject, hasOwn } from "./utils/index";
import Observer from "./Observer";
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
