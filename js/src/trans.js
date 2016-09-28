'use strict'

import {
  randomKey,
  randomInt,
  randomIntUnicArray
} from './support.js'

const slash = (arr, p) => {
  let i = 0
  let buf = []

  arr = arr.map(e=>e.toString())

  do
    buf.push(arr.slice(i, i += p))
  while (i < arr.length)
  // let len = buf[buf.length - 1].length
  // if (len < p)
  //   for (var i = 0; len <= p; i++)
  //     buf[buf.length - 1].push(-1)
  return buf
}

const crypt = (text, seq, len) => {
  let count = text.length
  let sourceArr = slash(text, len)
  console.log(sourceArr)

  return sourceArr.map((el, ind) => el.split('').map((e, i, a) => a[seq[ind*i + i]]).join('')).join('')
}

const decrypt = (text, seq, len) => {
  let count = text.length
  let sourceArr = slash(text, len)
  console.log(sourceArr)

  return sourceArr.map((el, ind) => el.split('').map((e, i, a) => a[seq[ind*i + i]]).join('')).join('')
}

let pangram = "Pack my 98 box with five dozen liquor jugs. 135!"
let blockLen = 3
//randomInt(0, pangram.length)
let sequence = randomIntUnicArray(0, blockLen - 1)
let crypted = ''
let decrypted = ''

console.log('Transpos:')
console.log('Text:', pangram)
console.log('Block length:', blockLen)
console.log('Sequence:', sequence.join(), '\n')

crypted = crypt(pangram, sequence, blockLen)
console.log('Crypted text:', crypted)

decrypted = decrypt(crypted, sequence, blockLen)
console.log('Decrypted text:', decrypted)
