import 'babel/polyfill';
import ReadStream from './readstream';
import operators from './operators';
import constants from './constants';
import * as _ from './helpers';

let Equation = {
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
  solve(expression) {
    // replace constants with their values
    expression = replaceConstants(expression);

    let stack = parseExpression(expression);
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
  equation(expression) {
    let stack = parseExpression(expression);
    let variables = [];

    stack.forEach(function varCheck(a) {
      if (Array.isArray(a)) {
        return a.forEach(varCheck);
      }
      if (isVariable(a)) {
        // grouped variables like (y) need to have their parantheses removed
        variables.push(_.removeSymbols(a));
      }
    });

    return function(...args) {
      stack.forEach(function varCheck(a, i, arr) {
        if (Array.isArray(a)) {
          return a.forEach(varCheck);
        }

        let index = variables.indexOf(a);
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

  registerOperator(key, options) {
    operators[key] = options;
  },

  registerConstant(key, options) {
    constants[key] = options;
  }
};

const solveStack = stack => {
  // if an operator takes an expression argument, we should not dive into it
  // and solve the expression inside
  const hasExpressionArgument = stack.some(a => {
    return operators[a] && operators[a].hasExpression;
  });

  if (!hasExpressionArgument && stack.some(Array.isArray)) {
    stack = stack.map(group => {
      if (!Array.isArray(group)) {
        return group;
      }
      return solveStack(group);
    });

    return solveStack(stack);
  } else {
    return evaluate(stack);
  }
};

const PRECEDENCES = Object.keys(operators).map(key => {
  return operators[key].precedence;
});

const MAX_PRECEDENCE = Math.max(...PRECEDENCES);
const MIN_PRECEDENCE = Math.min(...PRECEDENCES);

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
const parseExpression = expression => {
  // function arguments can be separated using comma,
  // but we parse as groups, so this is the solution to getting comma to work
  // sigma(0, 4, 2@) becomes sigma(0)(4)(2@) so every argument is parsed
  // separately
  expression = expression.replace(/,/g, ')(');

  let stream = new ReadStream(expression),
      stack = [],
      record = '',
      cur, past;

  // Create an array of separated numbers & operators
  while (stream.next()) {
    cur = stream.current();
    past = stack.length - 1;

    if (cur === ' ') {
      continue;
    }

    // it's probably a function with a length more than one
    if (!_.isNumber(cur) && !operators[cur] && cur !== '.' &&
        cur !== '(' && cur !== ')') {

      record += cur;
    } else if (record.length) {
      let beforeRecord = past - (record.length - 1);
      if (isVariable(record) && _.isNumber(stack[beforeRecord])) {
        stack.push('*');
      }
      stack.push(record, cur);
      record = '';

    // numbers and decimals
    } else if (_.isNumber(stack[past]) &&
              (_.isNumber(cur) || cur === '.')) {

      stack[past] += cur;

      // negation sign
    } else if (stack[past] === '-') {
      const beforeSign = stack[past - 1];

      // 2 / -5 is OK, pass
      if (operators[beforeSign]) {
        stack[past] += cur;

        // (2+1) - 5 becomes (2+1) + -5
      } else if (beforeSign === ')') {
        stack[past] = '+';
        stack.push(`-${cur}`);

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
    let beforeRecord = past - (record.length - 1);
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
const parseGroups = stack => {
  // Parantheses become inner arrays which will then be processed first
  let depth = 0;
  return stack.reduce((a, b) => {
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
const formatInfo = operator => {
  let op = typeof operator === 'string' ? operators[operator]
                                        : operator;

  if (!op) {
    return null;
  }

  const format = op.format.split('1'),
        left = format[0].length,
        right = format[1].length;

  return { left, right };
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
const sortStack = stack => {
  for (let [index, item] of stack.entries()) {
    if (Array.isArray(item)) {
      stack.splice(index, 1, sortStack(item));
    }
  }

  for (let i = MIN_PRECEDENCE; i <= MAX_PRECEDENCE; i++) {
    for (let index = 0; index < stack.length; ++index) {
      let item = stack[index];
      let op = operators[item];

      if (!op || op.precedence !== i) {
        continue;
      }

      const { left, right } = formatInfo(op);
      let group = stack.splice(index - left, left + right + 1, []);
      stack[index - left] = group;

      for (let y = 0; y < i; y++) {
        group = [group];
      }

      index -= right;
    }
  }

  return stack;
};

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
const evaluate = stack => {
  const op = findOperator(stack);
  if (!op) {
    return stack[0];
  }

  const { left } = formatInfo(op);

  let leftArguments = stack.slice(0, left),
      rightArguments = stack.slice(left + 1);

  return fixFloat(operators[op].fn(...leftArguments, ...rightArguments));
};

/**
  * Finds the first operator in an array and returns it
  *
  * @param {Array} arr
  *        The array to look for an operator in
  * @return {Object}
  *         The operator object or null if no operator is found
  */
const findOperator = arr => {
  for (let o of arr) {
    if (typeof o === 'string') {
      return o;
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
const replaceConstants = expression => {
  return expression.replace(/[A-Z]*/g, (a) => {
    let c = constants[a];
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
const fixFloat = number => {
  return +number.toFixed(15);
};

/**
  * Recognizes variables such as x, y, z
  * @param {String} a
  *        The string to check for
  * @return {Boolean}
  *         true if variable, else false
  */

const SPECIALS = '()[]{}'.split('');
export const isVariable = a => {
  return typeof a === 'string' && !_.isNumber(a) &&
         !operators[a] && a === a.toLowerCase() && SPECIALS.indexOf(a) === -1;
};

export default Equation;
