module.exports = function without(Twig) {
  Twig.filters.without = function(object, ...withouts) {
    for (const index in withouts) {
      delete object[withouts[index]];
    }
    return object;
  };
}
