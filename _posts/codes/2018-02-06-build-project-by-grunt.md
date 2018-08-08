---
layout: post
title : 项目构建--Grunt
description: 
categories: code
author: Tim Gao
tags: [codes]
---
# 前端项目构建--Grunt

说起前端的构建工具，我们可能会想到诸如Grunt, Gulp, Webpack, browserify, Rollup等等，除了这些我相信可能还会有更多更加强大的新星诞生。但万变不离其宗，所有的工具所遵循的原理应该都是大同小异的，我们知道了某一个如何去配置，其他的当然也就迎刃而解。

好了，让我们开始总结如何使用grunt。

## 安装
打开命令行或者终端，切换至项目根目录，执行

    npm install grunt
    //or
    npm install grunt --save-dev

以一个新的项目为例，首先我们需要添加两个文件package.json和gruntfile.js（gruntfile.coffee）。这两个文件应该放置于根目录中。
> package.json 此文件被npm用来存储元数据，以便将此项目发布为npm模块。 在你项目的根目录下可以使用命令_npm init_创建package.json。

> gruntfile.js 用来配置Grunt任务。应该包含以下内容：

> -> wrapper函数

> -> 项目与任务配置

> -> 加载grunt插件和任务

> -> 自定义任务

我的package.json文件如下：

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

通常在项目部署的时候，我们的JS,CSS等代码都需要压缩以减少浏览器加载负荷。

**安装插件**
打开命令行或者终端，切换至项目根目录，执行

    npm install grunt-contrib-uglify --save-dev

**配置任务**
添加如下配置到gruntfile.js,同pkg同级即可。

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
添加如下配置到gruntfile.js

    grunt.loadNpmTasks('grunt-contrib-uglify');

**添加默认任务**
添加如下配置到gruntfile.js

    grunt.registerTask('default',['uglify']);

## 任务2，合并文件(concat)

此任务中我们利用插件将多个文件进行合并，方便进行压缩部署。

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
    //修改配置，让uglify任务(任务一)使用concat任务后的结果文件
    uglify: {
    ...
    //要压缩的源文件
    //src: 'src/*.js',
    src: ['<%= concat.dist.dest %>'],
    ...

**加载插件**

    grunt.loadNpmTasks('grunt-contrib-concat');

**添加默认任务**

    grunt.registerTask('default',['concat'/*添加concat任务*/,'uglify']);

## 任务3，代码检查(jshint)

这一步我们利用jshint插件检查JS中是否有语法错误或者不符合规范的写法,以至于我们不会将错误代码发布出去。如果这一步异常，我们可以直观的从控制台看到错误信息。
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

    grunt.registerTask('default',['jshint'/*添加jshint任务*/,'concat','uglify']);

## 任务4，编译sass文件

开发中为了让css更加容易维护，我们可以用less 或者 sass两种语言，来编写一些更加生动，简洁，可维护性高的"css"(应该说类css)代码。我们可以定义变量，方法等等使得我们的样式文件得以模块化，最后再把相关的文件编译成一个单独的css文件发布到生产环境中。这里我们借助grunt来编译，整合，压缩sass文件。

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
          'build/css/clock.css'/*输出结果*/:'sass/clock.scss'/*源sass文件*/
        }
      }
    },
    ...


**加载插件**

    grunt.loadNpmTasks('grunt-contrib-sass');

**添加默认任务**

    grunt.registerTask('default',['jshint','sass'/*添加sass任务*/,'concat','uglify']);

## 任务5，配置监听(watch)

Watch任务可以帮助我们监听指定的文件是否发生修改，进而执行相关task。比如：当我们修改了js源码后，指定Grunt自动去执行jshint操作;当修改了任何sass文件，指定Grunt自动执行sass编译任务。

**安装插件**

    npm install grunt-contrib-watch --save-dev

**配置任务**

    ...
    watch: {
      sass: {
        // 监听sass文件
        files: ['sass/**.scss'],
        tasks: ['sass'],
      },
      js ： {
        //监听javascript文件
        files: ['src/**/*.js'],
        tasks: ['jshint'],
      },
    }
    ...


**加载插件**

    grunt.loadNpmTasks('grunt-contrib-watch');

配置完成我们做一个测试,开始监听：

    $ grunt watch
    Running "watch" task
    Waiting...

在js中任意修改，然后观察终端：

    $ grunt watch
    Running "watch" task
    Waiting...
    >> File "src\test.js" changed.
    Running "jshint:files" (jshint) task

      src/test.js
          2 |  console.log('test')
                                  ^ Missing semicolon.

    >> 1 error in 3 files
    Warning: Task "jshint:files" failed. Use --force to continue.

    Aborted due to warnings.
    Completed in 1.276s at Wed Feb 07 2018 13:45:32 GMT+0800 (China Standard Time) - Waiting...

哈哈，搞定了，妈妈再也不用担心我写错代码了。

## 任务6，清除多余文件(clean)

这一项任务应该很好理解，如果我们并不是每次用新的目标文件替换源文件，运行grunt之后都会生成新文件，那么你本地的文件就会越来越多。这时我们就可以借助clean任务清除上一次的文件。

**安装插件**

    npm install grunt-contrib-clean --save-dev

**配置任务**

    ...
    clean: {
      js: ['build/src/*.js', '!build/src/*.vendor.js'],
      css: ['build/src/*.css']
    }
    ...


**加载插件**

    grunt.loadNpmTasks('grunt-contrib-clean');

**添加默认任务**

    grunt.registerTask('default',['clean','jshint','sass','concat','uglify']);

到此我们基本需要的任务都已经配置完毕，也恭喜你已经完整搭建了一个前端项目。
详细示例代码和配置请参阅[github](https://github.com/tim-gao/grunt-setup-project)。

[完结]
---
参考链接：
[http://www.gruntjs.net/sample-gruntfile](http://www.gruntjs.net/sample-gruntfile)
