# Quick Install

`npm install git+https://github.com/loomgmbh/node-styleguide-extender.git#1.2.0`

# Config

### Add to gulp-twig

```js
const StyleguideExtender = require('styleguide-extender');

  ...
  .pipe(twig({
    extend: StyleguideExtender.extends,
  }))
  ...

```

### Add include to gulp-twig

```js
const StyleguideExtender = require('styleguide-extender');
const twigInclude = require('twig-include');

StyleguideExtender.addExtender(twigInclude.extend);

  ...
  .pipe(twig({
    extend: StyleguideExtender.extends,
  }))
  ...

```

*gulpfile.js*

# Use Package

*example.yml with key*

```yml
- title: 'Test Componente'
  media$include:
    component: 'media.twig'
    img: 'src.jpg'
```

*example.yml as array*

```yml
- title: 'Test Componente'
  items:
    - $include:
        component: 'media.twig'
        img: 'src.jpg'
    - $include:
        component: 'media.twig'
        img: 'src2.jpg'
```

# Custom Functions and Extender

*example in gulpfile.js*
```js
const StyleguideExtender = require('styleguide-extender');

StyleguideExtender.addFunction('custom_func', function(item, info) {
  return item;
});

StyleguideExtender.addExtender(function(Twig) {
  Twig.functions.attach_library = function() {
    return '';
  };
});

const twigInclude = require('twig-include');

StyleguideExtender.addExtender(twigInclude.extend);
```

# Change the splitter string

Set the splitter for functions. Default: $

*example in gulpfile.js*
```js
const StyleguideExtender = require('styleguide-extender');

StyleguideExtender.setSplitter('==');
```

# API

## Functions

### include

**Description:**

Render a component in a variable.

**Parameters:**

  - **string** component - the path to the component relative to theme

*example*

```yml
- title: 'Componente 1'
  content$include:
    component: 'component2.twig'
    title: 'Componente 2'
```

### raw

**Description:**

Render the item as raw markup.

*example*

```yml
- img$raw: '<img src="example.png">'
```

### attr

**Description:**

Generate a drupal attributes like object.

*example*

```yml
- attributes$attr
    class:
      - 'first-class'
      - 'second-class'
```

### modifier

**Description:**

Add modifier class for `attr` function.

**Parameters:**

  - **string[]** modifiers - the modifier classes
  - **string** name (optional) - the name of the element, default the name of the template

*example*

```yml
- attributes$modifier$attr:
    modifiers:
      - 'mod_one'
      - 'mod_two'
    class:
      - 'other_class'
```

```yml
- button$include:
    component: '@components/btn/btn.twig'
    attributes$modifier$attr:
      name: 'btn'
      modifiers:
        - 'mod_one'
        - 'mod_two'
      class:
        - 'other_class'
```

### log

Debug function.
Print the item object instance in render process.

*example*

```yml
- button$log$include:
    component: '@components/btn/btn.twig'
    attributes$modifier$attr:
      name: 'btn'
      modifiers:
        - 'mod_one'
        - 'mod_two'
      class:
        - 'other_class'
```

### info

Debug function.
Print the info object in the render process.

*example*

```yml
- button$info$include:
    component: '@components/btn/btn.twig'
    attributes$modifier$attr:
      name: 'btn'
      modifiers:
        - 'mod_one'
        - 'mod_two'
      class:
        - 'other_class'
```

## Extends

### attach_library

*source*

```twig
{{ attach_library('theme/component') }}
```

*result*

```html
```

### create_attribute

*source*

```twig
<div {{ create_attribute().addClass('element') }}></div>
```

*result*

```html
<div class="element"></div>
```

### modifier

*source*

```twig
<div {{ modifier('element', ['small', 'white']) }}></div>
```

*result*

```html
<div class="element element--small element--white"></div>
```

### link

*source*

```twig
link('Link title', 'http://www.google.com', {class: 'link-class'})
```

*result*

```html
<a href="http://www.google.com" class="link-class">Link title</a>
```
