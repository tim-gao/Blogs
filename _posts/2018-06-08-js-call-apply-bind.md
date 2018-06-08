---
layout: post
title : JavaScript之call，apply，bind学习笔记
description: 
categories: code
author: Tim Gao
tags: [codes]
---

# JavaScript之call，apply，bind学习笔记

一直以来，遇到类似于XXX.call，XXX.apply，XXX.bind的代码，总有一种摸不着头脑的感觉。别人说得对呀，还是基础不够扎实，所以这次好好的深入研究了一下这几个家伙，本片博文就是此次学习的一个记录也作为一次总结。

## apply，call，bind的概念

apply，call，bind即Function.prototype.apply()，Function.prototype.apply()和Function.prototype.apply()。可以看出这三个方法都是Function对象prototype上的方法，所以javascript中所有的function都可以直接调用者三个方法。下面看看MDN官方的解释：

* call() 方法调用一个函数, 其具有一个指定的this值和分别地提供的参数(参数的列表)。
* apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个数组（或类似数组的对象）提供的参数。
> 
    注意：call()方法的作用和 apply() 方法类似，只有一个区别，就是 call()方法接受的是若干个参数的列表，而apply()方法接受的是一个包含多个参数的数组。
* bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

## call，apply能干什么？

JavaScript中call和apply都可以 **改变某个函数的运行上下文，也就是说可以改变函数内部的this指向**。我们通过一个示例来看

    function foo (name) {
        this.name = name;
        this.sayHi = function () {
            console.log('Hi everyone, my name is ' + this.name);
        }
    }
    var person1 = new foo('jack');
    person1.sayHi(); //Hi everyone, my name is jack

    var bar = {
        name: 'bar'
    }
    person1.sayHi.apply(bar);//Hi everyone, my name is bar
    person1.sayHi.call(bar);//Hi everyone, my name is bar

`persion1.sayHi()`可以打印出`Hi everyone, my name is jack`是毋庸置疑的，但我们新定义的对象bar在通过apply和call方法后也可以执行sayHi方法了，这就是call和applyl方法的作用。他可以使得一个对象在不具有某个方法的前提下去使用别的对象的方法，同时将方法中的this指向apply和call中传入的第一个参数所引用的对象。

## apply和call有什么不同

其实在概念中已经提到了: call和apply达到的结果是一样的，但call()方法接受的是 **若干个参数的列表**，而apply()方法接受的是 **一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func(对应示例中的person1) 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数** 。

    XXX.call(this, arg1, arg2);
    XXX.apply(this, [arg1, arg2])

下面列举些个常用的例子：

**求数组中的最大值和最小值**

    /* min/max number in an array */
    var numbers = [5, 6, 2, 3, 7];

    /* using Math.min/Math.max apply */
    var max = Math.max.apply(null, numbers);
    var min = Math.min.apply(null, numbers);

**验证是否是一个数组对象**

    isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]' ;
    }

**数组之间追加**

    var arr1= [1 , 2 , 3];
    var arr2 = ["a" , 'b' , 'c'];
    Array.prototype.push.apply(arr1, arr2);
    /* arr1 值为  [1, 2, 3, "a", "b", "c"] */

最开始我在想，为什么不用数组的concat方法呢？其实最终得到的结果都是`[1, 2, 3, "a", "b", "c"]`,但完全不是一个东西，上面这种实现改变了arr1的原始值，但通过concat后，arr1,arr2并没有发生改变，而是重新生成了一个新的数组。

    arr1.concat(arr2);
    // =>[1, 2, 3, "a", "b", "c"]
    arr1
    // => [1, 2, 3]
    arr2
    // => ["a", "b", "c"]

# bind 使用详解

bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind()方法的第一个参数作为 this，传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。看一个官方的例子:

    this.x = 9; 
    var module = {
    x: 81,
        getX: function() { return this.x; }
    };

    module.getX(); // 返回 81

    var retrieveX = module.getX;
    retrieveX(); // 返回 9, 在这种情况下，"this"指向全局作用域

    // 创建一个新函数，将"this"绑定到module对象
    // 新手可能会被全局的x变量和module里的属性x所迷惑
    var boundGetX = retrieveX.bind(module);
    boundGetX(); // 返回 81

同样我们一般在jquery的事件方法里通常会用到_self, that来保存原来的上下文：

    var temp = {
        flag: true,
        bindEvent: function () {
            var _self = this;
            $('#target').on('click',function(e){
                if (_self.flag) {
                    $(e.target).addClass('red');
                }
            });
        }
    }

有了bind方法，我们就可以不用_self变量了，直接改写成：

        ...
        bindEvent: function () {
            $('#target').on('click',function(e){
                if (this.flag) {
                    $(e.target).addClass('red');
                }
            }).bind(this);
        }
        ...

值得注意的是bind方法，无妨绑定多次。即从第二次开始bind是无效的，比如下面示例

    var bar = function(){
        console.log(this.x);
    }
    var foo = {
        x:1
    }
    var sed = {
        x:2
    }
    var func = bar.bind(foo).bind(sed);
    func(); //1
    var fiv = {
        x:5
    }
    var func = bar.bind(foo).bind(sed).bind(fiv);
    func(); //1

参考链接：

* [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
* [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
* [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* [https://www.cnblogs.com/coco1s/p/4833199.html](https://www.cnblogs.com/coco1s/p/4833199.html)