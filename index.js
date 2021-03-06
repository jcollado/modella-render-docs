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

/**
 * Normalize renderer options based on model ones
 * @param {object} opts - Model options
 * @returns {object} - Normalized options
 */
function normalizeOpts(opts) {
  var normalizedOpts = R.pick(normalizeOpts.defaultOptNames, opts);
  if (R.has('required', opts)) {
    normalizedOpts.optional = opts.required === false;
  } else if (R.has('optional', opts)) {
    normalizedOpts.optional = opts.optional === true;
  } else {
    normalizedOpts.optional = false;
  }
  normalizedOpts.computed = R.has('get') && typeof opts.get === 'function';
  return normalizedOpts;
}
normalizeOpts.defaultOptNames = ['primaryKey', 'description', 'type'];

/**
 * Convert model attribute to string
 * @param {string} attrName - Attribute name
 * @param {object} opts - Attribute options
 * @returns {string} Attribute string representation
 */
function attrToString(attrName, opts) {
  var attrOutput = '- ' + attrName;

  var knownOpts = R.pickBy(function(value, key) {
    return (
        attrToString.defaultOptNames.has(key) &&
        (typeof value !== 'boolean' || value));
  }, opts);
  var lines = R.map(R.apply(optToString), R.toPairs(knownOpts));
  var indentedLines = R.map(function(line) {
    return '  - ' + line;
  }, lines);
  var optsOutput = R.join('\n', indentedLines);

  if (optsOutput) {
    attrOutput += ':\n' + optsOutput;
  }
  return attrOutput;
}
attrToString.defaultOptNames = new Set([
    'primaryKey', 'description', 'type', 'optional', 'computed']);

/**
 * Convert attribute option to string
 * @param {string} opt - Option name
 * @param {object} value - Option value
 * @returns {string} Option string representation
 */
function optToString(opt, value) {
  if (typeof value  === 'boolean' && value) {
    return opt;
  }
  return opt + ': ' + value;
}

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
