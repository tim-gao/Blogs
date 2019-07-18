---
layout: post
title:  一段简洁的判断类型的javascript
description: 
author: Tim Gao
tags: [tools]
---

# 一段简洁的判断类型的JavaScript

    var utils = {};
    "Boolean|Number|String|Function|Array|Date|RegExp|Object|Error".split("|").forEach(function(item) {
      utils["is" + item] = function(obj) {
        return {}.toString.call(obj) == "[object " + item + "]";
      };
    });
    //使用如下
    utils.isArray([]);
    utils.isBoolean(false);
    utils.isDate(new Date());
    utils.isObject({});
    utils.isString('test');
    utils.isFunction(function(){});
    utils.isNumber(1);
    utils.isRegExp(/\d/);

