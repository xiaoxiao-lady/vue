
import { def } from '../utils/index'

/*取得原生数组的原型*/
const arrayProto = Array.prototype   //结果是对象类型
/*创建一个新的数组对象，修改该对象上的数组的七个方法，防止污染原生数组方法*/
export const arrayMethods = Object.create(arrayProto)

 /*这里重写了数组的这些方法，在保证不污染原生数组原型的情况下重写数组的这些方法，截获数组的成员发生的变化，执行原生数组操作的同时dep通知关联的所有观察者进行响应式处理*/
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  /*将数组的原生方法缓存起来，后面要调用*/
  const original = arrayProto[method]
  def(arrayMethods, method, function() {
  
    let i = arguments.length
    const args = new Array(i)  //备份参数
    while (i--) {
      args[i] = arguments[i]
    }
    /*调用原生的数组方法*/
    const result = original.apply(this, args)

    /*数组新插入的元素需要重新进行observe才能响应式*/
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
        inserted = args
        break
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    /*dep通知所有注册的观察者进行响应式处理*/
    ob.dep.notify()
    console.log(result)
    debugger
    return result
  })
})
