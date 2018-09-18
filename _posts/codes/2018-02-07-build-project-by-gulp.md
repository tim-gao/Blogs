---
layout: post
title : 项目构建--Gulp
description: 
categories: code
author: Tim Gao
tags: [codes]
---

# 项目构建--Gulp

上一篇文章中我们学习了如何使用grunt构建项目，这次就来看看gulp究竟是又是何许人也。首先呢，我得说说我的感受，我觉得就两个字“简单”。因为gulp采用了一种管道流的概念，也就说在gulp的眼里你的应用程序就是好多错综复杂的管子，所有的事情看起来都是在处理管子里的流体。每个管道处理的任务很单一，并且具有很高的并发性。所以我觉得gulp对于事情的处理思维更加简单，粒度也更细一些。是不是又点晕？ 好吧，你只需要理解gulp每个管道（pipe）里只处理一件事情就够了，我们来看一个配置示例：

    // 引入 gulp
    var gulp = require('gulp');

    // 引入组件
    var jshint = require('gulp-jshint');
    var sass = require('gulp-sass');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var del = require('del');

    //清空上一次的文件
    gulp.task('clean', function (cb) {
      del([
        'dist/**/*',
        'buid/**/*',
      ], cb);
    });
    // 检查脚本
    gulp.task('lint', function () {
      gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    });

    // 编译Sass
    gulp.task('sass', function () {
      gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css/clock.css'));
    });

    // 合并，压缩文件
    gulp.task('scripts', function () {
      gulp.src('src/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/src/'));
    });

    gulp.task('watch',function(){
      gulp.watch('src/*.js',['lint','scripts']);
      gulp.watch('sass/*.scss', ['sass']);
    });

    gulp.task('default',['clean','lint','sass','scripts','watch']);

我们来分块剖析

## 引入需要的组件

    var gulp = require('gulp');
    var jshint = require('gulp-jshint');
    var sass = require('gulp-sass');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var del = require('del');
  

## 清空上一次生成的文件（clean）

使用一个原生的 node 模块(del)进行文件删除

    gulp.task('clean', function (cb) {
      del([
        'dist/**/*',//删除dist下所有文件
        'buid/**/*',//删除build下所以文件
      ], cb);
    });

## 配置代码检查任务（lint）

    gulp.task('lint', function () {
      gulp.src('src/*.js') //源文件路径
        .pipe(jshint())    //执行jshint任务
        .pipe(jshint.reporter('default'));
    });

## 配置sass编译任务（sass）

    gulp.task('sass', function () {
      gulp.src('sass/*.scss') //源文件路径
        .pipe(sass())
        .pipe(gulp.dest('build/css/clock.css')); //目标文件路径
    });

## 配置整合压缩文件任务(scripts)

    gulp.task('scripts', function () {
      gulp.src('src/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/src/'));
    });

## 配置监听任务(watch)

    gulp.task('watch',function(){
      //一旦src下js文件发生更改，立即执行lint和scripts两个任务
      gulp.watch('src/*.js',['lint','scripts']);
      //一旦sass文件夹下sass文件发生更改，立即执行sass编译
      gulp.watch('sass/*.scss', ['sass']);
    });

## 配置默认任务

    gulp.task('default',['clean','lint','sass','scripts','watch']);

对，就是这么简单。其实说白了，我们只需要理解gulp的这5个方法就足够了

+ gulp.task(name, fn) //注册gulp任务，可以指定依赖任务。如：
gulp.watch('sass/*.scss', ['sass']);

+ gulp.run(tasks...) //执行任务

+ gulp.watch(glob, fn) //执行一个方法，当指定的文件发生改变

+ gulp.src(glob) // 返回一个可读的流。即获取到操作系统文件系统开始传送匹配到的文件

+ gulp.dest(folder) //返回一个可写的流

## 可能碰到的问题

**问题1**

    $ gulp default
    module.js:529
        throw err;
        ^

    Error: Cannot find module 'jshint/src/cli'
        at Function.Module._resolveFilename (module.js:527:15)
        at Function.Module._load (module.js:476:23)
        at Module.require (module.js:568:17)
        at require (internal/module.js:11:18)
        at Object.<anonymous> (e:\Tim\practice_gulp\node_modules\gulp-jshint\src\extract.js:1:79)
        at Module._compile (module.js:624:30)
        at Object.Module._extensions..js (module.js:635:10)
        at Module.load (module.js:545:32)
        at tryModuleLoad (module.js:508:12)
        at Function.Module._load (module.js:500:3)

*解决方案*

    npm install --save-dev jshint gulp-jshint


**问题2**

如果你不是强迫症的话，请略过。 这里要说的是这个警告 

"gulp.run() has been deprecated. Use task dependencies or gulp.watch task "

    $ gulp
    [16:56:31] Using gulpfile e:\Tim\practice_gulp\gulpfile.js
    [16:56:31] Starting 'default'...
    gulp.run() has been deprecated. Use task dependencies or gulp.watch task triggering instead.
    [16:56:31] Starting 'lint'...

*解决方案1*

更改gulp.run() 为gulp.start()，比如：

之前：

    gulp.task('default', function(){
        gulp.run('lint', 'sass', 'scripts');
        gulp.watch('./js/*.js', function(){
            gulp.run('lint', 'sass', 'scripts');
        });
    });

之后：

    gulp.task('default', function(){
        gulp.start('lint', 'sass', 'scripts');
        gulp.watch('./js/*.js', function(){
            gulp.start('lint', 'sass', 'scripts');
        });
    });
  
  *解决方案2*

  改成以下依赖方式书写

    gulp.watch('./js/*.js',['lint', 'sass', 'scripts']);


最后附上[gulp PPT](http://slides.com/contra/gulp)和[gulp 插件地址](https://gulpjs.com/plugins/)。 

详细项目代码请查阅[githup](https://github.com/tim-gao/gulp-setup-project)

[完结]

参考链接：

* [http://slides.com/contra/gulp](http://slides.com/contra/gulp)
* [https://segmentfault.com/a/1190000000372547#articleHeader12](https://segmentfault.com/a/1190000000372547#articleHeader12)
* [https://www.gulpjs.com.cn/docs/recipes/](https://www.gulpjs.com.cn/docs/recipes/)