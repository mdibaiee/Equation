'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _indexJs = require('../index.js');

var _indexJs2 = _interopRequireDefault(_indexJs);

describe('Equations', function () {
  it('should work with one variable', function () {
    var equation = _indexJs2['default'].equation('x+2');

    (0, _chai.expect)(equation(2)).to.equal(4);

    // Issue #10
    var subtraction = _indexJs2['default'].equation('x - 3');
    (0, _chai.expect)(subtraction(10)).to.equal(7);
  });

  it('should work with multiple variables', function () {
    var equation = _indexJs2['default'].equation('x+y');
    (0, _chai.expect)(equation(2, 4)).to.equal(6);
  });

  it('should work with multiple instances of the same variable', function () {
    var equation = _indexJs2['default'].equation('x*x');
    (0, _chai.expect)(equation(4)).to.equal(16);
  });

  it('should only accept lowercase letters', function () {
    var equation = _indexJs2['default'].equation('X+2');
    (0, _chai.expect)(equation).to['throw']();
  });

  it('should work with NumVariable expressions like 2x', function () {
    var equation = _indexJs2['default'].equation('2x + 6y');
    (0, _chai.expect)(equation(4, 3)).to.equal(8 + 18);
  });

  it('Test case', function () {
    var equation = _indexJs2['default'].equation('2+x*(y+4)+z^2');
    (0, _chai.expect)(equation(2, 4, 3)).to.equal(27);
  });
});
