---
layout: default
title: JavaScript在网页中生成PDF
description: 本文将讲述如何通过类库PDFMake在网页中生成PDF文件，这不同于像Chrome或者Firefox浏览器内置的"Save to PDF"功能，             通过本方法很好了解决了不同浏览器生成PDF的局限性问题。当然利用PDFMake构建PDF时，更多的时间需要我们花在手动的构建              PDF的页面的结构代码中...
categories: code
author: Tim Gao
tags: [codes]
---

# pdfmake 文档参考

## install #

这篇文档将概要的讲解pdfmake的基本语法并将展示如何在浏览器中创建PDF文件。如果你对服务器端的打印比较感兴趣请查阅[source](https://github.com/bpampuch/pdfmake)中的examples文件夹。

在开始的默认配置项中，你应该引入以下两个文件：
* pdfmake.min.js
* vfs_fonts.js -默认的字体定义文件（默认包含字体Roboto, 当然你也可以自定义，参见[use custom fonts        instead](https://github.com/bpampuch/pdfmake/wiki/Custom-Fonts---client-side))
<pre class="formatter"><code> &lt;!doctype html&gt;
 &lt;html lang='en'&gt;
 &lt;head&gt;
 	&lt;meta charset='utf-8'&gt;
 	&lt;title&gt;my first pdfmake example&lt;/title&gt;
 	&lt;script src='build/pdfmake.min.js'&gt;&lt;/script&gt;
 	&lt;script src='build/vfs_fonts.js'&gt;&lt;/script&gt;
 &lt;/head&gt;
 &lt;body&gt;
 (...)</code></pre>
你可以从githup下载以上两个文件或者通过bower安装
<pre class="formatter"><code>
    bower install pdfmake

</code></pre>
在后者方案中资源文件位于<b>bower_components/pdfmake/build/</b>
<br>
## 文档定义对象(Document definition object) 
**pdfmake** 遵循一个描述性的文档结构

也就是说，你不需要像使用其他类库那样手动的去计算位置或者使用诸如**writeText(text,x,y)** , **movedown**的命令，你应该掌握的最基本的概念就是文档定义对象,简单实例如下：
<pre class="formatter"><code>
    var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };  

</code></pre>
或者比较复杂一些的文档结构（包含多级表格，图片，列表，段落，边距，样式等等）

只要你有了文档定义对象，就可以很容易的创建、打开、打印和下载PDF:

<pre class="formatter"><code>
    // open the PDF in a new window
    pdfMake.createPdf(docDefinition).open();

    // print the PDF
    pdfMake.createPdf(docDefinition).print();

    // download the PDF
    pdfMake.createPdf(docDefinition).download('optionalName.pdf');

</code></pre>
<br>
## 样式
**pdfmake** 支持为段落或者内容添加样式

<pre class="formatter"><code>
var docDefinition = {
    content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        'This is a standard paragraph, using default style',

        // using a { text: '...' } object lets you set styling properties
        { text: 'This paragraph will have a bigger font', fontSize: 15 },

        // if you set pass an array instead of a string, you'll be able
        // to style any fragment individually
        {
        text: [
            'This paragraph is defined as an array of elements to make it possible to ',
            { text: 'restyle part of it and make it bigger ', fontSize: 15 },
            'than the rest.'
        ]
        }
    ]
};
</code></pre>
<br>
## 样式字典

如果你想在文档中重用你的样式，你可以在样式字典中定义通用的样式：

<pre class="formatter"><code>
var docDefinition = {
    content: [
        { text: 'This is a header', style: 'header' },
        'No styling here, this is a standard paragraph',
        { text: 'Another text', style: 'anotherStyle' },
        { text: 'Multiple styles applied', style: [ 'header', 'anotherStyle' ] }
    ],

    styles: {
        header: {
        fontSize: 22,
        bold: true
        },
        anotherStyle: {
        italic: true,
        alignment: 'right'
        }
    }
};
</code></pre>
为了加深对样式字典的理解，请参阅[示例库](http://pdfmake.org/playground.html)
<br>
## 列

默认情况下，段落作为一个栈元依次素垂直排列，当然也可以把一行按照空间划分为列：

<pre class="formatter"><code>
var docDefinition = {
  content: [
    'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
    {
      columns: [
        {
          // auto-sized columns have their widths based on their content
          width: 'auto',
          text: 'First column'
        },
        {
          // star-sized columns fill the remaining space
          // if there's more than one star-column, available width is divided equally
          width: '*',
          text: 'Second column'
        },
        {
          // fixed width
          width: 100,
          text: 'Third column'
        },
        {
          // percentage width
          width: '10%',
          text: 'Last column'
        }
      ],
      // optional space between columns
      columnGap: 10
    },
    'This paragraph goes below all columns and has full width'
  ]
};
</code></pre>
当然每一类的内容不仅限于纯文本，可以是任意的pdfmake元素，详情参考[示例库](http://pdfmake.org/playground.html)
<br>
## 表格

概念上的表格非常类似于上文提到的列，他们通常包含表头，边框以及在多行或者多列之间的单元格边距:
<pre class="formatter"><code>
var docDefinition = {
  content: [
    {
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ '*', 'auto', 100, '*' ],

        body: [
          [ 'First', 'Second', 'Third', 'The last one' ],
          [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
          [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
        ]
      }
    }
  ]
};
</code></pre>
相关的表格详细用法，请参阅见于[示例库](http://pdfmake.org/playground.html)
<br>
## 列表

**pdfmake**支持有序和无序列表：
<pre class="formatter"><code>
var docDefinition = {
  content: [
    'Bulleted list example:',
    {
      // to treat a paragraph as a bulleted list, set an array of items under the ul key
      ul: [
        'Item 1',
        'Item 2',
        'Item 3',
        { text: 'Item 4', bold: true },
      ]
    },

    'Numbered list example:',
    {
      // for numbered lists set the ol key
      ol: [
        'Item 1',
        'Item 2',
        'Item 3'
      ]
    }
  ]
};
</code></pre>
<br>
## 页头和页脚

在pdfmake中页头和页脚可以是静态的也可以是动态的：
<pre class="formatter"><code>
var docDefinition = {
  header: 'simple text',

  footer: {
    columns: [
      'Left part',
      { text: 'Right part', alignment: 'right' }
    ]
  },

  content: (...)
};

</code></pre>
对于动态创建的文档内容，你可以指定function为页头或者页脚：
<pre class="formatter"><code>
var docDefinition = {
  footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
  header: function(currentPage, pageCount) {
    // you can apply any logic and return any valid pdfmake element

    return { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' };
  },
  (...)
};
</code></pre>
<br>
## 背景层
背景层会被添加到每一页：
<pre class="formatter"><code>
(...)
var docDefinition = {
  background: 'simple text',
  content: (...)
};
</code></pre>
背景层页可以包含其他对象（图片，表格等等）或者动态创建：
<pre class="formatter"><code>
(...)
var docDefinition = {
  background: function(currentPage) {
    return 'simple text on page ' + currentPage
  },

  content: (...)
};
</code></pre>
<br>
## 外边距

任何元素都可以有外边局：
<pre class="formatter"><code>
(...)
// margin: [left, top, right, bottom]
//外边距：【左，上，右，下】
{ text: 'sample', margin: [ 5, 2, 10, 20 ] },

// margin: [horizontal, vertical]
//外边距：【水平边距，垂直边距】
{ text: 'another text', margin: [5, 2] },

// margin: equalLeftTopRightBottom
//外边距：【上下左右边距全部相等】
{ text: 'last one', margin: 5 }
(...)
</code></pre>
<br>
## 段落栈

通过以上的示例你可能已将发现，当你指定一个内容关键字到一个数组，文档就会变成一个段落栈。在一个嵌入的元素中，你会频繁的使用到这个结构，就像下面这个示例：
<pre class="formatter"><code>
var docDefinition = {
  content: [
    'paragraph 1',
    'paragraph 2',
    {
      columns: [
        'first column is a simple text',
        [
          // second column consists of paragraphs
          'paragraph A',
          'paragraph B',
          'these paragraphs will be rendered one below another inside the column'
        ]
      ]
    }
  ]
};
</code></pre>
数组的问题就是不无法添加样式属性（假如你想更改字体大小的话），好消息是数组只是pdfmake中栈的一个简写，所以如果你想重新为整个栈重新定义样式，你可以使用扩展的定义规则，如：
<pre class="formatter"><code>
var docDefinition = {
  content: [
    'paragraph 1',
    'paragraph 2',
    {
      columns: [
        'first column is a simple text',
        {
          stack: [
            // second column consists of paragraphs
            'paragraph A',
            'paragraph B',
            'these paragraphs will be rendered one below another inside the column'
          ],
          fontSize: 15
        }
      ]
    }
  ]
};
</code></pre>
<br>
## 图片

这一部分很简单，只需要使用image节点就可以了{image:'...'}, pdfmake支持JPEG和PNG格式的图片：
<pre class="formatter"><code>
var docDefinition = {
  content: [
    {
      // you'll most often use dataURI images on the browser side
      // if no width/height/fit is provided, the original size will be used
      image: 'data:image/jpeg;base64,...encodedContent...'
    },
    {
      // if you specify width, image will scale proportionally
      image: 'data:image/jpeg;base64,...encodedContent...',
      width: 150
    },
    {
      // if you specify both width and height - image will be stretched
      image: 'data:image/jpeg;base64,...encodedContent...',
      width: 150,
      height: 150
    },
    {
      // you can also fit the image inside a rectangle
      image: 'data:image/jpeg;base64,...encodedContent...',
      fit: [100, 100]
    },
    {
      // if you reuse the same image in multiple nodes,
      // you should put it to to images dictionary and reference it by name
      image: 'mySuperImage'
    },
    {
      // under NodeJS (or in case you use virtual file system provided by pdfmake)
      // you can also pass file names here
      image: 'myImageDictionary/image1.jpg'
    }
  ],

  images: {
    mySuperImage: 'data:image/jpeg;base64,...content...'
  }
};
</code></pre>

**注意**无论你是用已经定义好的图片还是直接写死在文档定义结构中，这里的图片源必须是base64格式，笔者就曾经踩过这个坑。直接指定图片链接地址是无效的，当然网上也有很多通过url把图片资源转换成base64的案例，但局限性在于js处理的方式仅仅限定于同源的资源也就是说只要不存在跨域问题就可以。如果都无法满足，建议将图片url发送至后端，借助于java或者其他后端程序处理再返回前端交于javascript使用。 这里顺便把JS如何通过url转换资源为base64格式的代码贴出来以备不时之需。

<pre class="formatter"><code>
var img = "imgurl";//imgurl 就是你的图片路径  

function getBase64Image(img) {  
     var canvas = document.createElement("canvas");  
     canvas.width = img.width;  
     canvas.height = img.height;  
     var ctx = canvas.getContext("2d");  
     ctx.drawImage(img, 0, 0, img.width, img.height);  
     var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
     var dataURL = canvas.toDataURL("image/"+ext);  
     return dataURL;  
}  

var image = new Image();  
image.src = img;  
image.onload = function(){  
  var base64 = getBase64Image(image);  
  console.log(base64);  
}  
</code></pre>
<br>
## 分页

你可以根据你的需求在任何一个元素的前或者后指定分页，图片和边个的示例中使用过这个属性：
<pre class="formatter"><code>
(...)
	'You can also fit the image inside a rectangle',
	{
		image: 'fonts/sampleImage.jpg',
		fit: [100, 100],
		pageBreak: 'after'
	},
(...)
</code></pre>
和
<pre class="formatter"><code>
(...)
	{ text: 'noBorders:', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
(...)
</code></pre>
<br>
## 页面的大小，方向和外边距

<pre class="formatter"><code>
var docDefinition = {
  // a string or { width: number, height: number }
  pageSize: 'A5',

  // by default we use portrait, you can change it to landscape if you wish
  pageOrientation: 'landscape',

  // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
  pageMargins: [ 40, 60, 40, 60 ],
};
</code></pre>

相关的pagesize如下：
* '4A0', '2A0', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
* 'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
* 'C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10',
* 'RA0', 'RA1', 'RA2', 'RA3', 'RA4',
* 'SRA0', 'SRA1', 'SRA2', 'SRA3', 'SRA4',
* 'EXECUTIVE', 'FOLIO', 'LEGAL', 'LETTER', 'TABLOID'

原文参考地址[http://pdfmake.org/#/gettingstarted](http://pdfmake.org/#/gettingstarted)