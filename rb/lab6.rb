require_relative './math'
require_relative './test_prime.rb'
require 'zlib'
 
#подготовка данных
p = Miller_Rabin.generate_prime(10)
q = find_prime_multiplier(p-1)
g = 1
while (g == 1)
  h = Random.rand(2..p-2)
  g = h
  (1...((p-1)/q)).each do |i|
	g = (g*h)%p
  end
end

def generate_dsa_signature(message, p, q, g)
  hash_message = Zlib.crc32 message
  puts "hash_message: #{hash_message}"
  r = 0
  s = 0
  y = 1

  x = Random.rand(1..q-1)
  y = g
  (1...x).each do |i|
    y = (y*g)%p
  end
  while (s == 0)
    k = Random.rand(1..q-1)
    r = g
    (1...k).each do |i|
  	  r = (r*g)%p
    end
    r = r % q
    k_1 = invmod(k, q)
    s = (k_1*(hash_message + x*r))% q
  end
  digital_signature, open_key = [r, s], y
end

def check_dsa_signature(message, digital_signature, open_key, p, q, g)

  hash_message = Zlib.crc32 message

  y = open_key
  s = digital_signature[1]
  r = digital_signature[0]

  w = invmod(s, q)% q
  u1 = (hash_message*w)% q
  u2 = (r*w)% q
  v = ((g**u1 * y**u2)% p)% q

  puts "Подпись верна" if r == v
  puts "Подпись неверна" if r!=v
  puts "Сообщение: #{message}"
end
puts "Введите ваше сообщение: "
message = gets.chomp
digital_signature, open_key = generate_dsa_signature(message, p, q, g)
puts "Подпись: #{digital_signature.inspect}"
check_dsa_signature(message, digital_signature, open_key, p, q, g)