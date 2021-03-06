---
layout: post
title : 静态布局，流式布局，自适应布局和响应式布局
description: 
categories: code
author: Tim Gao
tags: [codes]
---
# 静态布局，流式布局，自适应布局和响应式布局

 在前端的页面开发中，页面布局是我们经常提及到的概念，我相信很多人都听说过流式布局或者响应式布局，但究竟他们之间有什么不同，我们又该怎么去理解呢? 我上网查了一下，很多人都有在博文中记录，可是看完了仿佛还是不够清晰，没有直观的例子确实很难印象深刻，所以本文将通过示例分别解释标题中提及的不同布局以加深理解。

## 静态布局

![static layout]({{site.baseurl}}/assets/img/static.png)

[猛戳示例-静态布局](http://runjs.cn/detail/p8jdyyav)

 静态布局也叫固定宽度布局，也就是说**页面的大小采用固定的宽度**。无论浏览器的宽度高度如何变化，用户看到的页面大小永远是不变的。静态布局作为一种传统的布局方式流行了很长一段时间，直到media query和响应式布局的出现。

 不同的设备将会以多样的方式来渲染静态布局的页面，所以就会有一些不可预期的现象出现。比如：在桌面浏览器中，如果浏览器窗口宽度过小，部分页面内容就会被切掉，横向的滚动条就会出现。而在移动端，页面则会被自动的缩放，如此去阅读页面的话我想如果你是读者肯定也会很反感吧。

 所以逐渐的在构建新站的时候，设计者都不愿意采用这种方式，因为想要能够在手机端有更好的体验，他们不得不额外的再开发一套页面专供手机端使用。

## 流式布局

![liquid layout]({{site.baseurl}}/assets/img/liquid.png)

[猛戳示例-流式布局](http://runjs.cn/detail/mnkruyfy)

 相比静态布局，流式布局页面**采用了相对单位**。典型的流式布局是采用百分比(%)作为主要区块的单位, 当然其他的相对单位(em)也是同样适用的。

 无论当前浏览器宽度是多少，流式布局页面横向上通常会充满整个浏览器，所以它的缺点也显而易见。当浏览器宽度非常大时，页面内容会被拉伸的很宽，段落元素也会占满整个一行。相反的，当浏览器宽度很很窄时，页面元素会挤在一起。

## 自适应布局

![ataptive layout]({{site.baseurl}}/assets/img/adaptive.png)

[猛戳示例-自适应布局](http://runjs.cn/detail/f07ky1vg)

 自适应布局**使用media query来检测当前浏览器的宽度进而通过CSS样式调整页面大小**。自适应布局和静态布局类似也是采用固定单位（像素），但不同点在于它通过media query为页面指定了多个固定宽度。

 一个media query就是一种逻辑的体现，当页面应用了多个media query后，就构成了一套基本的布局算法。比如：

    // 当屏幕尺寸小于等于768像素时，设置content宽度为600px
    @media screen and (max-width: 768px) {
      .content {
        width: 600px;
      }
    }
    // 当屏幕尺寸小于等于1024像素并且大于769像素，设置content宽度为1000px
    @media screen and (min-width: 769px) and (max-width: 1024px) {
      .content {
        width: 1000px;
      }
    }
    // 当屏幕尺寸大于1025像素时，设置content宽度为1440px
    @media screen and (min-width: 1025px) {
      .content {
        width: 1440px;
      }
    }

除此之外，其他的部分也可以改变宽度，替换位置或者直接被隐藏掉。比如：一个两行布局的页面会在窄的浏览器中显示为一行布局。

在对原始的静态布局页面升级时（比如支持手机端），自适应布局就是一种很好的折中方案。这要比直接重构为响应式的容易的多。自适应布局的主要缺点就是在不同的breakpoint(可以理解为分界点但，比如上面例子中的768, 769, 1024,1025)里显示不够完美，总是会存在比较大或者比较小的额外空间，页面会显得很突兀。

## 响应式布局

![responsive layout]({{site.baseurl}}/assets/img/responsive.png)

[猛戳示例-响应式布局](http://runjs.cn/detail/ds21jgu6)

响应式布局**同时使用了相对单位和media query**,从表象来看它是结合了流式布局和自适应布局。由于浏览器的宽度的增加或减小，响应式布局可以像流式布局一样灵活伸缩。如果浏览器在固定的宽度之间来回切换，页面元素依然可以根据media query里样式的指引做出动态改变。

典型的响应式布局通常都是采用手机端优先的策略。也就是说设计最初永远是先满足于手机端，然后随着浏览器宽度增加逐渐适应平板和桌面，因此设计者就只需要找到方法去扩展手机端的布局就好了。这样是为了从整体上创建一种比较好的用户体验，因为从手机端到桌面端的扩展要比从桌面到手机屏幕容易的多。

**参考链接**：

* [http://blog.teamtreehouse.com/which-page-layout](http://blog.teamtreehouse.com/which-page-layout)
* [https://www.zhihu.com/question/21679928](https://www.zhihu.com/question/21679928)
