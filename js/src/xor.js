'use strict'

import {
  randomKeyBin,
} from './support.js'

const strToBin = str => {
  return str.split('').map(e => {
    const bin = e.charCodeAt(0).toString(2)
    return '0'.repeat(8 - bin.length) + bin
  }).join('')
}

const binToStr = bin => {
  let i = 0
  const str = []
  do {
    str.push(String.fromCharCode(parseInt(bin.slice(i, i += 8), 2)))
  }
  while (i !== bin.length)
  return str.join('')
}

const crypt = (text, key) => {
  const str = strToBin(text)
  return binToStr(str.split('').map((e, i) => {
    return e ^ key[i] ? '1' : '0'
  }).join(''))
}

const pangram = 'Pack my 98 box with five dozen liquor jugs. 135!'
const keyPhrase = randomKeyBin(pangram.length)
let crypted = ''
let decrypted = ''

console.log('XOR')
console.log('Text:', pangram)
console.log('Text length:', pangram.length)
console.log('Key:', keyPhrase, '\n')
crypted = crypt(pangram, keyPhrase)
console.log('Crypted text:', crypted)
decrypted = crypt(crypted, keyPhrase)
console.log('Decrypted text:', decrypted)
