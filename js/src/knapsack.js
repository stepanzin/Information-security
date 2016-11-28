'use strict'
import {
  mod,
  invmod,
  findCoprime,
  randomInt,
  strToBin,
  binToStr,
} from './support.js'

const genKeys = (n = 8) => {
  const keys = [randomInt(0, 15)]
  while (n-- > 1) {
    const minVal = keys.reduce((a, b) => a + b) + 1
    const maxVal = randomInt(minVal, minVal + 50)
    keys.push(randomInt(minVal, maxVal))
  }
  return keys
}

const decode = (arrayOfNumbers, n, m, secretKey) => {
  let textArr = []
  arrayOfNumbers.forEach(num => {
    const charArr = []
    let a = mod((num * invmod(n, m)), m)
    let i = 8
    while (i-- > 0) {
      if (a >= secretKey[i]) {
        charArr.push('1')
        a = a - secretKey[i]
      }
      else {
        charArr.push('0')
      }
    }
    textArr.push(charArr.join(''))
  })
  return binToStr(textArr.join(''))
}

const knapsack = (text, l, secretKey) => {
  let openKey = []
  let arrayB = []
  let coded = []

  const m = secretKey.reduce((a, b) => a + b) + 23
  const n = findCoprime(m)
  let i = l
  while (i-- > 0) { openKey.push(mod((secretKey[i] * n), m)) }

  text.split('').forEach(e => arrayB.push(strToBin(e)))
  arrayB.forEach(e => {
    const nums = e.split('')
    const elem = openKey.filter((el, ind) => nums[ind] === '1').reduce((a, b) => a + b)
    coded.push(elem)
  })
  return [coded, n, m]
}

const length = 8
const keys = genKeys(length)
console.log('Keys:', keys)
const [coded, n, m] = knapsack('s3cr3t t3xt', length, keys)
console.log('Coded:', coded)
const decoded = decode(coded, n, m, keys)
console.log('Source: s3cr3t t3xt')
console.log('Decoded:', decoded)
