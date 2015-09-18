var _ = require('lodash');

function ModelRenderer(model) {
  this.modelName = model.modelName;
  this.attrs = model.attrs;
}

ModelRenderer.prototype.toJSON = function toJSON() {
  return this;
};

ModelRenderer.prototype.toString = function toString() {
    var output = this.modelName;

    if (!_.isEmpty(this.attrs)) {
      output += ':\n';

      _.forOwn(this.attrs, function(value, key) {
        output += '- ' + key;
        if (_.has(value, 'primaryKey')) {
          output += ' (primaryKey)';
        }
        output += '\n';
      });
    }
    return output;
};

module.exports = ModelRenderer;
