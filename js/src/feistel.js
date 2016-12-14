'use strict'

import {
  strToBin,
  binToStr,
  randomHalfByteKey,
} from './support.js'

function xor(a, b) {
  return a.split('').map((e, i) => e ^ b[i]).join('')
}

String.prototype.rotate = function(n) {
  return this.slice(n, this.length).concat(this.slice(0, n));
}

class Feistel {
  constructor(text, r = 10, k) {
    this.t = text
    this.r = r
    this.c = ''
    this.d = ''
    this.k = k
    this.keyArr = [k]
  }

  traverseTree(tree, visitor) {
    if (Array.isArray(tree)) {
      for (let i = 0; i < tree.length; i++) {
        this.traverseTree(tree[i], visitor)
      }
    }
    else {
      visitor(tree)
    }
  }

  crypt() {
    const bitSequence = strToBin(this.t)
    let char = []
    let i = 0
    do {
      char.push(bitSequence.slice(i, i += 8))
    } while (i < bitSequence.length)

    for (let q = 0; q < this.r - 1; q++) {
      char = char.map(e => {
        let left = e.slice(0, 4)
        let right = e.slice(4, 8)

        const temp = xor(xor(left, this.keyArr[q]), right)
        right = left
        left = temp

        return left.concat(right)
      })
      const newkey = this.keyArr[this.keyArr.length - 1].rotate(1)
      this.keyArr.push(newkey)
    }

    char = char.map(e => {
      const left = e.slice(0, 4)
      let right = e.slice(4, 8)
      right = xor(xor(left, this.keyArr[this.keyArr.length - 1]), right)
      return left.concat(right)
    })
    this.c = binToStr(char.join(''))

    return {
      key: this.k,
      rounds: this.r,
      result: this.c,
    }
  }

  decrypt() {
    const bitSequence = strToBin(this.c)
    let char = []
    let i = 0
    do {
      char.push(bitSequence.slice(i, i += 8))
    } while (i < bitSequence.length)

    for (let q = this.r - 1; q > 0; q--) {
      char = char.map(e => {
        let left = e.slice(0, 4)
        let right = e.slice(4, 8)

        const temp = xor(xor(right, this.keyArr[q]), left)
        left = right
        right = temp

        return left.concat(right)
      })
    }

    char = char.map(e => {
      let left = e.slice(0, 4)
      const right = e.slice(4, 8)
      left = xor(xor(right, this.keyArr[0]), left)
      return left.concat(right)
    })

    this.c = binToStr(char.join(''))

    return {
      key: this.k,
      rounds: this.r,
      result: this.c,
    }
  }
}

// const rounds = randomInt(2, 16)
const cipher = new Feistel('run the jewel', 6, randomHalfByteKey())
const q = cipher.crypt()
const p = cipher.decrypt()
console.log(JSON.stringify(q.result))
console.log(JSON.stringify(p.result))
