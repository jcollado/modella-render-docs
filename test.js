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
      attributes.forEach(function(attr) {
        model.attr(attr);
      });
      renderer = new ModelRenderer(model);
    });

    it('as metadata', function() {
      var expected = {
        modelName: modelName,
        attrs: {
          a: {
            computed: false,
            optional: false
          },
          b: {
            computed: false,
            optional: false
          },
          c: {
            computed: false,
            optional: false
          }
        }
      };
      expect(renderer.metadata).to.deep.equal(expected);
    });

    it('as string', function() {
      var expected = (
        modelName + ':\n' +
        '- a\n' +
        '- b\n' +
        '- c'
      );
      expect(renderer.toString()).to.equal(expected);
    });
  });

  describe('Model with ID attribute', function() {
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
            computed: false,
            optional: false,
            primaryKey: true
          },
        }
      };
      expect(renderer.metadata).to.deep.equal(expected);
    });

    it('as string', function() {
      var expected = (
          modelName + ':\n' +
          '- id:\n' +
          '  - primaryKey'
          );
      expect(renderer.toString()).to.equal(expected);
    });
  });

  describe('Model with attributes and description', function() {
    var model;
    var renderer;

    beforeEach('Create renderer', function() {
      model = modella(modelName)
        .attr('a', {'description': 'attribute a'})
        .attr('b', {'description': 'attribute b'});
      renderer = new ModelRenderer(model);
    });

    it('as metadata', function() {
      var expected = {
        modelName: modelName,
        attrs: {
          a: {
            computed: false,
            description: 'attribute a',
            optional: false
          },
          b: {
            computed: false,
            description: 'attribute b',
            optional: false
          }
        }
      };
      expect(renderer.metadata).to.deep.equal(expected);
    });

    it('as string', function() {
      var expected = (
          modelName + ':\n' +
          '- a:\n' +
          '  - description: attribute a\n' +
          '- b:\n' +
          '  - description: attribute b'
          );
      expect(renderer.toString()).to.equal(expected);
    });
  });

  describe('Model with attributes and type', function() {
    var model;
    var renderer;

    beforeEach('Create renderer', function() {
      model = modella(modelName)
        .attr('a', {'type': 'string'})
        .attr('b', {'type': 'number'});
      renderer = new ModelRenderer(model);
    });

    it('as metadata', function() {
      var expected = {
        modelName: modelName,
        attrs: {
          a: {
            computed: false,
            optional: false,
            type: 'string'
          },
          b: {
            computed: false,
            optional: false,
            type: 'number'
          }
        }
      };
      expect(renderer.metadata).to.deep.equal(expected);
    });

    it('as string', function() {
      var expected = (
          modelName + ':\n' +
          '- a:\n' +
          '  - type: string\n' +
          '- b:\n' +
          '  - type: number'
          );
      expect(renderer.toString()).to.equal(expected);
    });
  });

  describe('Model with optional attributes', function() {
    var model;
    var renderer;

    beforeEach('Create renderer', function() {
      model = modella(modelName)
        .attr('a', {'required': false})
        .attr('b', {'optional': true})
        .attr('c', {'required': true, 'optional': true})
        .attr('d', {'required': false, 'optional': false});
      renderer = new ModelRenderer(model);
    });

    it('as metadata', function() {
      var expected = {
        modelName: modelName,
        attrs: {
          a: {
            computed: false,
            optional: true
          },
          b: {
            computed: false,
            optional: true,
          },
          c: {
            computed: false,
            optional: false,
          },
          d: {
            computed: false,
            optional: true,
          }
        }
      };
      expect(renderer.metadata).to.deep.equal(expected);
    });

    it('as string', function() {
      var expected = (
          modelName + ':\n' +
          '- a:\n' +
          '  - optional\n' +
          '- b:\n' +
          '  - optional\n' +
          '- c\n' +
          '- d:\n' +
          '  - optional'
          );
      expect(renderer.toString()).to.equal(expected);
    });
  });
});
