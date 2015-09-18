var modella = require('modella');
var test = require('tape');

var ModelRenderer = require('./');

var modelName = 'MyModel';

test('Model with no attributes', function(t) {
  var model = modella(modelName);
  var renderer = new ModelRenderer(model);
  t.deepEqual(
      renderer.toJSON(),
      {
        modelName: modelName,
        attrs: {}
      });
  t.end();
});

test('Model with attributes', function(t) {
  var attributes = ['a', 'b', 'c'];
  var model = modella(modelName);
  var renderer;

  attributes.forEach(function(attr) {
    model.attr(attr);
  });
  renderer = new ModelRenderer(model);

  t.deepEqual(
      renderer.toJSON(),
      {
        modelName: modelName,
        attrs: {
          a: {},
          b: {},
          c: {}
        }
      });
  t.end();
});

test('Model with ID key', function(t) {
  var model = modella(modelName);
  var renderer;

  model.attr('id');
  renderer = new ModelRenderer(model);
  t.deepEqual(
      renderer.toJSON(),
      {
        modelName: modelName,
        attrs: {
          id: {
            primaryKey: true
          }
        }
      });
  t.end();
});

test('Render model with no attributes to string', function(t) {
  var model = modella(modelName);
  var renderer = new ModelRenderer(model);
  t.equal(renderer.toString(), modelName);
  t.end();
});

test('Render model with attributes to string', function(t) {
  var attributes = ['a', 'b', 'c'];
  var model = modella(modelName);
  var renderer;

  attributes.forEach(function(attr) {
    model.attr(attr);
  });
  renderer = new ModelRenderer(model);

  t.equal(
      renderer.toString(),
      modelName + ':\n- a\n- b\n- c\n');
  t.end();
});

test('Render model with ID key to string', function(t) {
  var model = modella(modelName);
  var renderer;

  model.attr('id');
  renderer = new ModelRenderer(model);
  t.equal(
      renderer.toString(),
      modelName + ':\n- id (primaryKey)\n');
  t.end();
});
