---
layout: post
title : CSS transform 3D -- 2.transform functions
description: 
categories: code
author: Tim Gao
tags: [CSS]
---

<style>
    .wrapper {
        display: flex;
        justify-content: space-between;
    }
    .border {
        border: 1px solid #000;
    }
    .item {
        width: 70px;
        height: 70px;
        background-color: rgba(255,0,0,.5);;
    }

    .rotateleft30 {
        transform: rotate(30deg);
    }

    .rotateright30 {
        transform: rotate(-30deg);
    }

    .scale_1dot5 {
        transform: scale(1.5,1.5);
    }

    .scale_X_1dot5 {
        transform: scaleX(1.5)
    }

    .scale_Y_1dot5 {
        transform: scaleY(1.5)
    }

    .scale_Y_N1dot5 {
        transform: scaleY(-1.5)
    }

    .skew_15 {
        transform: skew(15deg,15deg);
    }

    .skewX_15 {
        transform: skewX(15deg);
    }

    .skewY_15 {
        transform: skewY(15deg);
    }

    .translate30 {
        transform: translate(30px,30px);
    }

    .translateX30 {
        transform: translateX(30px);
    }

    .translateY30 {
        transform: translateY(30px);
    }
</style>

transform是css3引入的一个新属性，通过transform functions我们可以对元素进行平移(translate)、旋转（rotate）、缩放（scale）、倾斜（skew）等等。其实在css中2D transform和3D transform是使用的同样的属性，而且用法也类似。当然除了我们要讲的transform functions外，还有一个none（默认情况）值。如果设置: `transform:none`则表示不应用transform。

# matrix(矩阵)

transform属性允许在元素使用的坐标系统中使用transform函数到达变形的效果,说实话这个还真有点不好理解，看代码：

    transform:  matrix(a, c, b, d, tx, ty)

    /* a, b, c, d 创建了变形矩阵 
    ┌     ┐ 
    │ a b │
    │ c d │
    └     ┘
    tx, ty是变形的值 .  */

指定二维矩阵中的6个值，和使用矩阵matrix [a b c d tx ty] 是等效的。老实说，我还是没有看明白这个是怎么计算的，如果让我手动去写一个matrix，天哪想想都烦？好在有一个牛X的工具[THE MATRIX RESOLUTIONS](https://meyerweb.com/eric/tools/matrix/)，可以将一组transform转换为一个matrix函数定义。其实matrix函数可以结合其他transform 的function，可以说它是一种简写，从某种意义上来说使用这个函数可以减少我们的文件大小。

比如转换前：

    transfrom: rotate(45deg) translate(24px, 25px)

转换后：

    transform: matrix(0.707107, 0.707107, -0.707107, 0.707107, -0.707107, 34.6482)

# rotate(旋转)

    transform:  rotate(angle);       /* an <angle>, e.g.  rotate(30deg) */

从原点(由 transform-origin 属性指定)开始按照顺时针方向旋转元素一个特定的角度,如果传入的是负值则逆时针旋转;

<center>
    <div class="wrapper clearfix">
        <div class=" border">
            <div class="item rotateleft30">顺时针旋转30度</div>
        </div>
        <div class=" border">
            <div class="item rotateright30">逆时针旋转30度</div>
        </div>
    </div>
</center>

代码如下：

    .rotateleft30 {
        transform: rotate(30deg);
    }

    .rotateright30 {
        transform: rotate(-30deg);
    }

# scale(缩放)

缩小或者放大一个元素，该方法同时影响元素的font-size, padding, height, 和 width属性。`scale`是`scaleX`和`scaleY`的缩写形式。函数参数大于1为放大，小于1为缩小，当为负数时，将进行像素点反射之后再进行大小的修改。

    //由[sx, sy]描述指定一个二维缩放操作。如果sy 未指定，默认认为和sx的值相同。
    transform:  scale(sx[, sy]);     /* one or two unitless <number>s, e.g.  scale(2.1,4) */
    //使用向量[sx, 1] 完成在X方向上的缩放.
    transform:  scaleX(sx);          /* a unitless <number>, e.g.  scaleX(2.7) */
    //使用向量[1, sy] 完成在Y方向的缩放.
    transform:  scaleY(sy)           /* a unitless <number>, e.g.  scaleY(0.3) */

<center>
    <div class="wrapper clearfix">
        <div class=" border">
            <div class="item">不缩放</div>
        </div>
        <div class=" border">
            <div class="item scale_1dot5">2维缩放1.5倍</div>
        </div>
        <div class=" border">
            <div class="item scale_X_1dot5">X方向缩放1.5倍</div>
        </div>
        <div class=" border">
            <div class="item scale_Y_1dot5">Y方向缩放1.5倍</div>
        </div>
        <div class=" border">
            <div class="item scale_Y_N1dot5">Y方向缩放负1.5倍</div>
        </div>
    </div>
</center>

代码如下：

    .scale_1dot5 {
        transform: scale(1.5,1.5);
    }

    .scale_X_1dot5 {
        transform: scaleX(1.5)
    }

    .scale_Y_1dot5 {
        transform: scaleY(1.5)
    }

    .scale_Y_N1dot5 {
        transform: scaleY(-1.5)
    }

# skew（倾斜）

元素在X轴和Y轴方向以指定的角度倾斜,`skew`是`skewX`和`skewY`的缩写形式，支持负值，如果为负值则像负轴方向倾斜。

    //元素在X轴和Y轴方向以指定的角度倾斜。如果ay未提供，在Y轴上没有倾斜。
    transform:  skew(ax[, ay])       /* one or two <angle>s, e.g.  skew(30deg,-10deg) */
    //绕X轴以指定的角度倾斜
    transform:  skewX(angle)         /* an <angle>, e.g.  skewX(-30deg) */
    //绕Y轴以指定的角度倾斜
    transform:  skewY(angle)         /* an <angle>, e.g.  skewY(4deg) */

<center>
    <div class="wrapper clearfix">
        <div class=" border">
            <div class="item">无倾斜</div>
        </div>
        <div class=" border">
            <div class="item skew_15">X,Y方向都倾斜15度</div>
        </div>
        <div class=" border">
            <div class="item skewX_15">X方向倾斜15度</div>
        </div>
        <div class=" border">
            <div class="item skewY_15">Y方向倾斜15度</div>
        </div>
    </div>
</center>

代码如下：

    .skew_15 {
        transform: skew(15deg,15deg);
    }

    .skewX_15 {
        transform: skewX(15deg);
    }

    .skewY_15 {
        transform: skewY(15deg);
    }

# translate(平移)

元素在X轴和Y轴方向平移指定的距离，该方法接受任何的长度值，如：10px 或者 2.4em 。`translate`是`translateX`和`translateY`的缩写形式，支持负值，如果为负值则像负轴方向移动。值得注意的是 __当通过translate平移一个元素后，该元素在DOM中仍然只占用原来的位置__ 。

    // 用向量[tx, ty]完成2D平移。如果ty没有指定，它的值默认为0。
    transform:  translate(tx[, ty])  /* one or two <length> values */
    // 在X轴平移指定距离
    transform:  translateX(tx)       /* see <length> for possible values */
    // 在Y轴平移指定距离
    transform:  translateY(ty)       /* see <length> for possible values */

<center>
    <div class="wrapper clearfix">
        <div class=" border">
            <div  class="item translate30">X,Y方向都平移30像素</div>
        </div>
        <div class=" border">
            <div class="item translateX30">X方向都平移30像素</div>
        </div>
        <div class=" border">
            <div class="item translateY30">Y方向都平移30像素</div>
        </div>
    </div>
</center>

# 多重function

你可以为transform指定多个以空格分隔的function, 其中每个函数以出现的先后顺序来影响元素。比如下面示例，`scale`会第一个执行。

    .element {
        width: 20px;
        height: 20px;
        transform: scale(20) skew(-20deg);
    }

以上的使用均是2维空间的，其中对于`translate`,`rotate`和`scale`都有对应的三维函数：

* translate3d( tx, ty, tz )
* scale3d( sx, sy, sz )
* rotate3d( rx, ry, rz, angle )

参考链接：

1. [Intro to CSS 3D transforms](https://3dtransforms.desandro.com/perspective)
2. [MDN transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
3. [css-tricks transform](https://css-tricks.com/almanac/properties/t/transform/)
4. [CSS参考手册](http://css.doyoe.com/)