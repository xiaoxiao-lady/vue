export function defineReactive(target:any, key, val) {
  return Object.defineProperty(target, key, {
    get() {
      console.log("object-get", val);
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        console.log("object-set", newVal);
        val = newVal;
      }
    },
  });
}
