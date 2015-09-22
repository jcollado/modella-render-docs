/* jshint mocha:true */
'use strict';

var expect = require('chai').expect;
var modella = require('modella');

var ModelRenderer = require('./');

var modelName = 'MyModel';

describe('Model without attributes', function() {
  var model;
  var renderer;

  beforeEach('Create renderer', function() {
    model = modella(modelName);
    renderer = new ModelRenderer(model);
  });

  it('as metadata', function() {
    var expected = {
      modelName: modelName,
      attrs: {}
    };

    expect(renderer.metadata).to.deep.equal(expected);
  });

  it('as string', function() {
    expect(renderer.toString()).to.equal(modelName);
  });
});

describe('Model with attributes', function() {
  var attributes = ['a', 'b', 'c'];
  var model;
  var renderer;

  beforeEach('Create renderer', function() {
    model = modella(modelName);
    renderer = new ModelRenderer(model);
    attributes.forEach(function(attr) {
      model.attr(attr);
    });
  });

  it('as metadata', function() {
    var expected = {
      modelName: modelName,
      attrs: {
        a: {},
        b: {},
        c: {}
      }
    };
    expect(renderer.metadata).to.deep.equal(expected);
  });

  it('as string', function() {
    var expected = modelName + ':\n- a\n- b\n- c';
    expect(renderer.toString()).to.equal(expected);
  });
});

describe('Model with ID key', function() {
  var model;
  var renderer;

  beforeEach('Create renderer', function() {
    model = modella(modelName).attr('id');
    renderer = new ModelRenderer(model);
  });

  it('as metadata', function() {
    var expected = {
      modelName: modelName,
      attrs: {
        id: {
          primaryKey: true
        },
      }
    };
    expect(renderer.metadata).to.deep.equal(expected);
  });

  it('as string', function() {
    var expected = modelName + ':\n- id (primaryKey)';
    expect(renderer.toString()).to.equal(expected);
  });
});
