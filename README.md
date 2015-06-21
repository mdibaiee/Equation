Equation [![Build Status](https://travis-ci.org/mdibaiee/Equation.svg?branch=master)](https://travis-ci.org/mdibaiee/Equation)
========
Solve math expressions or create equations for repeated and complex Math tasks.

To use in browser, download [`equation.min.js`](https://raw.githubusercontent.com/mdibaiee/Equation/master/equation.min.js).

Install using npm:

```
npm install equations
```

####Examples:

```javascript
// solve
console.log(Equation.solve('4 * lg(4) ^ 3')); // 32

// equation
let sphereArea = Equation.equation('4 * PI * r^2');
console.log(sphereArea(5)); // 314.1592653589793

let test = Equation.equation('2x + 6y');
console.log(test(4, 3)).to.equal(8 + 18);
```

You can also register your own operators and constants.

```javascript
// these options are explained in [`operators.js`](https://github.com/mdibaiee/Equation/blob/master/lib/operators.js).
Equation.registerOperator('$', {
  fn: a => 1/a,
  format: '10',
  precedence: 2
});

Equation.solve('$2'); // 0.5
Equation.solve('$5'); // 0.2

Equation.registerConstant('N', () => {
  return Math.random() * 10 + 10
});

Equation.solve('N'); // a number between 10 and 20

// Complex operators
Equation.solve('sigma(0, 5, 2@ + 5)'); // 60
```

For a list of operators and constants see [`operators.js`](https://github.com/mdibaiee/Equation/blob/master/lib/operators.js) and [`constants.js`](https://github.com/mdibaiee/Equation/blob/master/lib/constants.js).

API
===
####solve(expression: String)
Takes a math expression and evaluates it, returning the result.

####equation(expression: String)
Takes a math expression containing variables, returning a function which
replaces the variables with given arguments, and solves the expression.

####registerOperator(key: String, options: Object)
Registers a new operator.

Options:

#####fn
  The function which is run on arguments and returns the result
#####format
  The format which specifies how arguments are placed relative to operator, this is a string in which 1 represents the operator and zeroes represent arguments.

  For example `+` has the format `010` and factorial has `01`.
#####precedence
  Specifies the precedence of operator. The less the value, the higher the precedence, resulting in sooner execution.

####registerConstant(key: String, value: Function/Number)
Registers a new constant. value can be a function (takes no arguments), or a constant number.

That's right, we have named these *constants* but they actually can change, that's why we can use functions to define them. An example is the `RAND` constant which calls `Math.random`.

Contributing
============
The code is commented and I hope you don't have a hard time contributing,
anyway, some tips about contributing:

The source code is in `lib` directory and is then transpiled into `dist`.

#####Grunt Tasks
######default
Transpiles `lib` to `dist`
######build
Transpiles, browserifies, uglifies
######eslint
Runs ESLint on `lib` and `tests`
######test
Runs the tests

---
Please make sure to run `grunt eslint` before commiting.

If you're adding something new, please add a test, too.
