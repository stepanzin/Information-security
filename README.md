# Basic Information Security algorithms on Github
[![Node.JS](https://img.shields.io/badge/Node.JS-%3E%3D4.0-brightgreen.svg)](https://nodejs.org)
[![Ruby](https://img.shields.io/badge/Ruby-%3E2.0-red.svg)](https://www.ruby-lang.org/)
[![Python](https://img.shields.io/badge/Python-%3E%3D%203.0-blue.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

In this repository, you can find basic encryption algorithms implemented in JavaScript, Ruby and Python

##Caesar cipher ([Wiki](https://en.wikipedia.org/wiki/Caesar_cipher))

In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of 3, D would be replaced by A, E would become B, and so on. The method is named after Julius Caesar, who used it in his private correspondence.

The encryption step performed by a Caesar cipher is often incorporated as part of more complex schemes, such as the Vigenère cipher, and still has modern application in the ROT13 system. As with all single-alphabet substitution ciphers, the Caesar cipher is easily broken and in modern practice offers essentially no communication security.

![Caesar cipher](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Caesar_cipher_left_shift_of_3.svg/320px-Caesar_cipher_left_shift_of_3.svg.png)
>The action of a Caesar cipher is to replace each plaintext letter with a different one a fixed number of places down the alphabet. The cipher illustrated here uses a left shift of three, so that (for example) each occurrence of E in the plaintext becomes B in the ciphertext.

The encryption can also be represented using modular arithmetic by first transforming the letters into numbers, according to the scheme, *A = 0, B = 1,..., Z = 25.* Encryption of a letter  *x* by a shift n can be described mathematically as,

f1
Decryption is performed similarly,

f2
(There are different definitions for the modulo operation. In the above, the result is in the range 0...25. I.e., if *x+n* or *x-n* are not in the range 0...25, we have to subtract or add 26.)

The replacement remains the same throughout the message, so the cipher is classed as a type of monoalphabetic substitution, as opposed to polyalphabetic substitution.

### JS Tech
<img src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png" height="100" alt="Gulp">   
<img src="https://blog.codewithdan.com/wp-content/uploads/2016/04/es6-logo-300x300-270x250.png" height="100" alt="ES6">

### Install (JS)
Clone the repo and run this commands on cloned folder
Gulp'll complie scripts
```
$ git clone https://github.com/stepanzin/Information-security.git
$ cd Information-security
$ npm i
$ gulp
```
