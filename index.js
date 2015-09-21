'use strict';

var R = require('ramda');
var isEmptyObj = R.pipe(R.keys, R.isEmpty);

function ModelRenderer(model) {
  this.modelName = model.modelName;
  this.attrs = model.attrs;
}

function attrToString(key, value) {
  var output = '- ' + key;
  if (R.has('primaryKey', value)) {
    output += ' (primaryKey)';
  }
  return output;
}

ModelRenderer.prototype.toJSON = function toJSON() {
  return R.mapObj(R.identity, this);
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
