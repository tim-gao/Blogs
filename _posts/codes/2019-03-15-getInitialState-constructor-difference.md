---
layout: post
title : React中通过getInitialState和constructor初始化state有区别吗
description: 
categories: code
tags: [codes]
---

# 语法上的不同

初学React时，我们了解到通过getInitialState方法和在constructor方法中指定this.state都可以初始化组件的状态。但可能你会疑惑，他们两个是不能互相替换。答案是*否定*的。**实际上他们只是相同功能的两种写法而已**。

__1. 当使用ES5的语法创建React类时，应该用getInitialState__

    var MyComponent = React.createClass({
      getInitialState() {
        return { /* initial state */ };
      },
    });

__2. 当使用ES6的class语法创建React类时，应该用constructor__

    class MyComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = { /* initial state */ };
      }
    }

稍微引申一下，同样的现象也会出现在定义propTypes和defaultProps上

__ES5写法__

    import React from 'react';

    const Contacts = React.createClass({
      propTypes: {

      },
      getDefaultProps() {
        return {

        };
      },
      render() {
        return (
          <div></div>
        );
      }
    });

__ES6写法__

    export default Contacts;

    import React from 'react';

    class Contacts extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        return (
          <div></div>
        );
      }
    }
    Contacts.propTypes = {

    };
    Contacts.defaultProps = {

    };

    export default Contacts;

也就是说使用ES6的写法，我们摆脱了React样板代码的束缚，代码更JavaScript化（much more JavaScript-like and less “API” driven）

# this的不同

使用React.createClass会自动为我们绑定正确的this

    import React from 'react';

    const Contacts = React.createClass({
      handleClick() {
        console.log(this); // React Component instance
      },
      render() {
        return (
          <div onClick={this.handleClick}></div>
        );
      }
    });

    export default Contacts;

上面代码中当调用this.handleClick的时候，React会执行正确的上下文。但如果是ES6 class的情况就不一样了，类的属性并不会自定绑定到类的实例上去。

    import React from 'react';

    class Contacts extends React.Component {
      constructor(props) {
        super(props);
      }
      handleClick() {
        console.log(this); // null
      }
      render() {
        return (
          <div onClick={this.handleClick}></div>
        );
      }
    }

    export default Contacts;

所以我们需要通过以下方式改变回调函数的上下文

    ...
    render() {
        return (
          <div onClick={this.handleClick.bind(this)}></div>
        );
      }
    ...

或者

    ...
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    ...

