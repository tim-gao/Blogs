---
layout: default
title : 项目构建--Grunt
description: 
categories: code
author: Tim Gao
tags: [codes]
---
# 前端项目构建--Grunt

说起前端的构建工具，我们可能会想到诸如Grunt, Gulp, Webpack, browserify,Rollup等等，除了这些我相信可能还会有更多更加强大的新星诞生。我们一个一个的学习总不见得是一件好事，因为这永远也学不完。所谓万变不离其宗，所有的工具所遵循的原理应该都是大同小异的，我们知道了某一个如何去配置使用，其他的当然也就迎刃而解。

好了，让我们开始总结如何利用grunt在构建前端项目。

## 安装

    npm install grunt
    //or
    npm install grunt --save-dev

以一个新的项目为例，首先我们需要添加两个文件package.json和gruntfile.js（gruntfile.coffee）。这两个文件应该放置于根目录中。
> package.json 此文件被npm用来存储元数据，一边将此项目发布为npm模块。 在你项目的根目录了可以使用命令_npm init_根据提示创建该文件

> gruntfile.js 用来配置Grunt任务。应该包含以下内容：

> -> wrapper函数

> -> 项目与任务配置

> -> 加载grunt插件和任务

> -> 自定义任务

我的package.json文件如：

    {
      "name": "practice",
      "version": "1.0.0",
      "description": "this is a demo project to start grunt practice",
      "main": "index.js",
      "scripts": {
        "test": "grunt test"
      },
      "keywords": [
        "grunt"
      ],
      "author": "timgao",
      "license": "ISC",
      "devDependencies": {
        "grunt": "^1.0.1"
      }
    }

我的gruntfile.js内容如下：

    module.exports = function (grunt) {

      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

      });

      // 加载包含的插件。
      //grunt.loadNpmTasks('grunt-contrib-**');

      // 默认被执行的任务列表。
      grunt.registerTask('default',[]);

    };

## 任务1， 压缩文件(uglify)

通常在项目部署的时候，我们的JS,CSS等代码都需要压缩以减少浏览器访问加载负荷来提高网站速度。

**安装插件**

    npm install grunt-contrib-uglify --save-dev

**配置任务**

    ...
      uglify: {
      options: {
        //用于在文件顶部生成一个注释
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        //生成sourcemap文件，方便调试使用
        sourceMap: true,
        //指定生成sourcemap文件的路径，不指定则生成到源文件的同级目录下
        sourceMapName: 'build/src/sourcemap.map'
      },
      build: {
        //压缩所有src目录下的js文件
        src: 'src/*.js',
        //指定压缩任务后目标文件
        dest: 'build/src/<%= pkg.name %>.min.js'
      },
    }
    ...

**加载插件**

    grunt.loadNpmTasks('grunt-contrib-uglify');

**添加默认任务**

    grunt.registerTask('default',['uglify']);

## 任务2，合并文件(concat)

此任务中我们利用插件将多个文件进行整和，然后再调用uglify进行压缩

**安装插件**

    npm install grunt-contrib-concat --save-dev

**配置任务**

    ...
    concat: {
      options: {
        //不同文件之间用分好隔开
        separator: ';'
      },
      dist: {
        //整合源文件路径
        src: ['src/**/*.js'],
        //整合后的目标文件
        dest: 'dist/<%= pkg.name %>.js'
      }
    }
    ...
    //修改配置，让uglify任务使用concat任务后的结果文件
    ...
    //要压缩的源文件
    //src: 'src/*.js',
    src: ['<%= concat.dist.dest %>'],
    ...

**加载插件**

    grunt.loadNpmTasks('grunt-contrib-concat');

**添加默认任务**

    grunt.registerTask('default',['concat','uglify']);

## 任务3，代码检查(jshint)

利用jshint检查JS中是否有语法错误或者不符合规范的写法,以至于我们不会将错误代码发布出去。如果这一步异常，我们可以直观的从控制台看到错误信息。
比如：
    
    $ grunt default

    Running "jshint:files" (jshint) task

    src/mytime.js
     35 |    }
              ^ Missing semicolon.

    >> 1 error in 3 files
    Warning: Task "jshint:files" failed. Use --force to continue.

    Aborted due to warnings.

**安装插件**

    npm install grunt-contrib-jshint --save-dev

**配置任务**

    ...
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      files: {
        //定义要检查的文件
        src: ['gruntfile.js', 'src/**/*.js']
      },
    }
    ...


**加载插件**

    grunt.loadNpmTasks('grunt-contrib-jshint');

**添加默认任务**

    grunt.registerTask('default',['jshint','concat','uglify']);

## 任务4，编译sass文件

为了让css更加容易维护，我们可以用less 或者 sass两种语言，来编写一些更加生动，简洁，可维护性高的"css"(应该说类css)代码。我们可以定义变量，方法等等使得我们的样式文件得以模块化，最后再把相关的文件编译成一个单独的css文件发布到生产环境中。这里我们借助grunt来编译，整合，压缩sass文件。

**安装插件**

    npm install grunt-contrib-sass --save-dev

**配置任务**

    ...
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'build/css/clock.css':'sass/clock.scss'
        }
      }
    },
    ...


**加载插件**

    grunt.loadNpmTasks('grunt-contrib-sass');

**添加默认任务**

    grunt.registerTask('default',['jshint','sass','concat','uglify']);

## 任务5，配置监听(watch)

## 任务6，添加单元测试(Jtest)

## 任务7，清除多余文件(clean)

...未完待续...