'use strict';

var R = require('ramda');
var isEmptyObj = R.pipe(R.keys, R.isEmpty);

function ModelRenderer(model) {
  this.modelName = model.modelName;
  this.attrs = model.attrs;
}

function attrToString(attrName, opts) {
  var attrOutput = '- ' + attrName;
  var optsOutput = R.join(', ', R.map(R.apply(optToString), R.toPairs(opts)));

  if (optsOutput) {
    attrOutput += ' (' + optsOutput + ')';
  }
  return attrOutput;
}

function optToString(opt, value) {
  if (opt === 'primaryKey') {
    return 'primaryKey';
  }
  if (opt === 'description') {
    return 'description: ' + value;
  }
}

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
