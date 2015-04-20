Equation
========
Solve math expressions or create equations for repeated and complex Math tasks.

```javascript
// solve
console.log(Equation.solve('4 * lg4 ^ 3')); // 32

// equation
let sphereArea = Equation.equation('4 * PI * r^2');

console.log(sphereArea(5)); // 314.1592653589793
```

API
===
####solve(expression: String)
Takes a math expression and evaluates it, returning the result.

###equation(expression: String)
Takes a math expression containing variables, returning a function which
replaces the variables with given arguments, and solves the expression.

TODO
====
* Equation solver
* More tests
