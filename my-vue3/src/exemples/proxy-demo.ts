export function defineProxy(target:any) {
  if (typeof target !== "object" || target == null) {
    return target;
  }
  return new Proxy(target, {
    get(target, key, receiver) {
      console.log("proxy-get", key);
      const result = Reflect.get(target, key, receiver); //Reflect.get就相当于target[key],Reflect和Proxy是对应的
      console.log("get结果", result);
      return defineProxy(result); // 深度监听内部的属性，把内部的对象用proxy包裹的对象
    },
    set(target, key, val, receiver) {
      console.log("proxy-set", key, val);
      const keys = Reflect.ownKeys(target);
      if (keys.includes(key)) {  //区别已有的属性还会新增的属性
        console.log("已有的key", key);
      } else {
        console.log("新的key", key);
      }

      return Reflect.set(target, key, val, receiver);
    },
    deleteProperty(target, key) {
      console.log("proxy-delete", key);
      return Reflect.deleteProperty(target, key);
    },
  });
}
