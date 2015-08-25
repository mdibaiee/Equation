'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _expect = require('chai');

var _M = require('../index.js');

var _M2 = _interopRequireWildcard(_M);

describe('Equations', function () {
  it('should work with one variable', function () {
    var equation = _M2['default'].equation('x+2');

    _expect.expect(equation(2)).to.equal(4);

    // Issue #10
    var subtraction = _M2['default'].equation('x - 3');
    _expect.expect(subtraction(10)).to.equal(7);
  });

  it('should work with multiple variables', function () {
    var equation = _M2['default'].equation('x+y');
    _expect.expect(equation(2, 4)).to.equal(6);
  });

  it('should work with multiple instances of the same variable', function () {
    var equation = _M2['default'].equation('x*x');
    _expect.expect(equation(4)).to.equal(16);
  });

  it('should only accept lowercase letters', function () {
    var equation = _M2['default'].equation('X+2');
    _expect.expect(equation).to['throw']();
  });

  it('should work with NumVariable expressions like 2x', function () {
    var equation = _M2['default'].equation('2x + 6y');
    _expect.expect(equation(4, 3)).to.equal(8 + 18);
  });

  it('Test case', function () {
    var equation = _M2['default'].equation('2+x*(y+4)+z^2');
    _expect.expect(equation(2, 4, 3)).to.equal(27);
  });
});