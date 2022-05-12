export function defineProxy(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      console.log("proxy-get", key);
      return Reflect.get(target, key, receiver); //Reflect.get就相当于target[key],Reflect和Proxy是对应的
    },
    set(target, key, val, receiver) {
      console.log("proxy-set", key, val);
      return Reflect.set(target, key, val, receiver);
    },
    deleteProperty(target, key) {
      console.log("proxy-delete", key);
      return Reflect.deleteProperty(target, key);
    },
  });
}
