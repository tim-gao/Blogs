---
layout: post
title : 深入理解JavaScript学习笔记
description: 
categories: code
author: Tim Gao
tags: [codes]
---

# 变量对象(variable object)

如果变量与执行上下文相关，那变量自己应该知道它的数据存储在哪里，并且知道如何访问。这种机制称为变量对象(variable object)。
变量对象(缩写为VO)是一个与执行上下文相关的特殊对象，它存储着在上下文中声明的以下内容：
* 变量 (var, 变量声明);
* 函数声明 (FunctionDeclaration, 缩写为FD);
* 函数的形参

# 全局对象

全局对象(Global object) 是在进入任何执行上下文之前就已经创建了的对象；这个对象只存在一份，它的属性在程序中任何地方都可以访问，全局对象的生命周期终止于程序退出那一刻。

# 关于上下文

JavaScript处理上下文代码的2个阶段
1. 进入执行上下文
2. 执行代码

当进入执行上下文(代码执行之前)时，VO(变量对象)已经包含了下列属性：
+ 函数的所有形参(如果我们是在函数执行上下文中)
  — 由名称和对应值组成的一个变量对象的属性被创建；没有传递对应参数的话，那么由名称和undefined值组成的一种变量对象的属性也将被创建。
+ 所有函数声明(FunctionDeclaration, FD)
  —由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建；如果变量对象已经存在相同名称的属性，则完全替换这个属性。
+ 所有变量声明(var, VariableDeclaration)
  — 由名称和对应值（undefined）组成一个变量对象的属性被创建；如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

一个经典示例：

    alert(x); 
    /* function , 这里首先没有报错（因为JavaScript变量提升机制），输出不是10，也不是20，
    而是function,是因为在进入上下文时，变量声明跟在函数声明和形式参数声明之后，而且在这个阶段，
    变量声明不会干扰VO中已经存在的同名函数声明或形式参数声明*/

    var x = 10;
    alert(x); // 10

    x = 20;

    function x() {};

    alert(x); // 20

# 关于变量

任何时候，变量只能通过使用var关键字才能声明

    a = 10;

这仅仅是给全局对象创建了一个新属性而不是变量(它之所以能成为全局对象的属性，完全是因为VO(globalContext) === global)。

# 关于This

__This 是执行上下文的一个属性, this值在进入上下文时确定，并且在上下文运行期间永久不变__。

在全局代码中，this始终是全局对象本身,在通常的函数调用中，this是由激活上下文代码的调用者来提供的，即调用函数的父上下文(parent context )。this取决于调用函数的方式。参考以下代码加深理解：

    var foo = {x: 10};
    var bar = {
        x: 20,
        test: function () {
            alert(this === bar); // true
            alert(this.x); // 20
            this = foo; // 错误，任何时候不能改变this的值
            alert(this.x); // 如果不出错的话，应该是10，而不是20
        }
    };
    // 在进入上下文的时候
    // this被当成bar对象
    bar.test(); // true, 20
    foo.test = bar.test;
    // 不过，这里this依然不会是foo
    // 尽管调用的是相同的function
    foo.test(); // false, 10


参考链接：

[深入理解JavaScript系列(9) - (13)](http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html)

