---
layout: default
title : React 组件生命周期学习总结
description: 
categories: code
author: Tim Gao
tags: [codes]
---
# React 组件生命周期学习总结

React的组件提供了几个生命周期的方法来允许我们通过重写来添加需要的逻辑。 其中方法名包含**Will**关键字的表示该方法会在某件事情发生**之前**被调用；方法名包含**did**关键字的表示该方法会在某件事情发生**之后**被调用。

下面是三个不同阶段的各个生命周期方法

## 组件挂载(Mounting)

> React.js将组件渲染，并且构造DOM元素然后添加进页面DOM树的过程称为组件的挂载。

在一个组件实例被创建并插入DOM的过程中以下方法会依次被调用：

* **constructor()**

> React组建的构造方法会在挂载前被调用。当我们构建React组件的子类的构造器的时候， 应该在最开始调用`super(props)`,否则`this.props`在构造器中会是undefined。通常有关组件的初始化代码都会写在这里。

* **componentWillMount()**

>该方法在组件挂载之前，也就是调用render方法之前被调用，所以在这里调用`setState()`不会触发组件的render()方法。

* **render()**

> 组件渲染方法

* **componentDidMount()**

> 组件挂载之后会立即调用该方法，所以应该在该方法中初始化相应的的DOM节点。如果你想加载远程数据，也可以在这里调用相应的Request。
> 在该方法里调用`setState()`会触发组件的render()方法。

## 组件更新(updating)

> 调用setState()方法导致React重新渲染组件并把组件变化应用到DOM元素上的过程成为更新阶段。

在更新阶段，以下方法会被依次调用：

* **componentWillReceiveProps(nextProps)**

> 组件从父组件接收到新的 props 之前调用。注意：在挂载阶段，当初始化props的时候React并不会调用`componentWillReceiveProps()`，只有在组建的某个属性发生改变时才会调用该方法。调用`this.setState()`通常也不会触发`componentWillReceiveProps`。

* **shouldComponentUpdate(nextProps, nextState)**

> 当有新的props或者state接收到时会调用`shouldComponentUpdate()`。默认返回**true**。如果返回**false**组件就不会渲染，但不会阻止子组件的重新渲染当子组件中的state发生改变时。
> 目前，如果`shouldComponentUpdate()`返回**false**, 该组件的`componentWillUpdate()`, `render()`, 和 `componentDidUpdate()`将不再被调用。

* **componentWillUpdate()**

* **render()**

* **componentDidUpdate()**

## 组件卸载(Unmounting)

* **componentWillUnmount()**

> 一旦一个组件被从DOM树移除并销毁后该方法立即就会被调用。在该方法中你可以执行任何必要的清理工作，比如取消无效的timer，取消某些request，或者清除那些在`componentDidMount`创建的各种订阅事件。

[完结]

参考链接：

* [https://reactjs.org/docs/react-component.html](https://reactjs.org/docs/react-component.html)
* [http://huziketang.com/books/react/lesson18](http://huziketang.com/books/react/lesson18)