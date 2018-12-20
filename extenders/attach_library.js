module.exports = function attach_library(Twig) {
  Twig.functions.attach_library = function() {
    return '';
  };
}
