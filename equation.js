(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Equation = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/*
 * Constats
 * Keys must be UPPERCASE
 * Values Can be a constant value or a function returning a value
 *        this function doesn't take any arguments (use case: random constats)
 */
exports['default'] = {
  PI: Math.PI,
  E: Math.E,
  RAND: Math.random
};
module.exports = exports['default'];
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var parseFormat = function parseFormat(a) {
  var split = a.split('1');
  return {
    left: split[0].length,
    right: split[1].length
  };
};

exports.parseFormat = parseFormat;
var isNumber = function isNumber(a) {
  return !isNaN(+a);
};

exports.isNumber = isNumber;
var parseNumbers = (function (_parseNumbers) {
  function parseNumbers(_x) {
    return _parseNumbers.apply(this, arguments);
  }

  parseNumbers.toString = function () {
    return _parseNumbers.toString();
  };

  return parseNumbers;
})(function (a) {
  return a.map(function (b) {
    if (isNumber(b)) {
      return parseFloat(b);
    }
    if (Array.isArray(b)) {
      return parseNumbers(b);
    }
    return b;
  });
});

exports.parseNumbers = parseNumbers;
var dive = function dive(arr, n) {
  var result = arr;
  for (var i = 0; i < n; ++i) {
    result = result[result.length - 1];
  }
  return result;
};

exports.dive = dive;
var deep = (function (_deep) {
  function deep(_x2, _x3) {
    return _deep.apply(this, arguments);
  }

  deep.toString = function () {
    return _deep.toString();
  };

  return deep;
})(function (arr, n) {
  var index = arguments[2] === undefined ? 0 : arguments[2];

  if (n < 2) {
    return { arr: arr, index: index };
  }

  var d = arr.reduce(function (a, b, i) {
    if (Array.isArray(b)) {
      var _deep2 = deep(b, n - 1, i);

      var _arr = _deep2.arr;
      var x = _deep2.index;
      var merged = a.concat(_arr);

      index = x;
      return merged;
    }
    return a;
  }, []);

  return { arr: d, index: index };
});

exports.deep = deep;
var diveTo = (function (_diveTo) {
  function diveTo(_x4, _x5, _x6) {
    return _diveTo.apply(this, arguments);
  }

  diveTo.toString = function () {
    return _diveTo.toString();
  };

  return diveTo;
})(function (arr, indexes, replace) {
  var answer = [];
  if (indexes.some(Array.isArray)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = indexes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var index = _step.value;

        answer.push(diveTo(arr, index, replace));
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
  } else {
    arr[indexes[0]] = replace;
    return replace;
  }

  return answer;
});

exports.diveTo = diveTo;
var flatten = (function (_flatten) {
  function flatten(_x7) {
    return _flatten.apply(this, arguments);
  }

  flatten.toString = function () {
    return _flatten.toString();
  };

  return flatten;
})(function (arr) {
  if (!Array.isArray(arr) || !arr.some(Array.isArray)) {
    return arr;
  }

  return arr.reduce(function (a, b) {
    return a.concat(flatten(b));
  }, []);
});

exports.flatten = flatten;
var removeSymbols = function removeSymbols(string) {
  return string.replace(/\W/g, '');
};
exports.removeSymbols = removeSymbols;
},{}],3:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ReadStream = require('./readstream');

var _ReadStream2 = _interopRequireWildcard(_ReadStream);

var _operators = require('./operators');

var _operators2 = _interopRequireWildcard(_operators);

var _constants = require('./constats');

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

    stack.forEach(function (a) {
      if (typeof a === 'string' && !_.isNumber(a) && !_operators2['default'][a] && a === a.toLowerCase()) {
        // grouped variables like (y) need to have their parantheses removed
        variables.push(_.removeSymbols(a));
      }
    });

    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      expression = expression.replace(/[a-z]*/g, function (a) {
        var index = variables.indexOf(a);
        if (index > -1) {
          return args[index] || 0;
        }
        return a;
      });

      return Equation.solve(expression);
    };
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
  // $0(stack);
  if (stack.some(Array.isArray)) {
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
  var stream = new _ReadStream2['default'](expression),
      stack = [],
      record = '';

  // Create an array of separated numbers & operators
  while (stream.next()) {
    var cur = stream.current();
    if (cur === ' ') {
      continue;
    }
    // it's probably a function with a length more than one
    if (!_.isNumber(cur) && !_operators2['default'][cur] && cur !== '.') {
      record += cur;
    } else if (record.length) {
      stack.push(record, cur);
      record = '';
    } else if (_.isNumber(stack[stack.length - 1]) && (_.isNumber(cur) || cur === '.')) {

      stack[stack.length - 1] += cur;
    } else {
      stack.push(cur);
    }
  }
  if (record.length) {
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
  var sub = 0;
  return stack.reduce(function (a, b) {
    if (b.indexOf('(') > -1) {
      if (b.length > 1) {
        _.dive(a, sub).push(b.replace('(', ''), []);
      } else {
        _.dive(a, sub).push([]);
      }
      sub++;
    } else if (b === ')') {
      sub--;
    } else {
      _.dive(a, sub).push(b);
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

  return (_operators$op = _operators2['default'][op]).fn.apply(_operators$op, _toConsumableArray(leftArguments).concat(_toConsumableArray(rightArguments)));
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

exports['default'] = Equation;
module.exports = exports['default'];
},{"./constats":1,"./helpers":2,"./operators":4,"./readstream":5}],4:[function(require,module,exports){
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
  }
};
module.exports = exports['default'];
},{}],5:[function(require,module,exports){
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
},{}]},{},[3])(3)
});