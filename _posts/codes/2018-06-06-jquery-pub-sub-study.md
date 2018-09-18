---
layout: post
title : jquery事件订阅和发布之源码探索
description: 在一个偶然的机会，看到了一个jQuery事件发布和订阅的源码，静静的看了好久依然不明觉厉，默默的竖起来大拇指，进而引发了一连串的探索，所以有了这篇博文。
categories: code
author: Tim Gao
tags: [codes]
---
# jquery事件订阅和发布之源码探索

昨天在项目中移植一个功能，想当然的以为自己把相应的需要的类库都引入并注意不遗漏任何依赖包就可以万事大吉了。但不得不说我还是 too young too simple 啊。当在新的环境里执行的时候，居然发现$.publish和$.subscirbe都是undefined, 经过一番查找后才发现原来忽略了一段关键的代码。由于原来的定义$.subscribe的地方包含了些许本不该出现的业务逻辑，怎么看怎么别扭，毕竟有效的降低耦合才是王道。所以就顺手google了一下 jQuery publish subscribe, 于是看到了如下一段代码：

    (function($) { 
        var o = $({}); 
        $.subscribe = function() { 
            o.on.apply(o, arguments); 
        }; 
        $.unsubscribe = function() { 
            o.off.apply(o, arguments); 
        }; 
        $.publish = function() { 
            o.trigger.apply(o, arguments); 
        }; 
    }(jQuery));

说实话仔细看了几遍，着实没有看明白，不过尝试之后我还是不由得竖起了大拇指，于是开始了一连串的探索。
这里我们先看看它的效果：

    $.subscribe('test',function(){console.log('this is a test string!')});
    $.publish('test'); //输出：this is a test string！

想要真正理解透彻以上代码，以下的知识点是必须的

* 立即执行函数
* apply
* arguments对象
* jQuery的on,off和trigger方法

### 要点1. 这段代码在javaScript引擎读取到时就会被立即执行，同时传入一个全局变量jQuery,在函数内部则使用别名$引用。

函数内部定义了一个空对象{}，并且被转化为了一个jQuey对象，赋值给了变量o。 然后分别为jQuery添加了3个方法
$.subscribe, $.publish, $.trigger。这里的三个方法虽然没有传入任何参数，但是方法内部确使用了arguments

### 要点2. arguments对象是所有（非箭头）函数中都可用的局部变量，是一个对应于传递给函数的参数的类数组对象。

也就是说，虽然在声明的时候没有传参，但在函数内部我们依然可以使用它，只不过arguments.length是0。比如：
 
    function testF() {console.log(arguments.length);};
    testF();// 输出 0
    testF('1');// 输出 1
    testF('1','a',{});// 输出 3

好，然后我们再看新指定的函数内部，以$.subscribe=function(){...}为例，函数体为 `o.on.apply(o, arguments);`。o是一个jQuery对象，o.on是为该对象绑定事件

### 要点3. 我摘取了一段jQuery官网关于on的说明--Attach an event handler function for one or more events to the selected elements，语法为`.on( events [, selector ] [, data ], handler )`。相应的off是取消事件，trigger是触发某个事件。

这里就不再赘述后面的off，和trigger。我们来看下面比较关键的也是比较难理解的部分。`o.on.apply(o,arguments);`,这里其实是指定当前的jQuery对象o为当前的函数上下文（也可以理解为，这里的this就指的是$({}),代码段中最开始的那个对象），并且o调用on方法为自己绑定事件。什么事件呢？就是arguments对象中的第一个参数（arguments[0]）,所以源码中subscribe方法是为指定的对象绑定了一个自定义事件，publish方法是在指定的对象上触发自定义事件，unsubscribe方法是为指定的对象删除原来添加的自定义事件。如此以达到事件订阅与发布。

好了，我估计你可能有点蒙圈，没关系，那我们看看下一个要点

### 要点4. apply方法是javascript function对象原型链上的一个方法-Function.prototype.apply。它可以改变函数执行的上下文，并且接受一个类数组对象为参数`func.apply(thisArg, [argsArray])`,神奇的是apply方法会把该类数组参数作为单一的参数传递给func函数。

知道了apply方法的功能后，再去理解刚才的分析，我相信你会有所收获。：）这也就是这么一点代码所体现的高明之处，文末我会附上相关的知识点链接，希望多揣摩研究以便融会贯通。

**参考链接：**

* [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)

* [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

* [http://api.jquery.com/on/](http://api.jquery.com/on/)

* [https://segmentfault.com/a/1190000004581945](https://segmentfault.com/a/1190000004581945)


