var Filter = require('broccoli-filter'),
    PEG    = require('pegjs');

module.exports = PegFilter;
PegFilter.prototype = Object.create(Filter.prototype);
PegFilter.prototype.constructor = PegFilter;
function PegFilter (inputTree, options) {
  if (!(this instanceof PegFilter)) return new PegFilter(inputTree, options);
  Filter.call(this, inputTree, options);
  options = options || {};
  if(!options.output) {
    options.output = "source";
  }
  if(!options.wrapper) {
    options.wrapper = function (src, parser) {
      if (typeof options.exportVar === 'function') {
          return options.exportVar(src) + ' = ' + parser + ';';
      } else {
        return (typeof options.exportVar === 'string' ? options.exportVar : 'module.exports') + ' = ' + parser + ';';
      }
    };
  }
  this.options = options;
}

PegFilter.prototype.extensions = ['pegjs'];
PegFilter.prototype.targetExtension = 'js';

PegFilter.prototype.processString = function (string) {
  var parser = PEG.buildParser(string, this.options);
  return this.options.wrapper(string, parser);
}
