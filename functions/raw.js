module.exports = function raw(item, info) {
  return {

    toString: function() {
      return item;
    },

    twig_markup: true,

  };
}
