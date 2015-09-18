var _ = require('lodash');

module.exports = function render(model) {
  var output = '';
  var attr;

  output += model.modelName;

  if (!_.isEmpty(model.attrs)) {
    output += ':\n';
    _.forOwn(model.attrs, function(value, key) {
      output += '- ' + key;

      if (_.has(value, 'primaryKey')) {
        output += ' (primaryKey)';
      }
      output += '\n';
    });
  }
  return output;
};
