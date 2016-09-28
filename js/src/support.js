const mod = (x, y) => (x - y * Math.floor(x / y))


const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const randomIntUnicArray = (min, max) => {
  let count = max - min + 1
  let sourceArr = []
  let destArr = []
  let randInt

  while (count--)
    sourceArr.push(count + min)

  while (sourceArr.length) {
    randInt = Math.round(Math.random() * (sourceArr.length - 1))
    destArr.push(sourceArr[randInt])
    sourceArr.splice(randInt, 1)
  }

  return destArr
}

const randomKey = len => {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

const randomKeyBin = len => {
  let text = ''

  for (let i = 0; i < len * 8; i++)
    text += (Math.random() >= 0.5) ? 1 : 0
  return text
}

export {
  mod,
  randomInt,
  randomKey,
  randomKeyBin,
  randomIntUnicArray
}
