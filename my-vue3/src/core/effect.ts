// effect相当于vue2的Watcher,组件渲染、计算属性computed、watch函数、watchEffect函数实现都是依赖于effect函数

let activeEffect; //正在执行的effect
let targetMap = new WeakMap(); //临时存储target数据的，便于判断

let uid = 0; //用于给每个副作用钩子增加标记，标记唯一
// 定义effectStack栈结构，用于解决effect嵌套的执行逻辑
// 执行逻辑：遇到effect入栈，设置activeEffect为当前正在执行的effect，执行完成后出栈，设置activeEffect栈顶元素
// effect(()=>{
//   state.a;
//   effect(()=>{
//     state.b
//   })
//   state.c
// })
let effectStack = [];
export class ReactiveEffect {
  public active = true; //表示这个effect是否激活
  public deps = [];
  constructor(public fn, public scheduler) {}
  run() {
    if (!this.active) {
      // 如果是非激活的情况，不需要执行依赖收集
      return this.fn();
    }
    try {
      activeEffect = this;
      effectStack.push(activeEffect);
      this.fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  }
}
// 副作用函数，相当于vue2的Watcher,属性更新，页面跟着渲染的核心
export function effect(fn, options = {}) {
  // debugger;
  // 执行副作用钩子的时候，我们需要将当前执行的副作用钩子储存，后期修改值的时候触发，
  // 有的时候我们需要给副作用钩子增加一些属性，所以用高阶函数createReactiveEffect创建effect
  let effect = new ReactiveEffect(fn, options);
  // if (!effect.options.lazy) {
  // 如果不是懒函数（computed）用于第一次收集依赖
  effect.run();
  // }
  return effect;
}

// 收集依赖函数，收集属性的所有的effect到deps中  结构  {对象:属性：[effect,effect]}
export function track(target, type, key) {
  let depsMap = targetMap.get(target); //检查target是否收集过
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map())); //targetMap
  }
  let dep = depsMap.get(key); //检查key是否收集过
  if (!dep) {
    depsMap.set(key, (dep = new Set())); //使用set是为了后面收集的effect数组去重
  }
  trackEffects(dep);
}
// 建立双向数据存储，在后面的计算属性、watch、ref中都会用到
export function trackEffects(dep) {
  if (!dep.has(activeEffect)) {
    // 建立双向的数据存储，在对象的属性中添加effect副作用函数，用于下次的数据变更触发执行
    // 在effect中存储他的dep，供后期取消effect
    dep.add(activeEffect); //收集当前正在执行的effect，
    activeEffect.deps.push(dep); //暂时还没有activeEffect
  }
}
// 通知更新依赖函数，找到并通知执行这个属性依赖的所有的effect
export function trigger(target, type, key) {
  const depsMap = targetMap.get(target); //查找target对应的依赖
  if (!depsMap) return; //说明没有收集当前对象的依赖，不需要调用effect
  const effects = [];
  if (key != undefined) {
    const dep = depsMap.get(key);
    effects.push(...dep); //depc是的[Set,Set]结构的数组
  }
  triggerEffects(new Set(effects));
}
// 更新依赖，
export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect == activeEffect) return; //如果执行的是重复的effect的时候，返回
    if (effect.scheduler) {
      effect.scheduler(); //依赖更新的时候存在延迟函数延迟执行
    } else {
      effect.run();
    }
  }
}
