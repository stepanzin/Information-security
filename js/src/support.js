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
    if (char) {
      q++
    }
    text += char
  }
  if (q % 2 === 0) {
    return text
  }

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

const gcd = (a, b) => {
  while (b !== 0) {
    b = mod(a, (a = b))
  }
  return a
}

const xgcd = (a, b) => {
  if (b === 0) {
    return [
      1,
      0,
      a,
    ]
  }
  else {
    const temp = xgcd(b, a % b)
    const x = temp[0]
    const y = temp[1]
    const d = temp[2]
    return [
      y,
      x - y * Math.floor(a / b),
      d,
    ]
  }
}

const invmod = (a, b) => {
    a %= b
    for (let x = 1; x < b; x++) {
        if ((a * x) % b === 1) {
            return x;
        }
    }
}

const isPrime = n => {
  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false
  const m = Math.sqrt(n)
  for (var i = 2; i <= m; i++) if (n % i === 0) return false
  return true;
}

const isCoprime = (a, b) => {
	let num;
	while (b) {
		num = a % b
		a = b
		b = num
	}
	if (Math.abs(a) === 1) {
		return true
	}
	return false
}

const findCoprime = m => {
  let res = 1
  for (let i = 3; i < Math.ceil(Math.sqrt(m)); i++) {
    const pr = isPrime(i)
    const ic = isCoprime(m, i)
    res = (pr && ic) ? i : res
  }
  return res
}

export {
  gcd,
  xgcd,
  invmod,
  isPrime,
  mod,
  findCoprime,
  randomInt,
  randomKey,
  randomKeyBin,
  randomIntUnicArray,
  strToBin,
  binToStr,
  randomHalfByteKey,
}
