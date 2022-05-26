// effect相当于vue2的Watcher,组件渲染、计算属性computed、watch函数、watchEffect函数实现都是依赖于effect函数

// 收集依赖函数，收集属性的所有的effect到deps中  结构  {对象:属性：[effect,effect]}

let activeEffect; //正在执行的effect
let targetMap = new WeakMap(); //临时存储target数据的，便于判断

export function track(target, type, key) {
  let depsMap = targetMap.get(target); //检查target是否收集过
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map())); //targetMap
  }
  let dep = depsMap.get(key); //检查key是否收集过
  if (dep) {
    depsMap.set(key, (dep = new Set())); //使用set是为了后面收集的effect数组去重
  }
  if (!dep.has(activeEffect)) {
    // 这两个建立双向的数据存储，在对象的属性中添加effect副作用函数，用于下次的数据变更触发执行
    // 在effect中存储他的dep，供后期取消effect
    dep.add(activeEffect); //收集当前正在执行的effect，
    activeEffect.deps.push(dep);//
  }
}

// 通知更新依赖函数，通知并执行这个属性依赖的所有的effect
export function trigger(target, type, key) {}
