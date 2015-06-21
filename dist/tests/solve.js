'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _expect = require('chai');

var _M = require('../index.js');

var _M2 = _interopRequireWildcard(_M);

describe('Basic math operators', function () {
  it('should work for add +', function () {
    _expect.expect(_M2['default'].solve('2+2')).to.equal(4);
  });

  it('should work for minus -', function () {
    _expect.expect(_M2['default'].solve('15-3')).to.equal(12);
  });

  it('should work for divison /', function () {
    _expect.expect(_M2['default'].solve('20/2')).to.equal(10);
  });

  it('should work for multiplication *', function () {
    _expect.expect(_M2['default'].solve('6*3')).to.equal(18);
  });

  it('should work for power ^', function () {
    _expect.expect(_M2['default'].solve('5^2')).to.equal(25);
  });

  it('should work for multi-digit numbers', function () {
    _expect.expect(_M2['default'].solve('12+15')).to.equal(27);
  });

  it('should deal with floating precision of javascript - #5', function () {
    _expect.expect(_M2['default'].solve('0.2 + 0.1')).to.equal(0.3);
    _expect.expect(_M2['default'].solve('0.2 + 0.4')).to.equal(0.6);
    _expect.expect(_M2['default'].solve('round(floor(1.23456789/0.2)) * 0.2')).to.equal(1.2);
    _expect.expect(_M2['default'].solve('1.23456789 - (1.23456789 % 0.2)')).to.equal(1.2);
  });
});

describe('Negative Numbers', function () {
  it('should work for negative numbers after operators', function () {
    _expect.expect(_M2['default'].solve('2 + -5')).to.equal(-3);
  });

  it('should work for negative numbers after groups', function () {
    _expect.expect(_M2['default'].solve('1 + (2 - 5) - 2')).to.equal(-4);
  });

  it('should work for expressions starting with negative numbers', function () {
    _expect.expect(_M2['default'].solve('-2 + 1')).to.equal(-1);
  });
});

describe('Precedence', function () {
  it('Test case 1', function () {
    _expect.expect(_M2['default'].solve('2+(2+1)*(1+1)^2')).to.equal(14);
  });

  it('Test case 2', function () {
    _expect.expect(_M2['default'].solve('2+5*4/2-2')).to.equal(10);
  });

  it('Test case 3', function () {
    _expect.expect(_M2['default'].solve('2+(5*4/2)-2')).to.equal(10);
  });

  it('Test case 4', function () {
    _expect.expect(_M2['default'].solve('(2+2)^2+(5+1)*4+(2+(4/2)/2)')).to.equal(16 + 24 + 3);
  });
});

describe('Functions', function () {
  it('should work with parantheses', function () {
    _expect.expect(_M2['default'].solve('lg(4) * 5')).to.equal(10);
  });

  it('should work without parantheses', function () {
    _expect.expect(_M2['default'].solve('lg4 * 5')).to.equal(10);
  });

  it('should work for wrapped functions', function () {
    _expect.expect(_M2['default'].solve('(lg4)*2')).to.equal(4);
  });
});

describe('Constats', function () {
  it('should work for constant values', function () {
    _expect.expect(_M2['default'].solve('sin(PI/2)')).to.equal(1);
  });

  it('should work for functions as constants - retry on fail', function () {
    _expect.expect(_M2['default'].solve('RAND')).to.not.equal(_M2['default'].solve('RAND'));
  });
});

describe('Sigma', function () {
  it('should work with simple expressions', function () {
    _expect.expect(_M2['default'].solve('sigma(0, 5, @)')).to.equal(15);
  });

  it('should work with more complex expressions', function () {
    _expect.expect(_M2['default'].solve('sigma(0, 2, 2@+5)')).to.equal(21);
  });

  it('should work without an iterator sign', function () {
    _expect.expect(_M2['default'].solve('sigma(0, 2, 5*2)')).to.equal(30);
  });

  it('should work with negative start / end points', function () {
    _expect.expect(_M2['default'].solve('sigma(-5, -2, @)')).to.equal(-14);
  });
});