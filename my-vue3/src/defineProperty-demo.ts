export function defineReactive(target, key, val) {
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
