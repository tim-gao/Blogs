---
layout: default
title:  "Setup webfont via grunt locally"
date:   2017-07-19 
---

<h2>基于SVG文件在本地构建webfont(Grunt)</h2>

本文记录如何在本地构建[webfont](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization?hl=zh-cn), 具体是基于SVG文件借助Grunt插件生成相应的字体文件。这样就可以通过在CSS @fontface是使用相应的图标，在使用中就可以很方便的自定义图标颜色和大小，最主要的是减小了不必要的文件加载。 具体步骤如下：
 
1. 安装 grunt插件 "grunt-webfont" 

	**$ npm install grunt-webfont --save-dev**
2. 安装ttf2woff2依赖(注意:ttf2woff2.js文件极其有可能回被本地杀毒软件删除，所以安装是请确保暂时关闭杀毒软件。)

	**$ npm install ttf2woff2 -g**
3. 添加相应的Grunt配置 ,如下示例 :
	
	<pre>
	 module.exports = function(grunt) {
	     grunt.initConfig({
	         webfont: {
	             icons: {
	                 src: 'fourdigits/theme/static/icons/*.svg',
	                 dest: 'fourdigits/theme/static/fonts',
	                 destCss: 'fourdigits/theme/static/stylesheets',
	                 options: {
	                     font: "icons",
	                     hashes: false,
	                     syntax: "bootstrap",
	                     stylesheet: "less",
	                     relativeFontPath: "/++theme++fourdigits.theme/fonts",
	                     htmlDemo: false
	                 }
	             }
	         }
	     });
	    grunt.loadNpmTasks('grunt-webfont');
	    grunt.registerTask('default', ['webfont']);
	 };
	</pre>
4. 安装fontforge软件并且配置环境变量（必要时请安装Python）

	可参见: [https://fontforge.github.io/en-US/](https://fontforge.github.io/en-US/)

5. 运行Grunt任务	

	比如：**$ grunt webfont:icons**

参考链接:
 	
- [https://github.com/sapegin/grunt-webfont](https://github.com/sapegin/grunt-webfont)	
- [https://www.fourdigits.nl/blog/using-a-webfont-to-display-icons](https://www.fourdigits.nl/blog/using-a-webfont-to-display-icons)