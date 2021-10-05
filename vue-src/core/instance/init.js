/* @flow */

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'
/*Github:https://github.com/answershuto*/
let uid = 0

/*initMixin就做了一件事情，在Vue的原型上增加_init方法，构造Vue实例的时候会调用这个_init方法来初始化Vue实例*/
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
 
    /*一个防止vm实例自身被观察的标志位*/
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
     /**
       * 每个子组件初始化时走这里，这里只做了一些性能优化
       * 将组件配置对象上的一些深层次属性放到 vm.$options 选项中，以提高代码的执行效率
       */
      initInternalComponent(vm, options)
    } else {
        /**
       * 初始化根组件时走这里，合并 Vue 的全局配置到根组件的局部配置，比如 Vue.component 注册的全局组件会合并到 根实例的 components 选项中
       * 至于每个子组件的选项合并则发生在两个地方：
       *   1、Vue.component 方法注册的全局组件在注册时做了选项合并
       *   2、{ components: { xx } } 方式注册的局部组件在执行编译器生成的 render 函数时做了选项合并，包括根组件中的 components 配置
       */
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    // expose real self
    vm._self = vm
    /*初始化生命周期*/
    initLifecycle(vm)
    /*初始化事件*/
    initEvents(vm)
    /*初始化render*/
    initRender(vm)
    /*调用beforeCreate钩子函数并且触发beforeCreate钩子事件*/
    callHook(vm, 'beforeCreate') //从源码的角度也解决了为什么在beforeCreate阶段拿不到data属性，initState在后面
     // 初始化组件的 inject 配置项，得到 result[key] = val 形式的配置对象，然后对结果数据进行响应式处理（），并代理每个 key 到 vm 实例
    initInjections(vm) 
    /* 数据响应式的重点，初始化props、methods、data、computed与watch*/
    initState(vm)
    // 解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上
    initProvide(vm)
    /*调用created钩子函数并且触发created钩子事件*/
    callHook(vm, 'created')
    // 如果发现配置项上有 el 选项，则自动调用 $mount 方法，也就是说有了 el 选项，就不需要再手动调用 $mount，反之，没有 el 则必须手动调用 $mount
    if (vm.$options.el) {
      /*调用$mount方法挂载组件*/
      // 如果是有el的话，new Vue({
      //   el: "#app",
      //   router,
      //   store,
      //   render: h => h(App)
      // });直接代码中会调用$mount,如果没有el的话需要
      // new Vue({
       
      //   router,
      //   store,
      //   render: h => h(App)
      // }).$mount()
      vm.$mount(vm.$options.el)
    }
  }
}

function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent
  opts.propsData = options.propsData
  opts._parentVnode = options._parentVnode
  opts._parentListeners = options._parentListeners
  opts._renderChildren = options._renderChildren
  opts._componentTag = options._componentTag
  opts._parentElm = options._parentElm
  opts._refElm = options._refElm
  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}

export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options
  /*如果存在父类的时候*/
  if (Ctor.super) {
    /*对其父类进行resolveConstructorOptions，获取父类的options*/
    const superOptions = resolveConstructorOptions(Ctor.super)
    /*之前已经缓存起来的父类的options，用以检测是否更新*/
    const cachedSuperOptions = Ctor.superOptions
    /*对比当前父类的option以及缓存中的option，两个不一样则代表已经被更新*/
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      /*父类的opiton已经被改变，需要去处理新的option*/

      /*把新的option缓存起来*/
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  let modified
  const latest = Ctor.options
  const extended = Ctor.extendOptions
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = dedupe(latest[key], extended[key], sealed[key])
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    const res = []
    sealed = Array.isArray(sealed) ? sealed : [sealed]
    extended = Array.isArray(extended) ? extended : [extended]
    for (let i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i])
      }
    }
    return res
  } else {
    return latest
  }
}
