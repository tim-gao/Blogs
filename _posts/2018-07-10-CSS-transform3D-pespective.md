---
layout: post
title : CSS transform 3D -- pespective
description: 
categories: code
author: Tim Gao
tags: [codes]
---
<style type="text/css">
    .panel--wrapper {
        margin: 20px 0;
        width: 200px;
        height: 200px;
        border: 1px solid #aaa;
    }
    .panel--green {
        /* perspective function in transform property */
        width:100%;
        height:100%;
        background-color:green;
        transform: perspective(400px) rotateY(45deg);
    }
    .scene--blue {
        /* perspective property */
        perspective: 400px;
    }
    .panel--blue {
        width:100%;
        height:100%;
        background-color:blue;
        transform: rotateY(45deg);
    }
    .panel--seperate {
        width:55px;
        height:55px;
        background:green;
        float:left;
        margin:5px;

        transform: perspective(400px) rotateY(45deg);
    }

    .scene--together {
        perspective: 400px;
    }

    .panel--together {
        width:55px;
        height:55px;
        background:blue;
        float:left;
        margin:5px;
        transform: rotateY(45deg);
    }
    .new-origin {
        perspective-origin: 25% 75%;
    }
</style>
pespective是CSS transfrom中的一个属性，该属性指定了观察者与z=0平面的距离，使具有三维位置变换的元素产生透视效果。z>0的三维元素比正常大，而z<0时则比正常小，大小程度由该属性的值决定。

# 两种使用方式

* 作为transform属性方法

    transform: perspective(400px);

比如：

    .panel--red {
        /* perspective function in transform property */
        transform: perspective(400px) rotateY(45deg);
    }

<center>
    <div class="panel--wrapper">
        <div class="panel--green"></div>
    </div>
</center>

* 直接作为属性

    perspective: 400px;

比如：

    .scene--blue {
        /* perspective property */
        perspective: 400px;
    }

    .panel--blue {
        transform: rotateY(45deg);
    }

<center>
    <div class="panel--wrapper scene--blue">
        <div class="panel--blue"></div>
    </div>
</center>

__注意:当perspective自身作为属性时，会修饰其孩子节点使其具有3D视角。所以上面示例中scene--blue样式应该设置在panel--blue元素的父节点上__

当我们有多个元素的时候，你会发现效果并不是那么好,这是因为每一个元素都有自己的视角，所以我们需要为其父元素设置perspective属性，让所有孩子共享同一个3D空间。

    .panel--seperate {
        transform: perspective(400px) rotateY(45deg);
    }

<center>
    <div class="panel--wrapper clearfix">
        <div class="panel--seperate"></div>
        <div class="panel--seperate"></div>
        <div class="panel--seperate"></div>
        <div class="panel--seperate"></div>
        <div class="panel--seperate"></div>
        <div class="panel--seperate"></div>
        <div class="panel--seperate"></div>
        <div class="panel--seperate"></div>
        <div class="panel--seperate"></div>
    </div>
</center>

    .scene--together {
        perspective: 400px;
    }

    .panel--together {
        transform: rotateY(45deg);
    }

<center>
    <div class="panel--wrapper clearfix scene--together">
        <div class="panel--together"></div>
        <div class="panel--together"></div>
        <div class="panel--together"></div>
        <div class="panel--together"></div>
        <div class="panel--together"></div>
        <div class="panel--together"></div>
        <div class="panel--together"></div>
        <div class="panel--together"></div>
        <div class="panel--together"></div>
    </div>
</center>

pespective的值的大小决定了3D效果的强度，可以理解为观察者距离物体的距离。值越大，距离越远，值越小距离越近。`perpective:2000px`所呈现的效果就类似于观察者从很远的距离通过望远镜看到的一样；`pespective:100px`则像是在很近的距离观察一个大物体一样。

当然在3D转换中你可以不使用`pespective`，可以设置`pespective:none`或者不设置该属性。这种情况下你会看到所有的平面都是交织一起的而且没有结束点。

默认情况下，3D空间的结束点位于元素的中心，你可以通过`pespective-origin`属性进行修改。

    .new-origin {
        perspective-origin: 25% 75%;
    }


<center>
    <div class="panel--wrapper scene--blue new-origin">
        <div class="panel--blue"></div>
    </div>
</center>


参考链接：

1. [MDN pespecive](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)

2. [Intro to CSS 3D transforms](https://3dtransforms.desandro.com/perspective)

3. [好吧，CSS3 3D transform变换，不过如此！--张鑫旭](https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)