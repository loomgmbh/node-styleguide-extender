module.exports = function attach_library(vars) {
  if (vars.attach_library !== undefined) {
    throw new Error(this.getErrorInfo() + '"attach_library" is a reserved key.');
  }
  vars.attach_library = function() { return ''; };
}
