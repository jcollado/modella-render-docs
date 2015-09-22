/* jshint mocha:true */
'use strict';

var chai = require('chai');
var modella = require('modella');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var ModelRenderer = require('./');

var modelName = 'MyModel';


describe('ModelRenderer', function() {
  describe('#toJSON', function() {
    before('Spy JSON.stringify', function() {
      sinon.spy(JSON, 'stringify');
    });

    it('uses metadata', function() {
      var model = modella(modelName);
      var renderer = new ModelRenderer(model);
      renderer.toJSON();
      expect(JSON.stringify).to.have.been.calledWith(renderer.metadata);
    });

    after('Restore JSON.stringify', function() {
      JSON.stringify.restore();
    });
  });

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
});
