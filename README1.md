## 项目分支
项目的master是vue的源码，没有注解版本的
study分支有大佬注解的源码

## 学习资料
vue源码的学习资料
李永宁掘金：https://juejin.cn/post/6950084496515399717
李永宁源码视频分析：https://www.bilibili.com/video/BV17i4y1A7cn

## 项目结构
  |--benchmarks                         //性能，基准测试
  |--dist                               //构建打包的输出目录
  |--examples                           //实例目录
  |--flow                               //flow语法的类型声明
  |--package                            //一些额外的包，负责服务端渲染的包
  |--scripts                            //所有的配置文件存放的位置
  |--src                                //vue源码目录  
     |--compiler                        //编译器
     |--core                            //运行时的核心代码
       |--components                    //全局的组件，比如keep-alive
       |--global-api                    //全部的api。比如熟悉的Vue.use(),Vue.component()等
       |--instance                      //Vue实例相关的，比如vue的构建函数就在这个，目录下面
       |--observer                      //响应式的原理
       |--util                          //工具方法
       |--vdom                          //虚拟dom相关的，比如熟悉的patch算法就在这里
     |--platforms                       //平台相关的编译器代码
       |--web                          
       |--weex
     |--serve                           //服务端渲染相关
  |--test                               //测试目录
  |--types                              //TS类型声明
  
## 项目





 1.Vue初始化过程
 2.Vue响应式原理是这么实现的
 3.


data、computed、watch、methods
1.为什么data是一个函数
2. computed和watch区别和使用场景
3.watch的实现原理
4.computed的实现原理





1.vue组价的通信方式（7种）
 
 


1.vue的生命周期有哪几个，一般在哪个阶段发请求
2.v-if和v-show的区别，（三个css隐藏属性的区别）
3.vue的内置指令
4.v-if 与 v-for 为什么不建议一起使用
 


