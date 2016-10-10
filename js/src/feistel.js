'use strict'

import {
  randomInt,
} from './support.js'

class Feistel {
  constructor(text, blockLength) {
    this.t = text
    this.l = blockLength
    this.f = this.randomBitwiseGenerator()
  }
  
  static randomBitwiseGenerator() {
    const operators = ['&', '|', '^', '<<', '>>', '>>>'] // '~',
    return Function.constructor('a', 'b', `return a ${operators[randomInt(0, operators.length + 1)]} b`)
  }

  crypt(left, right, rounds, key) {
    for (let i = 0; i < rounds; i++) {
      const temp = right ^ this.f(left, key[i]);
      right = left;
      left = temp;
    }
  }

  decrypt(left, right, rounds, key) {
    for (let i = rounds - 1; i >= 0; i--) {
      const temp = left ^ this.f(right, key[i]);
      left = right;
      right = temp;
    }
  }
}

const cipher = new Feistel('sadsa')
cipher.crypt()
cipher.decrypt()
