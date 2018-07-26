---
layout: post
title : CSS transform 3D -- 5.构建carousel
description: 
categories: code
author: Tim Gao
tags: [codes]
---

作为前端工程师，一定接触过carousel。目前也有很多的相关插件可供我们使用（[Slick](http://kenwheeler.github.io/slick/)），那么既然我们已经熟悉了transform 3D，那为何不通过css的方式实现一个carousel呢？

和之前构建正方体和长方体类似，我们添加以下标签：

    <div class="scene">
        <div class="carousel">
            <div class="carousel__cell">a</div>
            <div class="carousel__cell">b</div>
            <div class="carousel__cell">c</div>
            <div class="carousel__cell">d</div>
            <div class="carousel__cell">e</div>
            <div class="carousel__cell">f</div>
            <div class="carousel__cell">g</div>
            <div class="carousel__cell">h</div>
            <div class="carousel__cell">i</div>
        </div>
    </div>
<style type="text/css">
    .scene {
        border: 1px solid #CCC;
        margin: 40px 0;
    }
    .scene--real {
        width: 210px;
        height: 140px;
        perspective: 1000px;
        position: relative;
    }
    .carousel {
        width: 100%;
        height: 100%;
        position: absolute;
        transform-style: preserve-3d;
    }
    .carousel__cell {
        position: absolute;
        width: 190px;
        height: 120px;
        left: 10px;
        top: 10px;
        border: 2px solid black;
        line-height: 116px;
        font-size: 80px;
        font-weight: bold;
        color: white;
        text-align: center;
    }
    .carousel--step0 {
        width: auto;
        height: auto;
        transform: none;
        position: relative;
    }
    .sence--step1 {
        width: 210px;
        height: 140px;
        position: relative;
        perspective: 1000px;
        margin: 40px auto;
    }
    .sence--step1 .carousel{
        transform: translateZ(-288px);
    }
    .carousel--step0 .carousel__cell {
        position: static;
        display: inline-block;
        margin: 0 10px 10px 0;
    }
    .carousel--step0 .carousel__cell:nth-child(1) { background: hsla( 0, 100%, 50%, 0.8);}
    .carousel--step0 .carousel__cell:nth-child(2) { background: hsla( 40, 100%, 50%, 0.8);}
    .carousel--step0 .carousel__cell:nth-child(3) { background: hsla( 80, 100%, 50%, 0.8);}
    .carousel--step0 .carousel__cell:nth-child(4) { background: hsla(120, 100%, 50%, 0.8);}
    .carousel--step0 .carousel__cell:nth-child(5) { background: hsla(160, 100%, 50%, 0.8);}
    .carousel--step0 .carousel__cell:nth-child(6) { background: hsla(200, 100%, 50%, 0.8);}
    .carousel--step0 .carousel__cell:nth-child(7) { background: hsla(240, 100%, 50%, 0.8);}
    .carousel--step0 .carousel__cell:nth-child(8) { background: hsla(280, 100%, 50%, 0.8);}
    .carousel--step0 .carousel__cell:nth-child(9) { background: hsla(320, 100%, 50%, 0.8);}

    .sence--step1 .carousel__cell:nth-child(1) { background: hsla( 0, 100%, 50%, 0.8); transform: rotateY(  0deg) translateZ(288px); }
    .sence--step1 .carousel__cell:nth-child(2) { background: hsla( 40, 100%, 50%, 0.8); transform: rotateY( 40deg) translateZ(288px);}
    .sence--step1 .carousel__cell:nth-child(3) { background: hsla( 80, 100%, 50%, 0.8);transform: rotateY( 80deg) translateZ(288px);}
    .sence--step1 .carousel__cell:nth-child(4) { background: hsla(120, 100%, 50%, 0.8); transform: rotateY( 120deg) translateZ(288px);}
    .sence--step1 .carousel__cell:nth-child(5) { background: hsla(160, 100%, 50%, 0.8); transform: rotateY( 160deg) translateZ(288px);}
    .sence--step1 .carousel__cell:nth-child(6) { background: hsla(200, 100%, 50%, 0.8); transform: rotateY( 200deg) translateZ(288px);}
    .sence--step1 .carousel__cell:nth-child(7) { background: hsla(240, 100%, 50%, 0.8);transform: rotateY( 240deg) translateZ(288px);}
    .sence--step1 .carousel__cell:nth-child(8) { background: hsla(280, 100%, 50%, 0.8); transform: rotateY( 280deg) translateZ(288px);}
    .sence--step1 .carousel__cell:nth-child(9) { background: hsla(320, 100%, 50%, 0.8); transform: rotateY( 320deg) translateZ(288px);}

    .alwaysRotate {
        animation: infiniteRotate 8s infinite ease-in-out;
    }

    @keyframes infiniteRotate {
        0% {
            transform: translateZ(-288px) rotateY(0)
        }
        20% {
            transform: translateZ(-288px) rotateY(-72deg)
        }
        40% {
            transform: translateZ(-288px) rotateY(-144deg)
        }
        60% {
            transform: translateZ(-288px) rotateY(-216deg)
        }
        80% {
            transform: translateZ(-288px) rotateY(-288deg)
        }
        100% {
            transform: translateZ(-288px) rotateY(-360deg)
        }
    }
</style>
<div class="scene">
  <div class="carousel carousel--step0">
    <div class="carousel__cell">a</div>
    <div class="carousel__cell">b</div>
    <div class="carousel__cell">c</div>
    <div class="carousel__cell">d</div>
    <div class="carousel__cell">e</div>
    <div class="carousel__cell">f</div>
    <div class="carousel__cell">g</div>
    <div class="carousel__cell">h</div>
    <div class="carousel__cell">i</div>
  </div>
</div>

然后添加一些基本的样式，我们是每个元素坐标和上边都流出10个项目的间距：
    
    .scene {
        width: 210px;
        height: 140px;
        position: relative;
        perspective: 1000px;
    }
    .carousel {
        width: 100%;
        height: 100%;
        position: absolute;
        transform-style: preserve-3d;
    }
    .carousel__cell {
        position: absolute;
        width: 190px;
        height: 120px;
        left: 10px;
        top: 10px;
    }

然后我们将每一个面做相应的旋转，因为我们有9个元素，所以每一个元素需要旋转 (360/90)度。

    .carousel__cell:nth-child(1) { transform: rotateY(  0deg); }
    .carousel__cell:nth-child(2) { transform: rotateY( 40deg); }
    .carousel__cell:nth-child(3) { transform: rotateY( 80deg); }
    .carousel__cell:nth-child(4) { transform: rotateY(120deg); }
    .carousel__cell:nth-child(5) { transform: rotateY(160deg); }
    .carousel__cell:nth-child(6) { transform: rotateY(200deg); }
    .carousel__cell:nth-child(7) { transform: rotateY(240deg); }
    .carousel__cell:nth-child(8) { transform: rotateY(280deg); }
    .carousel__cell:nth-child(9) { transform: rotateY(320deg); }

现在我们向外移动每一个元素，那具体移动多少呢？回顾一下构建正方体或者长方体的时候，移动距离是等于元素的高度或者宽度或者深度的一半，但在carousel中我们没有一个面可以直接用来参考，所以这里不得不通过一定的计算来得到我们的结果。看下面这张图，图中我们只知道每个表面的宽度210px,和每个表面相对于下一个面旋转了40度，如果我们将每一个三角形切分一下，会得到右图的三角形：

  ![]({{site.baseurl}}/assets/img/diagram.png)

  所以我们只要能够计算出r的值就可以了，通过正切函数可以得出最终的结果为288px。

  ![]({{site.baseurl}}/assets/img/calc.png)

为每个carousel元素添加z轴方向的平移

    .carousel__cell:nth-child(1) { transform: rotateY(  0deg) translateZ(288px); }
    .carousel__cell:nth-child(2) { transform: rotateY( 40deg) translateZ(288px); }
    .carousel__cell:nth-child(3) { transform: rotateY( 80deg) translateZ(288px); }
    .carousel__cell:nth-child(4) { transform: rotateY(120deg) translateZ(288px); }
    .carousel__cell:nth-child(5) { transform: rotateY(160deg) translateZ(288px); }
    .carousel__cell:nth-child(6) { transform: rotateY(200deg) translateZ(288px); }
    .carousel__cell:nth-child(7) { transform: rotateY(240deg) translateZ(288px); }
    .carousel__cell:nth-child(8) { transform: rotateY(280deg) translateZ(288px); }
    .carousel__cell:nth-child(9) { transform: rotateY(320deg) translateZ(288px); }

<div class="scene sence--step1">
  <div class="carousel alwaysRotate">
    <div class="carousel__cell">a</div>
    <div class="carousel__cell">b</div>
    <div class="carousel__cell">c</div>
    <div class="carousel__cell">d</div>
    <div class="carousel__cell">e</div>
    <div class="carousel__cell">f</div>
    <div class="carousel__cell">g</div>
    <div class="carousel__cell">h</div>
    <div class="carousel__cell">i</div>
  </div>
</div>

如果我们想要动态的的改变元素格式，那么可以通过JS计算具体需要平移的R值

    //cellsize --- 元素的宽度，本例中为210px
    //numberOfCells ---元素的个数，本例中为9
    var tz = Math.round( ( cellSize / 2 ) /
    Math.tan( ( ( Math.PI * 2 ) / numberOfCells ) / 2 ) );
    // or simplified to
    var tz = Math.round( ( cellSize / 2 ) /  Math.tan( Math.PI / numberOfCells ) );


参考链接：

1. [Intro to CSS 3D transforms](https://3dtransforms.desandro.com/perspective)
2. [MDN transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
3. [css-tricks transform](https://css-tricks.com/almanac/properties/t/transform/)
4. [CSS参考手册](http://css.doyoe.com/)