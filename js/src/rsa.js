import {
  findCoprime,
  invmod
} from './support.js'

Array.prototype.sample = function() {
  return this[~~(Math.random() * this.length)]
}

function miller_rabin(m,k) {
  var t = (m-1)/2
  var s = 1
  while(t % 2==0) {
    t /= 2
    s += 1
  }

  for (var i = 0; i < k; i++) {
    b = 0
    b = randomInt(2, m-2)
    var prime = false
    var y = (b**t) % m
    if(y ==1 || y == m-1) {
      prime = true
      continue;
    }
    for (var j = 0; i < (s-1); i++) {
      y = (y*y) % m
      if (y == (m-1)) {
        prime = true
        break
      }
      prime = y == 1 ? false : prime
    }


  }

  return prime ? true : false
}

function generate_primes(bits = 5) {
  if (bits == 1) {
    console.log("Невозможно найти простое число в данном диапазоне")
    return 0
  }

  if (bits == 2)
    return [2, 3].sample()
  else if (bits == 3)
    return [5, 7].sample()
  else if (bits == 4)
    return [11, 13].sample()

  var arr = []
  var to = (2**bits)-1
  var from = 2**(bits-1)

  for (var i = from; i < to; i++) {
    if (num % 2 != 0) {
      arr.push(num)
    }
  }

  arr.forEach((num,i) => {
    if (num%3 == 0 || num%5 == 0 || num%7 == 0 || num%11 == 0 || num%13 == 0) {
      arr = arr.filter(e => e != 3)
    }
  })
  var primes = []
  arr.forEach(num => {
    if (miller_rabin(num, 2)) {
      primes.push(num)
    }
  })
  return arr.sample()
}

function rsa(text) {
  var decimal_chars = []

  text.split("").forEach(ch => {
    decimal_chars.push(ch.charCodeAt())
  })

  var p, q = generate_primes(2, 60, 100)
  var n = p*q
  var fi = (p-1)*(q-1)
  var e = findCoprime(fi)
  var d = invmod(e, fi)

  var coded_chars = []

  decimal_chars.forEach(ch => {
    var x = ch
    for (var i = 0; i < (e - 1); i++) {
      x = (x*ch)%n
    }
    coded_chars.push(x)
  })
  console.log("Массив зашифрованных данных: "+coded_chars.toString())
  console.log("Расшифрованный текст: " + rsa_decode(coded_chars, d, n).join(""))
}


function rsa_decode(coded_chars, d, n) {
  var decoded_chars = []
  coded_chars.forEach(ch => {
    var x = ch
    for (var i = 0; i < (d-1); i++) {
      x = (x*ch)%n
    }
    decoded_chars.push(x)
  })
  return decoded_chars.map(ch => String.fromCharCode(ch))
}

var text = 's3cr3t t3xt'
rsa(text)
