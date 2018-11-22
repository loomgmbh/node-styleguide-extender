module.exports = function modifier(item, info) {
  const modifiers = this.checkParameter(item, 'modifiers', 'modifier');
  let name = item.name;

  if (name === undefined) {
    name = this.getTemplate();
  }

  delete item.modifiers;
  if (item.class === undefined) {
    item.class = [];
  }

  item.class.push(name);
  for (const modifier of modifiers) {
    item.class.push(name + '--' + modifier);
  }
  return item;
}
