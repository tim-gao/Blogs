---
layout: post
title: 添加实时站内搜索功能(jekyll)
description: 
categories: code
author: Tim Gao
tags: [others]
---
# 简单的站内搜索功能

一直想为我的站点添加一个站内搜索功能，苦于不知道能否脱离后端去实现而被搁浅。最近发现了一个非常棒的[插件-Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search)，
可以实现jekyll站内实时搜索，添加到站点后效果棒棒啊。
在此向此插件的作者献上我的膝盖以表敬仰。哈哈！来，一起揭开它的神秘面纱吧。

## 安装

### npm

    npm install simple-jekyll-search

### bower

    bower install --save simple-jekyll-search

## 步骤1, 创建search.json文件

在你的网站根目录创建一个search.json文件，内容如下:
     {% raw %}
    ---
    layout: null
    ---
    [
      {% for post in site.posts %}
        {
          "title"    : "{{ post.title | escape }}",
          "category" : "{{ post.category }}",
          "tags"     : "{{ post.tags | join: ', ' }}",
          "url"      : "{{ site.baseurl }}{{ post.url }}",
          "date"     : "{{ post.date }}"
        } {% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]
     {% endraw %}
> 如果你的编译器对以上代码警告或者报错，不用担心，just leave it。

## 步骤2，使用插件

将以下代码整合到你的站点中，具体来说就是把HTML部分放置到你希望展示Search按钮和结果的页面中。然后引入simple-jekyll-search.min.js类库。

    <!-- HTML elements for search -->
    <div id="search-container">
      <input type="text" id="search-input" placeholder="search...">
      <ul id="results-container"></ul>
    </div>

    <!-- script pointing to jekyll-search.js -->
    <script src="{{ site.baseurl }}/simple-jekyll-search.min.js"></script>

## 步骤3，自定义配置

当我们引入simple-jekyll-search.min.js后会创建一个全局变量SimpleJekyllSearch, 你可以如下添加你的配置到javascript中：

    SimpleJekyllSearch({
      searchInput: document.getElementById('search-input'),
      resultsContainer: document.getElementById('results-container'),
      json: '/search.json'
    })

恭喜你已经搞定了，赶紧试试吧！

配置参数详细解释:

* searchInput (Element) [必须]
> 搜索输入框，该插件会监听输入框的键盘事件然后触发相应搜索

* resultsContainer (Element) [必须]
> 用于展示搜索结果的容器元素

* json (String|JSON) [必须]
> 指定search.json文件的路径

* searchResultTemplate (String) [可选]
> 显示单独一条结果的html模板

比如：

    <li><a href="{url}">{title}</a></li>

生成结果：

    <li><a href="/jekyll/update/2014/11/01/welcome-to-jekyll.html">Welcome to Jekyll!</a></li>

前提是你的search.json中包含以上url和title变量

更多配置介绍请参阅 [Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search/)