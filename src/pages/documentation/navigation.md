---
title: Navigation
subtitle: This page contains documentation about navigation.
layout: base.njk
ismarkdown: true
# https://markllobrera.com/posts/eleventy-escaping-nunjucks-statements-in-markdown-code-blocks/
templateEngineOverride: md # for when you have njk in code blocks
---

## Navigation principles
The main navigation menu is not done using the [11ty Navigation Plugin](https://www.11ty.dev/docs/plugins/navigation/) because I wanted to make a navigation that reflects the organisation of pages without having to add `key` our any information in [Front Matter](https://www.11ty.dev/docs/data-frontmatter/).

This navigation will instead look in `collections.all` and list all pages. It will show all first level pages in the main menu and all nested pages under a sub menu and so on. 

If you want to exclude a page from the navigation (typically the 404 page), you can just exclude it from the `collections.all`.

```
eleventyExcludeFromCollections: true
```

![Apple touch icon](/img/apple-touch-icon.png)

## How does it work?
The navigation menu can be added to the nunjunk template of your choice by just including `menu.njk`.

```js
{% include "menu.njk" %}
```
### first loop on collections

`menu.njk` will loop on `collections.all` and parse the url of each entry. 

The first level entries are the ones wih 3 chuncks (more if you has a long path). From this point we will use the macro `renderNavItem(entry)` to display the entry in the menu. 

If the entry contains nested pages, the macro will handle it by loading itself again (see bellow).

```js
  {% set allEntries = collections.all %}
  <ul role="list" class="flex">
    {%- for entry in allEntries %}
      {% if entry.url.split("/").length === 3 %}
        {{ renderNavItem(entry) }}
      {% endif %}
    {% endfor %}
  </ul>
```

The link to the home page which has less chucks of url is hard coded at the begining of the navigation. This allows you the link to home with the word home or directly by adding your web site's logo.

```html
    <li class="relative group">
    <a href="/" {% if entry.url == "/" %} aria-current="page" {% endif %}
      class="block p-4 text-nowrap hover:text-blue-300"
      >ॐ home</a> 
    </li>
```

### Next loops on collections for nested pages

For each entry `renderNavItem(entry)` will first look if the entry contains nested pages. If it does, it will set them as children.

```js
  {% for menuEntry in Allentries %}
    {% if menuEntry.url.split("/").length === level + 1 %}
      {%  if menuEntry.url.split("/")[level-2] === entry.url.split("/")[level-2] %}
        {% set children = (children.push(menuEntry), children) %}
      {% endif %}
    {% endif %}
  {% endfor %}
```

If the entry has children it will contain a sub list where all entries will be handled, uncluding their possible subsets, by calling the macro again.

```html
  {% if children.length %}
    <li>
      <div>
        <summary>
          <a href="{{ entry.url }}">{{ entry.data.title }}</a>
        </summary>
        <ul role="list">
          {%- for child in children %}{{ renderNavItem(child) }}{% endfor -%}
        </ul>
      </div>
    </li>
```

Entries without children will be displayed normally.

```html
  {% else %}
    <li class="relative group">
      <a href="{{ entry.url }}">{{ entry.data.title }}</a> 
    </li>
  {% endif %}

### Styling the navigation menu items as needed

```
Since the navigation menu is a list with possible sublists, it is rendered on the page the way it is styled. The styled are applied using tailwind according to their level. They are added to the list loop using smaller macros `aClass` and `ulClass`.

First level entries are styled with a different colour

```js
  {% if entry.url.split("/").length === 3 %}
    block p-4 text-nowrap hover:text-blue-300
  {% endif %}
```
and their subblocks display on `hover`

```js
{% macro ulClass(entry) %}
  {% if entry.url.split("/").length === 3 %}
    absolute left-0 hidden bg-white text-black shadow-lg group-hover:block
  {% endif %}
{% endmacro %}
```

Second level entries are displayed under their parent entry in a drop down menu.

```js
  {% if entry.url.split("/").length === 4 %}
    block p-4 text-nowrap hover:underline
  {% endif %}
```

Following entries will display in the same drop down block with only smaller font and added padding.

```js
  {% if entry.url.split("/").length >= 5 %}
    block px-4 py-0 text-sm text-nowrap hover:underline
  {% endif %}
```

## What next?
You may want to update the styles directly in both `menu.njk` and `renderNavItem.njk` so that it fits your needs. If you don't need such menu, just remove these two files and carry on.