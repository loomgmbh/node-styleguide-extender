# Quick Install

`npm install git+https://github.com/loomgmbh/node-styleguide-extender.git#1.0.1`

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

StyleguideExtender.addExtend(function(vars) {
  if (vars.attach_library !== undefined) {
    throw new Error(this.getErrorInfo() + '"attach_library" is a reserved key.');
  }
  vars.attach_library = function() { return ''; };
});
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
      - mod_one
      - mod_two
    class:
      - other_class
```

## Extends

### attach_library
