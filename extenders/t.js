module.exports = function t(Twig) {
  Twig.filters.t = function(text) {
    return text;
  };
}
