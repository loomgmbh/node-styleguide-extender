const fs = require('fs');
const path = require('path');
const raw = require('./raw');

module.exports = function include(item, info) {
  const component = this.checkParameter(item, 'component', 'include');
  const file = this.checkFile(component);

  const template = this._twig.twig({
    data: fs.readFileSync(file, 'utf-8'),
  });

  this.extend(item);
  return raw(template.render(item), info);
}
