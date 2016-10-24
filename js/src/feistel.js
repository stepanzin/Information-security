'use strict'

import {
  randomInt,
} from './support.js'

class Feistel {
  constructor(text) {
    this.t = text
    this.f = this.randomBitwiseGenerator()
    this.r = randomInt(1, 16)
    this.c = ''
    this.d = ''
  }

  get crypt() {

    this.c = this.cipher()
    return {
      key: this.k,
      rounds: this.r,
      result: this.c,
    }
  }

  get decrypt() {

    this.d = this.cipher()
    return {
      key: this.k,
      rounds: this.r,
      result: this.d,
    }
  }
  static randomBitwiseGenerator() {
    const operators = ['&', '|', '^', '<<', '>>', '>>>'] // '~',
    return Function.constructor('a', 'b', `return a ${operators[randomInt(0, operators.length + 1)]} b`)
  }

  static cipher(left, right, rounds, key) {

    for (let i = 0; i < rounds; i++) {
      const temp = right ^ this.f(left, key[i])
      right = left
      left = temp
    }
    right = right ^ this.f(left, key[key.length - 1])
    return left.concat(right)
  }
}

const cipher = new Feistel('sadsa')
cipher.crypt()
cipher.decrypt()
