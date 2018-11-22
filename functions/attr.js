const DrupalAttribute = require('drupal-attribute');

function transform(object) {
  const array = [];

  for (const name in object) {
    array.push([name, object[name]]);
  }
  return array;
}

function create(attributes) {
  const drupal_attributes = new DrupalAttribute(attributes);
  drupal_attributes.twig_markup = true;
  return drupal_attributes;
}

module.exports = function attr(item, info) {
  if (Array.isArray(item)) return create(item);
  return create(transform(item));
}
