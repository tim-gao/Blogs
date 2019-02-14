---
layout: post
title : JavaScript脚本加载
description: 
categories: code
tags: [codes]
---

# 传统加载方式

通常页面加载脚本，都是通过script标签完成

    <!-- 页面内嵌的脚本 -->
    <script type="application/javascript">
      // module code
    </script>

    <!-- 外部脚本 -->
    <script type="application/javascript" src="path/to/myModule.js">
    </script>

上面代码中，由于浏览器脚本的默认语言是javascript，因此type="application/javascript" 可以省略。（type="text/javascript"已废除,可参考[RFC4329](https://tools.ietf.org/html/rfc4329#section-7.1)）
默认情况下，浏览器同步加载Javascript脚本，遇到script标签就停止渲染，等到执行完脚本，再继续。如果是外部脚本，还必须等待脚本下载完成。

因此会阻塞浏览器，严重影响用户体验，所以浏览器允许脚本异步加载。

# asyn属性(HTML5)

该布尔属性指示浏览器是否在允许的情况下异步执行该脚本。该属性对于内联脚本无作用 (即没有src属性的脚本）

    <script src="path/to/myModule.js" async></script>

# defer属性

这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，触发 DOMContentLoaded 事件前执行。如果缺少 src 属性（即内嵌脚本），该属性不应被使用，因为这种情况下它不起作用。对动态嵌入的脚本使用 `async=false` 来达到类似的效果。

    <script src="path/to/myModule.js" defer></script>

使用了以上两个属性，脚本就会异步加载。渲染引擎遇到这种脚本，就开始下载脚本，但不会等待它的下载和执行，而是直接执行后面的命令。

defer与async的区别是： defer要等到整个页面在内存中正常渲染结束（DOM结构完全生成，以及其他脚本执行完成），才会执行；async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后继续渲染。
如果有多个defer脚本，会按照他们在页面出现的顺序加载，而多个async脚本不能保证加载顺序。

# 动态脚本

    <script type='text/javascript'>
        var script = document.createElement('script');
        script.type = 'text/javaScript';
        script.src = 'file1.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    </script>

通过文档对象模型，我们动态创建了script脚本并且加入页面的head中，这也是执行脚本的一种方式。该方式不会阻塞页面其他进程。缺陷是这种方法加载的脚本会在下载完成后立即执行，那么多个脚本之间的顺序无法保证同时如何脚本没有下载完成，后续的相关操作也是无效的。有如下改进：

    <script type='text/javascript'>
        function loadScript(url, callback) {
            var script = document.createElement('script');
            script.type = "text/javaScript";
            // IE和opera支持onreadystatechange
            // safari、chrome、opera支持onload
            if (script.readyState) {//IE
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded"
                            || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {//其他浏览器
                script.onload = function() {
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        //严格确保A->B->C，依次下载脚本文件
        loadScript("A-delay.js", function(){
            loadScript("B-delay.js", function(){
                loadScript("C-delay.js", function(){
                    console.log("All files are loaded!");
                });
            });
        });
    </script>

> readyState，它包括以下值：                                           
 0: “uninitialized” – 原始状态                                        
 1: “loading” – 正在加载                                              
 2: “loaded” – 加载完成                                               
 3: “interactive” – 还未执行完毕                                       
 4: “complete” – 脚本执行完毕                                          
