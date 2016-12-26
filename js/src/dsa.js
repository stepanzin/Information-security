import {
  isPrime,
  invmod,
  randomInt,
} from './support.js'

var crc32 = require('buffer-crc32');

Array.prototype.sample = function() {
  return this[~~(Math.random() * this.length)]
}

function find_multiplier(num) {
  var array = []
  for (var i = 2; i < num; i++) {
    if (num % i == 0) array.push(num)
  }
  for (var i = 0; i < array.length; i++) {
    if (isPrime(array[i])) {
      return array[i]
    }
  }
  return 3;
}


function miller_rabin(m,k) {
  var t = (m-1)/2
  var s = 1
  while(t % 2==0) {
    t /= 2
    s += 1
  }

  for (var i = 0; i < k; i++) {
    var b = 0
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
    if (i % 2 != 0) {
      arr.push(i)
    }
  }

  arr.forEach((num,i) => {
    if (num%3 == 0 || num%5 == 0 || num%7 == 0 || num%11 == 0 || num%13 == 0) {
      arr = arr.filter(e => e != num)
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


var p = generate_primes(12)
var q = find_multiplier(p-1)
var g = 1
while (g == 1) {
  var h = randomInt(2, p-2)
  g = h

  for (var i = 1; i < (p-1)/q; i++) {
    g = (g*h)%p
  }
}

function generate_dsa_signature(message, p, q, g) {
  var hash_message = crc32.unsigned(crc32(message))
  console.log("Hash message: "+hash_message);
  var r = 0
  var s = 0
  var y = 1

  var x = randomInt(1, q-1)
  var y = g
  for (var i = 1; i < x; i++) {
    y = (y*g)%p
  }

  while (s == 0) {
    var k = randomInt(1, q-1)
    r = g
    for (var i = 1; i < k; i++) {
      r = (r*g)%p
    }
    r = r % q
    var k_1 = invmod(k, q)
    s = (k_1*(hash_message + x*r))% q
  }
  return [[r, s], y]
}

function check_dsa_signature(message, digital_signature, open_key, p, q, g) {
  var hash_message = crc32.unsigned(crc32(message))

  var y = open_key
  var s = digital_signature[1]
  var r = digital_signature[0]

  var w = invmod(s, q) % q
  var u1 = (hash_message*w)% q
  var u2 = (r*w)% q
  var v = ((Math.pow(g, u1) * Math.pow(y,u2)) % p) % q

  console.log(r == v ? "Подпись верна" : "Подпись не верна")
  console.log("Сообщение: " + message)
}


var message = 's3cr3t t3xt'

var buf = generate_dsa_signature(message, p, q, g)
var digital_signature = buf[0], open_key = buf[1]
console.log("Подпись: " + digital_signature.toString());
check_dsa_signature(message, digital_signature, open_key, p, q, g)
