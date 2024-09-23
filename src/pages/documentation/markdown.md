---
title: Markdown
subtitle: Using Markdown in 11ty
layout: base.njk
ismarkdown: true
---

## Markdown

Markdown is a lightweight markup language that allows you to create formatted text using plain text syntax. It is easy to read and write and is often used with 11ty.

pages using markdown are the same as html pages, they use the same front mattter but the content is written in markdown. the file extention is `.md`.

## Markdown configuration

In this starter, 11ty isparsing markdown with `markdown-it` to generate the html pages. The configuration for `markdown-it` is in `eleventy.js`.

```js
const mdit = require('markdown-it')
const mditAttrs = require('markdown-it-attrs');
const mditHighlight = require('markdown-it-highlightjs');

module.exports = function(eleventyConfig) {
  const mditOptions = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }
  const mdLib = mdit(mditOptions).use(mditAttrs).use(mditHighlight, { inline: true }).disable('code')
  eleventyConfig.setLibrary('md', mdLib)
}
```

## Plugins

`markdown-it` accepts additional plugins. The following plugins are included in the default configuration.

### [markdown-it-attrs](https://www.npmjs.com/package/markdown-it-attrs)

  This plugin allows you to use attributes in markdown syntax. For example, `![image](image.png){.logo}` will output `image.png`, `alt="image"` and `class="logo"` in the html.

  Some examples are available in [Add HTML classes to 11ty markdown content](https://giuliachiola.dev/posts/add-html-classes-to-11ty-markdown-content/).

  ### [markdown-it-highlight](https://www.npmjs.com/package/markdown-it-highlight)

    This plugin allows you to highlight code in markdown syntax. For example, ````javascript` will output `<pre><code class="language-javascript"></code></pre>` in the html.

  The highlights uses a theme which is added in a css in the `src/_assets/public/css/highlightjs.css`

  Other themes are available in the [highlight.js example page](https://highlightjs.org/examples)

  ## Pitfalls

  ### nunjucks code in Markdown

Combining nunjucks code in markdown can be very powerfull, a few examples are given in [Custom Markdown Components in 11ty](https://www.aleksandrhovhannisyan.com/blog/custom-markdown-components-in-11ty/).

On the other end, this is not possible to directly add nunjucks code in markdown code blocks. To make this possible you need to change the template engine from nunjucks to markdown for the page you want to add the nunjucks code. 

```bash
templateEngineOverride: md # for when you have njk in code blocks
```

This is explained in detail in [Eleventy: Escaping Nunjucks Statements in Markdown Code Blocks](https://markllobrera.com/posts/eleventy-escaping-nunjucks-statements-in-markdown-code-blocks/)

### Images

There is a extensive blog post about the matter in [How to Style Images With Markdown](https://dzone.com/articles/how-to-style-images-with-markdown)

