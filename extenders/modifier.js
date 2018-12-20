module.exports = function attach_library(Twig) {
  Twig.functions.modifier = function(name, modifiers) {
    const classes = [name];

    for (const modifier of modifiers) {
      classes.push(name + '--' + modifier);
    }
    return Twig.functions.create_attribute({ class: classes });
  };
}
