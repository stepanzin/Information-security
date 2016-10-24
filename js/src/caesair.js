import {
  mod,
} from './support.js'

const crypt = (str, shift) => {
  return str.split('').map(el => {
    const e = el.charCodeAt()
    if (47 < e && 58 > e) {
      return String.fromCharCode(48 + mod((e + shift - 48), 10))
    }
    else if (64 < e && 90 > e) {
      return String.fromCharCode(65 + mod((e + shift - 65), 26))
    }
    else if (96 < e && 123 > e) {
      return String.fromCharCode(97 + mod((e + shift - 97), 26))
    }
    return String.fromCharCode(e)
  }).join('')
}

const decrypt = (str, shift) => {
  return str.split('').map(el => {
    const e = el.charCodeAt()
    if (47 < e && 58 > e) {
      return String.fromCharCode(48 + mod((e - shift - 48), 10))
    }
    else if (64 < e && 90 > e) {
      return String.fromCharCode(65 + mod((e - shift - 65), 26))
    }
    else if (96 < e && 123 > e) {
      return String.fromCharCode(97 + mod((e - shift - 97), 26))
    }
    return String.fromCharCode(e)
  }).join('')
}

const pangram = 'Pack my 98 box with five dozen liquor jugs. 135!'
const cesairp3 = 3
const cesairp8 = 8
let crypted = ''
let decrypted = ''

console.log('Cesair +3')
console.log('Text:', pangram)
crypted = crypt(pangram, cesairp3)
console.log('Crypted text:', crypted)
decrypted = decrypt(crypted, cesairp3)
console.log('Decrypted text:', decrypted, '\n\n')

console.log('Cesair +8')
console.log('Text:', pangram)
crypted = crypt(pangram, cesairp8)
console.log('Crypted text:', crypted)
decrypted = decrypt(crypted, cesairp8)
console.log('Decrypted text:', decrypted)
