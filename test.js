var modella = require('modella');
var test = require('tape');

var render = require('./');

test('Model with no attributes', function(t) {
  var modelName = 'MyModel';
  var model = modella(modelName);

  t.equal(render(model), modelName);
  t.end();
});

test('Model with attributes', function(t) {
  var modelName = 'MyModel';
  var attributes = ['a', 'b', 'c'];
  var model = modella(modelName);

  attributes.forEach(function(attr) {
    model.attr(attr);
  });

  t.equal(
      render(model),
      'MyModel:\n- a\n- b\n- c\n');
  t.end();
});
