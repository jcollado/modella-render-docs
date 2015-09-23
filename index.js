/* globals Set */
'use strict';

var R = require('ramda');
var isEmptyObj = R.pipe(R.keys, R.isEmpty);

function ModelRenderer(model) {
  this.modelName = model.modelName;
  this.attrs = model.attrs;
}

function attrToString(attrName, opts) {
  var attrOutput = '- ' + attrName;
  var lines = R.map(R.apply(optToString), R.toPairs(opts));
  var indentedLines = R.map(function(line) {
    return '  - ' + line;
  }, lines);
  var optsOutput = R.join('\n', indentedLines);

  if (optsOutput) {
    attrOutput += ':\n' + optsOutput;
  }
  return attrOutput;
}

function optToString(opt, value) {
  if (opt === 'primaryKey') {
    return 'primaryKey';
  }

  if (optToString.knownOptions.has(opt)) {
    return opt + ': ' + value;
  }
}
optToString.knownOptions = new Set(['description', 'type']);

Object.defineProperty(ModelRenderer.prototype, 'metadata', {
  get: function () {
    return R.mapObj(R.identity, this);
  },
  enumerable: true
});

ModelRenderer.prototype.toJSON = function toJSON() {
  return JSON.stringify(this.metadata);
};

ModelRenderer.prototype.toString = function toString() {
    var output = this.modelName;

    if (!isEmptyObj(this.attrs)) {
      output += ':\n';
      output += R.join('\n', R.map(R.apply(attrToString), R.toPairs(this.attrs)));
    }
    return output;
};

module.exports = ModelRenderer;
