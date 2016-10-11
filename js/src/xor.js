'use strict'

import {
  randomKeyBin,
  strToBin,
  binToStr,
} from './support.js'

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
