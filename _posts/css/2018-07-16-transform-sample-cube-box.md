---
layout: post
title : CSS transform 3D -- 4.构建正方体和长方体
description: 
categories: code
author: Tim Gao
tags: [CSS]
---

通过上一节，我们已经可以构建出3D的过渡效果了，本节我们来实现一个真正的3D对象--正方体和长方体。

# 正方体

<style>
    .wrapper {
        width: 100px;
        height: 100px;
        perspective: 300px;
        margin: 40px 0;
    }
    .card {
        width: 100%;
        height: 100%;
        transform-style: preserve-3D;
        position: relative;
        transition: transform 1s;
    }
    .card.show-front  { transform: translateZ(-50px) rotateY(   0deg); }
    .card.show-right  { transform: translateZ(-50px) rotateY( -90deg); }
    .card.show-back   { transform: translateZ(-50px) rotateY(-180deg); }
    .card.show-left   { transform: translateZ(-50px) rotateY(  90deg); }
    .card.show-top    { transform: translateZ(-50px) rotateX( -90deg); }
    .card.show-bottom { transform: translateZ(-50px) rotateX(  90deg); }
    .push--back {
        transform: translateZ(-50px);
    }
    .card__face {
        position: absolute;
        width: 100px;
        height:100px;
        border: 2px solid black;
        line-height: 100px;
        font-size: 22px;
        font-weight: bold;
        color: white;
        text-align: center;
    }
    .card__face--front {
        background-color: rgba(255, 0, 0,.7);
        transform: rotateY(  0deg);
    }
    .card__face--back {
        background-color: rgba(0, 128, 0,.7);
        transform: rotateY(180deg);
    }
    .card__face--left {
        background-color: rgba(0, 0, 255, .7);
        transform: rotateY(-90deg);
    }
    .card__face--right {
        background-color: rgba(255, 255, 0,.7);
        transform: rotateY( 90deg);
    }
    .card__face--top {
        background-color: rgba(255, 165, 0, .7);
        transform: rotateX( 90deg);
    }
    .card__face--bottom {
        background-color: rgba(165, 42, 42, .7);
        transform: rotateX(-90deg);
    }

    .cube__face--front {
        background-color: rgba(255, 0, 0,.7);
        transform: rotateY(  0deg) translateZ(50px);
    }
    .cube__face--back {
        background-color: rgba(0, 128, 0,.7);
        transform: rotateY(180deg) translateZ(50px);
    }
    .cube__face--left {
        background-color: rgba(0, 0, 255, .7);
        transform: rotateY(-90deg) translateZ(50px);
    }
    .cube__face--right {
        background-color: rgba(255, 255, 0,.7);
        transform: rotateY( 90deg) translateZ(50px);
    }
    .cube__face--top {
        background-color: rgba(255, 165, 0, .7);
        transform: rotateX( 90deg) translateZ(50px);
    }
    .cube__face--bottom {
        background-color: rgba(165, 42, 42, .7);
        transform: rotateX(-90deg) translateZ(50px);
    }

    .box {
        width: 160px;
        height: 100px;
        position: relative;
        transform-style: preserve-3d;
        transform: translateZ(-50px);
        transition: transform 1s;
    }
    .box__face {
        position: absolute;
        border: 2px solid black;
        font-size: 22px;
        font-weight: bold;
        color: white;
        text-align: center;
    }
    .box__face--front,
    .box__face--back {
        width: 160px;
        height: 100px;
        background-color: rgba(255, 0, 0,.7);
        line-height: 100px;
    }

    .box__face--right,
    .box__face--left {
        width: 80px;
        height: 100px;
        background-color: rgba(0, 0, 255, .7);
        line-height: 100px;
        left: 40px;
    }

    .box__face--top,
    .box__face--bottom {
        width: 160px;
        height: 80px;
        background-color: rgba(165, 42, 42, .7);
        line-height: 80px;
        top: 10px;
    }

    .box__face--front  { transform: rotateY(  0deg) translateZ( 40px); }
    .box__face--back   { transform: rotateY(180deg) translateZ( 40px); }

    .box__face--right  { transform: rotateY( 90deg) translateZ(80px); }
    .box__face--left   { transform: rotateY(-90deg) translateZ(80px); }

    .box__face--top    { transform: rotateX( 90deg) translateZ(50px); }
    .box__face--bottom { transform: rotateX(-90deg) translateZ(50px); }
    .box.show-front  { transform: translateZ( -50px) rotateY(   0deg); }

    .box.show-back   { transform: translateZ( -40px) rotateY(-180deg); }
    .box.show-right  { transform: translateZ(-80px) rotateY( -90deg); }
    .box.show-left   { transform: translateZ(-80px) rotateY(  90deg); }
    .box.show-top    { transform: translateZ(-50px) rotateX( -90deg); }
    .box.show-bottom { transform: translateZ(-50px) rotateX(  90deg); }

    .container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .container .tool {
        width: 100%;
        text-align: center;
    }
</style>

html标签如下：

    <div class="wrapper">
        <div class="card">
            <div class="card__face card__face--front">front</div>
            <div class="card__face card__face--back">back</div>
            <div class="card__face card__face--left">left</div>
            <div class="card__face card__face--right">right</div>
            <div class="card__face card__face--top">top</div>
            <div class="card__face card__face--bottom">bottom</div>
        </div>
    </div>

同样和上一节一样，我们添加以下样式来实现3D效果，同时为不同的表面设置不同的颜色。

    .wrapper {
        width: 100px;
        height: 100px;
        perspective: 300px;
    }
    .card {
        width: 100%;
        height: 100%;
        transform-style: preserve-3D;
        position: relative;
    }
    .card__face {
        position: absolute;
        width: 100px;
        height:100px;
        border: 2px solid black;
        line-height: 100px;
        font-size: 22px;
        font-weight: bold;
        color: white;
        text-align: center;
    }

<div class="wrapper">
    <div class="card">
        <div class="card__face card__face--front">front</div>
        <div class="card__face card__face--back push-400">back</div>
        <div class="card__face card__face--left">left</div>
        <div class="card__face card__face--right">right</div>
        <div class="card__face card__face--top">top</div>
        <div class="card__face card__face--bottom">bottom</div>
    </div>
</div>

现在看到的所有表面重叠到了一起，为每一个面添加相应的旋转：

    .card__face--front {
        ...
        transform: rotateY(  0deg);
    }
    .card__face--back {
        ...
        transform: rotateY(180deg);
    }
    .card__face--left {
        ...
        transform: rotateY(-90deg);
    }
    .card__face--right {
        ...
        transform: rotateY( 90deg);
    }
    .card__face--top {
        ...
        transform: rotateX( 90deg);
    }
    .card__face--bottom {
        ...
        transform: rotateX(-90deg);
    }

其中，`rotateY(  0deg);`是没有任何效果的，这里为了保持代码的一致性我们先保留。这一步中，只有前面和后面两个表面可以看的见，其他四个面均垂直于读者，我们几乎是看不见的（只能看到一个边缘）。为了更明显的观察，我们需要移动每个表面，由于每个面的宽高都是100像素，那么距离正方体中心也就是50个像素，所以我们将其相对于中心点拉远50个像素，也就是`translateZ(50px)`。

<div class="wrapper">
    <div class="card">
        <div class="card__face cube__face--front">front</div>
        <div class="card__face cube__face--back push-400">back</div>
        <div class="card__face cube__face--left">left</div>
        <div class="card__face cube__face--right">right</div>
        <div class="card__face cube__face--top">top</div>
        <div class="card__face cube__face--bottom">bottom</div>
    </div>
</div>

__注意：添加了`translateZ(50px)`之后，元素变大了，字体也看起来比较模糊，这是因为当应用3D transform时候，浏览器会用新的transform属性重新绘制之前的图像。__ 此时元素更靠近读者，因此为了不出现这种模糊，我们添加以下样式到.card元素：

    .push--back { transform: translateZ(-50px); }

<div class="wrapper">
    <div class="card push--back">
        <div class="card__face cube__face--front">front</div>
        <div class="card__face cube__face--back push-400">back</div>
        <div class="card__face cube__face--left">left</div>
        <div class="card__face cube__face--right">right</div>
        <div class="card__face cube__face--top">top</div>
        <div class="card__face cube__face--bottom">bottom</div>
    </div>
</div>

添加正方体的旋转样式以保证每一个面都能呈现给读者：

    .card.show-front  { transform: translateZ(-50px) rotateY(   0deg); }
    .card.show-right  { transform: translateZ(-50px) rotateY( -90deg); }
    .card.show-back   { transform: translateZ(-50px) rotateY(-180deg); }
    .card.show-left   { transform: translateZ(-50px) rotateY(  90deg); }
    .card.show-top    { transform: translateZ(-50px) rotateX( -90deg); }
    .card.show-bottom { transform: translateZ(-50px) rotateX(  90deg); }

最后添加转换延时：

    .card { 
        ...
        transition: transform 1s; 
    }
<div class="container"> 


<div class="wrapper">
    <div class="card show-front">
        <div class="card__face cube__face--front">front</div>
        <div class="card__face cube__face--back push-400">back</div>
        <div class="card__face cube__face--left">left</div>
        <div class="card__face cube__face--right">right</div>
        <div class="card__face cube__face--top">top</div>
        <div class="card__face cube__face--bottom">bottom</div>
    </div>
</div>
<div class="wrapper">
    <div class="box">
        <div class="box__face box__face--front">front</div>
        <div class="box__face box__face--back">back</div>
        <div class="box__face box__face--right">right</div>
        <div class="box__face box__face--left">left</div>
        <div class="box__face box__face--top">top</div>
        <div class="box__face box__face--bottom">bottom</div>
    </div>
</div>
<div class="tool">
    <select id="faceChange">
        <option data-style="show-front" value="font">font</option>
        <option data-style="show-back" value="back">back</option>
        <option data-style="show-left" value="left">left</option>
        <option data-style="show-right" value="right">right</option>
        <option data-style="show-top" value="top">top</option>
        <option data-style="show-bottom" value="bottom">bottom</option>
    </select>
</div>
</div>


参考链接：

1. [Intro to CSS 3D transforms](https://3dtransforms.desandro.com/perspective)
2. [MDN transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
3. [css-tricks transform](https://css-tricks.com/almanac/properties/t/transform/)
4. [CSS参考手册](http://css.doyoe.com/)