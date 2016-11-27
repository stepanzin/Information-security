require_relative "math"
#text = "abcdef"

def generate_primes(times, from, to)
  primes = []
  times.times do 
  	(from..to).each do |i|
  	 if prime?(i) && !primes.include?(i)
  	 	primes << i
  	 	break
  	 end
  	end
  end
  primes
end

def rsa(text)
  decimal_chars = []

  text.split("").each do |ch|
    decimal_chars << ch.ord
  end

  p, q = generate_primes(2, 60, 100)
  n = p*q
  fi = (p-1)*(q-1)
  e = find_coprime(fi)
  d = invmod(e, fi)

  coded_chars = []
  
  decimal_chars.each do |ch|
    x = ch
    1.upto(e-1) { x = (x*ch)%n }
    coded_chars << x
  end 

  puts "Массив зашифрованных данных: #{coded_chars.inspect}" 
  puts "Расшифрованный текст: #{rsa_decode(coded_chars, d, n).join("")}"
end

def rsa_decode(coded_chars, d, n)
  decoded_chars = []
  coded_chars.each do |ch|
  	x = ch
  	1.upto(d-1) { x = (x*ch)%n }
  	decoded_chars << x
  end

  decoded_chars.map! do |ch|
    ch.chr 	
  end
end
puts "Введите текст: "
text = gets.chomp
rsa(text)