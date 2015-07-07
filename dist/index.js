'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('babel/polyfill');

var _ReadStream = require('./readstream');

var _ReadStream2 = _interopRequireWildcard(_ReadStream);

var _operators = require('./operators');

var _operators2 = _interopRequireWildcard(_operators);

var _constants = require('./constants');

var _constants2 = _interopRequireWildcard(_constants);

var _import = require('./helpers');

var _ = _interopRequireWildcard(_import);

var Equation = {
  /**
    * Solves the given math expression, following these steps:
    * 1. Replace constants in the expression
    * 2. parse the expression, separating numbers and operators into
    *    an array
    * 3. Sort the stack by operators' precedence, it actually groups the
    *    operator with it's arguments n-level deep
    * 4. Apply parseFloat to numbers of the array
    * 5. Solve groups recursively
    *
    * @param {String} expression
    *        The math expression to solve
    * @return {Number}
    *         Result of the expression
    */
  solve: function solve(expression) {
    // replace constants with their values
    expression = replaceConstants(expression);

    var stack = parseExpression(expression);
    stack = sortStack(stack);
    stack = _.parseNumbers(stack);
    stack = solveStack(stack);

    return stack;
  },

  /**
    * Creates an equation function which replaces variables
    * in the given expression with the values specified in order,
    * and solves the new expression
    *
    * Example:
    *   equation('x+y+z')(2, 5, 6) => solve('2+5+6')
    *
    * @param {String} expression
    *        The expression to create an equation for (containing variables)
    * @return {Function}
    *         The function which replaces variables with values in order
    *         and solves the expression
    */
  equation: function equation(expression) {
    var stack = parseExpression(expression);
    var variables = [];

    stack.forEach(function varCheck(a) {
      if (Array.isArray(a)) {
        return a.forEach(varCheck);
      }
      if (isVariable(a)) {
        // grouped variables like (y) need to have their parantheses removed
        variables.push(_.removeSymbols(a));
      }
    });

    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      stack.forEach(function varCheck(a, i, arr) {
        if (Array.isArray(a)) {
          return a.forEach(varCheck);
        }

        var index = variables.indexOf(a);
        if (index > -1) {
          // grouped variables like (y) need to have their parantheses removed
          arr[i] = args[index];
        }
      });

      stack = sortStack(stack);
      stack = _.parseNumbers(stack);
      stack = solveStack(stack);

      return stack;
    };
  },

  registerOperator: function registerOperator(key, options) {
    _operators2['default'][key] = options;
  },

  registerConstant: function registerConstant(key, options) {
    _constants2['default'][key] = options;
  }
};

var solveStack = (function (_solveStack) {
  function solveStack(_x) {
    return _solveStack.apply(this, arguments);
  }

  solveStack.toString = function () {
    return _solveStack.toString();
  };

  return solveStack;
})(function (stack) {
  // if an operator takes an expression argument, we should not dive into it
  // and solve the expression inside
  var hasExpressionArgument = stack.some(function (a) {
    return _operators2['default'][a] && _operators2['default'][a].hasExpression;
  });

  if (!hasExpressionArgument && stack.some(Array.isArray)) {
    stack = stack.map(function (group) {
      if (!Array.isArray(group)) {
        return group;
      }
      return solveStack(group);
    });

    return solveStack(stack);
  } else {
    return evaluate(stack);
  }
});

var PRECEDENCES = Object.keys(_operators2['default']).map(function (key) {
  return _operators2['default'][key].precedence;
});

var MAX_PRECEDENCE = Math.max.apply(Math, _toConsumableArray(PRECEDENCES));
var MIN_PRECEDENCE = Math.min.apply(Math, _toConsumableArray(PRECEDENCES));

/**
  * Parses the given expression into an array of separated
  * numbers and operators/functions.
  * The result is passed to parseGroups
  *
  * @param {String} expression
  *        The expression to parse
  * @return {Array}
  *         The parsed array
  */
var parseExpression = function parseExpression(expression) {
  // function arguments can be separated using comma,
  // but we parse as groups, so this is the solution to getting comma to work
  // sigma(0, 4, 2@) becomes sigma(0)(4)(2@) so every argument is parsed
  // separately
  expression = expression.replace(/,/g, ')(');

  var stream = new _ReadStream2['default'](expression),
      stack = [],
      record = '',
      cur = undefined,
      past = undefined;

  // Create an array of separated numbers & operators
  while (stream.next()) {
    cur = stream.current();
    past = stack.length - 1;

    if (cur === ' ') {
      continue;
    }

    // it's probably a function with a length more than one
    if (!_.isNumber(cur) && !_operators2['default'][cur] && cur !== '.' && cur !== '(' && cur !== ')') {

      record += cur;
    } else if (record.length) {
      var beforeRecord = past - (record.length - 1);
      if (isVariable(record) && _.isNumber(stack[beforeRecord])) {
        stack.push('*');
      }
      stack.push(record, cur);
      record = '';

      // numbers and decimals
    } else if (_.isNumber(stack[past]) && (_.isNumber(cur) || cur === '.')) {

      stack[past] += cur;

      // negation sign
    } else if (stack[past] === '-') {
      var beforeSign = stack[past - 1];

      // 2 / -5 is OK, pass
      if (_operators2['default'][beforeSign]) {
        stack[past] += cur;

        // (2+1) - 5 becomes (2+1) + -5
      } else if (beforeSign === ')') {
        stack[past] = '+';
        stack.push('-' + cur);

        // 2 - 5 is also OK, pass
      } else if (_.isNumber(beforeSign) || isVariable(beforeSign)) {
        stack.push(cur);
      } else {
        stack[past] += cur;
      }
    } else {
      stack.push(cur);
    }
  }
  if (record.length) {
    var beforeRecord = past - (record.length - 1);
    if (isVariable(record) && _.isNumber(stack[beforeRecord])) {
      stack.push('*');
    }
    stack.push(record);
  }

  return parseGroups(stack);
};

/**
  * Takes the parsed array from parseExpression and
  * groups up expressions in parantheses in deep arrays
  *
  * Example: 2+(5+4) becomes [2, [5, '+', 4]]
  *
  * @param {Array} stack
  *        The parsed expression
  * @return {Array}
  *         Grouped up expression
  */
var parseGroups = function parseGroups(stack) {
  // Parantheses become inner arrays which will then be processed first
  var depth = 0;
  return stack.reduce(function (a, b) {
    if (b.indexOf('(') > -1) {
      if (b.length > 1) {
        _.dive(a, depth).push(b.replace('(', ''), []);
      } else {
        _.dive(a, depth).push([]);
      }
      depth++;
    } else if (b === ')') {
      depth--;
    } else {
      _.dive(a, depth).push(b);
    }
    return a;
  }, []);
};

/**
  * Gives information about an operator's format
  * including number of left and right arguments
  *
  * @param {String/Object} operator
  *        The operator object or operator name (e.g. +, -)
  * @return {Object}
  *         An object including the count of left and right arguments
  */
var formatInfo = function formatInfo(operator) {
  var op = typeof operator === 'string' ? _operators2['default'][operator] : operator;

  if (!op) {
    return null;
  }

  var format = op.format.split('1'),
      left = format[0].length,
      right = format[1].length;

  return { left: left, right: right };
};

/**
  * Groups up operators and their arguments based on their precedence
  * in deep arrays, the higher the priority, the deeper the group.
  * This simplifies the evaluating process, the only thing to do is to
  * evaluate from bottom up, evaluating deep groups first
  *
  * @param {Array} stack
  *        The parsed and grouped expression
  * @return {Array}
  *         Grouped expression based on precedences
  */
var sortStack = (function (_sortStack) {
  function sortStack(_x2) {
    return _sortStack.apply(this, arguments);
  }

  sortStack.toString = function () {
    return _sortStack.toString();
  };

  return sortStack;
})(function (stack) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = stack.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var index = _step$value[0];
      var item = _step$value[1];

      if (Array.isArray(item)) {
        stack.splice(index, 1, sortStack(item));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var i = MIN_PRECEDENCE; i <= MAX_PRECEDENCE; i++) {
    for (var index = 0; index < stack.length; ++index) {
      var item = stack[index];
      var op = _operators2['default'][item];

      if (!op || op.precedence !== i) {
        continue;
      }

      var _formatInfo = formatInfo(op);

      var left = _formatInfo.left;
      var right = _formatInfo.right;

      var group = stack.splice(index - left, left + right + 1, []);
      stack[index - left] = group;

      for (var y = 0; y < i; y++) {
        group = [group];
      }

      index -= right;
    }
  }

  return stack;
});

/**
  * Evaluates the given math expression.
  * The expression is an array with an operator and arguments
  *
  * Example: evaluate([2, '+', 4]) == 6
  *
  * @param {Array} stack
  *        A single math expression
  * @return {Number}
  *         Result of the expression
  */
var evaluate = function evaluate(stack) {
  var _operators$op;

  var op = findOperator(stack);
  if (!op) {
    return stack[0];
  }

  var _formatInfo2 = formatInfo(op);

  var left = _formatInfo2.left;

  var leftArguments = stack.slice(0, left),
      rightArguments = stack.slice(left + 1);

  return fixFloat((_operators$op = _operators2['default'][op]).fn.apply(_operators$op, _toConsumableArray(leftArguments).concat(_toConsumableArray(rightArguments))));
};

/**
  * Finds the first operator in an array and returns it
  *
  * @param {Array} arr
  *        The array to look for an operator in
  * @return {Object}
  *         The operator object or null if no operator is found
  */
var findOperator = function findOperator(arr) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var o = _step2.value;

      if (typeof o === 'string') {
        return o;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return null;
};

/**
  * Replaces constants in a string with their values
  *
  * @param {String} expression
  *        The expression to replace constants in
  * @return {String}
  *         The expression with constants replaced
  */
var replaceConstants = function replaceConstants(expression) {
  return expression.replace(/[A-Z]*/g, function (a) {
    var c = _constants2['default'][a];
    if (!c) {
      return a;
    }
    return typeof c === 'function' ? c() : c;
  });
};

/**
  * Fixes JavaScript's floating point precisions - Issue #5
  *
  * @param {Number} number
  *        The number to fix
  * @return {Number}
  *         Fixed number
  */
var fixFloat = function fixFloat(number) {
  return +number.toFixed(15);
};

/**
  * Recognizes variables such as x, y, z
  * @param {String} a
  *        The string to check for
  * @return {Boolean}
  *         true if variable, else false
  */

var SPECIALS = '()[]{}'.split('');
var isVariable = function isVariable(a) {
  return typeof a === 'string' && !_.isNumber(a) && !_operators2['default'][a] && a === a.toLowerCase() && SPECIALS.indexOf(a) === -1;
};

exports.isVariable = isVariable;
exports['default'] = Equation;