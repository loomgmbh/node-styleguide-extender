const createAttribute = require('../functions/attr');

module.exports = function create_attribute_extender(Twig) {
  Twig.functions.create_attribute = function(item) {
    return createAttribute(item);
  };

  Twig.functions.create_attributes = function() {
    throw new Error("Use create_attribute instead of create_attributes (without -s)");
  };
};
