---
layout: post
title : CSS transform 3D -- 3.实现卡片翻转
description: 
categories: code
author: Tim Gao
tags: [codes]
---

<style>
    .wrapper {
        border: 1px solid #ccc;
        margin: 40px 0;
    }
    .wrapper__card {
        width: 100px;
        height: 140px;
        perspective: 500px;
    }
    .card {
        width: 100%;
        height: 100%;
        position: relative;
        transition: transform 1s;
        transform-style: preserve-3d;
    }
    .card__right__origin {
        transform-origin: center right;
    }
    .card__face {
        display: inline-block;
        width: 100px;
        height: 140px;
        margin: 0 10px 10px 0;
        line-height: 140px;
        color: white;
        text-align: center;
        font-weight: bold;
        font-size: 30px;
    }
    .card__face__abs {
        position: absolute;
        height: 100%;
        width: 100%;
        backface-visibility: hidden;
    }
    .card__face--front {
        background: red;
    }
    .card__face--back {
        background: green;
    }

    .card__rotate__face--back {
        transform: rotateY(180deg);
    }

    .card.is-fliped {
        transform: rotateY(180deg)
    }
    .card--slide.is-fliped {
        transform: translateX(-100%) rotateY(-180deg);
    }
</style>

# 卡片翻转(Card Flip)

本篇文章我们将实现元素的翻转，html如下：

    <div class="wrapper">
        <div class="card">
            <div class="card__face card__face--front">front</div>
            <div class="card__face card__face--back">back</div>
        </div>
    </div>

<div class="wrapper">
    <div class="card">
        <div class="card__face card__face--front">front</div>
        <div class="card__face card__face--back">back</div>
    </div>
</div>

.wrapper元素来充当3D空间，.card元素扮演3D对象。两个.card_face指代卡片的两个表面。现在该有的元素已经都有了，我们开始添加样式。首先，为3D空间添加`pespective`属性。

    .wrapper--card {
        width: 100px;
        height: 140px;
        perpective: 500px;
    }

.card元素可以在他父容器的3D空间中进行tansform转换了。我们设置它的`width:100%;`和`height:100%`来保证`transform-origin`位于容器的中心位置。同时添加`position:relative`,因为我们将设置.cart__face元素为绝对定位。

    .card {
        width: 100%;
        height: 100%;
        position: relative;
        transition: transform 1s;
        transform-style: preserve-3d;
    }

当元素设置了`perspective`属性之后将直接影响他的直接后代节点（本示例中的.cart元素）。如果希望该特性会被后续的孩子节点继承，并且他们同时共享同一个3D空间，父元素需要设置`transform-style:preserve-3d`。如果没有`transform-style`属性，卡片的两个表面（.cart__face）将和他们的父元素（.cart）平贴到一起，并且充当卡片背面的元素的旋转将会失效。

为了将卡片的表面置于3D空间中，我们需要重新设置他们的`position:absolute`。同时我们需要引用`backface-visibility:hidden`来隐藏卡片的背面在它背对着读者的时候。

    .card__face__abs {
        position: absolute;
        height: 100%;
        width: 100%;
        backface-visibility: hidden;
    }

为了翻转`.card__face--back`,我们添加一个基本的3D转换`rotateY(180deg)`

    .card__rotate__face--back {
        transform: rotateY(180deg);
    }

最后，添加一个.cart翻转的样式

    .card.is-fliped {
        transform: rotateY(180deg)
    }

好了，我们来看最终的效果(鼠标点击卡片)。

<div class="wrapper wrapper__card">
    <div class="card">
        <div class="card__face card__face__abs card__face--front">front</div>
        <div class="card__face card__face__abs card__face--back card__rotate__face--back">back</div>
    </div>
</div>

# 滑块翻转(Slide Flip)

默认情况下，元素的`transform-origin`位于它的水平和垂直方向的中心(即：transform-origin的值为50% 50% 或者center center)，相应的其他转换都是基于这个中心点。现在我们稍微做一下修改:

    .card__right__origin {
        transform-origin: center right;
    }

从下面的效果看，我们实现了一个类似开门的效果(鼠标点击卡片)。
<div class="wrapper wrapper__card">
    <div class="card card__right__origin">
        <div class="card__face card__face__abs card__face--front">front</div>
        <div class="card__face card__face__abs card__face--back card__rotate__face--back">back</div>
    </div>
</div>

再加入一个水平方向的平移，就能实现滑块翻转的效果(鼠标点击卡片)。

    .card--slide.is-fliped {
        transform: translateX(-100%) rotateY(-180deg);
    }

<div class="wrapper wrapper__card">
    <div class="card card--slide card__right__origin">
        <div class="card__face card__face__abs card__face--front">front</div>
        <div class="card__face card__face__abs card__face--back card__rotate__face--back">back</div>
    </div>
</div>


参考链接：

1. [Intro to CSS 3D transforms](https://3dtransforms.desandro.com/perspective)
2.  [MDN transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
3. [css-tricks transform](https://css-tricks.com/almanac/properties/t/transform/)
4. [CSS参考手册](http://css.doyoe.com/)