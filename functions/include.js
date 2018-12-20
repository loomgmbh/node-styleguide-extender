const fs = require('fs');
const path = require('path');
const raw = require('./raw');

module.exports = function include(item, info) {
  if (item === null) {
    throw new Error(this.getErrorInfo() + 'The render item is NULL. Are you sure that the array syntax is correct?');
  }
  const component = this.checkParameter(item, 'component', 'include');
  const file = this.checkFile(component);

  const template = this._twig.twig({
    data: fs.readFileSync(file, 'utf-8'),
  });

  return raw(template.render(item), info);
}
