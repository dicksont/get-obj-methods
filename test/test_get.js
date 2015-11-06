var assert = require('assert');
var getMethodsInObject = require('../index.js');
var setEq = require('es6-set-eq');


var obj = {
  a: function() {},
  b: function() {},
  c: 1
}

var obj2 = {
  A: function() {},
  B: function() {},
  C: null,
}

obj2.__proto__ = obj;

function seteq(a, b) {
  if (a != b) {
    if (!a || !b) { return false; }
    for (var e of a) {
      if (!b.has(e)) { return false; }
    }
  }
  return true;
}

describe('.getMethodsInObject', function() {
  describe ('!recursive', function() {
    it('should return all the methods in an object', function() {
      assert.ok(setEq(new Set(['a', 'b']), getMethodsInObject(obj)));
    });
  });

  describe('recursive', function() {
    it('should return all the methods and parent methods in an object', function() {
      assert.ok(setEq(new Set(['a', 'b', 'A', 'B']), getMethodsInObject(obj)));
    });
  })
});
