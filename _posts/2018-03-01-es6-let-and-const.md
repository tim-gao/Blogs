---
layout: default
title : ES6--let 和 const
description: 
categories: code
author: Tim Gao
tags: [codes]
---
# ES6--let 和 const

## let命令

let是ES6新增的命令，用来声明变量。用法：

    let a = 10;
    let b = 20;
    let c;
    let d = null;
    let e,f,g;

### 特点1 不同于var命令的是let所声明的变量只在let命令所在的代码块内有效

    {
      let a = 1;
      var b = 2;
    }
    a //Uncaught ReferenceError: a is not defined
    b // 2;

for循环中，最好使用let命令。如下面示例，i只在循环块内有效，不会造成全局变量的污染，同时也更加的清晰。

    for(let i =0; i< 5; i++) {}
    i //Uncaught ReferenceError: i is not defined
    for(var j =0; j< 5; j++) {}
    j // 5

### 特点2 不同于var命令的是let所声明的变量不存在变量提升

    // var 的情况
    console.log(foo); // 输出undefined
    var foo = 2;

    // let 的情况
    console.log(bar); // 报错ReferenceError
    let bar = 2;

### 特点3 在代码块内，使用let命令声明变量之前，该变量不可用。语法上称为“暂时性死区”

    var temp = 1; // 全局变量
    if (true) {
      temp = 'a'; // ReferenceError, temp处于暂时性死区
      let temp;
    }

  以上例子中，如果在let命令前使用typeof语法，同样会报错。

    var temp = 1; // 全局变量
    if (true) {
      typeof temp; // ReferenceError, temp处于暂时性死区
      let temp;
    }

但值得注意的是，如果直接typeof一个不存在的变量，是不会报错的，只会提示该变量是undefined.

    var temp = 1;
    if (true) {
      typeof unknownV; //  undefined
      let temp;
    }

### 特点4 let不允许在相同作用域内，重复声明同一个变量。

注意该句子中的几个关键词，**let不允许**,**相同作用域**，**同一个变量**，也就是说前提条件是相同的作用域下声明同一个变量是不允许的。不同作用域，不同变量的声明不受影响。

    {
      let a;
      let a; //Uncaught SyntaxError: Identifier 'a' has already been declared
    }
    function func(arg) {
      let arg; // 报错
    }
    function func (arg) {
      {let arg} //不报错
    }

## const命令

const是ES6新增的命令，用于声明一个只读的常量。

### 特点1 常量不可更改，而且声明常量时必须赋值。

    const MIN = 1;
    MIN = 2; //Uncaught TypeError: Assignment to constant variable.
    const Max; //Uncaught SyntaxError: Missing initializer in const declaration

### const命令类似于let命令，也具有let的特点1（只在代码块内有效）,2（不存在变量提升）,3（暂时性死区）,4（同一区块，不允许重复声明）。

### const声明的变量，本质上是指该变量指向的内存地址不得改动。

---  需要注意的是，对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个地址。

---  对于复合类型的数据(对象和数组)，变量指向的内存地址只是一个指针，该指针是固定的，但无法保证指针指向的数据结构不可变。

    const foo = {};

    // 为 foo 添加一个属性，可以成功
    foo.prop = 123;
    foo.prop // 123
    // 将 foo 指向另一个对象，就会报错
    foo = {}; // Uncaught TypeError: Assignment to constant variable.

    const arr = [];
    arr.push('hello'); // 正常执行
    arr.push('es6')  // 正常执行

    arr = null;// Uncaught TypeError: Assignment to constant variable.

[完结] 

参考链接：

* [http://es6.ruanyifeng.com/#docs/let](http://es6.ruanyifeng.com/#docs/let)