---
layout: post
title : Flux架构探究
description: 
categories: code
tags: [codes]
---

Flux跟MVC是同类，是一种架构思想，用来解决软件的结构问题。在React项目中使用Flux能够更加清晰的管理组件状态。

Flux应用主要有四个部分：

* dispatcher (派发器)：接收actions,根据不同的action类型，执行回调函数

* store (数据层)：用来存放数据的状态，一旦状态发生改变，就提醒View更新页面

* action (动作)：view发出的消息

* view (视图层)

Flux的核心是**单项数据流**

> Action -> Dispatcher -> Store -> view

具体流程如下图:

![alt='flux framework']({{site.baseurl}}/assets/img/flux.png)

> 页面上的一个动作（action）被Dispatcher接收，Dispatcher会根据action的类型，调用Store的相应方法来更新数据。更新完成后，store发出一个'change'事件，触发View刷新页面。

下面开始通过一个实例来加深理解，我们需求是：
1. 页面上有3个元素，容器DIV, 显示计数器的标签span和一个按钮。
2. 默认情况下，容器背景为红色，按钮和span均居中，计数器为0。
3. 点击按钮，计数器累加同时容器背景变为绿色。
4. 再次点击，计数器累加同时容器背景变为红色。

### 步骤1. 构建一个react应用实现以上功能。

    // component/ColorSwitch.jsx
    import React, { Component } from 'react';
    import '../App.css';

    class ColorSwitch extends Component {
      constructor(props){
        super(props);
        this.state = {
          color: 'red',
          count: 0
        }
        this.addCounterClick = this.addCounterClick.bind(this);
      }
      addCounterClick (){
        this.setState((prestate) =>{
          return {
            color: prestate.color === 'red' ? 'green' : 'red',
            count: prestate.count + 1
          }
        })
      }
      render() {
        return (
          <div className="playground"
          style= {% raw %}{{'backgroundColor': this.state.color }} {% endraw %}>
            <span>{this.state.count}</span>
            <button onClick={this.addCounterClick}>Toggle background</button>
          </div>
        );
      }
    }

    export default ColorSwitch;

### 步骤2. 添加store

抽离本应用中的数据。很明显，color和count可以转移到Store层，从Flux架构图中我们了解到，store层可以通过相应的方法更新数据，并能够发出一个‘change’事件。

    //  store/ColorStore.js
    import events from 'events';
    const EventEmitter = events.EventEmitter;

    const ColorStore = Object.assign({},EventEmitter.prototype,{
      // count，color变量存储原react组件中的state数据
      count: 0,
      color: 'red',
      // 添加getAll方法提供输出接口
      getAll: function(){
        return {
          color: this.color,
          count: this.count
        }
      },
      // 添加更改数据的方法，用于更新数据
      addCounterHanlder : function(){
        this.count ++;
        this.color = this.color ==='red' ? 'green' : 'red'
      },
      //为store绑定事件
      attachAddCountEvent: function(callback,context) {
        this.on('add',()=>{
          callback.call(context);
        })
      },
      removeAddCountEvent: function(callback,context){
        this.removeListener('add',()=>{
          callback.call(context);
        });
      },
      //触发事件
      trigger: function() {
        this.emit('add');
      }
    })

    export default ColorStore;

> 以上代码中我们将EventEmitter的原型与store合并，为store添加了相应的on,emit,removeListener方法，所以我们可以直接调用 this.on/this.emit

### 步骤3 添加action

action是一个对象，应该包含一个actionType属性（说明action的类型）和一些其他属性。

    // action/ButtonAction.js
    import Dispatcher from '../dispatcher/Dispatcher';

    const ButtonAction = {
      addCounter: ()=> {
        Dispatcher.dispatch({
          actionType: 'ADD_COUNTER'
        })
      }
    }
    export default ButtonAction;

### 步骤4 添加Dispatcher

Dispatcher主要是用来派发store。Dispatcher只能有一个而且是全局的。这里我们直接使用Flux模块中的Dispatcher创建我们的Dispatcher实例。然后在实例上注册各种action的回调函数。

    // dispatcher/Dispatcher.js
    import Flux from 'flux';
    import ColorStore from '../store/ColorStore';

    const Dispatcher = new Flux.Dispatcher();

    Dispatcher.register(function(action){
      switch(action.actionType){
        case 'ADD_COUNTER':
          ColorStore.addCounterHanlder();
          ColorStore.trigger();
          break;
        default:
      }
    });

    export default Dispatcher;

> 通过以上代码我们再次回顾一下理论知识，Dispatcher根据不同的action类型，触发回调以便更新数据，所以在相应的Case中我们需要调用Store的方法(addCounterHandler)，之后调用trigger，触发view更新。

### 步骤5，重构react组件(view部分)

state改为从store中获取，删除原本具体的更新state的部分，并为store添加监听。

    // component/ColorSwitch.jsx
    import React, { Component } from 'react';
    import ButtonAction from '../action/ButtonAction';
    import ColorStore from '../store/ColorStore';
    import '../App.css';

    class ColorSwitch extends Component {
      constructor(props){
        super(props);
        this.state = ColorStore.getAll()
      }
      //点击触发action
      addCounterClick (){
        ButtonAction.addCounter();
      }
      onClick () {
        this.setState(function(){
          return ColorStore.getAll();
        })
      }
      componentDidMount(){
        ColorStore.attachAddCountEvent(this.onClick,this);
      }
      componentWillUnmount(){
        ColorStore.removeAddCountEvent(this.onClick,this);
      }
      render() {
        return (
          <div className="playground" style=
          {% raw %}
          {{'backgroundColor':this.state.color}} {% endraw %}>
            <span>{this.state.count}</span>
            <button onClick={this.addCounterClick}>Toggle background</button>
          </div>
        );
      }
    }
    export default ColorSwitch;

完整代码猛戳 [https://github.com/tim-gao/flux-demo](https://github.com/tim-gao/flux-demo)