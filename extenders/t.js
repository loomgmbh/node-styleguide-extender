module.exports = function t(Twig) {
  Twig.extendFilter('t', function(text) {
    return text;
  });
}
