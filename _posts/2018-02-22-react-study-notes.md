---
layout: default
title : React书写中的注意事项
description: 
categories: code
author: Tim Gao
tags: [codes]
---
# React书写中的注意事项

## 1. 关于React注释

* 标签内注释需要使用花括号
* 标签外注释同JavaScript注释

示例：

    ReactDOM.render(
      /*注释1 */
      // 注释2
      <h2>标题 {/*注释*/}</h2>,
      document.getElementById('example')
    );

## 2. JSX语法中如果包含多个HTML标签，最外层需要有一个元素包裹。

    var Content = React.createClass({
      render: function () {
        return (
          <div>
            <input type="text" value={this.props.myDataProp}
            onChange={this.props.updateStateProp}/>
            <h4>{this.props.myDataProp}</h4>
          </div>
        );
      }
    });

## 3. JSX中不能使用if else语句，但可以使用三元运算表达式来替代

    ReactDOM.render(
      <div>
        <h1>{i == 1 ? 'True!' : 'False'}</h1>
      </div>
      ,
      document.getElementById('example')
  );

## 4. React推荐使用内联样式，使用驼峰(camelCase)语法来设置内联样式，React会在指定元素数字后自动添加px。

    var myStyle = {
      fontSize: 100,
      color: '#FF0000'
    };
    ReactDOM.render(
        <h1 style = {myStyle}>My Title</h1>,
        document.getElementById('example')
    );

## 5. class和for标识符使用

由于 JSX 就是 JavaScript，一些标识符像 class 和 for 不建议作为 XML 属性名。作为替代，React DOM 使用 _className_ 和 _htmlFor_ 来做对应的属性。

## 6. 关于JSX语法

React 不是一定要使用 JSX 语法，可以直接使用原生 JS。JSX语法看上去像是在Javascript代码里直接写起了XML标签，实质上这只是一个语法糖，每一个XML标签都会被JSX转换工具转换成纯Javascript代码，所以建议使用 JSX 是因为它能精确定义和反应组件及属性的树状结构，使得组件的结构和组件之间的关系看上去更加清晰。方便MXML和XAML的开发人员 – 因为他们已经使用过类似的语法；

## 7. HTML标签和React组件
React 可以渲染 HTML 标签 (strings) 或 React 组件 (classes)。
要渲染 HTML 标签，只需在 JSX 里使用小写字母的标签名。

    var myDivElement = <div className="foo" />;
    ReactDOM.render(myDivElement, document.getElementById('example'));

要渲染 React 组件，只需创建一个大写字母开头的本地变量。

    var MyComponent = React.createClass({/*...*/});
    var myElement = <MyComponent someProperty={true} />;
    ReactDOM.render(myElement, document.getElementById('example'))

React 的 JSX 里**约定分别使用首字母大、小写来区分本地模块的类和 HTML 标签**。

参考链接：

 * [http://www.runoob.com/react/react-tutorial.html](http://www.runoob.com/react/react-tutorial.html)
 * [http://www.css88.com/archives/5600](http://www.css88.com/archives/5600)
 * [http://www.css88.com/react/tutorial/tutorial.html](http://www.css88.com/react/tutorial/tutorial.html)
