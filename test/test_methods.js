var assert = require('assert');
var getMethodsOnObject = require('../methods.js');
var setEq = require('es6-set-eq');


if (typeof(Array.from) == 'undefined') {
  Array.from = require('array-from');
}

var obj = {
  a: function() {},
  b: function() {},
  c: 1
}

var obj2 = {
  A: function() {},
  B: function() {},
  C: null,
  __proto__: obj
}

function assertSetEquals(a,b) {
  if (!setEq(a,b))
    throw new Error('Expected Set[' + a.size + '] {' + Array.from(a) + '} to equal Set[' + b.size + '] {' + Array.from(b) + '}');
  return true;
}

describe('.getMethodsOnObject', function() {
  describe ('!deep', function() {
    it('should return all the methods on an object', function() {
      assertSetEquals(new Set(['a', 'b']), new Set(getMethodsOnObject(obj)));
    });
  });

  describe('deep', function() {
    it('should return all the methods and parent methods on an object', function() {
      assertSetEquals(new Set(['a', 'b', 'A', 'B']), new Set(getMethodsOnObject(obj2, true)));
    });
  })
});
