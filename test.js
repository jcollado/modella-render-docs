var modella = require('modella');
var test = require('tape');

var render = require('./');

test('Model with no attributes', function(t) {
  var modelName = 'MyModel';
  var model = modella(modelName);

  t.equal(render(model), modelName);
  t.end();
});
