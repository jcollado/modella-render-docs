# modella-render-docs

[![npm](https://img.shields.io/npm/v/modella-render-docs.svg)](https://www.npmjs.com/package/modella-render-docs)
[![MIT license](https://img.shields.io/npm/l/modella-render-docs.svg)](https://github.com/jcollado/modella-render-docs/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/jcollado/modella-render-docs.svg)](https://travis-ci.org/jcollado/modella-render-docs)
[![Coverage Status](https://coveralls.io/repos/jcollado/modella-render-docs/badge.svg?branch=master&service=github)](https://coveralls.io/github/jcollado/modella-render-docs?branch=master)
[![Dependency Status](https://david-dm.org/jcollado/modella-render-docs.svg)](https://david-dm.org/jcollado/modella-render-docs)
[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

Render documentation from a [modella](https://www.npmjs.com/package/modella) model

## Example

    var modella = require('modella');
    var ModelRenderer = require('modella-render-docs');

    var model = modella('Model');
    var renderer = new ModelRenderer(model);
    console.log(renderer.toString());
