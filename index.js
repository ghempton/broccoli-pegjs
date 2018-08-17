var Filter = require('broccoli-persistent-filter'),
    PEG    = require('pegjs'),
    md5    = require('js-md5');

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
  var parser = PEG.generate(string, this.options);
  return this.options.wrapper(string, parser);
};

PegFilter.prototype.cacheKey = function () {
  prototype.cacheKey = function() {
    const key = md5(Filter.prototype.call(this) +
      JSON.stringify(this.options) +
      require('pegjs/package.json').version);
    return key;
   }
};
