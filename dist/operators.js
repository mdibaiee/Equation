'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/*
 * Operators and Functions
 * fn: function used to evaluate value
 * format: the format using which arguments are parsed:
 *         0 indicates an argument and 1 indicates the operator
 *         e.g: factorial is 01, add is 010, like 2!, 2+2
 * precedence: determines which operators should be evaluated first
 *             the lower the value, the higher the precedence
 */
exports['default'] = {
  '^': {
    fn: function fn(a, b) {
      return Math.pow(a, b);
    },
    format: '010',
    precedence: 0
  },
  '*': {
    fn: function fn(a, b) {
      return a * b;
    },
    format: '010',
    precedence: 1
  },
  '/': {
    fn: function fn(a, b) {
      return a / b;
    },
    format: '010',
    precedence: 1
  },
  '%': {
    fn: function fn(a, b) {
      return a % b;
    },
    format: '010',
    precedence: 1
  },
  '\\': {
    fn: function fn(a, b) {
      return Math.floor(a / b);
    },
    format: '010',
    precedence: 1
  },
  '+': {
    fn: function fn(a, b) {
      return a + b;
    },
    format: '010',
    precedence: 2
  },
  '-': {
    fn: function fn(a, b) {
      return a - b;
    },
    format: '010',
    precedence: 2
  },
  '!': {
    fn: function fn(a) {
      var sum = 1;
      for (var i = 0; i < a; ++i) {
        sum *= i;
      }
      return sum;
    },
    format: '01',
    precedence: 2
  },
  log: {
    fn: Math.log,
    format: '10',
    precedence: -1
  },
  ln: {
    fn: Math.log,
    format: '10',
    precedence: -1
  },
  lg: {
    fn: function fn(a) {
      return Math.log(a) / Math.log(2);
    },
    format: '10',
    precedence: -1
  },
  sin: {
    fn: Math.sin,
    format: '10',
    precedence: -1
  },
  cos: {
    fn: Math.cos,
    format: '10',
    precedence: -1
  },
  tan: {
    fn: Math.tan,
    format: '10',
    precedence: -1
  },
  cot: {
    fn: Math.cot,
    format: '10',
    precedence: -1
  },
  round: {
    fn: Math.round,
    format: '10',
    precedence: -1
  },
  floor: {
    fn: Math.floor,
    format: '10',
    precedence: -1
  }
};
module.exports = exports['default'];