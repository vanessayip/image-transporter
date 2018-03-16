const chai = require('chai');
const expect = chai.expect;
const encoder = require('./encoder.js');
const decoder = require('./decoder.js');
chai.use(require('chai-fs'));

describe('Test spec for ascii image transport', () => {
  
  describe('Test for encoder', () => {
    let inputFile = 'small-img.txt';
    it('the output of the function should be a promise', () => {
      expect(encoder(inputFile)).to.be.a('promise');
    });
    it('in the output promise, a hashmap would be produced', () => {
      encoder(inputFile)
      .then((encoderResult) => {
        expect(encoderResult).to.be.an('object');
      })
    });
  });

  describe('Test for decoder', () => {
    let map = { 
      a: [ [ 0, 0 ], [ 2, 0 ] ],
      b: [ [ 0, 1 ], [ 2, 1 ], [ 3, 1 ] ],
      c: [ [ 0, 2 ], [ 3, 2 ] ],
      d: [ [ 0, 3 ] ],
      e: [ [ 0, 4 ] ],
      '~': [ [ 1, 0 ] ],
      '!': [ [ 1, 1 ] ],
      '@': [ [ 1, 2 ] ],
      '#': [ [ 1, 3 ] ],
      '$': [ [ 1, 4 ] ],
      C: [ [ 2, 2 ] ],
      ' ': [ [ 2, 3 ] ],
      '<': [ [ 2, 4 ] ],
      A: [ [ 3, 0 ] ],
      D: [ [ 3, 3 ] ],
      E: [ [ 3, 4 ] ],
      '{': [ [ 4, 0 ] ],
      '}': [ [ 4, 1 ] ],
      '|': [ [ 4, 2 ] ],
      ':': [ [ 4, 3 ] ],
      '"': [ [ 4, 4 ] ] 
    };

    it('in the output promise, a txt file would be produced and is not empty', () => {
      decoder(map, 5, 'small-img-output.txt')
      .then((decoderResult) => {
        expect(`${__dirname}/small-img-output.txt`).to.be.a.file().and.not.empty;
      })
    });

  });

  describe('Integration test for encoder and decoder', () => {
    it('should expect that the output file after running encode and decode successively would return the original input', () => {
      encoder(`data.txt`)
      .then((encoderResult) => {
        return decoder(encoderResult, 100, 'output.txt')
      })
      .then((decoderResult) => {
        expect(`${__dirname/data.txt}`).to.be.a.file().and.equal(`${__dirname/output.txt}`);
      });
    });
  });
});