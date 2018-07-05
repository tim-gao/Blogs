---
layout: post
title : 译：小窍门--JavaScript 中如何对对象数组进行排序
description: 
categories: code
author: Tim Gao
tags: [codes]
---

如果你需要对一个对象数组进行指定的排序，可能最吸引你的方式是通过指定的JavaScript
类库。但是在你开始之前，你是否还记得其实可以利用原生的`Array.sort`函数实现非常简洁的排序。本文将会介绍如何利用简单的方式对一个对象数组进行排序。

> 阅读本篇文章之前，你需要了解基本的JavaScript概念，比如声明变量，定义函数和条件语句。文章中也会用到ES6的语法，你可以参考[https://www.sitepoint.com/tag/es6/](https://www.sitepoint.com/tag/es6/) 或者[ECMAScript 6 入门](http://es6.ruanyifeng.com/)。

# 基本的数组排序

默认情况下，`Array.sort`方法可以把将要排序的数组中的每一个元素转换成String，然后比较他们对应的Unicode码点的大小。

    const foo = [9, 2, 3, 'random', 'panda'];
    foo.sort(); // returns [ 2, 3, 9, 'panda', 'random' ]

    const bar = [4, 19, 30, function(){}, {key: 'value'}];
    bar.sort(); // returns [ 19, 30, 4, { key: 'value' }, [Function] ]

你可能会很疑惑为什么30在4的前面......不合逻辑对不对？但事实就是如此。这是因为数组中的每一个元素会首先被转换成字符串String, 而在Unicode对应的码点中30确实是在4之前的。上面这种方式似乎没有什么卵用，因为`Array.sort`改变了或者说转变了数组本身:

    const baz = ['hello world', 31, 5, 9, 12];
    baz.sort(); // baz array is modified
    console.log(baz); // shows [12, 31, 5, 9, "hello world"]

为了避免这个，你可以创建一个新的实例然后排序修改新的数组。

    const baz = ['hello world', 31, 5, 9, 12];
    const newBaz = baz.slice().sort(); // new instance of baz array is created and sorted
    console.log(baz); // "hello world", 31, 5, 9, 12]
    console.log(newBaz); // [12, 31, 5, 9, "hello world"]

仅仅使用`Array.sort`是无法实现对对象数组排序的，庆幸的是该方法可以接受一个（可选的）*比较函数*为参数，然后通过该*比较函数*返回的值对数组元素就行排序。

# 利用比较函数进行排序

我们假设a和b是需要比较的两个元素，如果比较函数的返回值为：

* 小于0 --- a在b前
* 大于0 --- b在a前
* 等于0 --- a,b顺序保持不变

让我们看一个数组元素为数字的简单示例：

    const arr = [1,2,30,4];

    function compare(a, b){
        let comparison = 0;

        if (a > b) {
            comparison = 1;
        } else if (b > a) {
            comparison = -1;
        }

        return comparison;
    }

    arr.sort(compare);
    // => 1, 2, 4, 30


上面方法可以重构一下通过a减b来获取返回值

    function compare(a, b){
        return a - b;
    }

当然，现在我们又有了一个新的备选方法--箭头函数

    arr.sort((a, b) => a - b));


# 对一个对象数组进行排序

我们有一个品牌对象数组

    const bands = [ 
        { genre: 'Rap', band: 'Migos', albums: 2},
        { genre: 'Pop', band: 'Coldplay', albums: 4},
        { genre: 'Rock', band: 'Breaking Benjamins', albums: 1}
    ];

我们可以根据*genre*属性通过以下的比较函数来进行排序

    function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const genreA = a.genre.toUpperCase();
        const genreB = b.genre.toUpperCase();

        let comparison = 0;
        if (genreA > genreB) {
            comparison = 1;
        } else if (genreA < genreB) {
            comparison = -1;
        }
        return comparison;
    }

    bands.sort(compare);

    /* returns [ 
    { genre: 'Pop', band: 'Coldplay', albums: 4 }, 
    { genre: 'Rap', band: 'Migos', albums: 2 }, 
    { genre: 'Rock', band: 'Breaking Benjamins', albums: 1 } 
    ] */

通过对返回值简单的反转就可以实现以上排序的颠倒

    function compare(a, b) {
        ...

        //invert return value by multiplying by -1
        return comparison * -1; 
    }

# 构建一个动态的排序函数

下面我们修改排序函数使之更加的灵活和通用，我们创建一个可以用来排序对象数组的排序函数，它可以接受String或者Number作为排序关键字。该函数有两个参数，排序关键字和排列顺序（升序asc或者降序desc）。

    const bands = [ 
        { genre: 'Rap', band: 'Migos', albums: 2},
        { genre: 'Pop', band: 'Coldplay', albums: 4, awards: 13},
        { genre: 'Rock', band: 'Breaking Benjamins', albums: 1}
    ];

    // function for dynamic sorting
    function compareValues(key, order='asc') {
        return function(a, b) {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
                return 0; 
            }

            const varA = (typeof a[key] === 'string') ? 
            a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ? 
            b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
            comparison = 1;
            } else if (varA < varB) {
            comparison = -1;
            }
            return (
            (order == 'desc') ? (comparison * -1) : comparison
            );
        };
    }

你可以这样使用：

    // array is sorted by band, in ascending order by default
    bands.sort(compareValues('band')); 

    // array is sorted by band in descending order
    bands.sort(compareValues('band', 'desc')); 

    // array is sorted by albums in ascending order
    bands.sort(compareValues('albums')); 

以上代码中，`hasOwnProperty 方法`用来检查在每个对象中是否定义了指定的属性而不是继承自原型链。如果没有定义，方法返回0则维持原来的顺序不变。

Typeof操纵符用来检查属性值的数据类型，这样能够决定用合适的方式进行排序。比如，如果属性值是String，则会通过toUpperCase方法将所有字符转化为小写，如此一来在排序的时候就能够忽略大小写带来的差异。

你可以调整以上的方法来适应其他类型的数据和你的脚本所需要的特征。

# 总结

现在你有了一个方法--对数组对象进行排序。虽然有许多的JavaScript类库提供了诸多的动态排序的方法（比如：_underscore.js_,_lodash_ 和 _Sugar_）,但是正如本文所证明的我们自己动手去实现也不是那么的困难。

参考链接：

* [How To Sort An Array Of Objects In JavaScript](https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/)