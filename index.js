const fs = require('fs');
const path = require('path');

module.exports = class StyleguideExtender {

  static get extends() {
    return this.doExtend.bind(this);
  }

  constructor(twig) {
    this._twig = twig;
  }

  static addFunction(name, func) {
    if (this._functions === undefined) this._functions = {};
    this._functions[name] = func;
    return this;
  }

  static addExtender(func) {
    if (this._extenders === undefined) this._extenders = [];
    this._extenders.push(func);
    return this;
  }

  static setSplitter(splitter) {
    this._splitter = splitter;
    return this;
  }

  static doExtend(Twig) {
    if (this._extenders === undefined) return;
    for (const item of this._extenders) {
      item(Twig);
    }
  }

  getSplitter() {
    return this.constructor._splitter || '$';
  }

  getFunctions() {
    return this.constructor._functions;
  }

  apply(template, vars) {
    this._template = template;
    return this.doApply(vars);
  }

  doApply(vars) {
    for (const key in vars) {
      if (typeof vars[key] === 'object') {
        vars[key] = this.doApply(vars[key]);
      }

      const [name, ...functions] = key.split(this.getSplitter());
      let item = vars[key];

      for (const func of functions) {
        item = this.doFunction(func, item, { vars, key });
      }

      if (name.length) {
        delete vars[key];
        vars[name] = item;
      } else {
        return item;
      }
    }
    return vars;
  }

  doFunction(func, item, info) {
    const functions = this.getFunctions();

    if (functions[func] === undefined) {
      throw new Error(this.getErrorInfo() + 'Unknown function "' + func + '"');
    }
    return functions[func].call(this, item, info);
  }

  getTemplate() {
    return this._template.name.split('.')[0];
  }

  getErrorInfo() {
    return 'Error in component "' + this._template.name + '".\n';
  }

  checkParameter(item, parameter, name) {
    if (item[parameter] === undefined) {
      throw new Error(this.getErrorInfo() + 'The parameter "' + parameter + '" is required for function "' + name + '"');
    }
    return item[parameter];
  }

  checkFile(file) {
    const resolved = path.resolve('.', file);

    if (!fs.existsSync(resolved)) {
      throw new Error(this.getErrorInfo() + 'File "' + file + '" not found. Use a path relative to "' + process.cwd() + '"');
    }
    return resolved;
  }

}

module.exports.addFunction('include', require('./functions/include'));
module.exports.addFunction('raw', require('./functions/raw'));
module.exports.addFunction('modifier', require('./functions/modifier'));
module.exports.addFunction('attr', require('./functions/attr'));
module.exports.addFunction('log', require('./functions/log'));
module.exports.addFunction('info', require('./functions/info'));

module.exports.addExtender(require('./extenders/attach_library'));
module.exports.addExtender(require('./extenders/create_attribute'));
module.exports.addExtender(require('./extenders/modifier'));
module.exports.addExtender(require('./extenders/link'));
