'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _indexJs = require('../index.js');

var _indexJs2 = _interopRequireDefault(_indexJs);

describe('Basic math operators', function () {
  it('should work for add +', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('2+2')).to.equal(4);
  });

  it('should work for minus -', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('15-3')).to.equal(12);
  });

  it('should work for divison /', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('20/2')).to.equal(10);
  });

  it('should work for multiplication *', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('6*3')).to.equal(18);
  });

  it('should work for power ^', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('5^2')).to.equal(25);
  });

  it('should work for multi-digit numbers', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('12+15')).to.equal(27);
  });

  it('should deal with floating precision of javascript - #5', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('0.2 + 0.1')).to.equal(0.3);
    (0, _chai.expect)(_indexJs2['default'].solve('0.2 + 0.4')).to.equal(0.6);
    (0, _chai.expect)(_indexJs2['default'].solve('round(floor(1.23456789/0.2)) * 0.2')).to.equal(1.2);
    (0, _chai.expect)(_indexJs2['default'].solve('1.23456789 - (1.23456789 % 0.2)')).to.equal(1.2);
  });
});

describe('Negative Numbers', function () {
  it('should work for negative numbers after operators', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('2 + -5')).to.equal(-3);
  });

  it('should work for negative numbers after groups', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('1 + (2 - 5) - 2')).to.equal(-4);
  });

  it('should work for expressions starting with negative numbers', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('-2 + 1')).to.equal(-1);
  });
});

describe('Precedence', function () {
  it('Test case 1', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('2+(2+1)*(1+1)^2')).to.equal(14);
  });

  it('Test case 2', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('2+5*4/2-2')).to.equal(10);
  });

  it('Test case 3', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('2+(5*4/2)-2')).to.equal(10);
  });

  it('Test case 4', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('(2+2)^2+(5+1)*4+(2+(4/2)/2)')).to.equal(16 + 24 + 3);
  });
});

describe('Functions', function () {
  it('should work with parantheses', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('lg(4) * 5')).to.equal(10);
  });

  it('should work without parantheses', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('lg4 * 5')).to.equal(10);
  });

  it('should work for wrapped functions', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('(lg4)*2')).to.equal(4);
  });
});

describe('Constats', function () {
  it('should work for constant values', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('sin(PI/2)')).to.equal(1);
  });

  it('should work for functions as constants - retry on fail', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('RAND')).to.not.equal(_indexJs2['default'].solve('RAND'));
  });
});

describe('Sigma', function () {
  it('should work with simple expressions', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('sigma(0, 5, @)')).to.equal(15);
  });

  it('should work with more complex expressions', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('sigma(0, 2, 2@+5)')).to.equal(21);
  });

  it('should work without an iterator sign', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('sigma(0, 2, 5*2)')).to.equal(30);
  });

  it('should work with negative start / end points', function () {
    (0, _chai.expect)(_indexJs2['default'].solve('sigma(-5, -2, @)')).to.equal(-14);
  });
});
