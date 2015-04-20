Equation
========
Solve math expressions or create equations for repeated and complex Math tasks.

To use in browser, download [`equation.min.js`](https://raw.githubusercontent.com/mdibaiee/Equation.js/master/equation.min.js).

```javascript
// solve
console.log(Equation.solve('4 * lg(4) ^ 3')); // 32

// equation
let sphereArea = Equation.equation('4 * PI * r^2');

console.log(sphereArea(5)); // 314.1592653589793
```

You can also register your own operators and constants.

```javascript
// these options are explained below
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
```

API
===
####solve(expression: String)
Takes a math expression and evaluates it, returning the result.

###equation(expression: String)
Takes a math expression containing variables, returning a function which
replaces the variables with given arguments, and solves the expression.

###registerOperator(key: String, options: Object)
Registers a new operator.

Options:

#####fn
  The function which runs on arguments
#####format
  The format which specifies how arguments are placed relative to operator, this is a string in which 1 indicates operator and zeroes indicate arguments.

  For example `+` has the format `010` and factorial has `01`.
#####precedence
  Specifies the precedence of operator. The less the value, the higher the precedence, resulting in soon execution.

###registerConstant(key: String, value: Function/Number)
Registers a new constant. value can be a function (takes no arguments), or a constant number.

That's right, we have named these *constants* but they actually can change, that's why we can use functions to define them. An example is the `RAND` constant which calls `Math.random`.
TODO
====
* Equation solver
* More tests
