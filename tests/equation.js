import {expect} from 'chai';
import M from '../index.js';

describe('Equations', () => {
  it('should work with one variable', () => {
    let equation = M.equation('x+2');

    expect(equation(2)).to.equal(4);

    // Issue #10
    let subtraction = M.equation('x - 3');
    expect(subtraction(10)).to.equal(7);
  });

  it('should work with multiple variables', () => {
    let equation = M.equation('x+y');
    expect(equation(2, 4)).to.equal(6);
  });

  it('should work with multiple instances of the same variable', () => {
    let equation = M.equation('x*x');
    expect(equation(4)).to.equal(16);
  });

  it('should only accept lowercase letters', () => {
    let equation = M.equation('X+2');
    expect(equation).to.throw();
  });

  it('should work with NumVariable expressions like 2x', () => {
    let equation = M.equation('2x + 6y');
    expect(equation(4, 3)).to.equal(8 + 18);
  });

  it('Test case', () => {
    let equation = M.equation('2+x*(y+4)+z^2');
    expect(equation(2, 4, 3)).to.equal(27);
  });
});
