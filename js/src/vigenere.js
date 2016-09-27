'use strict'

import {
  mod,
  randomKey
} from './support.js'

const crypt = (str, key) => {
  return str.split('').map((el, i) => {
    let e = el.charCodeAt()
    let k = key[i].charCodeAt()
    if (47 < e && 58 > e)
      return String.fromCharCode(48 + mod((e + k - 48), 10))
    else if (64 < e && 90 > e)
      return String.fromCharCode(65 + mod((e + k - 65), 26))
    else if (96 < e && 123 > e)
      return String.fromCharCode(97 + mod((e + k - 97), 26))
    return String.fromCharCode(e)
  }).join('')
}

const decrypt = (str, key) => {
  return str.split('').map((el, i) => {
    let e = el.charCodeAt()
    let k = key[i].charCodeAt()
    if (47 < e && 58 > e)
      return String.fromCharCode(48 + mod((e - k - 48), 10))
    else if (64 < e && 90 > e)
      return String.fromCharCode(65 + mod((e - k - 65), 26))
    else if (96 < e && 123 > e)
      return String.fromCharCode(97 + mod((e - k - 97), 26))
    return String.fromCharCode(e)
  }).join('')
}

let pangram = "Pack my 98 box with five dozen liquor jugs. 135!"
let keyPhrase = randomKey(pangram.length)
let crypted = ''
let decrypted = ''

console.log('Vigenere')
console.log('Text:', pangram)
console.log('Key:', keyPhrase, '\n')
crypted = crypt(pangram, keyPhrase)
console.log('Crypted text:', crypted)
decrypted = decrypt(crypted, keyPhrase)
console.log('Decrypted text:', decrypted)
