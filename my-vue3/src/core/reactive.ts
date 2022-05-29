import { track, trigger } from "./effect";

export function reactive(target) {
  return createReactiveObject(target, baseHandler);
}
export function createReactiveObject(target, baseHandler) {
  const proxy = new Proxy(target, baseHandler); //代理
  debugger;
  return proxy;
}
// Proxy配置项
export const baseHandler = {
  get(target, key, recevier) {
    debugger;
    const res = Reflect.get(target, key, recevier); //Reflect和Proxy是一堆孪生兄弟，Reflect.get(target, key, recevier)等价与target[key]
    track(target, "get", key); //收集依赖，收集属性的所有的effect到deps中
    return res;
  },
  set(target, key, val, recevier) {
    debugger;
    const res = Reflect.set(target, key, val, recevier);
    trigger(target, "set", key); //通知这个属性依赖的所有的effect，并执行
    return res;
  },
};
