---
layout: post
title : ES6-async函数学习笔记
description: 
categories: code
tags: [codes]
---

# async函数是什么

async函数是在ES2017标准引入的，使得异步操作变动更加方便，实际上它是Generator函数的语法糖。下面是一个Generator函数

    const fs = require('fs');

    const readFile = function(fileName){
      return new Promise(function(resolve, reject){
        fs.readFile(fileName, function(error, data){
          if(error) reject(error);
          resolve(data);
        });
      });
    }

    const gen = funtion* () {
      const f1 = yield readFile('./etc/file1');
      const f2 = yield readFile('./etc/file2');
      console.log(f1.toString());
      console.log(f2.toString());
    }

用async函数改写后

    const asyncReadFile = async function(){
      const f1 = await readFile('./etc/file1');
      const f2 = await readFile('./etc/file2');
      console.log(f1.toString());
      console.log(f2.toString());
    }

async函数就是将Generator函数的星号替换成async，将yield替换成await.
async函数对Generator函数的改进，体现在以下4个方面。

## （1）内置执行器

Generator函数的执行必须依靠执行器，而async函数自带执行器。async函数的执行与普通函数一模一样。

## （2）更好的语义

async和await语义更清楚，async表示函数有异步操作，await表示紧跟在后面的表达式需要等待结果。

## （3）更广的适用性。

Co模块约定，yield命令后面只能是Thunk函数或者Promise对象，而async函数的await后面，可以是Promise对象和原始类型的值。

## （4）返回值是Promise

async函数返回的是Promise对象，而Generator函数返回的是Iterator对象。你可以用then方法指定下一步的操作。

# 基本用法

async函数返回一个Promise对象，可以使用then方法添加回调函数。当函数执行时一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

    async function getStockPriceByName(name){
      const symbol = await getStockSymbol(name);
      const stockPrice = await getStockPrice(symbol);
      return stockPrice;
    }

    getStockPriceByName('goog').then(function(result){
      console.log(result);
    });

async函数有多重使用形式

    //函数声明
    async function foo() {}
    //函数表达式
    const foo = async function() {}
    //对象的方法
    let obj = {async foo(){}}
    obj.foo().then(...)
    //class的方法
    class Storage {
      constructor(){
        this.cachePromise = caches.open('avatars');
      }
      async getAvatars(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
      }
    }
    const storage = new Storage();
    storage.getAvatar('jake').then(...);
    //箭头函数
    const foo = async() => {}

# 使用注意点

 (1) await命令后面的Promise对象运行结果可能是rejected，最好把await命令放在try...catch代码块中。

请看以下代码

    async function myFunction(){
      try{
        await somethingThatReturnsAPromise();
      }catche(err){
        console.log(err);
      }
    }
    //另一种写法
    async function myFunction(){
      await somethingThatReturnsAPromise().catch(function(err){
        console.log(err);
      });
    }


 (2) 多个await后面的异步操作，如果不存在继发关系，最好让它们同时触发。

    let foo = await getFoo();
    let bar = await getBar();

以上两个操作，互不依赖，将顺序执行。这样比较耗时，因为getFoo完了才执行getBar。

    //改写方式1
    let [foo, bar] = await Promise.all([getFoo(),getBar()]);
    //改写方式2
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;

经过以上改写，getFoo和getBar都同时触发。

 (3) await命令只能用在async函数中，如果用在普通函数中，就会报错。

 (4) async 函数可以保留运行堆栈

    const a = async () => {
      await b();
      c();
    }

上面代码中，b()运行的时候，a()暂停执行，上下文环境保存着。一旦b()或者c()报错，错误堆栈将包含a();