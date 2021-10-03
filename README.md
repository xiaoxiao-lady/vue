## 项目分支
项目的master是vue的源码，没有注解版本的
study分支有大佬注解的源码

## 学习资料
vue源码的学习资料

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