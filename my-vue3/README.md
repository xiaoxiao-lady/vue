## 作用

便于理解 vue3 原理，写的简易的 demo，核心：effect 和 reactive

## 阅读的顺序

1.可以根据 index.ts 里面的案例【源码的 core 的测试】
2.reactive，get 里面收集依赖 track,set 里面触发依赖 trigger
3.track，这个里面会用到 effect，在后面的 effect 函数中
4.trigger，这个里面会用到 effect，在后面的 effect 函数中
