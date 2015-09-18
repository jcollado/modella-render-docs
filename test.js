var modella = require('modella');
var test = require('tape');

var render = require('./');

var modelName = 'MyModel';

test('Model with no attributes', function(t) {
  var model = modella(modelName);
  t.equal(render(model), modelName);
  t.end();
});

test('Model with attributes', function(t) {
  var attributes = ['a', 'b', 'c'];
  var model = modella(modelName);

  attributes.forEach(function(attr) {
    model.attr(attr);
  });

  t.equal(
      render(model),
      modelName + ':\n- a\n- b\n- c\n');
  t.end();
});

test('Model with ID key', function(t) {
  var model = modella(modelName);

  model.attr('id');
  t.equal(
      render(model),
      modelName + ':\n- id (primaryKey)\n');
  t.end();
});
