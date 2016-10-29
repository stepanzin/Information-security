const mod = (x, y) => (x - y * Math.floor(x / y))

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const randomIntUnicArray = (min, max) => {
  let count = max - min + 1
  const sourceArr = []
  const destArr = []
  let randInt

  while (count--) {
    sourceArr.push(count + min)
  }

  while (sourceArr.length) {
    randInt = Math.round(Math.random() * (sourceArr.length - 1))
    destArr.push(sourceArr[randInt])
    sourceArr.splice(randInt, 1)
  }

  return destArr
}

const randomKey = len => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < len; i++) {
    text = text + possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const randomKeyBin = len => {
  let text = ''

  for (let i = 0; i < len * 8; i++) {
    text += (Math.random() >= 0.5) ? 1 : 0
  }
  return text
}

const randomHalfByteKey = () => {
  let text = ''
  let q = 0
  for (let i = 0; i < 4; i++) {
    const char = (Math.random() >= 0.5) ? 1 : 0
    if (char) { q++ }
    text += char
  }
  if (q % 2 === 0) { return text }

  return randomHalfByteKey()
}

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

export {
  mod,
  randomInt,
  randomKey,
  randomKeyBin,
  randomIntUnicArray,
  strToBin,
  binToStr,
  randomHalfByteKey,
}
