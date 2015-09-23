/**
 * Generate documentation from modella models
 * @module modella-render-docs
 */
/* globals Set */
'use strict';

var R = require('ramda');
var isEmptyObj = R.pipe(R.keys, R.isEmpty);

/**
 * Convert model metadata to different formats
 * @constructor
 * @param {object} model - Modella model
 * @property metadata {object} - Model metadata
 * @property modelName {string} - Model name
 * @property attrs {object} - Model attributes
 */
function ModelRenderer(model) {
  this.modelName = model.modelName;
  this.attrs = R.mapObj(normalizeOpts, model.attrs);
}

function normalizeOpts(opts) {
  var normalizedOpts = {};

  normalizeOpts.knownOptions.forEach(function(optName) {
    if (R.has(optName, opts)) {
      normalizedOpts[optName] = opts[optName];
    }
  });

  return normalizedOpts;
}
normalizeOpts.knownOptions = ['primaryKey', 'description', 'type'];

/**
 * Convert model attribute to string
 * @param {string} attrName - Attribute name
 * @param {object} opts - Attribute options
 * @returns {string} Attribute string representation
 */
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

/**
 * Convert attribute option to string
 * @param {string} opt - Option name
 * @param {object} value - Option value
 * @returns {string} Option string representation
 */
function optToString(opt, value) {
  if (optToString.strOptions.has(opt)) {
    if (typeof(value) == 'boolean') {
      return opt;
    }
    return opt + ': ' + value;
  }
}
optToString.strOptions = new Set(['primaryKey', 'description', 'type']);

Object.defineProperty(ModelRenderer.prototype, 'metadata', {
  get: function () {
    return R.mapObj(R.identity, this);
  },
  enumerable: true
});

/**
 * Convert model metadata to JSON
 * @method
 * @returns {string} Model metadata converted to JSON
 */
ModelRenderer.prototype.toJSON = function toJSON() {
  return JSON.stringify(this.metadata);
};


/**
 * Convert model metadata to string
 * @method
 * @returns {string} Model metadata converted to string
 */
ModelRenderer.prototype.toString = function toString() {
    var output = this.modelName;

    if (!isEmptyObj(this.attrs)) {
      output += ':\n';
      output += R.join('\n', R.map(R.apply(attrToString), R.toPairs(this.attrs)));
    }
    return output;
};

module.exports = ModelRenderer;
