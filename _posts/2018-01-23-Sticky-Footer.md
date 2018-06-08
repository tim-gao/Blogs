---
layout: post
title:  固定Footer的5种方案
description: 
categories: code
author: Tim Gao
tags: [codes]
---

# 固定Footer的5种方案

通常情况下，Footer是始终固定在页面的底部的。我相信大部分人都会想到利用CSS的position:fixed属性来实现，但这里存在一个问题，假如我希望Footer样式不是固定的，但又想总是保持在页面的最下面。简单想想似乎也没有什么困难的，可是如果你的页面内容不够多，不足于充满一页时就会出现如下的情况：

  ![footer position issue]({{site.baseurl}}/assets/img/footer_issue.jpg) 

以下就是针对于上面此类问题的方案。好了废话不多说，干货开始：

## 方案一, 为容器底边设置负的外边距

这里需要一个外部容器Wrapper来包裹除Footer以外的所有元素，然后为它设置一个负的外边距，具体的数值应该等于Footer的高度。比如：Footer高度为80px,那么相应的外边局设置为 margin：-80px. 来看html代码：

    <body>
    <div class="wrapper">
        content
        <div class="push"></div>
    </div>
    <footer class="footer"></footer>
    </body>

CSS 代码：

    html, body {
        height: 100%;
        margin: 0;
    }
    .wrapper {
        min-height: 100%;

        /* Equal to height of footer */
        /* But also accounting for potential margin-bottom of last child */
        margin-bottom: -50px;
    }
    .footer,
    .push {
        height: 50px;
    }

相信你也看到了，这种方案还需要一个额外的元素(.push),可不要小看它，他的存在保证了当你在设置了负的margin之后，footer不至于被拉回来遮挡住部分的内容。而且它不能有margin,否则会影响到整体的布局。当然如果你不想添加额外的push元素，也可以通过为Wrapper元素设置同Footer相同高度的Padding-bottom，效果当然是一样的。

## 方案二, 为Footer设置负的外上边距(margin-top)

这种方案不需要额外的（.push）元素,但是确需要一个存在于内容content内额外的包裹元素（.content-inside）并为它指定一个匹配的padding-bottom值来阻止负的margin引起的footer位置抬高而遮挡页面内容的现象，看HTML代码：

    <body>
    <div class="content">
        <div class="content-inside">
        content
        </div>
    </div>
    <footer class="footer"></footer>
    </body>

CSS 代码：

    html, body {
        height: 100%;
        margin: 0;
    }
    .content {
        min-height: 100%;
    }
    .content-inside {
        padding: 20px;
        padding-bottom: 50px;
    }
    .footer {
        height: 50px;
        margin-top: -50px;
    }

## 方案三，利用CSS的calc（）来减小内部容器的高度

这种方案不需要添加任何额外的元素，通过Clac（）计算调整内部容器的高度。如此就不会存在元素重叠的现象，整个文档看起来就像叠罗汉一样，一个挨着一个的垂直排列，最终保证总得高度刚好为100%。 HTML代码：

    <body>
    <div class="content">
        content
    </div>
    <footer class="footer"></footer>
    </body>

CSS 代码：

    .content {
        min-height: calc(100vh - 70px);
    }
    .footer {
        height: 50px;
    }

你可能注意到了计算的时候减去了70个像素，但footer高度只有50个像素。实际上这里我们做了一个假设，假设内容容器里的最后一个元素有20个像素的外边局（margin-bottom:20px）,所以应该减去这个边距才是真正的内容的高度。另外我这里用了一个新的单位VH，它是指viewpoint height的高度，可以理解为当前浏览器的可见窗口的高度。这样我们就不用在为body设置height:100%属性了。

## 方案四， 利用Flexbox布局

以上所以的方案都有一个要求，就是Footer必须是一个固定的高度。在如今的响应式的时代，固定的高度总会给我们带来一些麻烦。可变的内容导致很多东西都是灵活的。用flexbox来实现固定的Footer, 不仅不需要添加额外的元素，而且不用关心Footer的高度，是不是很强大。 HTML代码：

    <body>
    <div class="content">
        content
    </div>
    <footer class="footer"></footer>
    </body>

CSS 代码：

    html, body {
        height: 100%;
    }
    body {
        display: flex;
        flex-direction: column;
    }
    .content {
        flex: 1 0 auto;
    }

如果你不了解flexbox，参阅我的文章 [flexbox详解](/2017-07-15/flexbox)

## 方案五， 利用Grid布局

grid布局是一种新的布局方式，在浏览器的支持方面还不及flexbox.关于grid的详细讲解，请参阅[这里](https://css-tricks.com/snippets/css/complete-guide-grid/)

HTML代码：
    
    <body>
    <div class="content">
      content
    </div>
    <footer class="footer"></footer>
    </body>
  
CSS 代码：

    html {
      height: 100%;
    }
    body {
      min-height: 100%;
      display: grid;
      grid-template-rows: 1fr auto;
    }
    .footer {
      grid-row-start: 2;
      grid-row-end: 3;
    }

以上这个示例可正常运行在chrome Canary 和firefox的开发版本.

相关链接: 
+ [https://css-tricks.com/couple-takes-sticky-footer/](https://css-tricks.com/couple-takes-sticky-footer/)
+ [https://css-tricks.com/snippets/css/complete-guide-grid/](https://css-tricks.com/snippets/css/complete-guide-grid/)