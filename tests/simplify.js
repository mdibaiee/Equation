import {expect} from 'chai';
import M from '../index.js';

describe('Simplify simple math expressions', () => {
  it('should work for add +', () => {
    expect(M.simplify('2+2-1')).to.equal('3');
  });
  //
  // it('should work for minus -', () => {
  //   expect(M.solve('15-3')).to.equal(12);
  // });
  //
  // it('should work for divison /', () => {
  //   expect(M.solve('20/2')).to.equal(10);
  // });
  //
  // it('should work for multiplication *', () => {
  //   expect(M.solve('6*3')).to.equal(18);
  // });
  //
  // it('should work for power ^', () => {
  //   expect(M.solve('5^2')).to.equal(25);
  // });
  //
  // it('should work for multi-digit numbers', () => {
  //   expect(M.solve('12+15')).to.equal(27);
  // });
});
