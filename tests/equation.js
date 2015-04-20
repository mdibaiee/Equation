import {expect} from 'chai';
import M from '../index.js';

describe('Equations', () => {
  it('should work with one variable', () => {
    let equation = M.equation('x+2');

    expect(equation(2)).to.equal(4);
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

  it('Test case', () => {
    let equation = M.equation('2+x*(y+4)+z^2');
    expect(equation(2, 4, 3)).to.equal(27);
  });
});
