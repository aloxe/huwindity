---
title: Navigation
subtitle: This page contains documentation about navigation.
layout: base.njk
ismarkdown: true
---

## Navigation principles
The main navigation menu is not done using the [11ty Navigation Plugin](https://www.11ty.dev/docs/plugins/navigation/) because I wanted to make a navigation that reflects the organisation of pages without having to add `key` our any information in [Front Matter](https://www.11ty.dev/docs/data-frontmatter/).

This navigation will instead look in `collections.all` and list all pages. It will show all first level pages in the main menu and all nested pages under a sub menu and so on. If you want to exclude a page from the navigation (typically the 404 page), you can just exclude it from `collections.all` with.

```
eleventyExcludeFromCollections: true
```

![Apple touch icon](/img/apple-touch-icon.png)

## How does it work?
The navigation menu can be added to the nunjunk template of your choice by just including `menu.njk`.
```nunjuck
{% include "menu.njk" %}
```
### menu.njk

`menu.njk` will loop on `collections.all` and parse the url of each entry. The first level entries are the ones wih 3 chuncks. From this point we will use the macro `renderNavItem(entry)` to display the entry in the menu. If the entry contains nested pages, the macro `renderNavItem(entry)` will handle it.

```nunjuck
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

```nunjuck
    <li class="relative group">
    <a href="/" {% if entry.url == "/" %} aria-current="page" {% endif %}
      class="block p-4 text-nowrap hover:text-blue-300"
      >ॐ home</a> 
    </li>
```

### renderNavItem.njk

For each entry `renderNavItem(entry)` will loop on `collections.all` to find all possible pages nested under the same entry. It will display each of them by calling itself again,

```nunjuck
  {% for menuEntry in Allentries %}
    {% if menuEntry.url.split("/").length === level + 1 %}
      {%  if menuEntry.url.split("/")[level-2] === entry.url.split("/")[level-2] %}
        {% set children = (children.push(menuEntry), children) %}
      {% endif %}
    {% endif %}
  {% endfor %}
```
Second level entries are displayed under their parent entry in a drop down menu.
```nunjuck
  {% if entry.url.split("/").length === 4 %}
    block p-4 text-nowrap hover:underline
  {% endif %}
```

Following entries will display in the same drop down with just a small indentation. All this is done only using tailwind styles.
```nunjuck
  {% if entry.url.split("/").length >= 5 %}
    block px-4 py-0 text-sm text-nowrap hover:underline
  {% endif %}
```
