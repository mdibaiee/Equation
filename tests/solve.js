import {expect} from 'chai';
import M from '../index.js';

describe('Basic math operators', () => {
  it('should work for add +', () => {
    expect(M.solve('2+2')).to.equal(4);
  });

  it('should work for minus -', () => {
    expect(M.solve('15-3')).to.equal(12);
  });

  it('should work for divison /', () => {
    expect(M.solve('20/2')).to.equal(10);
  });

  it('should work for multiplication *', () => {
    expect(M.solve('6*3')).to.equal(18);
  });

  it('should work for power ^', () => {
    expect(M.solve('5^2')).to.equal(25);
  });

  it('should work for multi-digit numbers', () => {
    expect(M.solve('12+15')).to.equal(27);
  });

  it('should deal with floating precision of javascript - #5', () => {
    expect(M.solve('0.2 + 0.1')).to.equal(0.3);
    expect(M.solve('0.2 + 0.4')).to.equal(0.6);
    expect(M.solve('round(floor(1.23456789/0.2)) * 0.2')).to.equal(1.2);
    expect(M.solve('1.23456789 - (1.23456789 % 0.2)')).to.equal(1.2);
  });
});

describe('Negative Numbers', () => {
  it('should work for negative numbers after operators', () => {
    expect(M.solve('2 + -5')).to.equal(-3);
  });

  it('should work for negative numbers after groups', () => {
    expect(M.solve('1 + (2 - 5) - 2')).to.equal(-4);
  });

  it('should work for expressions starting with negative numbers', () => {
    expect(M.solve('-2 + 1')).to.equal(-1);
  });
});

describe('Precedence', () => {
  it('Test case 1', () => {
    expect(M.solve('2+(2+1)*(1+1)^2')).to.equal(14);
  });

  it('Test case 2', () => {
    expect(M.solve('2+5*4/2-2')).to.equal(10);
  });

  it('Test case 3', () => {
    expect(M.solve('2+(5*4/2)-2')).to.equal(10);
  });

  it('Test case 4', () => {
    expect(M.solve('(2+2)^2+(5+1)*4+(2+(4/2)/2)')).to.equal(16 + 24 + 3);
  });
});

describe('Functions', () => {
  it('should work with parantheses', () => {
    expect(M.solve('lg(4) * 5')).to.equal(10);
  });

  it('should work without parantheses', () => {
    expect(M.solve('lg4 * 5')).to.equal(10);
  });

  it('should work for wrapped functions', () => {
    expect(M.solve('(lg4)*2')).to.equal(4);
  });
});

describe('Constats', () => {
  it('should work for constant values', () => {
    expect(M.solve('sin(PI/2)')).to.equal(1);
  });

  it('should work for functions as constants - retry on fail', () => {
    expect(M.solve('RAND')).to.not.equal(M.solve('RAND'));
  });
});

describe('Sigma', () => {
  it('should work with simple expressions', () => {
    expect(M.solve('sigma(0, 5, @)')).to.equal(15);
  });

  it('should work with more complex expressions', () => {
    expect(M.solve('sigma(0, 2, 2@+5)')).to.equal(21);
  });

  it('should work without an iterator sign', () => {
    expect(M.solve('sigma(0, 2, 5*2)')).to.equal(30);
  });

  it('should work with negative start / end points', () => {
    expect(M.solve('sigma(-5, -2, @)')).to.equal(-14);
  });
});
