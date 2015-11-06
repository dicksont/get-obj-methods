/*
 * Copyright (c) 2015 Dickson Tam
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 */

(function(root) {

  if (typeof(Array.from) == 'undefined') {
    Array.from = require('array-from') || throw new Error('No suitable Array.from implementation found.')
  }

  function getMethodsOnObject(obj, deep) {

    if (obj == null)
      throw new Error('Attempted to get methods on null or undefined');

    if (typeof(obj) != 'object')
      throw new Error('Attempted to get methods on a non-object');

    if (deep) {
      return getMethodsOnObjectDeep(obj);
    } else {
      return Object.getOwnPropertyNames(obj).filter(function(p) {
        return typeof obj[p] == "function";
      });
    }

  }

  function getMethodsOnObjectDeep(obj) {
    var methods = [];

    // obj.__proto__ != null is a better alternative to obj == Object

    while (obj != null && obj.__proto__ != null) {
      methods = methods.concat(getMethodsOnObject(obj));
      obj = obj.__proto__;
    }

    return Array.from(new Set(methods));
  }

  if (typeof(module) != 'undefined' && module && module.exports) {
    module.exports = getMethodsOnObject;
  } else if (typeof define === 'function' && define.amd) {
    define('get-obj-methods', [], function() {
      return getMethodsOnObject;
    });
  } else {
    root.getMethodsOnObject = getMethodsOnObject;
  }

})(this)
