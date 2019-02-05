const createAttribute = require('../functions/attr');
const raw = require('../functions/raw');

module.exports = function link(Twig) {
  Twig.functions.link = function(title, url, attributes) {
    attributes = createAttribute(attributes).setAttribute('href', url);

    return raw('<a' + attributes.toString() + '>' + title + '</a>');
  };
}
