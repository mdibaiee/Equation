'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (string) {
  var i = 0,
      buffer = [];
  return {
    next: function next() {
      buffer.push(string[i]);

      if (i >= string.length) {
        return null;
      }
      return string[i++];
    },
    current: function current() {
      return string[i - 1];
    },
    index: function index() {
      return i - 1;
    },
    to: function to(n) {
      var temp = '';
      var dest = i + n;
      for (i = i; i < dest; ++i) {
        temp += [string[i]];
      }
      return temp;
    },
    drain: function drain() {
      return buffer.splice(0, buffer.length);
    },
    replace: (function (_replace) {
      function replace(_x, _x2, _x3) {
        return _replace.apply(this, arguments);
      }

      replace.toString = function () {
        return _replace.toString();
      };

      return replace;
    })(function (start, end, replace) {
      var temp = string.split('');
      temp.splice(start, end, replace);
      string = temp.join('');

      i = i - (end - start);
    }),
    go: function go(n) {
      i += n;
    },
    all: function all() {
      return string;
    }
  };
};

module.exports = exports['default'];