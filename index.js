module.exports = function render(model) {
  var output = '';
  var attr;

  output += model.modelName;

  if (Object.keys(model.attrs).length) {
    output += ':\n';
    for (attr in model.attrs) {
      output += '- ' + attr + '\n';
    }
  }
  return output;
};
